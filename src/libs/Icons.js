import loadable from "@loadable/component";


export default class Icons {

    static Discord = "FaDiscord"
    static Reddit = "FaReddit"
    static Login = "FaSignInAlt"
    static Logout = "FaSignOutAlt"
    static Account = "FaCogs"
    static Payments = "FaMoneyCheckAlt"

    static Home = "FaMoneyCheckAlt"
    static Plugins = "FaMoneyCheckAlt"
    static About = "FaMoneyCheckAlt"
    static Tiers = "FaMoneyCheckAlt"
    static Github = "FaMoneyCheckAlt"

    static Account = "BsGrid1X2";
    static Logout = "BsFillDoorOpenFill";
    static Bars = "FaBars";




    static GetIconFromString({ nameIcon, propsIcon }) {
        const lib = nameIcon.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(" ")[0].toLowerCase();
        const ElementIcon = loadable(() => import(`react-icons/${lib}/index.js`), {
            resolveComponent: (el) => el[nameIcon]
        });

        return <ElementIcon {...propsIcon} />;
    }
}