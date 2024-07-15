import { FlagIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { TooltipWidget } from "./TooltipWidget";

//Item can be a RESOURCE or a SERVER
export function Report({ item }: { item: any }) {
  return (
    <div className="ml-auto">
      <TooltipWidget tooltip="Report">
        <Dialog>
          <DialogTrigger
            asChild
            className="font-bold flex flex-row rounded-xl text-sm hover:text-primary"
          >
            <FlagIcon size={16} />
          </DialogTrigger>
          <DialogContent>test123</DialogContent>
        </Dialog>
      </TooltipWidget>
    </div>
  );
}
