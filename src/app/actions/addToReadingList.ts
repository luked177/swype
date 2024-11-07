"use server";

import { Article } from "@/types/article";

export async function addToReadingList(article: Article) {
	console.log(`Adding ${article.title} to reading list`);
}
