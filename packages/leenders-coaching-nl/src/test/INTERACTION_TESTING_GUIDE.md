# Interaction Testing Guide

This guide explains the interaction testing patterns implemented in this project's Storybook stories.

## Overview

We've implemented comprehensive interaction tests using Storybook's play functions, which allow us to:

- Simulate user interactions (clicks, typing, keyboard navigation)
- Assert on component behavior and state changes
- Test complex user flows and form submissions
- Ensure components work correctly with animations and async operations

## Key Patterns

### 1. Basic Interaction Testing

```typescript
export const Default: Story = {
  args: {
    onClick: fn(), // Spy function to track calls
  },
  play: async ({ canvas, userEvent, args }) => {
    // Wait for component to be ready
    await expect(canvas.getByRole('button')).toBeVisible();
    await waitForAnimationsToComplete();

    // Simulate user interaction
    await userEvent.click(canvas.getByRole('button'));

    // Assert on the result
    await expect(args.onClick).toHaveBeenCalled();
  },
};
```

### 2. Form Interaction Testing

```typescript
export const FormSubmission: Story = {
  play: async ({ canvas, userEvent, step }) => {
    await step('Fill out the form', async () => {
      await userEvent.type(canvas.getByLabelText('Name'), 'John Doe');
      await expect(canvas.getByDisplayValue('John Doe')).toBeInTheDocument();
    });

    await step('Submit the form', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
      await expect(args.onSubmit).toHaveBeenCalled();
    });
  },
};
```

### 3. Keyboard Navigation Testing

```typescript
export const KeyboardNavigation: Story = {
  play: async ({ canvas, userEvent }) => {
    // Test tab navigation
    await userEvent.tab();
    await expect(canvas.getByLabelText('First Field')).toHaveFocus();

    await userEvent.tab();
    await expect(canvas.getByLabelText('Second Field')).toHaveFocus();

    // Test keyboard activation
    await userEvent.keyboard('{Enter}');
    await expect(args.onSubmit).toHaveBeenCalled();
  },
};
```

### 4. Animation and State Testing

```typescript
export const WithAnimations: Story = {
  play: async ({ canvas, userEvent }) => {
    // Wait for initial state
    await expect(canvas.getByText('Initial State')).toBeVisible();
    await waitForAnimationsToComplete();

    // Trigger state change
    await userEvent.click(canvas.getByRole('button'));

    // Wait for new state
    await expect(canvas.getByText('New State')).toBeVisible();
    await waitForAnimationsToComplete();
  },
};
```

## Utility Functions

### `waitForAnimationsToComplete()`

Waits for CSS animations and transitions to finish before proceeding with tests.

### `waitForElementToBeVisible(selector, timeout)`

Waits for a specific element to become visible in the DOM.

### `waitForTextContent(text, timeout)`

Waits for specific text content to appear in the component.

### `waitForCSSAnimations(animationSelector, timeout)`

Waits for CSS animations to complete by checking animation play state.

## Best Practices

### 1. Use Semantic Queries

Prefer queries that match how users interact with your UI:

```typescript
// ✅ Good - matches user behavior
await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
await userEvent.type(
  canvas.getByLabelText('Email Address'),
  'test@example.com'
);

// ❌ Avoid - implementation details
await userEvent.click(canvas.getByTestId('submit-button'));
await userEvent.type(canvas.getByClassName('email-input'), 'test@example.com');
```

### 2. Group Related Interactions with `step()`

Use the `step()` function to organize complex test flows:

```typescript
play: async ({ canvas, userEvent, step }) => {
  await step('Fill out the form', async () => {
    // Form filling interactions
  });

  await step('Submit and verify', async () => {
    // Submission and verification
  });
};
```

### 3. Always Wait for Animations

Use animation utilities to ensure consistent test results:

```typescript
// Wait for component to be ready
await waitForAnimationsToComplete();

// After state changes
await userEvent.click(button);
await waitForAnimationsToComplete();
```

### 4. Test Both Positive and Negative Cases

Include tests for both successful interactions and error states:

```typescript
// Test successful submission
await userEvent.click(submitButton);
await expect(args.onSubmit).toHaveBeenCalled();

// Test validation errors
await userEvent.click(submitButton); // Without filling required fields
await expect(args.onSubmit).not.toHaveBeenCalled();
```

### 5. Use Spy Functions for Callbacks

Track function calls to verify component behavior:

```typescript
args: {
  onClick: fn(), // Creates a spy function
  onSubmit: fn(),
},

play: async ({ args }) => {
  // Test interactions
  await expect(args.onClick).toHaveBeenCalled();
  await expect(args.onSubmit).toHaveBeenCalledWith(expectedData);
};
```

## Component-Specific Patterns

### Button Components

- Test click interactions
- Test disabled states
- Test loading states
- Test keyboard activation (Enter, Space)

### Input Components

- Test typing and value changes
- Test validation states
- Test disabled states
- Test keyboard navigation

### Form Components

- Test form submission
- Test validation
- Test field interactions
- Test keyboard navigation

### Modal/Dialog Components

- Test open/close interactions
- Test backdrop clicks
- Test escape key handling
- Test focus management

### Accordion/FAQ Components

- Test expand/collapse interactions
- Test multiple item interactions
- Test keyboard navigation

## Running Tests

### In Storybook UI

1. Open the Interactions panel
2. Click "Run component tests" button
3. Watch the step-by-step execution
4. Debug any failures

### In Terminal

```bash
# Run all interaction tests
pnpm run test-storybook

# Run specific story tests
pnpm run test-storybook --grep "Button"
```

### In CI

Tests run automatically in CI environments and will fail the build if any assertions fail.

## Debugging Tips

1. **Use the Interactions Panel**: Shows step-by-step execution and allows pausing/stepping through tests
2. **Check Console Logs**: Look for error messages and warnings
3. **Verify Element Queries**: Ensure your queries are finding the right elements
4. **Check Timing**: Add appropriate waits for animations and async operations
5. **Test in Browser**: Run tests in Storybook UI to see visual feedback

## Common Issues and Solutions

### Issue: Test fails with "Element not found"

**Solution**: Ensure the element is visible and use appropriate wait functions

### Issue: Animation-related flaky tests

**Solution**: Use `waitForAnimationsToComplete()` after state changes

### Issue: Form submission not working

**Solution**: Check that all required fields are filled and form validation passes

### Issue: Keyboard navigation not working

**Solution**: Ensure elements are focusable and use proper tab order

## Examples in This Project

- **Button**: `/src/components/ui/Button/Button.stories.tsx`
- **Input**: `/src/components/ui/Input/Input.stories.tsx`
- **Form**: `/src/components/ui/Form/Form.stories.tsx`
- **FAQ**: `/src/components/ui/FAQ/FAQ.stories.tsx`
- **Alert**: `/src/components/ui/Alert/Alert.stories.tsx`
- **Modal**: `/src/components/ui/Modal/Modal.stories.tsx`
- **Toast**: `/src/components/ui/Toast/Toast.stories.tsx`
- **Carousel**: `/src/components/ui/Carousel/Carousel.stories.tsx`

Each of these files demonstrates different interaction testing patterns and can serve as reference implementations for new components.
