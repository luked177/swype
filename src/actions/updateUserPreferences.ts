"use server";
import { UserPrefs } from "@/types/userPrefs";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";

export const updateUserPreferences = async (userPrefs: UserPrefs) => {
	try {
		const { userId } = await auth();
		await sql`
            INSERT INTO UserPreferences (user_id, sports, politics, uk, technology, science, entertainment, business, health)
            VALUES (${userId}, ${userPrefs.sports}, ${userPrefs.politics}, ${userPrefs.uk}, ${userPrefs.technology}, ${userPrefs.science}, ${userPrefs.entertainment}, ${userPrefs.business}, ${userPrefs.health})
            ON CONFLICT (user_id)
            DO UPDATE SET
                sports = EXCLUDED.sports,
                politics = EXCLUDED.politics,
                uk = EXCLUDED.uk,
                technology = EXCLUDED.technology,
                science = EXCLUDED.science,
                entertainment = EXCLUDED.entertainment,
                business = EXCLUDED.business,
                health = EXCLUDED.health;
            `;
		return "User prefs updated succesfully";
	} catch {
		return "User prefs failed to update";
	}
};
