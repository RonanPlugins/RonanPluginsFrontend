import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function CopyServerIP({ server }: { server: any }) {
  function copyIP() {
    navigator.clipboard.writeText(
      `${server.address}${server.port ? ":" + server.port : ""}`
    );
    toast.success("IP Address copied to clipboard!");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={copyIP} className="p-2">
          Copy IP
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="flex flex-row gap-2">
          <CheckCircle2 className="text-green-500" />
          IP Address Copied!
        </DialogTitle>
        <div>
          Don’t know how to join? Follow these simple steps:
          <ul className="list-disc list-inside">
            <li>Click “Multiplayer”</li>
            <li>Click “Add Server”</li>
            <li>Type/Paste the IP in server address box</li>
            <li>Click "Add Server" or "Direct Connect"</li>
            <li>Enjoy!</li>
          </ul>
        </div>
        <DialogClose asChild>
          <Button variant="secondary">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
