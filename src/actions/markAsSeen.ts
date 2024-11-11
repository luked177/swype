"use server";

import { Article } from "@/types/article";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";

export const markAsSeen = async (article: Article) => {
	const { userId } = await auth();
	try {
		await sql`INSERT INTO UserArticles (user_id, article_id) VALUES (${userId}, ${article.article_id});`;
		console.log(`Added ${article.title} to seen list`);
	} catch {
		console.log(`Error adding ${article.title} to seen list`);
	}
};
