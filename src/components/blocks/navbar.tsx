"use client";

import { Book, Home, Rss, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "../ui/button";

export const NavBar = ({ showRssFeeds }: { showRssFeeds: boolean }) => {
	const path = usePathname();
	return (
		<nav className="sticky bottom-0 border-t bg-background">
			<div className="mx-auto flex max-w-md justify-around">
				<Link className={clsx("py-2", path === "/readinglist" ? "text-primary" : "text-muted-foreground")} href={"/readinglist"}>
					<Button variant="ghost" className="flex-1 flex-col items-center justify-center" tabIndex={-1}>
						<Book className="h-6 w-6" />
						<span className="text-xs">Reading List</span>
					</Button>
				</Link>
				<Link className={clsx("py-2", path === "/" ? "text-primary" : "text-muted-foreground")} href={"/"}>
					<Button variant="ghost" className="flex-1 flex-col items-center justify-center" tabIndex={-1}>
						<Home className="h-6 w-6" />
						<span className="text-xs">Home</span>
					</Button>
				</Link>
				<Link className={clsx("py-2", path === "/preferences" ? "text-primary" : "text-muted-foreground")} href={"/preferences"}>
					<Button variant="ghost" className="flex-1 flex-col items-center justify-center" tabIndex={-1}>
						<Settings className="h-6 w-6" />
						<span className="text-xs">Preferences</span>
					</Button>
				</Link>
				{showRssFeeds && (
					<Link className={clsx("py-2", path === "/feeds" ? "text-primary" : "text-muted-foreground")} href={"/feeds"}>
						<Button variant="ghost" className="flex-1 flex-col items-center justify-center" tabIndex={-1}>
							<Rss className="h-6 w-6" />
							<span className="text-xs">RSS Feeds</span>
						</Button>
					</Link>
				)}
			</div>
		</nav>
	);
};
