import { AddRSSFeed } from "@/components/blocks/addRSSFeed";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RSSFeed } from "@/types/rssfeed";
import { sql } from "@vercel/postgres";
import { Rss, Trash2 } from "lucide-react";

export default async function Page() {
	const { rows: feeds }: { rows: RSSFeed[] } = await sql`SELECT * FROM RSSFeeds`;
	return (
		<div className="p-4">
			<div className="flex justify-between">
				<h1 className="text-3xl font-bold mb-6">RSS Feeds</h1>
				<AddRSSFeed />
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>URL</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{feeds.map((feed) => (
						<TableRow key={feed.id}>
							<TableCell className="font-medium">
								<div className="flex items-center space-x-2">
									<Rss className="h-4 w-4" />
									<span>{feed.title}</span>
								</div>
							</TableCell>
							<TableCell>
								<a href={feed.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
									{feed.url}
								</a>
							</TableCell>
							<TableCell>
								<form>
									<Button type="submit" variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
										<Trash2 className="h-4 w-4" />
										<span className="sr-only">Delete {feed.title}</span>
									</Button>
								</form>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
