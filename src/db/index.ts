import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { notes } from "./schemas/notes"; // Import your notes schema
import { eq } from "drizzle-orm"; // For query filters

// Initialize PostgreSQL client
const client = postgres(process.env.DB_CONNECTION_STRING!);
const db = drizzle(client);

// Function to get archived notes
export const getArchivedNotes = async () => {
    try {
        return await db
            .select()
            .from(notes)
            .where(eq(notes.is_archived, true)); // Use 'is_archived' as per your schema
    } catch (error) {
        console.error("Error fetching archived notes:", error);
        return [];
    }
};

// Export default db instance
export default db;
