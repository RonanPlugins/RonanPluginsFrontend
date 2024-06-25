import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import api from "@/api";
import { LogIn } from "lucide-react";

export default function LoginDialog({ className }: { className?: string }) {
  const loginHandler = () => {
    api.loginDiscord();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="special"
          className={`font-bold flex flex-row rounded-md p-2 text-sm ${className}`}
        >
          <LogIn size={20} className="mr-2" /> Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="h-1/3">
        <DialogHeader>
          <DialogTitle>Sign In With</DialogTitle>
          <div className="h-full flex">
            <DialogDescription className="my-auto w-full grid grid-cols-2 items-center gap-2">
              <Button
                // style={{ backgroundColor: "#5865F2" }}
                className="flex items-center w-full hover:underline hover:bg-[#5865F2] bg-primary-foreground"
                variant={"default"}
                onClick={loginHandler}
              >
                <img className="h-6 w-6 mr-2" src="/assets/discord.svg" />

                <span>Discord</span>
              </Button>
              <Button
                // style={{ backgroundColor: "#5865F2" }}
                className="flex items-center w-full hover:underline hover:bg-[#2b3137] bg-primary-foreground"
                variant={"default"}
                onClick={loginHandler}
                disabled={true}
              >
                <img
                  className="h-6 w-6 mr-2 fill-white"
                  src="/assets/github.svg"
                />

                <span>GitHub</span>
              </Button>
              <Button
                // style={{ backgroundColor: "#5865F2" }}
                className="flex items-center w-full hover:underline hover:bg-[#2b3137] bg-primary-foreground"
                variant={"default"}
                onClick={loginHandler}
                disabled={true}
              >
                <img
                  className="-ml-3 h-10 w-10 mr fill-white"
                  src="/assets/gitlab.svg"
                />

                <span>GitLab</span>
              </Button>
            </DialogDescription>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
