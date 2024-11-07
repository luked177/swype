import Image from "next/image";
import { Card, CardContent } from "./card";
import { Article } from "@/types/article";

export const ArticleCard = ({ article }: { article: Article }) => {
	return (
		<Card className="w-full h-full max-w-sm mx-auto overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
			<div className="grid grid-rows-[1fr_1fr_min-content] h-full">
				<div className="relative row-span-2">
					<Image src={article.imageLink} alt={article.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
				</div>
				<CardContent className="p-6 flex flex-col justify-between h-fit min-h-48">
					<div>
						<h2 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h2>
						<p className="text-sm text-muted-foreground mb-3 line-clamp-4">{article.description}</p>
					</div>
				</CardContent>
			</div>
		</Card>
	);
};
