"use client";

import { Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useQueryState } from "nuqs";

export const SearchBar = () => {
	const [search, setSearch] = useQueryState("search", {
		shallow: false,
	});
	return (
		<div className="relative mb-6">
			<Input type="text" placeholder="Search articles..." value={search ?? ""} onChange={(e) => setSearch(e.target.value)} className="pl-10 pr-10" />
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
			{search && (
				<Button variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0" onClick={() => setSearch(null)}>
					<X className="h-4 w-4" />
					<span className="sr-only">Clear search</span>
				</Button>
			)}
		</div>
	);
};
