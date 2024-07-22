import {
  ServerCreateAddress,
  ServerCreateCategory,
  ServerCreateDescription,
  ServerCreateOptionals,
  ServerCreateSubtitle,
  ServerCreateTitle,
  ServerCreateVotifier,
} from "@/components/server/ServerFields";

import { Separator } from "@radix-ui/react-select";
import {
  CreateServer_Context,
  useCreateServerContext,
} from "@/context/CreateServerContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AlertCircleIcon, CheckIcon, CircleAlertIcon } from "lucide-react";
import { SERVER_CATEGORY } from "minecentral-api";
import { stringArrayToEnumIndexArray } from "@/utils/enum";
import server from "@/api/server";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ServerCreate() {
  return (
    <CreateServer_Context>
      <h1 className="scroll-m-20 text-5xl font-extrabold text-center mt-6 mb-2 text-[#14B8FF] drop-shadow-lg">
        Add Your Server
      </h1>
      <div className="grid gap-9 mx-auto my-3 max-w-6xl px-2">
        <Listener />
        <ServerCreateTitle />
        <ServerCreateSubtitle />
        <ServerCreateAddress />
        <Separator className="border-b-4" />
        <ServerCreateCategory />
        <ServerCreateOptionals className="grid gap-9 my-3" />
        <ServerCreateDescription />
        <ServerCreateVotifier />
        <SubmitCreate />
      </div>
    </CreateServer_Context>
  );
}

function SubmitCreate() {
  const [posting, setPosting] = useState(false);
  const {
    title,
    subtitle,
    address,
    port,
    categories,
    description,
    //Optional
    vote_ip,
    vote_port,
    vote_token,
    language,
    discord,
    tags,
    //Submitting
    getFieldsIncomplete,
  } = useCreateServerContext();

  const navigate = useNavigate();

  const handleCreatePost = async () => {
    const errors = getFieldsIncomplete();
    if (errors.length > 0) {
      toast("Please Fill All Required Fields!", {
        icon: <CircleAlertIcon />,
      });
      return;
    }

    const categoryList = stringArrayToEnumIndexArray(
      SERVER_CATEGORY,
      categories
    );

    setPosting(true);
    toast.loading("Creating Server...", {
      id: "create-server",
      duration: Infinity,
    });

    server
      .create({
        title,
        subtitle,
        description,
        category: categoryList,
        address,
        port,
        // OPTIONALS
        vote_ip,
        vote_port,
        vote_token,
        language,
        discord,
        tags,
      })
      .then((data: any) => {
        console.log("New Resource created:", data);
        navigate(`/server/${data.id}`);
        toast.success("Server Posted!", {
          icon: <CheckIcon />,
          id: "create-server",
          duration: 3000,
        });
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast.error("Error! Server already exists!", {
            icon: <AlertCircleIcon />,
            id: "create-server",
            duration: 3000,
          });
        } else {
          toast.error("Error Adding Server!", {
            icon: <AlertCircleIcon />,
            id: "create-server",
            duration: 3000,
          });
        }
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
        Add Your Server
      </Button>
    </div>
  );
}

//Shows a window dialog to remind user their form is not submitted!
function Listener() {
  const {
    title,
    subtitle,
    address,
    port,
    categories,
    description,
    //Optional
    language,
    discord,
    tags,
  } = useCreateServerContext();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (
        [
          title,
          subtitle,
          address,
          port,
          categories,
          description,
          //Optional
          language,
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
    address,
    port,
    categories,
    description,
    //Optional
    language,
    discord,
    tags,
  ]);

  return <></>;
}
