import { Link, useLocation } from "react-router-dom";

function NavItem({
  title,
  link,
  list,
  className,
}: {
  title: string;
  link: string;
  list: string[];
  isSheet?: boolean;
  className?: string;
}) {
  const url = useLocation().pathname;
  // console.log(url, link);
  const links = list.filter((val) => url.includes(val));
  const conditionalClass =
    links.length > 0
      ? "bg-primary"
      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500";

  return (
    // className={`${window.location.pathname === link ? 'active' : ''}`}

    <Link
      to={link}
      className={`${className} p-2 px-6 md:text-base transition-colors duration-200 ease-in-out font-bold text-secondary-foreground ${conditionalClass}`}
    >
      {title ? title : link}
    </Link>
  );
}

export default NavItem;
