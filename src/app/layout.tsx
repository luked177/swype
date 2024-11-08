import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { NavBar } from "@/components/ui/navbar";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Swype",
	description: "Easy news reading lists",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-dvh max-h-dvh grid grid-rows-layout overflow-auto`}>
					<Header />
					{children}
					<SignedIn>
						<NavBar />
					</SignedIn>
				</body>
			</html>
		</ClerkProvider>
	);
}
