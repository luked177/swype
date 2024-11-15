export const userPrefs = ["sports", "politics", "uk", "technology", "science", "entertainment", "business", "health"] as const;

export type PrefOptions = (typeof userPrefs)[number];
export type UserPrefs = Record<PrefOptions, boolean>;
