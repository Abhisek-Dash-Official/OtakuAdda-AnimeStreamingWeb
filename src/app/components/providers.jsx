"use client";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";

export default function Providers({ children }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <NextTopLoader />
        {children}
      </ThemeProvider>
    </>
  );
}
