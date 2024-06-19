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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserContext } from "@/context/UserContext";
import Messages from "@/lib/Messages";
import { Dispatch, useEffect, useState } from "react";
import spigot from "@/api/spigot";
import Image from "@/components/common/Image";
import PremiumIcon from "@/components/common/PremiumIcon";
import { Switch } from "@/components/ui/switch";
import useLocalStorageCache from "@/hooks/useLocalStorageCache";

interface ISelected_Resource {
  id: string;
  category?: string;
  resource: any;
}

export function ImportSpigot() {
  const { user }: { user: any } = useUserContext();
  //Cache
  const [cachedSpigotID, setCachedSpigotID] = useLocalStorageCache(
    "spigotID",
    null
  );
  const [spigotID, setSpigotID] = useState<string>(
    user.spigotID || cachedSpigotID
  );
  //Dialogs
  const [openSetAuthor, setOpenSetAuthor] = useState(spigotID === null);
  const [openEditResource, setOpenEditResource] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  //Resource
  const [resources, setResources] = useState<any>();
  const [selectedResources, setSelectedResources] = useState<
    ISelected_Resource[]
  >([]);
  const [resourceEditting, setResourceEditting] =
    useState<ISelected_Resource>();

  async function handleImportAuthor() {
    if (!spigotID || spigotID === "") return;
    setOpenSetAuthor(false);
    const spigotResources = await loadSpigotResources(spigotID);
    // console.log(spigotResources);
    setResources(spigotResources);
    setCachedSpigotID(spigotID);
  }

  useEffect(() => {
    if (spigotID) {
      handleImportAuthor();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleImportAuthor();
    }
  };

  function addOrUpdateEdittingResources(resource: ISelected_Resource) {
    resource.category = "2";
    setOpenEditResource(false);
    //Add or Update Selected Resource array
    setSelectedResources((array) => {
      const index = array.findIndex((item) => item.id === resource.id);
      if (index !== -1) {
        // Update existing item
        array[index] = resource;
      } else {
        // Add new item
        array.push(resource);
      }
      return array;
    });
  }

  async function handleCheckedResource(resource: any) {
    const edittingResource: ISelected_Resource = selectedResources.find(
      (val: ISelected_Resource) => val.id === resource.id
    ) || {
      id: resource.id,
      resource,
    };
    // addOrUpdateEdittingResources(edittingResource);
    setResourceEditting(edittingResource);
    setOpenEditResource(true);
  }

  return (
    <div className="my-2 max-w-4xl w-full mx-auto flex flex-col space-y-2">
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Spigot Importer</CardTitle>
            <CardDescription>
              Choose what SpigotMC plugins to import to {Messages.BrandName}
            </CardDescription>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
            <SaveChanges
              disabled={
                spigotID === null ||
                spigotID === "" ||
                !selectedResources ||
                selectedResources.length === 0
              }
              submit={() => {
                console.log("Not yes implemented");
              }}
              onOpenChange={setOpenConfirm}
              open={openConfirm}
              spigotID={spigotID}
            />
            <SetAuthor
              spigotID={spigotID}
              open={openSetAuthor}
              handleImportAuthor={handleImportAuthor}
              handleKeyPress={handleKeyPress}
              onOpenChange={setOpenSetAuthor}
              setSpigotID={setSpigotID}
            />
          </div>
        </CardHeader>
      </Card>
      <EditResource
        onConfirm={addOrUpdateEdittingResources}
        resource={resourceEditting}
        open={openEditResource}
        onOpenChange={setOpenEditResource}
      />
      <div className="w-full">
        {resources ? (
          <div className="gap-2 grid md:grid-cols-2">
            <h2 className="text-2xl font-bold text-center col-span-1 md:col-span-2">
              Select the Resources you would like to Import
            </h2>
            {resources.map((resource: any) => {
              const selected =
                selectedResources?.filter(
                  (val) => val.id === resource.id && val.category
                ).length > 0;
              return (
                <div
                  key={resource.id}
                  className="relative resource flex flex-row w-full"
                >
                  <Image
                    url={`https://www.spigotmc.org/${resource.icon.url}`}
                  />
                  <div className="ml-3">
                    <p className="text-primary font-bold">{resource.name}</p>
                    {resource.premium && <PremiumIcon />}
                  </div>
                  <div className="ml-auto flex flex-col items-center justify-between">
                    <Switch
                      id={resource.id}
                      // onClick={() => handleCheckedResource(resource.id)}
                      checked={selected}
                      className=""
                    />
                    <Button onClick={() => handleCheckedResource(resource)}>
                      Select
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h2 className="text-center">
            Please Submit your SpigotMC's Author ID
          </h2>
        )}
      </div>
    </div>
  );
}

async function loadSpigotResources(authorID: string) {
  return spigot.getResources(authorID);
}

function SetAuthor({
  spigotID,
  open,
  onOpenChange,
  handleKeyPress,
  handleImportAuthor,
  setSpigotID,
}: {
  spigotID: string;
  open: boolean;
  onOpenChange: Dispatch<React.SetStateAction<boolean>>;
  handleKeyPress: any;
  handleImportAuthor: any;
  setSpigotID: Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => onOpenChange((prev) => !prev)}>
          {`${spigotID ? "Change" : "Set"} Author ID`}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Spigot ID</DialogTitle>
          <DialogDescription>
            Adding your SpigotID gives us the right to download and store all
            information regarding all available plugins on your profile.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Your Author ID
            </Label>
            <Input
              id="name"
              placeholder={spigotID ? spigotID : "Your SpigotMC.org user id"}
              className="col-span-3"
              onChange={(e) => setSpigotID(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleImportAuthor} disabled={!spigotID}>
            Import Resources
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditResource({
  resource,
  open,
  onOpenChange,
  onConfirm,
}: {
  resource: ISelected_Resource | undefined;
  open: boolean;
  onOpenChange: any;
  onConfirm: any;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{`Configuring - ${resource?.resource.name}`}</DialogTitle>
          <DialogDescription asChild>
            <div>To Import this resource, please configure some options!</div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            onClick={() => onConfirm(resource)}
          >
            Confirm
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SaveChanges({
  open,
  onOpenChange,
  disabled,
  submit,
  spigotID,
}: {
  open: boolean;
  onOpenChange: any;
  disabled: boolean;
  submit: any;
  spigotID: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="special"
          disabled={disabled}
          onClick={() => onOpenChange((prev: boolean) => !prev)}
        >
          Save Changes
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-500">Warning!</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-2">
              <p className="text-lg">This is a Permanent Action</p>
              <p className="text-secondary-foreground">
                Once you submit your SpigotID,{" "}
                <span className="font-bold">this action cannot be undone</span>.
                Please double-check your SpigotID and resources selected before
                proceeding. Any errors or incorrect entries will be final and
                cannot be reversed!
              </p>
              <p className="text-xl text-center">
                {`Author ID: `}
                <span className=" text-secondary-foreground">{spigotID}</span>
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" variant="destructive" onClick={submit}>
            Confirm
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
