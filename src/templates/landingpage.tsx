import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SignInButton } from "@clerk/nextjs";
import { ArrowRight, Zap, Smartphone, Newspaper } from "lucide-react";

export const LandingPage = () => (
	<div className="flex min-h-screen flex-col">
		<main className="flex flex-1 flex-col">
			<section className="flex flex-grow items-center justify-center w-full py-8 md:py-12 lg:py-16">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center gap-4 text-center">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">Your News, Your Way</h1>
							<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Swype through personalized news stories with our innovative reading experience. Stay informed with just a flick.</p>
						</div>
						<div className="pt-4">
							<SignInButton>
								<Button>
									Get Started
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</SignInButton>
						</div>
					</div>
				</div>
			</section>
			<section className="flex flex-grow items-center w-full py-8 md:py-12 lg:py-16 bg-secondary">
				<div className="container px-4 md:px-6">
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<Card className="flex flex-col items-center space-y-4 p-6">
							<Zap className="h-12 w-12" />
							<h3 className="text-xl font-bold">Lightning Fast</h3>
							<p className="text-center text-muted-foreground">Get your news instantly with our optimized reading experience.</p>
						</Card>
						<Card className="flex flex-col items-center space-y-4 p-6">
							<Smartphone className="h-12 w-12" />
							<h3 className="text-xl font-bold">Mobile First</h3>
							<p className="text-center text-muted-foreground">Designed for the way you use your phone.</p>
						</Card>
						<Card className="flex flex-col items-center space-y-4 p-6">
							<Newspaper className="h-12 w-12" />
							<h3 className="text-xl font-bold">Curated Content</h3>
							<p className="text-center text-muted-foreground">Personalized news feed that learns from your preferences.</p>
						</Card>
					</div>
				</div>
			</section>
			<section className="flex flex-grow items-center justify-center w-full py-8 md:py-12 lg:py-16">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to start reading?</h2>
							<p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">Join thousands of readers who are already enjoying a better way to consume news.</p>
						</div>
						<div className="pt-4">
							<SignInButton>
								<Button size="lg">
									Sign Up Now
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</SignInButton>
						</div>
					</div>
				</div>
			</section>
		</main>
	</div>
);
