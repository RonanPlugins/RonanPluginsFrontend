import { Link } from "react-router-dom";

function NavItem({
  title,
  link,
  className,
  active,
}: {
  title: string;
  link: string;
  isSheet?: boolean;
  className?: string;
  active?: boolean;
}) {
  // const url = useLocation().pathname;
  // console.log(url, link);
  // const relaventLinks = list.filter((link) => url.includes(link));
  const focusedClass = active
    ? "bg-primary"
    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500";

  return (
    // className={`${window.location.pathname === link ? 'active' : ''}`}

    <Link
      to={link}
      className={`${className} p-2 px-6 md:text-base transition-colors duration-200 ease-in-out font-bold text-secondary-foreground ${focusedClass}`}
    >
      {title ? title : link}
    </Link>
  );
}

export default NavItem;
