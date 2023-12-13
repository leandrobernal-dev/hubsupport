import UserDataContextProvider from "@/context/UserDataContext";
import Nav from "@/layout/Nav";
import SideNav from "@/layout/SideNav";

export default function DashBoardLayout({ children }) {
  return (
    <UserDataContextProvider>
      <div className="ml-72 pt-14">
        <Nav />
        <SideNav />
        {children}
      </div>
    </UserDataContextProvider>
  );
}
