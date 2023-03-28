export default class Links {
    // Local Pages
    static Home = "/";
    static Plugins = "/plugins";
    static About = "/about";
    static Plans = "/plans"
    static Login = "/login";
    static Logout = "/logout";
    static SignUp = "/signup";
    static Account = "/user";
    static PrivacyPolicy = "/privacy-policy";
    static TermsAndConditions = "/terms-and-conditions";

    static Spigot = "https://www.spigotmc.org/resources/authors/ronancraft.13025/";
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
        }, {
            slug: "discord",
            url: this.Discord,
        }, {
            slug: "reddit",
            url: this.Reddit,
        },
    ];
}
