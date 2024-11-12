import { seedArticles } from "@/db/seedArticles";

export async function GET() {
	try {
		await seedArticles();
		return new Response("Succesfully updated articles", { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response("Failed to update articles", { status: 500 });
	}
}
