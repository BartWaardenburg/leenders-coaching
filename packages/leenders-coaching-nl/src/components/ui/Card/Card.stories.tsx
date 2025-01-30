import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

import { Section } from "@/components/ui/Section";

/* Example image import - you'll need to add an actual image */
import exampleImage from "../../../assets/images/99-Simone-louise-boonstoppel-fotografie.jpg";
import { Grid } from "../Grid";

const meta = {
    title: "UI/Card",
    component: Card,
    parameters: {
        layout: "padded",
    },
    decorators: [
        (Story) => (
            <Section>
                <Story />
            </Section>
        ),
    ],
    tags: ["autodocs"],
    argTypes: {
        border: {
            control: 'boolean',
            description: 'Whether to show a border around the card',
        },
        variant: {
            control: "select",
            options: ["blue", "purple", "green", "pink", "yellow", "teal"],
            description: "Background color variant of the card",
        },
        featured: {
            control: "boolean",
            description: "Whether the card is featured",
        },
        title: {
            control: "text",
            description: "Title of the card",
        },
        excerpt: {
            control: "text",
            description: "Excerpt text for the card",
        },
        date: {
            control: "text",
            description: "Date to display",
        },
        categories: {
            control: "object",
            description: "Array of category names",
        },
        image: {
            control: "object",
            description: "Image source for the card",
        },
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
    title: "Communication Skills",
    excerpt: "Enhance your communication abilities for better personal and professional relationships.",
    slug: "communication-skills",
};

export const Default: Story = {
    args: defaultArgs,
};

export const WithImage: Story = {
    args: {
        ...defaultArgs,
        image: exampleImage,
    },
};

export const Featured: Story = {
    args: {
        ...defaultArgs,
        featured: true,
    },
};

export const WithMetadata: Story = {
    args: {
        ...defaultArgs,
        date: "March 15, 2024",
        categories: ["Personal Development", "Career"],
    },
};

export const LongTitle: Story = {
    args: {
        ...defaultArgs,
        title: "Understanding the Complexities of Interpersonal Communication in Professional Environments",
    },
};

export const AllVariants: Story = {
    parameters: {
        layout: "padded",
    },
    render: (args) => (
        <Grid >
            <Card {...args} variant="blue" title="Blue Variant" />
            <Card {...args} variant="purple" title="Purple Variant" />
            <Card {...args} variant="green" title="Green Variant" />
            <Card {...args} variant="pink" title="Pink Variant" />
            <Card {...args} variant="yellow" title="Yellow Variant" />
            <Card {...args} variant="teal" title="Teal Variant" />
        </Grid>
    ),
    args: {
        excerpt: defaultArgs.excerpt,
        slug: defaultArgs.slug,
        title: "Color Variant",
        border: true,
    },
};

export const FullExample: Story = {
    args: {
        ...defaultArgs,
        featured: true,
        date: "March 15, 2024",
        categories: ["Communication", "Leadership"],
        image: exampleImage,
        variant: "blue",
    },
};

export const WithoutExcerpt: Story = {
    args: {
        title: defaultArgs.title,
        slug: defaultArgs.slug,
    },
};

export const WithBorder: Story = {
    args: {
        ...defaultArgs,
        border: true,
    },
};

export const OnlyTitle: Story = {
    args: {
        title: "Minimal Card Example",
        slug: "minimal",
    },
}; 