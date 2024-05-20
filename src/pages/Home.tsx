import { Button } from "@/components/ui/button";
import { Code, User, Zap } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="columns-1 md:columns-2 min-h-[50vh]">
        {/* Flex */}
        <div className="flex p-4 my-10">
          {/* Stack */}
          <div className="w-full space-y-6">
            <header className="font-bold text-3xl md:text-4xl lg:text-6xl text-center md:text-left">
              <h1 className="font-light">RonanPlugins</h1>
              <p>Where creativity meets</p>
              <p className="text-blue-400">functionality</p>
            </header>
            <div className="py-4 text-center md:text-left flex md:inline-block flex-wrap space-y-2">
              <a className="grow w-full md:w-0" href="./plans">
                <Button className="rounded-full md:ml-0 w-full max-w-xl md:w-fit md:mr-2">
                  View Plans
                </Button>
              </a>
              <a className="grow w-full md:w-0" href="./login">
                <Button
                  className="rounded-full w-full max-w-xl md:w-fit"
                  variant="secondary"
                >
                  Login
                </Button>
              </a>
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
      <div className="pt-20 bg-gray-100 w-full flex flex-row flex-wrap gap-[90px] mt-[30px] justify-center text-center align-middle min-h-[300px] h-auto">
        {Features.map((feature) => {
          return (
            <div className="w-[200px] text-[#232f3e80] ">
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
    Icon: <Zap size="50" />,
    Title: "Well optimized",
    Description: "All our plugins are designed with optimization in mind.",
  },
  {
    Icon: <Code size="50" />,
    Title: "Customizable",
    Description:
      "All plugins comes with it’s own config.yml to make it suit your needs",
  },
  {
    Icon: <User size="50" />,
    Title: "Fast support",
    Description:
      "We have a discord with over 1.000 members ready to help you whenever you need!",
  },
];
