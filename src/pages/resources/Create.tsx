import {
  CreateResource_Context,
  useCreateResourceContext,
} from "@/context/CreateResourceContext";
import { useEffect, useState } from "react";
import resource from "@/api/resource";
import {
  CreateCategory,
  CreateDescription,
  CreateOptionals,
  CreateReleaseVersion,
  CreateSubtitle,
  CreateSupportVersions,
  CreateTitle,
  CreateUploadFile,
} from "@/components/resource/ResourceFields";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, CheckIcon, CircleAlertIcon } from "lucide-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PLUGIN_CATEGORY, PLUGIN_VERSION } from "minecentral-api";
import { getEnumIndexByKey, getEnumIndexByValue } from "@/utils/enum";
import { ImportFromSpigot } from "@/components/resource/ImportFromSpigot";
import { Separator } from "@radix-ui/react-select";
import Loading from "@/components/common/Loading";

export function ResourceCreate() {
  return (
    <CreateResource_Context>
      <h1 className="scroll-m-20 text-5xl font-extrabold text-center mt-6 mb-2 text-[#14B8FF]">
        New Resource
      </h1>
      <div className="grid gap-9 mx-auto my-2 max-w-6xl px-2">
        <Listener />
        <ImportFromSpigot />
        <CreateTitle />
        <CreateSubtitle />
        <CreateUploadFile />
        <CreateReleaseVersion />
        <Separator className="border-b-4" />
        <CreateCategory />
        <CreateSupportVersions />
        <CreateOptionals className="grid gap-9 my-2" />
        <CreateDescription />
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
    supportVersion,
    category,
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
    if (errors.length > 0) {
      toast("Please Fill All Required Fields!", {
        icon: <CircleAlertIcon />,
      });
      return;
    }

    // const jarError = validateJar(file);
    // if (jarError) {
    //   return; //setSelectedJarError(jarError);
    // }
    // if (!description) {
    //   return; //setDescriptionError("Please provide a description");
    // }
    // setPosting(true);

    // downsizeImage(image, (imageFile: any) => {

    const categoryNumber: number = getEnumIndexByKey(
      PLUGIN_CATEGORY,
      category || PLUGIN_CATEGORY.MISC
    );
    const supportVersions: number[] | undefined = supportVersion?.map((key) =>
      getEnumIndexByValue(PLUGIN_VERSION, key)
    );
    setPosting(true);

    resource
      .create({
        title,
        subtitle,
        description,
        category: categoryNumber,
        //Release
        file,
        version: releaseVersion,
        // OPTIONALS
        language,
        discord,
        linkSource: link_source,
        linkSupport: link_support,
        tags,
        versionSupport: supportVersions,
      })
      .then((data: any) => {
        if (data) {
          console.log("New Resource created:", data);
          navigate(`/resource/${data.id}`);
          toast("New Resource Created!", {
            icon: <CheckIcon />,
          });
        } else {
          toast("Error Posting New Resource!", {
            icon: <AlertCircleIcon />,
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
      <Button className="mx-auto" variant="special" onClick={handleCreatePost}>
        {posting ? <Loading /> : `Post New Resource`}
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
    supportVersion,
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
          releaseVersion,
          supportVersion,
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
    releaseVersion,
    supportVersion,
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
