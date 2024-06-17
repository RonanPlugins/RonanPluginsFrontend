import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import api from "@/api";
import { LogIn } from "lucide-react";

export default function LoginDialog() {
  const loginHandler = () => {
    api.loginDiscord();
  };

  return (
    <Dialog>
      <DialogTrigger className="font-bold flex flex-row bg-primary rounded-full p-2 text-sm hover:bg-primary/70 transition-colors hover:text-primary-foreground">
        {/* <button className="px-3 rounded-full"> */}
        <LogIn size={20} className="mr-2" /> Sign In
        {/* </button> */}
      </DialogTrigger>
      <DialogContent className="h-1/3">
        <DialogHeader>
          <DialogTitle>Sign In With</DialogTitle>
          <DialogDescription className="flex h-full items-center">
            <Button
              style={{ backgroundColor: "#5865F2" }}
              className="flex items-center w-full hover:underline"
              variant={"default"}
              onClick={loginHandler}
            >
              <img className="h-6 w-6 mr-2" src="/assets/discord.svg" />

              <span>Discord</span>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
