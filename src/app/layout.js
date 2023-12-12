import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Nav from "@/layout/Nav";
import { ThemeProvider } from "@/theme/ThemeProvider";
import AuthProvider from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "ColorBlocks",
  description: "Generate color palettes real time.",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}`} suppressHydrationWarning>
        <AuthProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
