// React
import { useState } from "react";
import { Outlet } from "react-router-dom";
// Components
import { SideBar } from "../components/SideBar/SideBar";
import { TopBar } from "../components/TopBar";

export default function DefaultLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const toggle = () => setIsSideBarOpen(!isSideBarOpen);
  return (
    <div>
      <TopBar toggleSideBar={toggle} />
      <main className="flex h-full w-full">
        <SideBar isOpen={isSideBarOpen} />
        <div className="w-full bg-white mr-14 ml-14 mt-8 mb-8 ">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
