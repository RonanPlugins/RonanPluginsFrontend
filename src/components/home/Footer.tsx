import footerLib from "@/lib/Footer";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Messages from "@/lib/Messages";
import { ModeToggle } from "../ModeToggle";

export default function Footer() {
  return (
    <div className="bg-gray-100 dark:bg-secondary w-full h-64 grid grid-cols-2 lg:grid-cols-6">
      <div className="col-span-1 lg:col-span-2 py-10 mx-auto">
        <div className="flex">
          <img src={footerLib.LogoPath} className="w-[45px] h-[45px]" />
          <p className="ml-4 text-lg">{Messages.BrandName}</p>
        </div>
        <div className="flex">
          <p className="text-lg">{footerLib.CopyrightText}</p>
        </div>
        <div className="flex">
          {footerLib.Socials.map((social, index) => {
            return (
              <SocialButton key={index} href={social.link}>
                {social.label}
              </SocialButton>
            );
          })}
        </div>
      </div>

      <ModeToggle />
      {/* <div className="mx-2"></div> */}
      {/* <div className="mx-2"></div> */}
    </div>
  );
}

const SocialButton = ({ children, href }: { href: string; children?: any }) => {
  return (
    <Link to={href}>
      <Button className="rounded-full m-2">{children}</Button>
    </Link>
  );
};
