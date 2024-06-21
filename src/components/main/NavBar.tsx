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
import { NavFilterBar } from "../resource/NavFilterBar";
import { useResourceContext } from "@/context/ResourceContext";
import { CATEGORY_PLUGIN } from "minecentral-api/dist/categories/CATEGORY_PLUGIN";

export default function Nav() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { isLoggedIn, user } = useUserContext();
  const { category, setCategory } = useResourceContext();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/resources") setSheetOpen(false);
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
      <main className="flex flex-col w-full gap-2 border-primary border-b-8">
        {/* Top Bar */}

        <div className="relative flex flex-row max-w-5xl w-full px-2 items-center justify-between mx-auto">
          <div>
            {/* <img
              className="h-10 hidden md:block"
              src="assets/favicon_512x512.png"
              alt="Logo"
            /> */}

            <div className="absolute left-1/2 -translate-x-1/2 -top-2 hidden md:block h-28 w-48">
              <img
                src="assets/logo_full.png"
                className="object-cover object-center h-full w-full"
              />
            </div>
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

              <SheetContent side="left" className="max-w-96">
                <div className="h-28 w-28 mx-auto -mt-10 -mb-4">
                  <img
                    src="assets/logo_full.png"
                    className="object-cover object-center h-full w-full"
                  />
                </div>
                <nav className="text-lg font-medium">
                  {navItems.map((item) => {
                    const activeNav =
                      item.list.filter((link) =>
                        location.pathname.includes(link)
                      ).length > 0;
                    return (
                      <div key={item.title} className="grid">
                        <NavItem
                          active={activeNav}
                          className="rounded-full mb-2"
                          {...item}
                          isSheet={true}
                        />

                        {item.link === Links.Resources &&
                          activeNav &&
                          location.pathname === Links.Resources && (
                            <div className="grid mx-4 mb-2">
                              <NavFilterBar
                                variant={"ghost"}
                                className="grid flex-row w-full justify-start rounded-full"
                                onSelect={(category: CATEGORY_PLUGIN) => {
                                  setCategory(category);
                                  setSheetOpen(false);
                                }}
                                selected={category}
                              />
                            </div>
                          )}
                      </div>
                    );
                  })}
                </nav>

                <div className="w-full flex justify-end">
                  <ModeToggle className="" />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {/* Login/Profile */}
          <div className="flex flex-row gap-2 justify-self-end">
            <ModeToggle className="hidden md:flex" />
            {isLoggedIn() ? (
              <Link to={Links.Profile}>
                <img
                  src={user?.avatarURL}
                  className="rounded-full h-10 hover:ring-4"
                />
              </Link>
            ) : (
              <LoginDialog />
            )}
          </div>
        </div>
        <div className="w-full border-primary border-b-8 md:border-none md:pt-14">
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
      </main>
    </div>
  );
}
