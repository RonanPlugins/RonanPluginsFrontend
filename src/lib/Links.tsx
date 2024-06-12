export default class Links {
  // Local Pages
  static Home = "/";
  static Resources = "/resources";
  static ResourceNew = "/resource/create";
  static About = "/about";
  static Login = "/login";
  static Profile = "/profile";
  static PrivacyPolicy = "/privacy";
  static TermsAndConditions = "/terms-and-conditions";

  static Spigot =
    "https://www.spigotmc.org/resources/authors/ronancraft.13025/";
  static Discord = "https://discord.com/invite/8Kt4wKm";
  static Reddit = "https://www.reddit.com/r/RonanNetwork";
  static Github = "https://github.com/SuperRonanCraft";

  static Redirects = [
    {
      slug: "spigot",
      url: this.Spigot,
    },
    {
      slug: "github",
      url: this.Github,
    },
    {
      slug: "discord",
      url: this.Discord,
    },
    {
      slug: "reddit",
      url: this.Reddit,
    },
  ];
}
