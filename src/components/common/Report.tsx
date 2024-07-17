import { FlagIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { TooltipWidget } from "./TooltipWidget";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

const options = ["Harassment", "Spam", "Hate Speech", "Abusive", "Other"];

//Item can be a RESOURCE or a SERVER
export function Report({ item }: { item: any }) {
  const [reason, setReason] = useState<string>();
  function submitReport() {
    toast.info("Report Submitted!");
  }
  return (
    <div className="ml-auto">
      <TooltipWidget tooltip="Report">
        <Dialog>
          <DialogTrigger
            asChild
            className="font-bold flex flex-row text-sm hover:text-destructive"
          >
            <FlagIcon size={16} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Post</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground mb-4">
              Thank you for helping us keep our community safe and respectful.
              When you report a post, our moderation team will review it to
              determine if it violates our community guidelines. Please note the
              following:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4">
              <li>
                All reports are confidential, and the user who posted will not
                know who reported them.
              </li>
              <li>
                Our team will thoroughly review the report and take appropriate
                action, which may include removing the post or issuing a warning
                to the user.
              </li>
              <li>
                We take all reports seriously, but please be aware that not all
                reported content will result in action. Our decisions are based
                on our community guidelines and terms of service.
              </li>
              <li>
                If further action is needed, we may contact you for additional
                information.
              </li>
            </ul>
            <p className="text-muted-foreground mb-4">
              We appreciate your patience and cooperation as we work to maintain
              a positive environment for everyone.
            </p>
            <Select onValueChange={(val) => setReason(val)} value={reason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Reason..." />
              </SelectTrigger>
              <SelectContent>
                {options.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-row gap-3 justify-end">
              <Button
                variant="destructive"
                onClick={submitReport}
                disabled={!reason}
              >
                Submit
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </TooltipWidget>
    </div>
  );
}
