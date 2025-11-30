import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Inter, Fira_Code} from "next/font/google";
import { ResponsiveProvider } from "@/context/ResponsiveContext";
import NavBar from "@/components/Header/NavBar";
import AIAgentModal from "@/components/Agent/AgentModal";
import SmoothScroll from "@/components/ui/smooth-scroll";
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
    url: "https://tsantaanderdev.vercel.app",
    type: "website",
    images: [
      {
        url: "",
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
        className={`${inter.variable} ${firaCode.variable} antialiased flex flex-col`}
      >
        <ThemeProvider 
            attribute="class"
            defaultTheme="dark"
            >
              <SmoothScroll>
                <ResponsiveProvider>
                  <NavBar />
                  {children}
                  <AIAgentModal />
                </ResponsiveProvider>
              </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
