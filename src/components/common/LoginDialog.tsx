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

export default function LoginDialog() {
  const loginHandler = () => {
    api.loginDiscord();
  };

  return (
    <Dialog>
      <DialogTrigger className="font-bold">Login/Register</DialogTrigger>
      <DialogContent className="h-1/3">
        <DialogHeader>
          <DialogTitle>Login/Register</DialogTitle>
          <DialogDescription className="flex h-full items-center">
            <Button
              style={{ backgroundColor: "#5865F2" }}
              className="flex items-center w-full"
              variant={"default"}
              onClick={loginHandler}
            >
              <img className="h-6 w-6 mr-2" src="/assets/discord.svg" />

              <span>Continue with Discord</span>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
