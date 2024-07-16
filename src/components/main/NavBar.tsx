import Links from "@/lib/Links";

import { BottomBar } from "./BottomBar";
import { TopBar } from "./TopBar";

// eslint-disable-next-line react-refresh/only-export-components
export const navItems: { title: string; link: string; list: string[] }[] = [
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

export default function Nav() {
  // useEffect(() => {
  //   if (location.pathname !== "/resources") setSheetOpen(false);
  // }, [location]);

  // const loc = useLocation();

  // console.log(loc);

  return (
    <nav className="sticky top-0 z-50">
      {/* Top Bar WHEN ON DESKTOP */}
      <div className="hidden lg:block">
        <TopBar />
      </div>
      {/* Bottom bar WHEN ON MOBILE */}
      <div className="lg:hidden">
        <BottomBar />
      </div>
    </nav>
  );
}
