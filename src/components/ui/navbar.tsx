"use client";
import { Book, Home, Settings } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const NavBar = () => {
	const path = usePathname();
	return (
		<nav className="border-t bg-background content-end">
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
			</div>
		</nav>
	);
};
