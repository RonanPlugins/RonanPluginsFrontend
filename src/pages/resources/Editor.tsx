import {
  CreateResource_Context,
  useCreateResourceContext,
} from "@/context/CreateResourceContext";
import { useEffect, useState } from "react";
import { AlertCircleIcon, CheckIcon, CircleAlertIcon } from "lucide-react";
import resourceAPI from "@/api/resource";
import { Buffer } from "buffer";
import {
  ResourceCreateCategory,
  ResourceCreateDescription,
  ResourceCreateOptionals,
  ResourceCreateSubtitle,
  ResourceCreateSupportVersions,
  ResourceCreateTitle,
} from "@/components/resource/ResourceFields";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loading from "@/components/common/Loading";
import { PLUGIN_CATEGORY, PLUGIN_VERSION } from "minecentral-api";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEnumIndexByValue,
  getEnumKeyByIndex,
  stringArrayToEnumIndexArray,
} from "@/utils/enum";

export function ResourceEdit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState(null);

  function getResource() {
    resourceAPI.getOne(id).then((data) => {
      setResource(data);
      setLoading(false);
    });
  }

  useEffect(() => {
    getResource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <CreateResource_Context>
      <h1 className="scroll-m-20 text-5xl font-extrabold text-center mt-6 mb-2 text-[#14B8FF]">
        Edit Resource
      </h1>

      <Loader resource={resource} />

      <div className="grid gap-9 mx-auto my-3 max-w-6xl">
        <Listener />
        <ResourceCreateTitle />
        <ResourceCreateSubtitle />
        <ResourceCreateCategory />
        <ResourceCreateSupportVersions />
        <ResourceCreateOptionals className="grid gap-9 my-3" />
        <ResourceCreateDescription />
        <SubmitEdit resource={resource} />
      </div>
    </CreateResource_Context>
  );
}

function Loader({ resource }: { resource: any }) {
  const {
    set_title,
    set_subtitle,
    set_description,
    set_tags,
    set_categories,
    set_language,
    set_linkSource,
    set_linkSupport,
    set_supportVersions,
    set_discord,
  } = useCreateResourceContext();

  useEffect(() => {
    console.log(resource);
    if (resource.title) set_title(resource.title);
    if (resource.subtitle) set_subtitle(resource.subtitle);
    if (resource.description)
      set_description(
        Buffer.from(resource.description, "base64").toString("utf-8")
      );
    if (resource.tags) set_tags(resource.tags);
    if (resource.category) {
      const cats: PLUGIN_CATEGORY[] = [];
      for (const cat of resource.category) {
        const result = getEnumKeyByIndex(PLUGIN_CATEGORY, cat);
        if (result) cats.push(result);
      }
      set_categories(cats);
    }
    const versions = resource.versionSupport?.map((index: any) => {
      const obj = Object.values(PLUGIN_VERSION)[index];
      // console.log(index, obj);
      return obj;
    });
    if (versions) set_supportVersions(versions);
    if (resource.language) set_language(resource.language);
    if (resource.linkSource) set_linkSource(resource.linkSource);
    if (resource.linkSupport) set_linkSupport(resource.linkSupport);
    if (resource.discord) set_discord(resource.discord);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

function SubmitEdit({ resource }: { resource: any }) {
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

  const handleEditPost = async () => {
    const errors = getFieldsIncomplete();
    if (errors.length > 0) {
      toast("Please Fill All Required Fields!", {
        icon: <CircleAlertIcon />,
      });
      return;
    }

    const categoryList = stringArrayToEnumIndexArray(
      PLUGIN_CATEGORY,
      categories
    );
    const supportVersionsList: number[] | undefined = supportVersions?.map(
      (key: any) => getEnumIndexByValue(PLUGIN_VERSION, key)
    );
    setPosting(true);

    resourceAPI
      .edit(resource._id, {
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
          console.log("Resource updated:", data);
          navigate(`/resource/${data.id}`);
          toast("Resource Updated!", {
            icon: <CheckIcon />,
          });
        } else {
          toast("Error Editting Resource!", {
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
        Update Resource
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
    categories: category,
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
    supportVersions,
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
