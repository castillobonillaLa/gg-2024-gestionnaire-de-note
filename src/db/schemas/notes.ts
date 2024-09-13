import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const notes = pgTable('notes', {
    id: serial('id').primaryKey(),
    user_id: text('user_id').notNull(), // Keep the user_id column name consistent
    text: text('text'),
    is_archived: boolean('is_archived').default(false), // Rename to match Supabase column
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().$onUpdateFn(() => new Date()), // Corrected typo from "updedAt"
});

export type Note = typeof notes.$inferSelect;
