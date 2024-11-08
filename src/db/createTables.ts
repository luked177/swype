import { sql } from "@vercel/postgres";

export async function createTables() {
	try {
		await sql`
            CREATE TABLE IF NOT EXISTS Articles (
                article_id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                link VARCHAR(255) NOT NULL,
                image_link VARCHAR(255) NOT NULL,
                published_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

		await sql`
            CREATE TABLE IF NOT EXISTS ReadingList (
                reading_list_id SERIAL PRIMARY KEY,
                user_id VARCHAR(255) NOT NULL,
                article_id INT NOT NULL,
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (article_id) REFERENCES Articles(article_id)
            );
        `;

		console.log("Tables created successfully");
	} catch (err) {
		console.error("Error creating tables:", err);
	}
}

createTables();
