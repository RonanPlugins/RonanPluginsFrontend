import { Link, useLocation } from "react-router-dom";

function NavItem({
  title,
  link,
  isSheet = false,
}: {
  title: string;
  link: string;
  isSheet: boolean;
}) {
  const url = useLocation().pathname;
  // console.log(url, link);
  return (
    // className={`${window.location.pathname === link ? 'active' : ''}`}

    <Link
      to={link}
      className={`md:text-base ${
        url === link
          ? "active text-secondary/80"
          : `${isSheet ? "text-foreground" : "text-secondary"}`
      }
      } transition-all duration-300 ease-in-out hover:text-secondary/80 font-bold`}
    >
      {title ? title : link}
    </Link>
  );
}

export default NavItem;
