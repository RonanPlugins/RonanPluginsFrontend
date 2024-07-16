import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";

import { LoginScreen } from "../account/Login";
import { Link } from "react-router-dom";
import Links from "@/lib/Links";

export default function LoginDialog({ className }: { className?: string }) {
  return (
    <div className="flex flex-row items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="link"
            className="text-secondary-foreground hover:no-underline hover:rounded-xl hover:bg-primary-foreground"
          >
            Login
          </Button>
        </DialogTrigger>
        <DialogContent>
          <LoginScreen isDialog={true} />
        </DialogContent>
      </Dialog>
      <Link to={Links.Register}>
        <Button
          variant="special"
          className={`font-bold flex flex-row rounded-xl p-3 text-sm ${className}`}
        >
          SignUp
        </Button>
      </Link>
    </div>
  );
}
