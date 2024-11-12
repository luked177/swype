"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function deleteRssFeed(feed: FormData) {
	const id = feed.get("id") as string;
	const title = feed.get("title") as string;
	if (!id) return console.log("No Feed ID passed so cannot remove");
	const { rowCount } = await sql`SELECT 1 FROM RSSFeeds WHERE feed_id = ${id};`;
	if (!rowCount) return console.log(`Couldn't find feed ${title}`);
	console.log(`Deleting ${title} from reading list`);
	await sql`DELETE FROM RSSFeeds WHERE feed_id = ${id}`;
	revalidatePath("/feeds");
}
