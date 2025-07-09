import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Inter, Fira_Code} from "next/font/google";
import { ResponsiveProvider } from "@/context/ResponsiveContext";
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
  title: "Tomás Santander | FullStack Developer Portfolio",
  description:
    "Explore Tomás Santander's portfolio – a skilled FullStack Developer specializing in Next.js, React, and modern web technologies. Showcasing innovative projects, UI/UX expertise, and high-performance web applications.",
  keywords: [
    "FullStack Developer",
    "Next.js Developer",
    "React Developer",
    "Tomás Santander Portfolio",
    "Web Development",
    "UI/UX Design",
    "JavaScript",
    "TypeScript",
    "Modern Web Technologies",
  ],
  openGraph: {
    title: "Tomás Santander | FullStack Developer Portfolio",
    description:
      "Discover Tomás Santander's expertise in FullStack Development, React, and Next.js. View projects, case studies, and technical skills.",
    url: "https://kinhdev.id.vn",
    type: "website",
    images: [
      {
        url: "https://voocgavdbpy2gucg.public.blob.vercel-storage.com/open-graph-6fkPvt3jl60AhDWy2pPhfp3PKoZPrZ.png",
        width: 1200,
        height: 630,
        alt: "Tomás Santander - FullStack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomás Santander | FullStack Developer Portfolio",
    description:
      "Explore Tomás Santander's frontend projects and expertise in React, Next.js, and modern web development.",
    images: [
      "https://voocgavdbpy2gucg.public.blob.vercel-storage.com/open-graph-6fkPvt3jl60AhDWy2pPhfp3PKoZPrZ.png",
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased flex flex-col scroll-smooth`}
      >
        <ThemeProvider 
            attribute="class"
            defaultTheme="dark"
            >
              <ResponsiveProvider>
                {children}
              </ResponsiveProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
