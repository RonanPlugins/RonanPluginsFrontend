import { TextEditor } from "@/components/textEditor/TextEditor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateResource_Context,
  useCreateResourceContext,
} from "@/context/CreateResourceContext";
import { toggleFromArray } from "@/utils/array";
import { enumToArray } from "@/utils/enum";
import { formatToTitleCase } from "@/utils/formatter";
import { PLUGIN_CATEGORY, PLUGIN_VERSION } from "minecentral-api";
import { DiscordTutorial } from "./DiscordTutorial";
import { useEffect } from "react";
import { Upload } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { validateJar } from "@/utils/validators";
import resource from "@/api/resource";

export function ResourceCreate() {
  return (
    <CreateResource_Context>
      <h1 className="scroll-m-20 text-5xl font-extrabold text-center mt-6 mb-2 text-[#14B8FF]">
        New Resource
      </h1>
      <div className="grid gap-9 mx-auto my-2 max-w-6xl">
        <Listener />
        <CreateTitle />
        <CreateSubtitle />
        <CreateUploadFile />
        <CreateReleaseVersion />
        <CreateCategory />
        <CreateSupportVersions />
        <CreateOptionals className="grid gap-9 my-2" />
        <CreateDescription />
        <SubmitCreate />
      </div>
    </CreateResource_Context>
  );
}

function CreateTitle() {
  const { title, set_title } = useCreateResourceContext();
  return (
    <section className="flex flex-col space-y-3">
      <Label>Title</Label>
      <Input
        placeholder="Resource name"
        value={title || ""}
        onChange={(e: any) => {
          set_title(e.target.value);
        }}
      />

      <p className="text-sm text-muted-foreground">
        Name by which your resource will be displayed
      </p>
    </section>
  );
}

function CreateSubtitle() {
  const { subtitle, set_subtitle } = useCreateResourceContext();
  return (
    <section className="flex flex-col space-y-3">
      <Label>Subtitle</Label>
      <Input
        placeholder="Resource Subtitle"
        value={subtitle || ""}
        onChange={(e: any) => {
          set_subtitle(e.target.value);
        }}
      />

      <p className="text-sm text-muted-foreground">
        Brief one-line description of your resource
      </p>
    </section>
  );
}
function CreateUploadFile() {
  const { set_file } = useCreateResourceContext();
  return (
    <section className="flex flex-col space-y-3">
      <Label>Your Resource</Label>
      <Input
        type="file"
        accept=".zip,.jar"
        className="text-muted-foreground file:mr-3 file:py-1 file:px-3 file:rounded-full file:text-xs file:font-medium
                  file:bg-secondary file:text-secondary-foreground hover:file:cursor-pointer cursor-pointer hover:file:bg-primary"
        onChange={(e) => {
          set_file(e.target.files?.[0] || null);
        }}
      />

      <p className="text-sm text-muted-foreground">
        File will be uploaded once "Post Resource" is clicked below
      </p>
    </section>
  );
}

function CreateReleaseVersion() {
  const { releaseVersion, set_releaseVersion } = useCreateResourceContext();
  return (
    <div className="flex flex-col space-y-3">
      <Label>Resource String Version</Label>
      <Input
        placeholder="Resource String Version"
        value={releaseVersion || ""}
        onChange={(e: any) => {
          set_releaseVersion(e.target.value);
        }}
      />

      <p className="text-sm text-muted-foreground">
        The string of your resource, like 1.3
      </p>
    </div>
  );
}

function CreateCategory() {
  const { category, set_category } = useCreateResourceContext();
  return (
    <div className="flex flex-col space-y-3">
      <Label>Category</Label>
      <div className="flex flex-row flex-wrap justify-center">
        {enumToArray(PLUGIN_CATEGORY) //Filter out Number values (typescript stuff)
          .map((type: any) => {
            // const type = CATEGORY_PLUGIN[key as keyof typeof CATEGORY_PLUGIN];
            return (
              <Button
                key={type}
                variant={category === type ? "special" : "secondary"}
                className="mb-2 mx-1 rounded-full max-w-36 w-full"
                onClick={() => {
                  set_category(type);
                }}
              >
                {formatToTitleCase(type)}
              </Button>
            );
          })}
      </div>
    </div>
  );
}

function CreateSupportVersions() {
  const { supportVersion, set_supportVersion } = useCreateResourceContext();
  return (
    <div className="flex flex-col space-y-3">
      <Label>Supported Minecraft Versions</Label>
      <div className="flex flex-row flex-wrap justify-center">
        {Object.values(PLUGIN_VERSION) //Filter out Number values (typescript stuff)
          .map((type: any) => {
            // const type = CATEGORY_PLUGIN[key as keyof typeof CATEGORY_PLUGIN];
            return (
              <Button
                key={type}
                variant={
                  supportVersion?.includes(type) ? "special" : "secondary"
                }
                className="mb-2 mx-1 rounded-full max-w-20 w-full"
                onClick={() => {
                  set_supportVersion((prev) => toggleFromArray(prev, type));
                }}
              >
                {formatToTitleCase(type)}
              </Button>
            );
          })}
      </div>
      <p className="text-sm text-muted-foreground">
        What versions of Minecraft is your resource{" "}
        <span className="font-bold">known</span> to work in
      </p>
    </div>
  );
}

