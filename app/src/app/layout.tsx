import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelAI — Create Stunning Images with Just a Prompt",
  description:
    "Turn your ideas into high-quality visuals in seconds using AI. No design skills needed. Lightning-fast generation, multiple styles, high-resolution downloads.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
