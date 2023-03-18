import Links from "./Links.js";

export default class Messages {
    static Support = "Support";
    static PrivacyPolicy = "Privacy Policy";
    static TermsAndConditions = "Terms And Conditions";
    static BrandName = "RonanPlugins";
    static Navigation = "Navigation"
    static Pages = "Pages"
    static Home = "Home";
    static Plugins = "Plugins";
    static About = "About";
    static Tiers = "Tiers";
    static Profile = "Profile";
    static Login = "Login";
    static Account = "Account";
    static MyAccount = "My Account";
    static Discord = "Discord";
    static Reddit = "Reddit";
    static Github = "Github";
    static Links = "Links"
    static SupportHeadingPlugins = "Don’t know what plugin is best for you?";
    static SupportHeadingAbout = "Contact Us";
    static Features = [
        {
            Icon: "BsFillLightningFill",
            Title: "Well optimized",
            Description: "We created all of our plugins to be as optimized as possible in order to give you the fastest performance. We carefully crafted the plugins to be more efficient and tight for your server. We’ve developed a number of different plugins that exist to help you with your server."
        },
        {
            Icon: "BsCodeSlash",
            Title: "Customizable",
            Description: "All of our plugins are customizable; you can customize them to suit your particular Minecraft server. With a huge range of configuration options for each plugin, there should be one to meet your needs."
        },
        {
            Icon: "BsFillPersonFill",
            Title: "Fast support",
            Description: "We have a very fast support team on our Discord along with nearly 1,000 members to help you customize your plugin. If you are not sure what plugin is right for you, contact us and we will help you!"
        }
    ];
    static FeaturesTitle = "Get the most out of your server";
    static FeaturesDescription = "Don't know what your next step in your minecraft server should be? We have plugins for that - explore our minecraft plugins and find the one that works for your server";
    static HeaderLinks = [
        {
            Text: this.Home,
            URL: Links.Home
        },
        {
            Text: this.Plugins,
            URL: Links.Plugins
        },
        {
            Text: this.About,
            URL: Links.About
        },
        {
            Text: this.Tiers,
            URL: Links.Tiers
        }
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
    // static SUPPORT = "Support";
    // static SUPPORT = "Support";
}

