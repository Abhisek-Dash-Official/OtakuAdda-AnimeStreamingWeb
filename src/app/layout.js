import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { ToastContainer, Slide } from "react-toastify";
import Providers from "./components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OtakuAdda | Anime Streaming Hub",
  description:
    "Stream unlimited anime, discover new shows, create watchlists, and join the ultimate Otaku community. Watch HD anime online for free on OtakuAdda.",
  keywords: [
    "anime streaming",
    "watch anime online",
    "free anime",
    "Otaku Adda",
    "anime community",
    "anime watchlist",
    "HD anime",
    "latest anime episodes",
    "anime movies",
    "best anime website",
    "anime recommendations",
    "manga and anime",
    "anime trailers",
    "anime series online",
  ],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overscroll-none min-h-screen flex flex-col ml-16`}
      >
        {/* color="linear-gradient(90deg, #a855f7, #ec4899, #22d3ee)" */}
        {/* color="linear-gradient(90deg, #ffb7c5, #a5d8ff, #d7b5ff)" */}
        {/*   color="linear-gradient(90deg, #ff00cc, #3333ff, #00fff0)" */}
        {/* color="linear-gradient(90deg, #ff0000, #ff8000, #ffff00)" */}
        {/* shadow="0 0 10px #2299DD,0 0 5px #2299DD" */}

        <Header />
        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Slide}
        />
      </body>
    </html>
  );
}
