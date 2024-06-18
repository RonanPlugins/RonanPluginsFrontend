import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserContext } from "@/context/UserContext";
import Messages from "@/lib/Messages";
import { useState } from "react";
import profile from "@/api/profile";

export function EditSpigot() {
  const { user }: { user: any } = useUserContext();
  const [spigotID, setSpigotID] = useState(user.spigot?.spigotID || "");
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  async function handleSubmit() {
    setOpenConfirm(false);
    setOpen(false);
    const response = await profile.setSpigot(spigotID);
    if (!response) return;
    // console.log(response);
    location.reload();
  }

  //Temporary Function
  async function handleRetry() {
    await profile.resyncSpigot();
    location.reload();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spigot</CardTitle>
        <CardDescription>
          Sync your SpigotMC plugins to {Messages.BrandName}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {user.spigot?.spigotID ? (
          <div>
            <div className="rounded-md border px-4 py-1 text-sm shadow-sm">
              {spigotID}
            </div>
            <Button className="mt-2" onClick={handleRetry}>
              Resync
            </Button>
          </div>
        ) : (
          <>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setOpen((prev) => !prev)}>
                  Set Your Spigot ID
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Spigot ID</DialogTitle>
                  <DialogDescription>
                    Adding your SpigotID gives us the right to download and
                    store all information regarding all available plugins on
                    your profile.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Spigot ID
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your SpigotMC.org user id"
                      className="col-span-3"
                      onChange={(e) => setSpigotID(e.target.value)}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    onClick={() => setOpenConfirm(true)}
                    disabled={!spigotID}
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Confirm
              handleSubmit={handleSubmit}
              openConfirm={openConfirm}
              setOpenConfirm={setOpenConfirm}
              spigotID={spigotID}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}

function Confirm({
  openConfirm,
  setOpenConfirm,
  spigotID,
  handleSubmit,
}: {
  openConfirm: any;
  setOpenConfirm: any;
  spigotID: any;
  handleSubmit: any;
}) {
  return (
    <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-500">Disclaimer!</DialogTitle>
          <DialogDescription>
            <dd className="text-lg">
              Submitting Your SpigotID is a Permanent Action
            </dd>
            Once you submit your SpigotID,{" "}
            <span className="font-bold">this action cannot be undone</span>.
            Please double-check your SpigotID for accuracy before proceeding.
            Any errors or incorrect entries will be final and cannot be
            reversed.
            <dd className="text-2xl text-center text-primary">{spigotID}</dd>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" variant="destructive" onClick={handleSubmit}>
            Confirm
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpenConfirm(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
