import Links from "./Links.js";

export default class Messages {
    static Logout = "Logout"
    static Support = "Support";
    static PrivacyPolicy = "Privacy Policy";
    static TermsAndConditions = "Terms And Conditions";
    static BrandName = "RonanPlugins";
    static Navigation = "Navigation"
    static Pages = "Pages"
    static Home = "Home";
    static Plugins = "Plugins";
    static About = "About";
    static Plans = "Plans";
    static Profile = "Profile";
    static Login = "Login";
    static Account = "Account";
    static MyAccount = "My Account";
    static Discord = "Discord";
    static Reddit = "Reddit";
    static Github = "Github";
    static Links = "Links"
    static LearnMore = "LEARN MORE";
    static SupportHeadingPlugins = "Don’t know what plugin is best for you?";
    static SupportHeadingAbout = "Contact Us";
    static Features = [
        {
            Icon: "BsFillLightningFill",
            Title: "Well optimized",
            Description: "All our plugins are designed with optimization in mind."
        },
        {
            Icon: "BsCodeSlash",
            Title: "Customizable",
            Description: "All plugins comes with it’s own config.yml to make it suit your needs"
        },
        {
            Icon: "BsFillPersonFill",
            Title: "Fast support",
            Description: "We have a discord with over 1.000 members ready to help you whenever you need!"
        }
    ];
    static FeaturesTitle = "Get the most out of your server";
    static FeaturesDescription = "Don't know what your next step in your minecraft server should be? We have plugins for that - explore our minecraft plugins and find the one that works for your server";
    static HeaderLinks = [
        {
            Text: this.Plugins.toUpperCase(),
            URL: Links.Plugins
        },
        {
            Text: this.Plans.toUpperCase(),
            URL: Links.Plans
        }
        // Always has my account
    ];
    static FooterLinks = [
        {
            Text: this.Support,
            URL: Links.Discord
        },
        {
            Text: this.PrivacyPolicy,
            URL: Links.PrivacyPolicy
        },
        {
            Text: this.TermsAndConditions,
            URL: Links.TermsAndConditions
        }
    ];
}

