"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { toggleArchiveNoteAction } from "@/actions/notes";

type ArchiveButtonProps = {
    noteId: number;
    isArchived: boolean;
};

function ArchiveButton({ noteId, isArchived }: ArchiveButtonProps) {
    const router = useRouter();

    const handleArchive = async () => {
        const toastId = toast.loading(isArchived ? "Unarchiving note..." : "Archiving note...");

        // Call the toggle action to archive/unarchive the note
        const result = await toggleArchiveNoteAction(noteId, !isArchived);

        if (!result.errorMessage) {
            toast.success(isArchived ? "Note unarchived!" : "Note archived!");
            router.refresh(); // Refresh the page after archiving/unarchiving
        } else {
            toast.error(result.errorMessage);
        }

        toast.dismiss(toastId);
    };

    return (
        <button onClick={handleArchive} className="text-primary hover:text-secondary">
            {isArchived ? "Unarchive" : "Archive"}
        </button>
    );
}

export default ArchiveButton;
