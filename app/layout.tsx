import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Inter, Fira_Code} from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portafolio - Tomas Santander",
  description: "Portafolio web personal de Tomas Santander",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased flex flex-col`}
      >
        <ThemeProvider 
            attribute="class"
            defaultTheme="dark"
            >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