function CreateDescription() {
  const { description, set_description } = useCreateResourceContext();
  return (
    <div>
      <Label>Description</Label>
      <div className="my-2"></div>
      <TextEditor content={description} onChange={set_description} />
    </div>
  );
}

function CreateOptionals({ className }: { className: string }) {
  const {
    language,
    set_language,
    link_source,
    set_linkSource,
    discord,
    set_discord,
    tags,
    set_tags,
  } = useCreateResourceContext();
  return (
    <div className={className}>
      {/* Languages */}
      <section className="flex flex-col space-y-3">
        <Label>Supported Languages</Label>
        <Input
          placeholder="Supported Languages"
          value={language || ""}
          onChange={(e: any) => {
            set_language(e.target.value);
          }}
        />

        <p className="text-sm text-muted-foreground">
          Languages (if any) have your resource been localized in?
        </p>
      </section>
      {/* Source Code */}
      <section className="flex flex-col space-y-3">
        <Label>Source Code Link</Label>
        <Input
          placeholder="Source Code Link"
          value={link_source || ""}
          onChange={(e: any) => {
            set_linkSource(e.target.value);
          }}
        />

        <p className="text-sm text-muted-foreground">
          A link to your projects source code or repository
        </p>
      </section>
      {/* Discord */}
      <section className="flex flex-col space-y-3">
        <Label>Discord Server ID</Label>
        <Input
          placeholder="Discord Server ID"
          value={discord || ""}
          onChange={(e: any) => {
            set_discord(e.target.value);
          }}
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-sm text-muted-foreground pointer"
            >
              Click to learn how to Find/Enable your Discord Server Widget.
              Copy/paste your Server ID above.
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl h-5/6">
            <DiscordTutorial />
          </DialogContent>
        </Dialog>
      </section>
      {/* Tags */}
      <section className="flex flex-col space-y-3">
        <Label>Tags</Label>
        <Input
          placeholder="First,Second,Third"
          value={tags || ""}
          onChange={(e: any) => {
            set_tags(e.target.value);
          }}
        />

        <p className="text-sm text-muted-foreground">
          Improve discoverability by adding{" "}
          <span className="font-bold">relevant</span> tags to your resource. Use
          letters, numbers, and dashes to create your tags, and separate them
          with commas or spaces. You can use up to 64 characters.
        </p>
      </section>
    </div>
  );
}

function SubmitCreate() {
  const {
    title,
    subtitle,
    file,
    versions,
    category,
    description,
    //Optional
    language,
    link_source,
    discord,
    tags,
  } = useCreateResourceContext();

  const handleCreatePost = async () => {
    const jarError = validateJar(file);
    if (jarError) {
      return; //setSelectedJarError(jarError);
    }
    if (!description) {
      return; //setDescriptionError("Please provide a description");
    }
    // setPosting(true);

    // downsizeImage(image, (imageFile: any) => {
    resource
      .create({
        title: title,
        tagLine: subtitle,
        linkSource: link_source,
        // linkSupport: link_support,
        description,
        // image: imageFile,
        release: {
          version: versions,
          file,
        },
      })
      .then((data: any) => {
        if (data) {
          console.log("New Resource created:", data);
          // navigate(`/resource/${data.id}`);
          Toaster("New Resource Created!", {
            icon: <Upload />,
          });
        } else {
          // setPosting(false);
          // setDescriptionError("An error has occured!");
        }
        // });
      });
  };

  return (
    <div className="w-full flex">
      <Button className="mx-auto" variant="special" onClick={handleCreatePost}>
        Post New Resource
      </Button>
    </div>
  );
}

//Shows a window dialog to remind user their form is not submitted!
function Listener() {
  const {
    title,
    subtitle,
    file,
    versions,
    category,
    description,
    //Optional
    language,
    link_source,
    discord,
    tags,
  } = useCreateResourceContext();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (
        [
          title,
          subtitle,
          file,
          versions,
          category,
          description,
          //Optional
          language,
          link_source,
          discord,
          tags,
        ].some((val) => val)
      ) {
        const confirmationMessage =
          "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = confirmationMessage; // Standard for most browsers
        return confirmationMessage; // For old versions of some browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [
    title,
    subtitle,
    file,
    versions,
    category,
    description,
    //Optional
    language,
    link_source,
    discord,
    tags,
  ]);

  return <></>;
}
