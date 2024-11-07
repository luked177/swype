import { ArticleCard } from "@/components/ui/articleCard";
import { Deck } from "@/components/ui/deck";
import { articles } from "@/mock/articles";

const getArticles = async () => {
	await setTimeout(() => {}, 1000);
	return articles;
};

export default async function Home() {
	const articles = await getArticles();
	return (
		<div className="p-8 h-full place-items-center max-h-full overflow-hidden">
			<Deck
				items={articles.map((a) => ({
					id: a.id,
					content: <ArticleCard article={a} />,
					data: a,
				}))}
			/>
		</div>
	);
}
