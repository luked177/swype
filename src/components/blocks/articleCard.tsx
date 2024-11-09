import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Article } from "@/types/article";

export const ArticleCard = ({ article }: { article: Article }) => {
	return (
		<Card className="w-full h-full lg:max-w-none mx-auto overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
			<div className="grid grid-rows-[1fr_min-content] lg:grid-rows-1 lg:grid-cols-2 h-full">
				<div className="relative w-full h-full min-h-[200px]">
					<Image loading="eager" src={article.image_link} alt={article.title} fill className="object-cover" sizes="(max-width: 1023px) 100vw, 50vw" />
				</div>
				<CardContent className="p-6 flex flex-col-reverse justify-between h-full">
					<div>
						<h2 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h2>
						<p className="text-sm text-muted-foreground mb-3 lg:line-clamp-none">{article.description}</p>
					</div>
				</CardContent>
			</div>
		</Card>
	);
};
