import {
  CreateResource_Context,
  useCreateResourceContext,
} from "@/context/CreateResourceContext";
import { useEffect } from "react";
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

export function ResourceCreate() {
  return (
    <CreateResource_Context>
      <h1 className="scroll-m-20 text-5xl font-extrabold text-center mt-6 mb-2 text-[#14B8FF]">
        New Resource
      </h1>
      <div className="grid gap-9 mx-auto my-2 max-w-6xl px-2">
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

function SubmitCreate() {
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
    //Submitting
    getFieldsIncomplete,
  } = useCreateResourceContext();

  const navigate = useNavigate();

  const element: React.ReactElement = (
    <div className="flex items-center">
      <CircleAlertIcon className="mr-2" />
      <span className="first-letter:capitalize">
        Please Fill All Required Fields!
      </span>
    </div>
  );

  const handleCreatePost = async () => {
    const errors = getFieldsIncomplete();
    if (errors.length > 0) {
      toast(element, {
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
    resource
      .create({
        title,
        subtitle,
        description,
        category,
        file,
        version: releaseVersion,
        // OPTIONALS
        language,
        discord,
        link_source,
        tags,
        version_support: supportVersion,
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
