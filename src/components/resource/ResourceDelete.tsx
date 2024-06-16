import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import resourceAPI from "@/api/resource";
import { useNavigate } from "react-router-dom";

export default function ResourceDelete({ resource }: { resource: any }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    await resourceAPI.delete(resource._id);
    navigate("../resources");
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            onClick={() => setOpen((prev) => !prev)}
          >
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{resource.title}</DialogTitle>
            <DialogDescription>
              <p className="text-xs text-center">
                This option is only displayed to admins.
              </p>
              Deleting a resource a permanent action, this cannot be undone! Are
              you sure you want to delete {resource.title}!
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Resource
            </Button>
            <Button type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
