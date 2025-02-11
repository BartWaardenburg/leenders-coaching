import type { Meta, StoryObj } from "@storybook/react";
import { SectionFeatured } from "./SectionFeatured";

import exampleImage from "../../../assets/images/99-Simone-louise-boonstoppel-fotografie.jpg";

const meta = {
    title: "Sections/SectionFeatured",
    component: SectionFeatured,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SectionFeatured>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Featured Section",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: exampleImage,
        imageAlt: "Featured image",
    },
};

export const WithCTA: Story = {
    args: {
        ...Default.args,
        cta: {
            href: "#",
            label: "Learn More",
            variant: "black",
        },
    },
};

export const WithBackground: Story = {
    args: {
        ...WithCTA.args,
        background: "blue",
        cta: {
            href: "#",
            label: "Learn More",
            variant: "transparent",
        },
    },
};

export const WithBorder: Story = {
    args: {
        ...WithCTA.args,
        background: "blue",
        border: true,
        cta: {
            href: "#",
            label: "Learn More",
            variant: "transparent",
        },
    },
}; 