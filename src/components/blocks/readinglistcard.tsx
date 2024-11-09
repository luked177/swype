"use client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { BookOpen, Trash2 } from "lucide-react";
import { Article } from "@/types/article";
import { deleteFromReadingList } from "@/actions/deleteFromReadingList";

interface ReadingListCardProps {
	article: Article;
}

export const ReadingListCard = ({ article }: ReadingListCardProps) => (
	<Card key={article.article_id} className="flex flex-col h-full">
		<div className="relative h-48 md:h-60">
			<Image src={article.image_link} alt={article.title} fill className="object-cover rounded-t-lg" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
		</div>
		<CardContent className="flex flex-col flex-grow p-4">
			<h2 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h2>
			<p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
			<div className="mt-auto flex justify-between items-center">
				<div className="flex space-x-2">
					<Link href={article.link} target="_blank" rel="noopener noreferrer">
						<Button variant="outline" className="flex items-center">
							<BookOpen className="mr-2 h-4 w-4" />
							Read Article
						</Button>
					</Link>
					<form action={deleteFromReadingList}>
						<input type="hidden" name="id" value={article.article_id} />
						<input type="hidden" name="title" value={article.title} />
						<Button
							type="submit"
							variant="outline"
							className="flex items-center text-destructive hover:bg-destructive hover:text-destructive-foreground"
							aria-label={`Remove ${article.title} from reading list`}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</form>
				</div>
				<span className="text-sm text-gray-500">ID: {article.article_id}</span>
			</div>
		</CardContent>
	</Card>
);
