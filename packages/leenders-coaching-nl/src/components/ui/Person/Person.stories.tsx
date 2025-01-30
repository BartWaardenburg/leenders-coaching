import type { Meta, StoryObj } from "@storybook/react";
import { Person } from "./Person";

const meta = {
    title: "UI/Person",
    component: Person,
    tags: ["autodocs"],
} satisfies Meta<typeof Person>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: "John Doe",
        description: "Software Engineer",
        imageSrc: "https://i.pravatar.cc/300",
    },
};

export const WithoutDescription: Story = {
    args: {
        name: "Jane Smith",
        imageSrc: "https://i.pravatar.cc/300?2",
    },
};

export const LongDescription: Story = {
    args: {
        name: "Alex Johnson",
        description: "Senior Marketing Director & Brand Strategy Consultant",
        imageSrc: "https://i.pravatar.cc/300?3",
    },
}; 