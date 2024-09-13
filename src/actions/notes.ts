"use server";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { notes } from "@/db/schemas/notes"; // Import your notes schema
import { eq } from "drizzle-orm"; // For filtering

// Initialize the Postgres client with the connection string
const client = postgres(process.env.DB_CONNECTION_STRING!);
const db = drizzle(client);

// Fetch archived notes
export const getArchivedNotes = async () => {
    try {
        return await db
            .select()
            .from(notes)
            .where(eq(notes.is_archived, true)); // Fetch only archived notes
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching archived notes:", error.message);
        } else {
            console.error("Unknown error fetching archived notes:", error);
        }
        return [];
    }
};

// Add new note
export const addNewNoteAction = async (text: string, userId: string) => {
    try {
        await db
            .insert(notes)
            .values({
                text,
                user_id: userId,
                is_archived: false, // Default new notes to unarchived
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        return { errorMessage: null };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error adding new note:", error.message);
            return { errorMessage: error.message };
        } else {
            console.error("Unknown error adding new note:", error);
            return { errorMessage: "Unknown error occurred." };
        }
    }
};

// Toggle archive status for a note
export const toggleArchiveNoteAction = async (noteId: number, isArchived: boolean) => {
    try {
        await db
            .update(notes)
            .set({ is_archived: isArchived })
            .where(eq(notes.id, noteId));
        return { errorMessage: null };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error archiving/unarchiving note:", error.message);
            return { errorMessage: error.message };
        } else {
            console.error("Unknown error archiving/unarchiving note:", error);
            return { errorMessage: "Unknown error occurred." };
        }
    }
};

// Export the database instance for other parts of the app
export default db;
