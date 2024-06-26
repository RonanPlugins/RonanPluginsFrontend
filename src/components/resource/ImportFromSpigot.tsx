import { useCreateResourceContext } from "@/context/CreateResourceContext";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Buffer } from "buffer";
import { Input } from "../ui/input";
import { useState } from "react";
import { Label } from "../ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import spiget from "@/api/spiget";
import { CheckCircle } from "lucide-react";

export function ImportFromSpigot() {
  const [spigotResourceURL, setSpigotResourceURL] = useState<string>("");
  const [spigotResourceID, setSpigotResourceID] = useState<string>("");
  const [spigotButtonText, setSpigotButtonText] =
    useState<string>("Import From Spigot");
  const [loading, setLoading] = useState(false);
  const [dialog_open, setDialog_open] = useState(false);
  const [dialog_permission, setDialog_permission] = useState(false);

  const {
    set_description,
    set_language,
    set_linkSource,
    set_linkSupport,
    set_title,
    set_subtitle,
    set_releaseVersion,
  } = useCreateResourceContext();

  function getSpigotID() {
    const resourceIDPattern: RegExp =
      /^https:\/\/www\.spigotmc\.org\/resources\/[\w-]+\.([0-9]+)\/?$/;

    const match = spigotResourceURL?.match(resourceIDPattern);
    if (match && match[1]) {
      const resourceID = match[1];
      setSpigotResourceID(resourceID);
      setDialog_open(false);
      setDialog_permission(true);
    } else {
      toast(
        "Resource ID not found in URL, please provide a valid SpigotMC URL",
        {
          className: "bg-red-700 border-none text-white",
        }
      );
      setSpigotResourceURL("");
    }
  }

  function submitSpigotURL() {
    setLoading(true);
    spiget
      .getResource(spigotResourceID)
      .then(async (data) => {
        console.log(data);
        if (data["name"]) {
          set_title(data["name"]);
        }
        if (data["tag"]) {
          set_subtitle(data["tag"]);
        }
        if (data["description"]) {
          const desc_base64 = data["description"];
          set_description(getDescriptionFromBase64(desc_base64));
        }
        if (data["sourceCodeLink"]) {
          set_linkSource(data["sourceCodeLink"]);
        }
        if (data["alternativeSupport"]) {
          set_linkSupport(data["alternativeSupport"]);
        }
        if (data["supportedLanguages"]) {
          set_language(data["supportedLanguages"]);
        }
        setDialog_open(false);
        setDialog_permission(false);
        toast("Import Success", { icon: <CheckCircle /> });
        setSpigotButtonText("Successfully Imported!");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      {/* Spigot Import */}
      <Dialog open={dialog_open} onOpenChange={setDialog_open}>
        <DialogTrigger asChild>
          <Button className="ml-auto">{spigotButtonText}</Button>
        </DialogTrigger>
        <DialogContent>
          <Label>Spigot Resource Link</Label>
          <Input
            value={spigotResourceURL}
            placeholder="Resource Link from SpigotMC"
            onChange={(e) => setSpigotResourceURL(e.target.value)}
            disabled={loading}
          />
          <p className="text-muted-foreground">
            Enter your resource URL on spigotmc.org
          </p>

          <DialogFooter>
            <Button
              disabled={!spigotResourceURL || loading}
              onClick={getSpigotID}
            >
              Import
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Permission Dialog */}
      <Dialog open={dialog_permission} onOpenChange={setDialog_permission}>
        <DialogContent className="max-w-2xl">
          <Label className="text-xl text-red-500">Warning!</Label>

          <p className="text-md">
            You may <span className="font-bold">only</span> import/upload
            resources if you're the owner or been given express, written
            permission by the owner of the resource!
          </p>
          <p className="text-muted-foreground">
            If you attempt to import a resource that you don't have the rights
            to, you will be banned, without an option to appeal!
          </p>

          <DialogFooter>
            <Button
              disabled={!spigotResourceURL || loading}
              onClick={submitSpigotURL}
            >
              I Have Permission
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function getDescriptionFromBase64(base64: string) {
  let description = base64ToString(base64);
  description = description.replace(
    /<img([^>]*)\bsrc\b\s*=\s*"[^"]*"\s*([^>]*)>/g,
    (match) => {
      const withoutSrc = match.replace(/\bsrc\b\s*=\s*"[^"]*"\s*/g, ""); // Remove src attribute and its value
      const withDataUrlAsSrc = withoutSrc.replace(/\bdata-url\b/g, "src"); // Replace data-url with src
      return withDataUrlAsSrc;
    }
  );
  // console.log('desc', description);
  return description;
}
function base64ToString(base64: string): string {
  return Buffer.from(base64, "base64").toString("utf-8");
}
