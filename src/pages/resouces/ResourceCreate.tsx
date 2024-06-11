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
import { resizeFile } from "@/utils/imageResizer";
import resourceAPI from "@/api/resource";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  summary: z.string(),
  link_support: z.string(),
  link_source: z.string(),
});

export default function PostCreate() {
  //Are we posting this to the backend?
  const [posting, setPosting] = useState<boolean>(false);
  //Description state (read-only)
  const [description, setDescription] = useState(null);
  //Resource Image
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  //Errors
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [selectedImageError, setSelectedImageError] = useState<string | null>(
    null
  );
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

  //Posting a resource to backend + error checks
  const handleCreatePost = async (formData: any) => {
    const imageError = validateImage(selectedImage);
    if (imageError) {
      return setSelectedImageError(imageError);
    } else {
      setSelectedImageError(null);
    }
    if (!description) {
      return setDescriptionError("Please provide a description!");
    } else {
      setDescriptionError(null);
    }
    setPosting(true);

    downsizeImage(selectedImage, (imageFile: any) => {
      resourceAPI
        .create({
          title: formData.title,
          tagLine: formData.summary,
          linkSource: formData.link_source,
          linkSupport: formData.link_support,
          description,
          image: imageFile,
        })
        .then((data: any) => {
          if (data) {
            navigate(`/post/${data._id}`);
          } else {
            setDescriptionError("An error has occured!");
          }
        });
    });
  };

  useEffect(() => {
    if (selectedImage) setPreviewImage(URL.createObjectURL(selectedImage));
  }, [selectedImage]);

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
            <TextEditor
              className="border-gray-700 border-t-0 rounded-bl-md rounded-br-md border-2 text-left p-2 min-h-64"
              onChange={setDescription}
              canEdit={true}
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

          <div className="w-[200px] h-[200px] border-2 bg-slate-200">
            {previewImage && <img src={previewImage} alt="Selected" />}
          </div>

          <FormItem>
            <FormLabel>Resource Image</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setSelectedImage(e.target.files?.[0] || null);
                }}
              />
            </FormControl>
            {selectedImageError !== null && (
              <FormMessage>{selectedImageError}</FormMessage>
            )}
          </FormItem>

          <div className="flex justify-center">
            <Button className="w-[200px] " type="submit">
              {/* disabled={posting} */}
              Post Resource
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function validateImage(image: File | null): string | null {
  if (!image) {
    return "Please select a resource image!";
  } else {
    if (!(image.size <= MAX_FILE_SIZE)) {
      return `Max file size exceeded (${(image.size / 1000000).toFixed(
        2
      )}MB / 5MB)`;
    } else {
      if (!ACCEPTED_IMAGE_TYPES.includes(image.type)) {
        return "Only .jpg, .jpeg, .png and .webp formats are supported";
      }
    }
  }
  return null;
}

async function downsizeImage(file: any, callback: any) {
  resizeFile(file).then((newFile) => callback(newFile));
}
