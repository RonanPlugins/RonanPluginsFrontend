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
import { Dispatch, useEffect, useState } from "react";
import spigot from "@/api/spigot";
import Image from "@/components/common/Image";
import PremiumIcon from "@/components/common/PremiumIcon";
import useLocalStorageCache from "@/hooks/useLocalStorageCache";
import { PLUGIN_CATEGORY } from "minecentral-api";

interface ISelected_Resource {
  id: string;
  category?: PLUGIN_CATEGORY;
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
  const [spigotIDCACHE, setSpigotIDCACHE] = useState<string>("");
  //Dialogs
  const [openSetAuthor, setOpenSetAuthor] = useState(spigotID === null);
  const [openEditResource, setOpenEditResource] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  //Resource
  const [resources, setResources] = useState<any>();
  const [selectedResources, setSelectedResources] = useState<
    ISelected_Resource[]
  >([]);
  const [resourceEditting, setResourceEditting] = useState<ISelected_Resource>({
    id: "",
    resource: "",
  });

  async function handleImportAuthor() {
    if (!spigotID || spigotID === "") return;
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
  }, [spigotID]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleImportAuthor();
    }
  };

  const handleUpdateSpigotID = () => {
    setOpenSetAuthor(false);
    setSpigotID(spigotIDCACHE);
    setSpigotIDCACHE("");
  };

  function addOrUpdateEdittingResources(resource: ISelected_Resource) {
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
              spigotIDCACHE={spigotIDCACHE}
              disabled={user.spigotID}
              spigotID={spigotID}
              open={openSetAuthor}
              onSubmit={handleUpdateSpigotID}
              handleKeyPress={handleKeyPress}
              onOpenChange={setOpenSetAuthor}
              setSpigotIDCACHE={setSpigotIDCACHE}
            />
          </div>
        </CardHeader>
      </Card>
      <EditResource
        onConfirm={addOrUpdateEdittingResources}
        resource={resourceEditting}
        setResource={setResourceEditting}
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
                  {resource.premium && <PremiumIcon />}

                  <Image
                    url={`https://www.spigotmc.org/${resource.icon.url}`}
                  />
                  <div className="w-full flex flex-col">
                    <p className="text-primary text-center font-bold text-lg">
                      {resource.name}
                    </p>
                    <div className="grow"></div>
                    <div className="self-center justify-self-end">
                      <Button
                        variant={selected ? "outline" : "default"}
                        className="px-8"
                        onClick={() => handleCheckedResource(resource)}
                      >
                        {selected ? "Configure" : "Select"}
                      </Button>
                    </div>
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
  spigotIDCACHE,
  open,
  onOpenChange,
  handleKeyPress,
  onSubmit: onSubmit,
  setSpigotIDCACHE,
  disabled,
}: {
  spigotID: string;
  spigotIDCACHE: string;
  open: boolean;
  onOpenChange: Dispatch<React.SetStateAction<boolean>>;
  handleKeyPress: any;
  onSubmit: any;
  setSpigotIDCACHE: Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={() => onOpenChange((prev) => !prev)}
          disabled={disabled}
          variant={spigotID ? "outline" : "destructive"}
        >
          {`${spigotID ? "Correct" : "Set"} Author ID`}
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
              onChange={(e) => setSpigotIDCACHE(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={onSubmit}
            disabled={!spigotIDCACHE || spigotIDCACHE === ""}
          >
            {!spigotID ? `Import Resources` : "Update Author ID"}
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
  setResource,
  open,
  onOpenChange,
  onConfirm,
}: {
  resource: ISelected_Resource | undefined;
  setResource: Dispatch<React.SetStateAction<ISelected_Resource>>;
  open: boolean;
  onOpenChange: any;
  onConfirm: any;
}) {
  const selectCategory = (type: PLUGIN_CATEGORY) => {
    setResource(
      (prev): ISelected_Resource => ({
        ...prev,
        category: type,
      })
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{`Configuring - ${resource?.resource.name}`}</DialogTitle>
          <DialogDescription asChild>
            <div>To Import this resource, please configure some options!</div>
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Category</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 grid-cols-2 md:grid-cols-3">
            {/* <TypeList
              onSelect={selectCategory}
              selected={resource?.category ? [resource.category] : []}
              className="border-2 rounded p-1 text-center"
            /> */}
          </CardContent>
        </Card>
        <DialogFooter>
          <Button
            disabled={true}
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
