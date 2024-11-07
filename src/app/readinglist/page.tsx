import { Articles } from "@/types/article";
import { sql } from "@vercel/postgres";

export default async function Page() {
	const { rows: articles }: { rows: Articles } = await sql`
                      SELECT a.article_id, a.title, a.description, a.link, a.image_link, a.published_at, a.created_at, a.updated_at
                      FROM Articles a
                      JOIN ReadingList rl ON a.article_id = rl.article_id
                      WHERE rl.user_id = 1;
                    `;
	return (
		<>
			<p>Reading List</p>
			{articles.map((a) => (
				<p key={a.article_id}>{a.title}</p>
			))}
		</>
	);
}
