"use server";

import { Article } from "@/types/article";
import { sql } from "@vercel/postgres";

export async function addToReadingList(article: Article) {
	console.log(`Adding ${article.title} to reading list`);
	await sql`
	INSERT INTO readinglist (user_id, article_id, added_at)
	VALUES 
	(1, ${article.article_id}, CURRENT_TIMESTAMP);`;
}
