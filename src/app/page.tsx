import { Dashboard } from "@/templates/dashboard";
import { LandingPage } from "@/templates/landingpage";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default async function Home() {
	return (
		<>
			<SignedIn>
				<Dashboard />
			</SignedIn>
			<SignedOut>
				<LandingPage />
			</SignedOut>
		</>
	);
}
