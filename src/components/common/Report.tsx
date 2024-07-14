import { FlagIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { TooltipWidget } from "./TooltipWidget";

//Item can be a RESOURCE or a SERVER
export function Report({ item }: { item: any }) {
  return (
    <Dialog>
      <DialogTrigger className="ml-auto font-bold flex flex-row rounded-xl text-sm hover:text-primary">
        <TooltipWidget tooltip="Report">
          <FlagIcon size={16} />
        </TooltipWidget>
      </DialogTrigger>
      <DialogContent>test123</DialogContent>
    </Dialog>
  );
}
