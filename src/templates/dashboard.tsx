import { addToReadingList } from "@/actions/addToReadingList";
import { ArticleCard } from "@/components/blocks/articleCard";
import { Deck } from "@/components/ui/deck";
import { Article, Articles } from "@/types/article";
import { sql } from "@vercel/postgres";

export const Dashboard = async () => {
	const { rows: articles }: { rows: Articles } = await sql`SELECT * FROM ARTICLES`;
	return (
		<div className="p-8 h-full place-items-center max-h-full overflow-hidden">
			<Deck
				items={articles.map((a: Article) => ({
					id: a.article_id,
					content: <ArticleCard article={a} />,
					data: a,
				}))}
				onRightSwipe={addToReadingList}
			/>
		</div>
	);
};
