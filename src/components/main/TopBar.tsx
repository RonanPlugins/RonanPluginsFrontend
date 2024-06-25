import { useUserContext } from "@/context/UserContext";
import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "../common/ModeToggle";
import Links from "@/lib/Links";
import LoginDialog from "../common/LoginDialog";
import NavItem from "./NavItem";
import { navItems } from "./NavBar";

export function TopBar() {
  const {
    isLoggedIn,
    user,
  }: {
    isLoggedIn: any;
    user: any;
  } = useUserContext();
  const location = useLocation();

  return (
    <>
      <div className="flex relative flex-row max-w-5xl w-full px-2 items-center justify-between mx-auto">
        <div>
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 h-28 w-48">
            <img
              src="assets/logo_full.png"
              className="object-cover object-center h-full w-full"
            />
          </div>
        </div>
        {/* Login/Profile */}
        <div className="flex flex-row gap-2 justify-self-end">
          <ModeToggle className="hidden md:flex" />
          {isLoggedIn() ? (
            <Link to={Links.Profile}>
              <img
                src={user?.avatarURL}
                className="rounded-md h-10 hover:ring-4"
              />
            </Link>
          ) : (
            <LoginDialog />
          )}
        </div>
      </div>
      <div className="w-full pt-14">
        {/* Group links in a flex container with horizontal spacing */}
        <nav className="max-w-4xl hidden md:flex flex-col w-full mx-auto">
          <div className="px-2 flex flex-row gap-1">
            {navItems.map((item) => {
              const activeNav =
                item.list.filter((link) => location.pathname.includes(link))
                  .length > 0;
              return (
                <NavItem
                  active={activeNav}
                  className="rounded-t-sm"
                  key={item.title}
                  {...item}
                />
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
