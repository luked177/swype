"use server";

import { Article } from "@/types/article";
import { generateObject } from "ai";
import { azure } from "@ai-sdk/azure";
import { userPrefs } from "@/types/userPrefs";

export const summariseArticle = async (article: Article) => {
	const { object: summary } = await generateObject({
		model: azure("gpt-4"),
		output: "enum",
		enum: [...userPrefs],
		prompt: `Classify the keyword for this article: Title - ${article.title}, Description - ${article.description}`,
	});

	return summary;
};
