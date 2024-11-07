import { sql } from "@vercel/postgres";

export async function seedMockArticles() {
	try {
		await sql`
    INSERT INTO Articles (title, description, link, image_link, published_at)
    VALUES
    ('The Rise of AI in Everyday Life', 'Exploring how artificial intelligence is becoming a part of our daily routines and its impact on various industries.', 'https://example.com/ai-everyday-life', 'https://picsum.photos/600', NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 2)),
    ('Sustainable Energy Solutions', 'An in-depth look at the latest advancements in sustainable energy and how they are shaping our future.', 'https://example.com/sustainable-energy', 'https://picsum.photos/600', NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 2)),
    ('The Future of Space Exploration', 'A comprehensive guide to upcoming space missions and the quest to explore the final frontier.', 'https://example.com/space-exploration', 'https://picsum.photos/600', NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 2)),
    ('Health and Wellness Trends', 'Discover the latest trends in health and wellness, from new fitness regimes to mental health practices.', 'https://example.com/health-wellness', 'https://picsum.photos/600', NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 2)),
    ('Innovations in Education', 'How technology is transforming education and the innovative methods being used to enhance learning.', 'https://example.com/education-innovations', 'https://picsum.photos/600', NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 2));
    `;
		console.log("Articles seeded with mock articles");
	} catch {
		console.log("Error seeding DB");
	}
}
