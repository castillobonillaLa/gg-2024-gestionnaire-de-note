import Header from "@/components/header";
import Note from "@/components/Note";
import db from "@/db";
import { notes } from "@/db/schemas/notes";
import { getUser } from "@/lib/auth";
import { and, desc, eq } from "drizzle-orm";

export default async function Archive() {
    const user = await getUser();

    // Use 'user_id' and 'is_archived' as per the updated schema
    const _notes = await db
        .select()
        .from(notes)
        .where(and(eq(notes.user_id, user.id), eq(notes.is_archived, true))) // Correct column names
        .orderBy(desc(notes.updatedAt));

    return (
        <main className="flex min-h-screen flex-col items-center px-4 pb-24">
            <Header isArchivePage={true} />

            <div className="mt-8 grid w-full max-w-[1800px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {_notes.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </div>
        </main>
    );
}
