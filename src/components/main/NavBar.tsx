import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import LoginDialog from "../common/LoginDialog";
import { useUserContext } from "@/context/UserContext";
import Links from "@/lib/Links";
import { ModeToggle } from "../common/ModeToggle";

export default function Nav() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { isLoggedIn, user } = useUserContext();

  const location = useLocation();
  useEffect(() => {
    setSheetOpen(false);
  }, [location]);

  // const loc = useLocation();

  // console.log(loc);
  const navItems: { title: string; link: string; list: string[] }[] = [
    { title: "About", link: Links.About, list: [Links.About] },
    {
      title: "Resources",
      link: Links.Resources,
      list: [Links.Resources, Links.Resource],
    },
    {
      title: "Servers",
      link: Links.Servers,
      list: [Links.Servers, Links.Server],
    },
    // { title: "Creators", link: "/creators" },
  ];
  return (
    <div className="pt-2 shadow-md w-full">
      <main className="flex flex-col w-full gap-2">
        {/* Top Bar */}

        <div className="relative flex flex-row max-w-5xl w-full px-2 items-center justify-between mx-auto">
          <div>
            <img className="h-10" src="assets/logo.png" alt="Logo" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2">
            <p>Site Under Developement</p>
          </div>
          {/* Login/Profile */}
          <div className="flex flex-row gap-2 justify-self-end">
            {isLoggedIn() ? (
              <Link to={Links.Profile}>
                <img
                  src={user?.avatarURL}
                  className="rounded h-10 hover:ring-4"
                />
              </Link>
            ) : (
              <LoginDialog />
            )}

            <ModeToggle />
          </div>
        </div>
        <div className="w-full border-primary border-b-8">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="ml-2 shrink-0 md:hidden mb-2"
                variant="secondary"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                {navItems.map((item) => {
                  return (
                    <NavItem
                      className="rounded-full"
                      key={item.link}
                      {...item}
                      isSheet={true}
                    />
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          {/* Group links in a flex container with horizontal spacing */}
          <nav className="max-w-4xl hidden md:flex flex-col w-full mx-auto">
            <div className="px-2 flex flex-row gap-1">
              {navItems.map((item) => {
                return (
                  <NavItem className="rounded-t-sm" key={item.link} {...item} />
                );
              })}
            </div>
          </nav>
        </div>
      </main>
    </div>
  );
}
