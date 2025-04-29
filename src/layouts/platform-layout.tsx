import { Outlet } from "react-router-dom";

import { MainNav } from "@/components/general/main-nav";
import { CategoryNavbar } from "@/components/CategoryNavbar";
import { Footer } from "@/components/general/footer";

export default function PlatformLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <CategoryNavbar />
      <div className="px-6 py-8 max-w-screen-2xl w-full flex-1 2xl:mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
