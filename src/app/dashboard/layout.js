import UserDataContextProvider from "@/context/UserDataContext";
import dbConnect from "@/db/database";
import Nav from "@/layout/Nav";
import SideNav from "@/layout/SideNav";
import User from "@/models/User";

import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function DashBoardLayout({ children }) {
  await dbConnect();
  const session = await getServerSession();
  const user = await User.findOne({ email: session.user.email });

  if (!user) notFound();

  return (
    <UserDataContextProvider>
      <div className="ml-72 pt-14">
        <SideNav user={user} />
        {children}
      </div>
    </UserDataContextProvider>
  );
}
