import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { ToastProvider, useToast } from "./ToastManager";
import type { ModalVariant } from "../Modal/Modal";

const ToastDemo = () => {
    const toast = useToast();
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        if (!hasShown) {
            setHasShown(true);
            toast.show("Default toast message", {
                variant: "blue",
                duration: 3000
            });
        }
    }, [toast, hasShown]);

    return (
        <div className="p-4">
            <button
                onClick={() => {
                    toast.show("Clicked toast message", {
                        variant: "purple",
                        duration: 3000
                    });
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
                Show another toast
            </button>
        </div>
    );
};

const meta = {
    title: "UI/Toast",
    parameters: {
        layout: "fullscreen",
    },
    decorators: [
        (Story) => (
            <ToastProvider>
                <Story />
            </ToastProvider>
        ),
    ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <ToastDemo />,
};

export const Interactive: Story = {
    render: () => {
        const toast = useToast();

        return (
            <div className="p-4 space-y-4">
                <h1 className="text-2xl font-bold">Toast Demo</h1>
                <div className="flex flex-wrap gap-4">
                    {(["blue", "purple", "green", "pink", "yellow", "teal"] as ModalVariant[]).map((variant) => (
                        <button
                            key={variant}
                            onClick={() =>
                                toast.show(`This is a ${variant} toast message`, {
                                    variant,
                                    duration: 3000,
                                })
                            }
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                        >
                            Show {variant} toast
                        </button>
                    ))}
                    <button
                        onClick={() =>
                            toast.show("This toast won't auto-dismiss", {
                                variant: "purple",
                                showCloseButton: true,
                            })
                        }
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                    >
                        Show persistent toast
                    </button>
                </div>
            </div>
        );
    },
}; 