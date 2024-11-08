"use server";

import { Article } from "@/types/article";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";

export async function addToReadingList(article: Article) {
	const { userId } = await auth();
	const { rowCount } = await sql`SELECT 1 FROM readinglist WHERE user_id = ${userId} AND article_id = ${article.article_id};`;
	console.log(rowCount);
	if (rowCount && rowCount > 0) return console.log("Article already exists in reading list");
	console.log(`Adding ${article.title} to reading list`);
	await sql`
	INSERT INTO readinglist (user_id, article_id, added_at)
	VALUES 
	(${userId}, ${article.article_id}, CURRENT_TIMESTAMP);`;
}
