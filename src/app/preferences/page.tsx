import { updateUserPreferences } from "@/actions/updateUserPreferences";
import UserPreferences from "@/components/blocks/userPreferences";
import { UserPrefs } from "@/types/userPrefs";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";

export default async function Page() {
	const { userId } = await auth();
	const { rows: userPrefsResult }: { rows: UserPrefs[] } = await sql`SELECT sports, politics, uk, technology, science, entertainment, business, health FROM UserPreferences WHERE user_id = ${userId}`;
	const userPrefs = userPrefsResult[0];

	return (
		<div className="p-4">
			<h1 className="text-3xl font-bold mb-6">Preferences</h1>
			<UserPreferences userPrefs={userPrefs} updateUserPrefs={updateUserPreferences} />
		</div>
	);
}
