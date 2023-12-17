import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Nav from "@/layout/Nav";
import { ThemeProvider } from "@/theme/ThemeProvider";
import AuthProvider from "@/context/AuthProvider";
import { SITE } from "@/config/config";
import User from "@/models/User";
import dbConnect from "@/db/database";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: SITE.title,
  description: SITE.description,
};

export default async function RootLayout({ children, session }) {
  await dbConnect();
  const userSession = await getServerSession();
  const user =
    userSession && (await User.findOne({ email: userSession.user.email }));

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
            {<Nav user={JSON.stringify(user)} />}
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
