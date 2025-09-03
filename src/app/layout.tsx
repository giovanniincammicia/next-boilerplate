import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { ErrorHandler } from "@/components/error-handler";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	description: "Next Boilerplate",
	title: "Next Boilerplate",
};

export default async function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ErrorHandler />
				<ThemeProvider>{children}</ThemeProvider>
				<Toaster richColors />
			</body>
		</html>
	);
}
