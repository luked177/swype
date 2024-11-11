import { addToReadingList } from "@/actions/addToReadingList";
import { markAsSeen } from "@/actions/markAsSeen";
import { ArticleCard } from "@/components/blocks/articleCard";
import { Deck } from "@/components/ui/deck";
import { Article, Articles } from "@/types/article";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";

export const Dashboard = async () => {
	const { userId } = await auth();
	const { rows: articles }: { rows: Articles } = await sql`SELECT * FROM Articles WHERE article_id NOT IN (SELECT article_id FROM UserArticles WHERE user_id = ${userId})`;
	return (
		<div className="p-8 h-full place-items-center max-h-full overflow-hidden">
			{articles.length > 0 ? (
				<Deck
					items={articles.map((a: Article) => ({
						id: a.article_id,
						content: <ArticleCard article={a} />,
						data: a,
					}))}
					onRightSwipe={addToReadingList}
					onRead={markAsSeen}
				/>
			) : (
				<p>You`&apos;`re all caught up!</p>
			)}
		</div>
	);
};
