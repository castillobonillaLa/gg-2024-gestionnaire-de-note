import { getUser } from "@/lib/auth";
import { Lilita_One } from "next/font/google";
import UserButton from "./UserButton";
import NewNoteButton from "./NewNoteButton";
import Link from "next/link"; // Add Link

const lilita = Lilita_One({ weight: "400", subsets: ["latin"] });

async function Header({ isArchivePage }: { isArchivePage: boolean }) {
    const user = await getUser();

    return (
        <div className="bg-popover relative mt-2 flex h-20 w-full max-w-5xl items-center justify-between rounded-lg px-4">
            <UserButton user={user} />

            <h1 className={`text-secondary text-4xl sm:text-5xl ${lilita.className}`}>
                {isArchivePage ? "Archived Notes" : "Fire Notes"}
            </h1>

            <div className="flex gap-4">
                <NewNoteButton />
                <Link href={isArchivePage ? "/" : "/archive"}>
                    <button className="text-primary hover:text-secondary">
                        {isArchivePage ? "Go to Active Notes" : "Go to Archive"}
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Header;
