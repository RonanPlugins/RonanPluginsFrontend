import TextEditor from "@/components/textEditor/TextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loading from "@/components/common/Loading";
import resourceAPI from "@/api/resource";
import { useNavigate, useParams } from "react-router-dom";
import { Buffer } from "buffer";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }),
  summary: z.string().min(1, {
    message: "Please provide a summary",
  }),
  link_support: z.string().optional(),
  link_source: z.string().optional(),
});

export function ResourceEdit() {
  const { id } = useParams();
  const [posting, setPosting] = useState<boolean>(false);
  const [description, setDescription] = useState<string>();
  //Errors
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [resource, setResource] = useState<any>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //Form defaults
  const form = useForm({
    resolver: zodResolver(formSchema),
    values: {
      title: "",
      summary: "",
      link_support: "",
      link_source: "",
    },
  });

  async function getPlugin() {
    const pInfo = await resourceAPI.getOne(id);
    if (pInfo.description) {
      pInfo.description = Buffer.from(pInfo.description, "base64").toString(
        "utf-8"
      );
      // console.log(pInfo.description);
    }
    setResource(pInfo);
    form.setValue("title", pInfo.title);
    form.setValue("summary", pInfo.tagLine);
    form.setValue("link_support", pInfo.linkSupport);
    form.setValue("link_source", pInfo.linkSource);
    setDescription(pInfo.description);
    setLoading(false);
  }

  useEffect(() => {
    getPlugin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Posting a resource to backend + error checks
  const handleEdit = async (formData: any) => {
    if (!description) {
      return setDescriptionError("Please provide a description");
    } else {
      setDescriptionError(null);
    }
    setPosting(true);

    resourceAPI
      .edit(resource._id, {
        title: formData.title,
        tagLine: formData.summary,
        linkSource: formData.link_source,
        linkSupport: formData.link_support,
        description,
      })
      .then((data: any) => {
        if (data) {
          navigate(`/resource/${resource._id}`);
        } else {
          setPosting(false);
          setDescriptionError("An error has occured!");
        }
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="mx-auto flex flex-col w-full text-left gap-2 p-5 max-w-5xl place-content-center">
      <h1 className="font-bold text-center">Edit Resource</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleEdit)}
          className="gap-8 flex flex-col"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>
                  Name by which your resource will be displayed
                </FormDescription>
                {form.formState.errors.title && (
                  <FormMessage>
                    {form.formState.errors.title.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Input placeholder="Summary" {...field} />
                </FormControl>
                <FormDescription>
                  Brief one-line description of your resource
                </FormDescription>
                {form.formState.errors.summary && (
                  <FormMessage>
                    {form.formState.errors.summary.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          {/* Description field */}

          <div>
            <FormLabel>Description</FormLabel>
            <div className="my-2"></div>
            <TextEditor
              className="border-gray-700 border-t-0 rounded-bl-md rounded-br-md border-2 text-left p-2 min-h-64"
              onChange={setDescription}
              canEdit={true}
              content={description}
            />
            {descriptionError !== null && (
              <FormMessage>{descriptionError}</FormMessage>
            )}
          </div>

          {/* Support Link */}
          <FormField
            control={form.control}
            name="link_support"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Support</FormLabel>
                <FormControl>
                  <Input placeholder="Support Link" {...field} />
                </FormControl>
                <FormDescription>
                  Discord/Website/Email link for additional support
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Source Code Link */}
          <FormField
            control={form.control}
            name="link_source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source Code</FormLabel>
                <FormControl>
                  <Input placeholder="Source Code URL" {...field} />
                </FormControl>
                <FormDescription>
                  Link to the source code for this resource
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button className="w-[200px] " type="submit" disabled={posting}>
              Update Resource
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
