import { summariseArticle } from "@/actions/summariseArticle";
import { Article, Articles } from "@/types/article";
import { BBCRssRes } from "@/types/feedResponse";
import { RSSFeed } from "@/types/rssfeed";
import { sql } from "@vercel/postgres";
import { parseStringPromise } from "xml2js";

const parseFeed = async (feedUrl: string, feedId: string) => {
	const feedRes = await fetch(feedUrl);
	const parsedXml = await parseStringPromise(await feedRes.text());
	const articles: Articles = parsedXml.rss.channel[0].item.map(
		(item: BBCRssRes) =>
			({
				title: item.title[0],
				description: item.description[0],
				link: item.link[0],
				image_link: item["media:thumbnail"][0].$.url,
				article_id: item.link[0].split("/").at(-1) ?? crypto.randomUUID(),
				published_at: item.pubDate[0],
				feed_id: feedId,
			} satisfies Article),
	);
	return articles;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const seedArticles = async () => {
	const { rows: feeds }: { rows: RSSFeed[] } = await sql`SELECT * FROM RSSFeeds`;

	for (const feed of feeds) {
		const articles = await parseFeed(feed.feed_url, feed.feed_id);
		const allArticles = articles.sort(() => Math.random() - 0.5);

		for (const article of allArticles) {
			const keyword = await summariseArticle(article);
			await sql`
                INSERT INTO Articles (article_id, title, description, link, image_link, published_at, feed_id, keyword)
                VALUES (${article.article_id}, ${article.title}, ${article.description}, ${article.link}, ${article.image_link}, ${article.published_at}, ${article.feed_id}, ${keyword})
                ON CONFLICT (article_id) DO NOTHING;
            `;
			await delay(5000);
		}

		console.log(`Articles from feed ${feed.feed_id} inserted successfully`);
		await delay(60000);
	}
};
