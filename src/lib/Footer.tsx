import { Instagram, Twitter, Youtube } from "lucide-react";
import Messages from "./Messages";

export default class Footer {
  static CopyrightText = `© 2024 ${Messages.BrandName}. Not affiliated with Microsoft, Mojang AB, or Minecraft.`;
  static LogoPath = "/assets/favicon_512x512.png";

  static Links = [
    {
      Header: "Support",
      Links: [
        {
          name: "Discord",
          href: "/discord",
        },
        {
          name: "Terms And Conditions",
          href: "/terms-and-conditions",
        },
        {
          name: "Privacy Policy",
          href: "/privacy",
        },
        {
          name: "Status",
          href: "https://status.ronanplugins.com",
        },
      ],
    },
  ];

  static Socials = [
    {
      label: <Twitter />,
      link: "https://twitter.com/SuperRonanCraft",
      icon: "FaTwitter",
    },
    {
      label: <Youtube />,
      link: "https://www.youtube.com/@RonanNetwork",
      icon: "FaYoutube",
    },
    {
      label: <Instagram />,
      link: "https://www.instagram.com/superronancraft/",
      icon: "FaInstagram",
    },
  ];
}
