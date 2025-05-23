import { Link } from "react-router-dom";
// import { ModeToggle } from "./mode-toggle";
import { AuthButton } from "./auth-button";
import { UserButton } from "./user-button";
import { useAuth } from "@/providers/auth-provider";
import MainSideBar from "./main-sidebar";
import { CategoryNavbar } from "../shared/CategoryNavbar";
import UserCartDropDown from "./user-drop-down-cart/user_cart-drop_down";
import { SearchWithResults } from "./input-search-products/input-search-products";

export function MainNav() {
  const { loggedInUser } = useAuth();

  return (
    <>
      <header className="sticky top-0 py-2 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-b dark: border-b-primary">
        <div className=" flex justify-between h-14 max-w-screen-2xl items-center px-6 2xl:mx-auto 2xl:px-0 gap-10">
          <div className="flex gap-4 flex-1">
            <Link
              to="/"
              className="uppercase me-4 flex items-center space-x-2 lg:me-6 text-lg"
            >
              Logo
            </Link>
            <nav className="hidden sm:flex items-center gap-4 text-sm lg:gap-6">
              <Link className=" hover:underline decoration-primary" to="/about">
                About
              </Link>
              <Link
                className=" hover:underline decoration-primary"
                to="/comparison"
              >
                Comparison
              </Link>
              <Link
                className=" hover:underline decoration-primary"
                to="/protected"
              >
                Protected
              </Link>
            </nav>
            <div className="hidden break-390px:block break-800px:ms-4 w-full max-w-2xl flex-1">
              <SearchWithResults />
            </div>
          </div>
          <div className="flex items-center gap-4 md:justify-end">
            <UserCartDropDown />
            <div className=" hidden break-500px:block">
              {loggedInUser ? <UserButton /> : <AuthButton />}
            </div>
            <MainSideBar />
          </div>
        </div>
        <CategoryNavbar />
      </header>
    </>
  );
}
