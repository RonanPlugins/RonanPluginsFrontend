import {
  CreateResource_Context,
  useCreateResourceContext,
} from "@/context/CreateResourceContext";
import { useEffect, useState } from "react";
import resource from "@/api/resource";
import {
  ResourceCreateCategory,
  ResourceCreateDescription,
  ResourceCreateOptionals,
  ResourceCreateReleaseVersion,
  ResourceCreateSubtitle,
  ResourceCreateSupportVersions,
  ResourceCreateTitle,
  ResourceCreateUploadFile,
} from "@/components/resource/ResourceFields";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, CheckIcon, CircleAlertIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PLUGIN_CATEGORY, PLUGIN_VERSION } from "minecentral-api";
import { stringArrayToEnumIndexArray } from "@/utils/enum";
import { ImportFromSpigot } from "@/components/resource/ImportFromSpigot";
import { Separator } from "@radix-ui/react-select";

export function ResourceCreate() {
  return (
    <CreateResource_Context>
      <h1 className="scroll-m-20 text-5xl font-extrabold text-center mt-6 mb-2 text-[#14B8FF] drop-shadow-lg">
        New Resource
      </h1>
      <div className="grid gap-9 mx-auto my-3 max-w-6xl px-2">
        <Listener />
        <ImportFromSpigot />
        <ResourceCreateTitle />
        <ResourceCreateSubtitle />
        <ResourceCreateUploadFile />
        <ResourceCreateReleaseVersion />
        <Separator className="border-b-4" />
        <ResourceCreateCategory />
        <ResourceCreateSupportVersions />
        <ResourceCreateOptionals className="grid gap-9 my-3" />
        <ResourceCreateDescription />
        <SubmitCreate />
      </div>
    </CreateResource_Context>
  );
}

function SubmitCreate() {
  const [posting, setPosting] = useState(false);
  const {
    title,
    subtitle,
    file,
    releaseVersion,
    supportVersions,
    categories,
    description,
    //Optional
    language,
    link_source,
    link_support,
    discord,
    tags,
    //Submitting
    getFieldsIncomplete,
  } = useCreateResourceContext();

  const navigate = useNavigate();

  const handleCreatePost = async () => {
    const errors = getFieldsIncomplete();
    if (errors.length > 0 || !file || !releaseVersion) {
      toast("Please Fill All Required Fields!", {
        icon: <CircleAlertIcon />,
      });
      return;
    }
    const categoryList = stringArrayToEnumIndexArray(
      PLUGIN_CATEGORY,
      categories
    );
    const supportVersionsList = stringArrayToEnumIndexArray(
      PLUGIN_VERSION,
      supportVersions
    );

    setPosting(true);
    toast.loading("Posting Resource...", {
      id: "create-resource",
      duration: Infinity,
    });

    resource
      .create({
        title,
        subtitle,
        description,
        category: categoryList,
        //Release
        file,
        version: releaseVersion,
        // OPTIONALS
        language,
        discord,
        linkSource: link_source,
        linkSupport: link_support,
        tags,
        versionSupport: supportVersionsList,
      })
      .then((data: any) => {
        if (data) {
          console.log("New Resource created:", data);
          navigate(`/resource/${data.id}`);
          toast.success("Resource Posted!", {
            icon: <CheckIcon />,
            id: "create-resource",
            duration: 3000,
          });
        } else {
          toast.error("Error Posting New Resource!", {
            icon: <AlertCircleIcon />,
            id: "create-resource",
            duration: 3000,
          });
          // setPosting(false);
          // setDescriptionError("An error has occured!");
        }
        // });
      })
      .finally(() => {
        setPosting(false);
      });
  };

  return (
    <div className="w-full flex">
      <Button
        className="mx-auto"
        variant="special"
        onClick={handleCreatePost}
        disabled={posting}
      >
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
    releaseVersion,
    supportVersions,
    categories,
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
          releaseVersion,
          supportVersions,
          categories,
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
    releaseVersion,
    supportVersions,
    categories,
    description,
    //Optional
    language,
    link_source,
    discord,
    tags,
  ]);

  return <></>;
}
