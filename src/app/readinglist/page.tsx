import { ReadingListCard } from "@/components/blocks/readinglistcard";
import { SearchBar } from "@/components/blocks/searchbar";
import { Articles } from "@/types/article";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";

export default async function Page(props: {
	searchParams?: Promise<{
		search?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const { userId } = await auth();
	const { rows: articles }: { rows: Articles } = await sql`
                      SELECT a.article_id, a.title, a.description, a.link, a.image_link, a.published_at, a.created_at, a.updated_at
                      FROM Articles a
                      JOIN ReadingList rl ON a.article_id = rl.article_id
                      WHERE rl.user_id = ${userId} AND a.title ILIKE '%' || ${searchParams?.search ?? ""} || '%';;
                    `;
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Your Reading List</h1>
			<SearchBar />
			{articles.length === 0 ? (
				<p className="text-center text-gray-500 mt-8">No articles found.</p>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{articles.map((article) => (
						<ReadingListCard article={article} key={article.article_id} />
					))}
				</div>
			)}
		</div>
	);
}
