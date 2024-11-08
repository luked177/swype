import { Dashboard } from "@/pages/dashboard";
import { LandingPage } from "@/pages/landingpage";
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
