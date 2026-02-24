import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({subsets:["latin"]});

export const metadata = {
  title: "Fintrack AI",
  description: "AI Finance platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* header */}
          <Header></Header>
          <main className="min-h-screen">{children}</main>
          <Toaster richColors/>
          {/* footer */}
          <footer className="bg-blue-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
              <p>Major Project 2026</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
          </ClerkProvider>
  );
}
