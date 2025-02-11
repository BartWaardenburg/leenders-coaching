import type { Meta, StoryObj } from "@storybook/react";
import { SectionContent } from "./SectionContent";
import type { PortableTextBlock } from "@portabletext/react";
import { PortableText } from "@/components/ui/PortableText";

const meta = {
    title: "Sections/SectionContent",
    component: SectionContent,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {
        title: {
            control: "text",
            description: "Title of the section",
        },
        children: {
            control: "object",
            description: "Portable Text content blocks",
        },
        showBorder: {
            control: "boolean",
            description: "Whether to show a border under the title",
        },
        background: {
            control: "select",
            options: ["blue", "purple", "green", "pink", "yellow", "teal"],
            description: "Background color of the section",
        },
        border: {
            control: "boolean",
            description: "Whether to show a border around the section",
        },
        maxWidth: {
            control: "select",
            options: ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"],
            description: "Maximum width of the content",
        },
    },
} satisfies Meta<typeof SectionContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultContent: PortableTextBlock[] = [
    {
        _type: 'block',
        style: 'normal',
        children: [
            {
                _type: 'span',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
        ],
    },
    {
        _type: 'block',
        style: 'normal',
        children: [
            {
                _type: 'span',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
        ],
    },
];

export const Default: Story = {
    args: {
        title: "Section Title",
        children: <PortableText content={defaultContent} />,
    },
};

export const WithBorder: Story = {
    args: {
        ...Default.args,
        showBorder: true,
    },
};

export const WithBackground: Story = {
    args: {
        ...Default.args,
        background: "blue",
    },
};

export const WithBackgroundAndBorder: Story = {
    args: {
        ...Default.args,
        background: "blue",
        border: true,
    },
};

export const NoTitle: Story = {
    args: {
        children: <PortableText content={defaultContent} />,
    },
};

export const CustomMaxWidth: Story = {
    args: {
        ...Default.args,
        maxWidth: "xl",
    },
}; 