import { Button } from "@/components/ui/button";
import Links from "@/lib/Links";
import Messages from "@/lib/Messages";
import usePageTitle from "@/utils/usePageTitle";
import {
  Component,
  Gift,
  StarsIcon,
  TimerReset,
  UserCheck2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  usePageTitle("About");
  return (
    <>
      <div className="columns-1 md:columns-2 min-h-[50vh]">
        <div className="flex p-4 my-10">
          <div className="w-full space-y-6">
            <header className="font-bold text-3xl md:text-4xl lg:text-6xl text-center md:text-left">
              <h1 className="font-light">{Messages.BrandName}</h1>
              <p>Where creators meet</p>
              <p className="text-blue-400">developers</p>
            </header>
            <div className="py-4 text-center md:text-left flex md:inline-block flex-wrap space-y-2">
              <div className="grow w-full md:w-0">
                <Link to={Links.Servers}>
                  <Button className="rounded-xl md:ml-0 w-full max-w-xl md:w-fit md:mr-2">
                    Browse our Server List
                  </Button>
                </Link>
              </div>

              <div className="grow w-full md:w-0">
                <Link to={Links.Discord}>
                  <Button
                    className="rounded-xl w-full max-w-xl md:w-fit"
                    variant="secondary"
                  >
                    Join Our Discord
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <img
          className="my-5 hidden md:inline-block"
          width="700px"
          alt="Hero Image"
          src="./assets/homethingy.png"
        ></img>
      </div>
      <section className="shadow-lg rounded-lg p-6 mb-8 grow w-full">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <p className="text-lg mb-6">
          Welcome to MineCentral! We're passionate about Minecraft and dedicated
          to bringing the best resources to the Minecraft community. Our
          platform is your go-to destination for everything Minecraft-related,
          whether you're a server owner, plugin developer, or just a player
          looking for exciting new experiences.
        </p>

        <h3 className="text-xl font-semibold mb-3">What We Offer</h3>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Plugin/Resource Repository:</strong> Discover a vast
            collection of Minecraft plugins and resources, carefully curated and
            categorized for your convenience. Upload your own creations or
            download the latest tools to enhance your gameplay.
          </li>
          <li>
            <strong>Server Discovery:</strong> Find the perfect Minecraft server
            to join or showcase your own. Our advanced filtering algorithm
            ensures you can easily search for servers based on your preferences
            and interests.
          </li>
          <li>
            <strong>Premium Resources:</strong> Take your Minecraft experience
            to the next level with premium resources. Create, buy, or sell
            high-quality content that stands out and adds unique value to the
            community.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
        <p className="text-lg mb-6">
          We aim to foster a thriving Minecraft community by providing a
          platform that connects creators and players. Our goal is to make it
          easy for you to find and share the best Minecraft content, whether
          it's a plugin that adds new features, a resource that enhances your
          server, or a server that offers a great new adventure.
        </p>

        <h3 className="text-xl font-semibold mb-3">Why Choose Us?</h3>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>User-Friendly Interface:</strong> Our site is designed with
            you in mind, making it easy to navigate, upload, and find what
            you're looking for.
          </li>
          <li>
            <strong>Robust Filtering:</strong> Our advanced algorithms ensure
            you find exactly what you need quickly and efficiently.
          </li>
          <li>
            <strong>Community-Centric:</strong> We value our community and
            strive to support creators and players alike with a platform that
            meets their needs.
          </li>
        </ul>

        <p className="text-lg">
          Thank you for visiting MineCentral.net. We’re excited to have you join
          our community and look forward to seeing the amazing contributions
          you'll bring to the Minecraft universe!
        </p>
        <p className="text-lg mt-4">
          Feel free to reach out with any questions or suggestions. Happy
          mining!
        </p>

        <footer className="mt-8 text-center text-gray-600">
          <p>
            <strong>- The MineCentral Team</strong>
          </p>
        </footer>
      </section>
      <div className="pt-20 bg-gray-100 dark:bg-secondary w-full p-3 flex flex-row flex-wrap gap-[90px] mt-[30px] justify-center text-center align-middle min-h-[300px] h-auto">
        {Features.map((feature) => {
          return (
            <div
              key={feature.Title}
              className="w-[220px] text-[#232f3e80] dark:text-primary"
            >
              <div className="text-[#4ECDC4] flex align-middle justify-center">
                {feature.Icon}
              </div>
              <div className="font-bold text-2xl">{feature.Title}</div>
              <div className="">{feature.Description}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

const Features = [
  {
    Icon: <UserCheck2 size="50" />,
    Title: "Cherry Picked",
    Description: (
      <p>
        Our hand selected list of developers guarantee our resources/plugins are
        the best in the market!
      </p>
    ),
  },
  {
    Icon: <StarsIcon size="50" />,
    Title: "Support Your Favorites",
    Description: (
      <p>Able to support your Developer repeatedly, promoting longevity</p>
    ),
  },
  {
    Icon: <Gift size="50" />,
    Title: "Package Deals",
    Description: (
      <p>
        Purchase a Developers full library of resources at a compelling
        discount!
      </p>
    ),
  },
  {
    Icon: <TimerReset size="50" />,
    Title: "Promoting Longevity",
    Description: (
      <p>
        Developers won't abandon projects easily if it hurts their revenue.
        Recurring support promotes long-term the plugins you love, at a very low
        price!
      </p>
    ),
  },
  {
    Icon: <Component size="50" />,
    Title: "Are You a Developer?",
    Description: <p>Join our team and start publishing resources!</p>,
  },
];
