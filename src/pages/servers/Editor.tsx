import { useEffect, useState } from "react";
import { AlertCircleIcon, CheckIcon, CircleAlertIcon } from "lucide-react";
import { Buffer } from "buffer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loading from "@/components/common/Loading";
import { SERVER_CATEGORY } from "minecentral-api";
import { useNavigate, useParams } from "react-router-dom";
import { getEnumIndexByKey } from "@/utils/enum";
import serverAPI from "@/api/server";
import {
  ServerCreateAddress,
  ServerCreateCategory,
  ServerCreateDescription,
  ServerCreateOptionals,
  ServerCreateSubtitle,
  ServerCreateTitle,
} from "@/components/server/ServerFields";
import { Separator } from "@radix-ui/react-separator";
import {
  CreateServer_Context,
  useCreateServerContext,
} from "@/context/CreateServerContext";

export function ServerEdit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [server, setServer] = useState(null);

  function getServer() {
    serverAPI.getOne(id).then((data) => {
      setServer(data);
      setLoading(false);
    });
  }

  useEffect(() => {
    getServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <CreateServer_Context>
      <h1 className="scroll-m-20 text-5xl font-extrabold text-center mt-6 mb-2 text-[#14B8FF]">
        Edit Server
      </h1>

      <Loader resource={server} />

      <div className="grid gap-9 mx-auto my-3 max-w-6xl">
        <Listener />
        <ServerCreateTitle />
        <ServerCreateSubtitle />
        <ServerCreateAddress />
        <Separator className="border-b-4" />
        <ServerCreateCategory />
        <ServerCreateOptionals className="grid gap-9 my-3" />
        <ServerCreateDescription />
        <SubmitEdit server={server} />
      </div>
    </CreateServer_Context>
  );
}

function Loader({ resource }: { resource: any }) {
  const {
    set_title,
    set_subtitle,
    set_description,
    set_tags,
    set_category,
    set_language,
    set_discord,
  } = useCreateServerContext();

  useEffect(() => {
    if (resource.title) set_title(resource.title);
    if (resource.subtitle) set_subtitle(resource.subtitle);
    if (resource.description)
      set_description(
        Buffer.from(resource.description, "base64").toString("utf-8")
      );
    if (resource.tags) set_tags(resource.tags);
    if (resource.category)
      set_category(
        SERVER_CATEGORY[resource.category as keyof typeof SERVER_CATEGORY]
      );
    if (resource.language) set_language(resource.language);
    if (resource.discord) set_discord(resource.discord);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

function SubmitEdit({ server }: { server: any }) {
  const [posting, setPosting] = useState(false);
  const {
    title,
    subtitle,
    category,
    description,
    address,
    port,
    //Optional
    language,
    discord,
    tags,
    //Submitting
    getFieldsIncomplete,
  } = useCreateServerContext();

  const navigate = useNavigate();

  const handleEditPost = async () => {
    const errors = getFieldsIncomplete();
    if (errors.length > 0) {
      toast("Please Fill All Required Fields!", {
        icon: <CircleAlertIcon />,
      });
      return;
    }

    const categoryNumber: number = getEnumIndexByKey(
      SERVER_CATEGORY,
      category || SERVER_CATEGORY.ADVENTURE
    );
    setPosting(true);

    serverAPI
      .edit(server._id, {
        title,
        subtitle,
        description,
        category: categoryNumber,
        address,
        port,
        // OPTIONALS
        language,
        discord,
        tags,
      })
      .then((data: any) => {
        if (data) {
          console.log("Server updated:", data);
          navigate(`/server/${data.id}`);
          toast("Server Updated!", {
            icon: <CheckIcon />,
          });
        } else {
          toast("Error Editting Server!", {
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
      <Button className="mx-auto" variant="special" onClick={handleEditPost}>
        {posting ? <Loading /> : `Update Resource`}
      </Button>
    </div>
  );
}

//Shows a window dialog to remind user their form is not submitted!
function Listener() {
  const {
    title,
    subtitle,
    category,
    description,
    address,
    port,
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
          category,
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
    category,
    description,
    //Optional
    language,
    discord,
    tags,
  ]);

  return <></>;
}
