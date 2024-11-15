"use server";
import { sql } from "@vercel/postgres";

export async function createTables() {
	try {

        		await sql`
            CREATE TABLE IF NOT EXISTS RSSFeeds (
                feed_id VARCHAR(255) PRIMARY KEY,
                feed_url VARCHAR(255) NOT NULL,
                feed_name VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

						await sql`
            CREATE TABLE IF NOT EXISTS Articles (
                article_id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                link VARCHAR(255) NOT NULL,
                image_link VARCHAR(255) NOT NULL,
                published_at TIMESTAMP NOT NULL,
                keyword VARCHAR(255) NOT NULL,
                feed_id VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (feed_id) REFERENCES RSSFeeds(feed_id)
            );
        `;

		await sql`
            CREATE TABLE IF NOT EXISTS ReadingList (
                reading_list_id SERIAL PRIMARY KEY,
                user_id VARCHAR(255) NOT NULL,
                article_id VARCHAR(255) NOT NULL,
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (article_id) REFERENCES Articles(article_id)
            );
        `;

		await sql`
            CREATE TABLE IF NOT EXISTS UserArticles (
                user_id VARCHAR(255) NOT NULL,
                article_id VARCHAR(255) NOT NULL,
                seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, article_id),
                FOREIGN KEY (article_id) REFERENCES Articles(article_id)
            );
        `;

		await sql`
                CREATE TABLE UserPreferences (
                    user_id VARCHAR(255) NOT NULL,
                    sports BOOLEAN NOT NULL DEFAULT FALSE,
                    politics BOOLEAN NOT NULL DEFAULT FALSE,
                    uk BOOLEAN NOT NULL DEFAULT FALSE,
                    technology BOOLEAN NOT NULL DEFAULT FALSE,
                    science BOOLEAN NOT NULL DEFAULT FALSE,
                    entertainment BOOLEAN NOT NULL DEFAULT FALSE,
                    business BOOLEAN NOT NULL DEFAULT FALSE,
                    health BOOLEAN NOT NULL DEFAULT FALSE,
                    PRIMARY KEY (user_id)
                );
            `;

		console.log("Tables created successfully");
	} catch (err) {
		console.error("Error creating tables:", err);
	}
}
