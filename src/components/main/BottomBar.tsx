import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Links from "@/lib/Links";
import { ModeToggle } from "../common/ModeToggle";
import LoginDialog from "./LoginDialog";
import { useUserContext } from "@/context/UserContext";
import { navItems } from "./NavBar";
import NavItem from "./NavItem";

export function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    toggleVisibility(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const toggleVisibility = (forceDisable = false) => {
    if (isAnimating && !forceDisable) return; // Prevent toggling during animation

    if (isVisible) {
      setAnimationClass("animate-out slide-out-to-bottom-full");
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
        setAnimationClass("");
      }, 500); // Match the duration of fadeOut animation
    } else if (!forceDisable) {
      setIsVisible(true);
      setAnimationClass("animate-in slide-in-from-bottom-full");
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 450); // Match the duration of fadeIn animation
    }
  };

  return (
    <div className="fixed lg:hidden bottom-0 left-0 w-screen flex flex-col-reverse z-50">
      <div
        className={`z-10 bg-background dark:bg-secondary py-2 animate-in duration-200 
        slide-in-from-bottom-full flex flex-col ${
          isVisible
            ? "rounded-t-none"
            : "rounded-t-xl shadow-md shadow-spread-3"
        }`}
      >
        <div className="flex flex-col-reverse">
          <div className="flex flex-row justify-between items-center mx-2">
            <img
              className="ml-2 h-10 hover:cursor-pointer filter grayscale"
              src="/assets/favicon_512x512.png"
              aria-label="Logo"
              onClick={() => navigate(Links.About)}
            />
            <Button variant="ghost" onClick={() => toggleVisibility(false)}>
              {isVisible ? <XIcon size={32} /> : <MenuIcon size={32} />}
            </Button>
          </div>
        </div>
      </div>
      <BottomBarPage isVisible={isVisible} animationClass={animationClass} />
    </div>
  );
}

function BottomBarPage({
  isVisible,
  animationClass,
}: {
  isVisible: boolean;
  animationClass: string;
}) {
  const { isLoggedIn, user } = useUserContext();

  return (
    <div className="-z-1 flex flex-col items-center justify-center">
      {isVisible && (
        <div
          className={`p-4 flex flex-col gap-3 items-center bg-background dark:bg-secondary w-full transition-all duration-500 rounded-t-xl ${animationClass}`}
        >
          <div className="flex flex-col gap-3 w-full">
            {navItems.map((item) => {
              const activeNav =
                item.list.filter((link) => location.pathname.includes(link))
                  .length > 0;
              return (
                <NavItem
                  active={activeNav}
                  className="rounded-xl w-2/3 text-center mx-auto my-1"
                  key={item.title}
                  {...item}
                />
              );
            })}
          </div>
          <div className="flex flex-row gap-3 w-2/3 justify-center">
            <ModeToggle variant="outline" />
            {isLoggedIn ? (
              <Link to={Links.Profile}>
                <img
                  src={user?.avatarURL}
                  className="rounded-xl h-10 hover:ring-4"
                />
              </Link>
            ) : (
              <LoginDialog className="w-1/4" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
