"use client";
import { Dispatch, SetStateAction, useTransition } from "react";
import { Button } from "./ui/button";
import { DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import toast from "react-hot-toast";
import { addNewNoteAction } from "@/actions/notes";
import { getUser } from "@/lib/auth"; // Adjust this import based on your auth logic

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
};

function NewNoteDialog({ setOpen }: Props) {
    const [isPending, startTransition] = useTransition();

    const handleAddNewNote = async (formData: FormData) => {
        startTransition(async () => {
            // Get user info (assuming a function `getUser()` is available)
            const user = await getUser();
            const userId = user?.id;

            if (!userId) {
                toast.error("User is not authenticated");
                return;
            }

            const text = formData.get("text") as string;

            // Ensure that text is not empty
            if (!text) {
                toast.error("Note cannot be empty");
                return;
            }

            const { errorMessage } = await addNewNoteAction(text, userId);

            if (!errorMessage) {
                setOpen(false);
                toast.success("Successfully added note");
            } else {
                toast.error(errorMessage);
            }
        });
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>Add New Note</DialogHeader>

            <form action={handleAddNewNote}>
                <Textarea
                    id="text"
                    name="text"
                    disabled={isPending}
                    className="mb-6 mt-2 min-h-[300px]"
                />

                <DialogFooter>
                    <Button
                        type="submit"
                        disabled={isPending}
                        variant={"secondary"}
                        className="w-40"
                    >
                        {isPending ? "Adding Note..." : "Add Note"}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}

export default NewNoteDialog;