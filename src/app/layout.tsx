import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Recommender",
  description: "Find your next favorite book!",
};

const Navbar = () => {
  return (
    <nav className="flex h-16 w-full justify-end rounded-b-sm bg-orange-100 px-8">
      <div className="flex h-full items-center justify-between">
        <ul className="flex justify-end gap-x-2 text-teal-950">
          <li>
            <Link
              className="rounded-lg px-2 py-1 hover:text-blue-400"
              href="/explore"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              className="rounded-lg px-2 py-1 hover:text-blue-400"
              href="/library"
            >
              My Library
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-dvh bg-orange-100`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
