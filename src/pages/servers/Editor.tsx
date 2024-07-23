import { useEffect, useState } from "react";
import { AlertCircleIcon, CheckIcon, CircleAlertIcon } from "lucide-react";
import { Buffer } from "buffer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loading from "@/components/common/Loading";
import { SERVER_CATEGORY } from "minecentral-api";
import { useNavigate, useParams } from "react-router-dom";
import { getEnumKeyByIndex, stringArrayToEnumIndexArray } from "@/utils/enum";
import serverAPI from "@/api/server";
import {
  ServerCreateAddress,
  ServerCreateCategory,
  ServerCreateDescription,
  ServerCreateOptionals,
  ServerCreateSubtitle,
  ServerCreateTitle,
  ServerCreateVotifier,
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

      <Loader server={server} />

      <div className="grid gap-9 mx-auto my-3 max-w-6xl">
        <Listener />
        <ServerCreateTitle />
        <ServerCreateSubtitle />
        <ServerCreateAddress />
        <Separator className="border-b-4" />
        <ServerCreateCategory />
        <ServerCreateOptionals className="grid gap-9 my-3" />
        <ServerCreateDescription />
        <ServerCreateVotifier />
        <SubmitEdit server={server} />
      </div>
    </CreateServer_Context>
  );
}

function Loader({ server }: { server: any }) {
  const {
    set_title,
    set_subtitle,
    set_description,
    set_tags,
    set_categories,
    set_language,
    set_discord,
    set_address,
    set_port,
    set_vote_ip,
    set_vote_port,
    set_vote_token,
  } = useCreateServerContext();

  useEffect(() => {
    if (!server) {
      console.warn("Severe! No data loaded for edit server page!");
      return;
    }
    if (server.title) set_title(server.title);
    if (server.subtitle) set_subtitle(server.subtitle);
    if (server.description)
      set_description(
        Buffer.from(server.description, "base64").toString("utf-8")
      );
    if (server.tags) set_tags(server.tags);
    if (server.category) {
      const cats: SERVER_CATEGORY[] = [];
      for (const cat of server.category) {
        const result = getEnumKeyByIndex(SERVER_CATEGORY, cat);
        if (result) cats.push(result);
      }
      set_categories(cats);
    }
    if (server.language) set_language(server.language);
    if (server.discord) set_discord(server.discord);
    if (server.address) set_address(server.address);
    if (server.port) set_port(server.port);
    if (server.vote_ip) set_vote_ip(server.vote_ip);
    if (server.vote_port) set_vote_port(server.vote_port);
    if (server.vote_token) set_vote_token(server.vote_token);
    console.log(server);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

function SubmitEdit({ server }: { server: any }) {
  const [posting, setPosting] = useState(false);
  const {
    title,
    subtitle,
    categories,
    description,
    address,
    port,
    //Optional
    language,
    discord,
    tags,
    vote_ip,
    vote_port,
    vote_token,
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

    const categoryList = stringArrayToEnumIndexArray(
      SERVER_CATEGORY,
      categories
    );
    setPosting(true);

    serverAPI
      .edit(server._id, {
        title,
        subtitle,
        description,
        category: categoryList,
        address,
        port,
        // OPTIONALS
        language,
        discord,
        tags,
        vote_ip,
        vote_port,
        vote_token,
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
      <Button
        className="mx-auto"
        variant="special"
        onClick={handleEditPost}
        disabled={posting}
      >
        Update Server
      </Button>
    </div>
  );
}

//Shows a window dialog to remind user their form is not submitted!
function Listener() {
  const {
    title,
    subtitle,
    categories,
    description,
    address,
    port,
    //Optional
    language,
    discord,
    tags,
    vote_ip,
    vote_port,
    vote_token,
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
          vote_ip,
          vote_port,
          vote_token,
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
    vote_ip,
    vote_port,
    vote_token,
  ]);

  return <></>;
}
