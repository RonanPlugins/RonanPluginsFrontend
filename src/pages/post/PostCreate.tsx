import TextEditor from "@/components/textEditor/TextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
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

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  password: z.string(),
});

export default function PostCreate() {
  const [description, setDescription] = useState(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleCreatePost = (formData: any) => {
    console.log(formData, description);
    // post.createPost({ test: true });
  };

  return (
    <div className="mx-auto flex flex-col w-full text-left gap-2 p-5 max-w-5xl place-content-center">
      <h1 className="font-bold text-center">New Resource</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreatePost)}
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
              </FormItem>
            )}
          />
          {/* Description field */}

          <div>
            <FormLabel>Description</FormLabel>
            <div className="my-2"></div>
            <TextEditor onChange={setDescription} />
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
            <Button className="w-[200px] " type="submit">
              Post Resource
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

/**
 * <div className="mx-auto flex flex-col w-full text-center gap-2 p-5 max-w-5xl place-content-center">
        <h1 className="font-bold">Post a new Resource</h1>
        <div className="my-2">
          <h2 className="text-left">Title</h2>
          <Input
            type="title"
            placeholder="Name by which your resource will be displayed"
          />
        </div>
        <div className="my-2">
          <h2 className="text-left">Summary</h2>
          <Input
            type="title"
            placeholder="Brief one-line description of your resource"
          />
        </div>
        <div className="my-2">
          <h2 className="text-left">Description</h2>
          <TextEditor onChange={setDescription} />
        </div>
        <div className="my-2">
          <h2 className="text-left">Support Link</h2>
          <Input type="title" placeholder="Discord/Website/Email for support" />
        </div>
        <div className="my-2">
          <h2 className="text-left">Source Code</h2>
          <Input
            type="title"
            placeholder="Link to the source code for this resource."
          />
        </div>
        <Button className="mt-10" onClick={handleCreatePost}>
          Post Resource
        </Button>
      </div>
 */
