import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import resourceAPI from "@/api/resource";
import { CheckCircleIcon, FileWarning, ImageUpIcon } from "lucide-react";

export function ResourceUploadIcon({ resource }: { resource: any }) {
  const [file, set_file] = useState<File | null>(null);
  const [uploading, set_uploading] = useState<boolean>(false);
  const [open, set_open] = useState<boolean>(false);

  function uploadIcon() {
    if (!file) return;
    set_uploading(true);

    const formData = new FormData();
    formData.append("image", file);

    resourceAPI
      .editIcon(resource._id, formData)
      .then((data) => {
        if (data) {
          toast("New Icon Uploaded!", { icon: <CheckCircleIcon /> });
          set_open(false);
        } else {
          toast("Error Uploading Icon!", {
            className: "bg-red-600 border-0 text-white",
            icon: <FileWarning />,
          });
        }
      })
      .finally(() => {
        set_uploading(false);
      });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={set_open}>
        <DialogTrigger className="flex flex-row gap-2 items-center hover:text-primary">
          <ImageUpIcon size={16} />
          <p>Upload Icon</p>
        </DialogTrigger>
        <DialogContent>
          <h2>Upload Resource Icon</h2>
          <Input
            type="file"
            accept=".jpg,.png"
            className="text-muted-foreground file:mr-3 file:py-1 file:px-3 file:rounded-xl file:text-xs file:font-medium
                    file:bg-secondary file:text-secondary-foreground hover:file:cursor-pointer cursor-pointer hover:file:bg-primary"
            onChange={(e) => {
              set_file(e.target.files?.[0] || null);
            }}
          />
          <DialogFooter>
            <Button onClick={uploadIcon} disabled={!file || uploading}>
              Submit
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
