import { Instagram, Twitter, Youtube } from "lucide-react";

export default class Footer {
  static CopyrightText = "© 2023 RonanPlugins. All rights reserved";
  static LogoPath = "/assets/logo.webp";

  static Links = [
    {
      Header: "Company",
      Links: [
        {
          name: "About Us",
          href: "/about",
        },
        // {
        //     name: "Game Panel",
        //     href: "https://panel.ronanhost.com"
        // },
        {
          name: "Plans",
          href: "/plans",
        },
      ],
    },
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
