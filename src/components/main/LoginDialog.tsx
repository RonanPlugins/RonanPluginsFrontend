import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";

import { LogIn } from "lucide-react";
import { LoginScreen } from "../account/Login";

export default function LoginDialog({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="special"
          className={`font-bold flex flex-row rounded-xl p-3 text-sm ${className}`}
        >
          <LogIn size={20} className="mr-2" /> Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <LoginScreen isDialog={true} />
      </DialogContent>
    </Dialog>
  );
}
