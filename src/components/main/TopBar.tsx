import { useUserContext } from "@/context/UserContext";
import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "../common/ModeToggle";
import Links from "@/lib/Links";
import LoginDialog from "./LoginDialog";
import NavItem from "./NavItem";
import { navItems } from "./NavBar";
import { ImageSmall } from "../common/Image";

export function TopBar() {
  const { isLoggedIn, user } = useUserContext();
  const location = useLocation();

  const isSignInScreen =
    location.pathname === Links.Register || location.pathname === Links.Login;

  return (
    <div className="flex flex-col w-full gap-3 z-50 h-12 bg-primary">
      <div className="w-full">
        {/* Group links in a flex container with horizontal spacing */}
        <nav className="max-w-6xl hidden md:flex w-full mx-auto flex-row px-3">
          <div className="flex flex-row items-center -translate-x-3">
            {navItems.map((item) => {
              const activeNav =
                item.list.filter((link) => location.pathname.includes(link))
                  .length > 0;
              return (
                <NavItem
                  active={activeNav}
                  className="py-3 px-5 md:text-base transition-colors duration-200 ease-in-out font-bold text-secondary-foreground"
                  key={item.title}
                  {...item}
                />
              );
            })}
          </div>
          <div className="h-12 py-1 absolute left-1/2 -translate-x-1/2">
            <Link to={Links.About}>
              <img
                src="assets/logo_full.png"
                className="object-cover object-center h-full w-full"
              />
            </Link>
          </div>
          <div className="ml-auto flex flex-row gap-3 justify-self-end items-center">
            <ModeToggle className="hidden md:flex" />
            {isLoggedIn ? (
              <Link to={Links.Profile}>
                <ImageSmall
                  url={user?.avatarURL}
                  classname="h-10 hover:ring-2"
                />
              </Link>
            ) : (
              !isSignInScreen && <LoginDialog />
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
