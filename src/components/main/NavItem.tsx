import { Link } from "react-router-dom";

function NavItem({
  title,
  link,
  isSheet,
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
  const focusedClass = active ? "bg-card" : "hover:bg-primary-foreground";

  // let classes = `${className}  ${focusedClass}`;
  // if (isSheet)
  // classes = `${className} mr-3 text-center py-2 mt-2 md:text-base transition-colors duration-200 ease-in-out font-bold text-secondary-foreground ${focusedClass}`;
  return (
    // className={`${window.location.pathname === link ? 'active' : ''}`}

    <Link to={link} className={`${className} ${focusedClass}`}>
      {title ? title : link}
    </Link>
  );
}

export default NavItem;
