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
                <Link to={Links.Resources}>
                  <Button className="rounded-md md:ml-0 w-full max-w-xl md:w-fit md:mr-2">
                    Browse Marketplace
                  </Button>
                </Link>
              </div>

              <div className="grow w-full md:w-0">
                <Link to={Links.Discord}>
                  <Button
                    className="rounded-md w-full max-w-xl md:w-fit"
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
      <div className="pt-20 bg-gray-100 dark:bg-secondary w-full p-2 flex flex-row flex-wrap gap-[90px] mt-[30px] justify-center text-center align-middle min-h-[300px] h-auto">
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
