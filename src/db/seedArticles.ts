import { Article, Articles } from "@/types/article";
import { BBCRssRes } from "@/types/feedResponse";
import { sql } from "@vercel/postgres";
import { parseStringPromise } from "xml2js";

export const seedArticles = async () => {
	const feedRes = await fetch("https://feeds.bbci.co.uk/news/england/rss.xml");
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
			} satisfies Article),
	);

	const articleInserts = articles.map((a) => {
		return sql`
	    INSERT INTO Articles (article_id, title, description, link, image_link, published_at)
	    VALUES (${a.article_id}, ${a.title}, ${a.description}, ${a.link}, ${a.image_link}, ${a.published_at})
	    ON CONFLICT (article_id) DO NOTHING;
	    `;
	});

	await Promise.all(articleInserts);

	console.log("Articles inserted successfully");
};
