import type { Meta, StoryObj } from "@storybook/react";
import { SectionTestimonial } from "./SectionTestimonial";

const meta = {
    title: "Sections/SectionTestimonial",
    component: SectionTestimonial,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SectionTestimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
    quote: "Working with this coach has been transformative. The insights and guidance provided helped me overcome challenges and achieve my goals.",
    personName: "Alex Johnson",
    personDescription: "Senior Marketing Director & Brand Strategy Consultant",
    personImageSrc: "https://i.pravatar.cc/300",
    personImageAlt: "Alex Johnson",
};

export const Default: Story = {
    args: defaultArgs,
};

export const WithBackground: Story = {
    args: {
        ...defaultArgs,
        background: "blue",
    },
};

export const WithBorder: Story = {
    args: {
        ...defaultArgs,
        background: "blue",
        border: true,
    },
};