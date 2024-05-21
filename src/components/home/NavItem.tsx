import { Link, useLocation } from "react-router-dom";

function NavItem({
  title,
  link,
}: {
  title: string;
  link: string;
  isSheet?: boolean;
}) {
  const url = useLocation().pathname;
  // console.log(url, link);
  const addedClasses = url === link ? "" : "";
  return (
    // className={`${window.location.pathname === link ? 'active' : ''}`}

    <Link
      to={link}
      className={`md:text-base transition-all duration-300 ease-in-out hover:text-secondary dark:hover:text-primary font-bold ${addedClasses}`}
    >
      {title ? title : link}
    </Link>
  );
}

export default NavItem;
