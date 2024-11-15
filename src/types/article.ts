export type Article = {
	title: string;
	description: string;
	link: string;
	image_link: string;
	article_id: string;
	published_at: string;
	feed_id: string;
};

export type Articles = Article[]