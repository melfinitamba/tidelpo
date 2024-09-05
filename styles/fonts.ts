import { Inter, Grenze, Overlock, Slackey } from "next/font/google";
// import localFont from "next/font/local";

// define your variable fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const grenze = Grenze({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grenze",
});

const overlock = Overlock({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-overlock",
});

const slackey = Slackey({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-slackey",
});

export { inter, grenze, overlock, slackey };
