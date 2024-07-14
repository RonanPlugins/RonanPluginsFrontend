import { DialogClose, DialogContent } from "@radix-ui/react-dialog";
import { Dialog, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

export function CopyServerIP({ server }: { server: any }) {
  return (
    <Dialog>
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogTitle>IP Copied!</DialogTitle>
        <div>
          Don’t know how to join? Follow these simple steps:
          <ul>
            <li>Click “Multiplayer”</li>
            <li>Click “Add Server”</li>
            <li>Type/Paste the IP in server address box</li>
          </ul>
        </div>
        <DialogClose asChild>
          <Button variant="secondary">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
