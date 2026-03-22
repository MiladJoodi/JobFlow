import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobFlow - Find Your Dream Job",
  description:
    "Discover thousands of job opportunities at top companies. Search, apply, and track your applications all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              borderRadius: "12px",
              padding: "16px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
