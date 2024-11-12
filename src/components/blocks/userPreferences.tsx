"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { PrefOptions, UserPrefs } from "@/types/userPrefs";
import { updateUserPreferences } from "@/actions/updateUserPreferences";

export default function UserPreferences({ userPrefs, updateUserPrefs }: { userPrefs: UserPrefs | undefined; updateUserPrefs: (userPrefs: UserPrefs) => ReturnType<typeof updateUserPreferences> }) {
	const [preferences, setPreferences] = useState<UserPrefs>(
		userPrefs ?? {
			sports: false,
			politics: false,
			uk: false,
			technology: false,
			science: false,
			entertainment: false,
			business: false,
			health: false,
		},
	);

	const handleToggle = (topic: PrefOptions) => {
		setPreferences((prev) => ({ ...prev, [topic]: !prev[topic] }));
	};

	const handleSave = async () => {
		const res = await updateUserPrefs(preferences);
		switch (res) {
			case "User prefs failed to update":
				toast({
					title: "Preferences failed to update",
					description: "Your topic preferences have failed to save. Please try again.",
				});
				break;

			case "User prefs updated succesfully":
				toast({
					title: "Preferences updated",
					description: "Your topic preferences have been saved successfully.",
				});
				break;
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>User Preferences</CardTitle>
				<CardDescription>Choose your preferred topics to personalize your feed.</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				{Object.entries(preferences).map(([topic, isEnabled]) => (
					<div key={topic} className="flex items-center justify-between">
						<Label>{capitalizeFirstLetter(topic)}</Label>
						<Switch checked={isEnabled} onCheckedChange={() => handleToggle(topic as PrefOptions)} />
					</div>
				))}
			</CardContent>
			<CardFooter>
				<Button onClick={handleSave}>Save Preferences</Button>
			</CardFooter>
		</Card>
	);
}

const capitalizeFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
