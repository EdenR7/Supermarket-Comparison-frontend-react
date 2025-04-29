import { Outlet } from "react-router-dom";

import { MainNav } from "@/components/general/main-nav";
import { CategoryNavbar } from "@/components/CategoryNavbar";

export default function PlatformLayout() {
  return (
    <>
      <MainNav />
      <CategoryNavbar />
      <div className=" px-6 py-8 max-w-screen-2xl h-full 2xl:mx-auto">
        <Outlet />
      </div>
    </>
  );
}
