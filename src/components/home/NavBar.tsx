import { useLocation, useNavigate } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import LoginDialog from "../dialogs/LoginDialog";
import { useUserContext } from "@/context/UserContext";
import api from "@/api";
import Links from "@/lib/Links";

export default function Nav() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { isLoggedIn, logout, user } = useUserContext();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    logout();
    await api.logout();
    navigate("/home");
  };

  const location = useLocation();
  useEffect(() => {
    setSheetOpen(false);
  }, [location]);

  // const loc = useLocation();

  // console.log(loc);
  const navItems: { title: string; link: string }[] = [
    { title: "Home", link: Links.Home },
    { title: "Resources", link: Links.Resources },
    // { title: "Creators", link: "/creators" },
  ];
  return (
    <div className="left-0 right-0 top-0 z-10">
      <main>
        {/* Position the nav bar absolutely with left, right, and top set to 0 */}
        <nav className="p-2 md:pl-8 bg-primary/50 shadow-md w-full">
          {/* Use flex to align items and justify-between to space out the links and theme toggle */}

          <ul className="flex items-center justify-between w-full">
            <div className="hidden flex-col font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              {navItems.map((item) => {
                return <NavItem key={item.link} {...item} />;
              })}
            </div>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  className="shrink-0 md:hidden"
                  variant="outline"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                  {navItems.map((item) => {
                    return <NavItem key={item.link} {...item} isSheet={true} />;
                  })}
                </nav>
              </SheetContent>
            </Sheet>
            {/* Group links in a flex container with horizontal spacing */}

            {/* Empty spacer to push Sign Up and Log In links to the right */}
            <div className="flex-grow" />
            {/* Place Sign Up and Log In links to the right side */}
            <div className="flex gap-4 items-center font-medium">
              {isLoggedIn() ? (
                <>
                  <img src={user.avatarURL} className="rounded h-10" />

                  <NavItem link={Links.Profile} title={"Profile"} />
                  <Button onClick={logoutHandler}>Logout</Button>
                </>
              ) : (
                <LoginDialog />
              )}
              <ModeToggle />
            </div>
            {/* Place ModeToggle to the right side */}
          </ul>
        </nav>
      </main>
    </div>
  );
}
