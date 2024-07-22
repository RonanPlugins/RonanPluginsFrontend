import footerLib from "@/lib/Footer";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Links from "@/lib/Links";
import Messages from "@/lib/Messages";

export default function Footer() {
  return (
    <div className="bg-gray-100 dark:bg-secondary w-full h-64">
      <div className="grid grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto border-t-4 border-primary pt-3">
        <div className="col-span-1 mx-auto">
          <img src={footerLib.LogoPath} className="mx-auto w-[48px] h-[48px]" />
          <p className="text-center text-lg">{Messages.BrandName}</p>

          <div className="">
            {footerLib.Socials.map((social, index) => {
              return (
                <SocialButton key={index} href={social.link}>
                  {social.label}
                </SocialButton>
              );
            })}
          </div>
        </div>
        <div className="col-span-1 mx-auto">
          <h4 className="text-xl text-center mb-2">Discover</h4>
          <div className="flex flex-col text-muted-foreground">
            <Link to={Links.Resources}>Resources</Link>
            <Link to={Links.Servers}>Servers</Link>
          </div>
        </div>
        <div className="col-span-1 mx-auto">
          <h4 className="text-xl text-center mb-2">More</h4>
          <div className="flex flex-col text-muted-foreground">
            <Link to={Links.Profile}>My Profile</Link>
            <Link to={Links.ResourceNew}>Post a Resource</Link>
            <Link to={Links.ServerNew}>Add a Server</Link>
            <Link to={Links.TermsAndConditions}>Terms</Link>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground text-center">
        {footerLib.CopyrightText}
      </p>
    </div>
  );
}

const SocialButton = ({
  children,
  href,
}: PropsWithChildren & { href: string }) => {
  return (
    <Link to={href}>
      <Button className="rounded-xl m-2">{children}</Button>
    </Link>
  );
};
