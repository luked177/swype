import { UserButton } from "@clerk/nextjs";

export const Header = () => {
	return (
		<header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-6 shadow-sm">
			<div className="flex items-center gap-2">
				<div className="h-8 w-8 rounded-full bg-primary" />
				<span className="text-lg font-semibold">Swype</span>
			</div>
			<UserButton />
		</header>
	);
};
