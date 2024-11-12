"use server";

import { AddRssFeedFormData } from "@/components/blocks/addRSSFeed";
import { RSSFeed } from "@/types/rssfeed";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const addRSSFeed = async (data: AddRssFeedFormData) => {
	try {
		const { rows: feeds }: { rows: RSSFeed[] } = await sql`SELECT * FROM RSSFeeds`;
		if (feeds.some((f) => f.feed_name.toLowerCase() === data.name.toLowerCase())) return "Name already exists";
		if (feeds.some((f) => f.feed_url.toLowerCase() === data.url.toLowerCase())) return "URL already exists";
		await sql`
            INSERT INTO RSSFeeds (feed_id, feed_url, feed_name)
            VALUES (${crypto.randomUUID()}, ${data.url}, ${data.name});
            `;
		revalidatePath("/preferences");
		return "Succesfully added";
	} catch {
		return "Failed to add RSS Feed";
	}
};
