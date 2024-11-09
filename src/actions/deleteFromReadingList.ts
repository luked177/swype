"use server";

import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function deleteFromReadingList(article: FormData) {
	const id = article.get("id") as string;
	const title = article.get("title") as string;
	if (!id) return console.log("No Article ID passed so cannot remove");
	const { userId } = await auth();
	const { rowCount } = await sql`SELECT 1 FROM readinglist WHERE user_id = ${userId} AND article_id = ${id};`;
	if (!rowCount) return console.log(`Couldn't find article ${title}`);
	console.log(`Deleting ${title} from reading list`);
	await sql`DELETE FROM readinglist WHERE user_id = ${userId} AND article_id = ${id}`;
	revalidatePath("/readinglist");
}
