import { Avatar, AvatarFallback, AvatarImage } from "./avatar";


export const Header = () => {
    return <header className="flex h-16 items-center justify-between border-b bg-background px-6">
			<div className="flex items-center gap-2">
				<div className="h-8 w-8 rounded-full bg-primary" />
				<span className="text-lg font-semibold">Swype</span>
			</div>
			<Avatar>
				<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
				<AvatarFallback>LD</AvatarFallback>
			</Avatar>
		</header>;
}