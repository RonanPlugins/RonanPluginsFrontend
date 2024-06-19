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
import { toast } from "sonner";
import { Upload } from "lucide-react";
import usePageTitle from "@/utils/usePageTitle";
import { Switch } from "@/components/ui/switch";
import { useUserContext } from "@/context/UserContext";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_JAR_SIZE = 50000000;
const ACCEPTED_JAR_TYPES = [".jar", ".zip"];

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }),
  summary: z.string().min(1, {
    message: "Please provide a summary",
  }),
  link_support: z.string().optional(),
  link_source: z.string().optional(),
  version: z.string().min(1, {
    message: "Please provide a version id",
  }),
  premium: z.boolean().default(false),
});

export function ResourceCreate() {
  usePageTitle("New Resource");
  const { isPremiumReady } = useUserContext();
  const [posting, setPosting] = useState<boolean>(false);
  //Description state (read-only)
  const [description, setDescription] = useState(null);
  //Resource Image
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  //Resource Jar
  const [selectedJar, setSelectedJar] = useState<File | null>(null);
  //Errors
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [selectedImageError, setSelectedImageError] = useState<string | null>(
    null
  );
  const [selectedJarError, setSelectedJarError] = useState<string | null>(null);
  const navigate = useNavigate();
  //Form defaults
  const form = useForm({
    resolver: zodResolver(formSchema),
    values: {
      title: "",
      summary: "",
      link_support: "",
      link_source: "",
      version: "",
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
    const jarError = validateJar(selectedJar);
    if (jarError) {
      return setSelectedJarError(jarError);
    } else {
      setSelectedJarError(null);
    }
    if (!description) {
      return setDescriptionError("Please provide a description");
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
          jar: selectedJar,
          version: formData.version,
        })
        .then((data: any) => {
          if (data) {
            navigate(`/resource/${data._id}`);
            toast("New Resource Created!", {
              icon: <Upload />,
            });
          } else {
            setPosting(false);
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
          <div className={`${isPremiumReady ? "visible" : "hidden"}`}>
            <p>Premium</p>
            <Switch />
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Resource name" {...field} />
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
            name="version"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Version</FormLabel>
                <FormControl>
                  <Input placeholder="Resource release version" {...field} />
                </FormControl>
                {form.formState.errors.version && (
                  <FormMessage>
                    {form.formState.errors.version.message}
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

          <div className="w-[200px] h-[200px] border-2 object-contain bg-slate-200">
            {previewImage && <img src={previewImage} alt="Selected" />}
          </div>

          {/* Resource Image */}
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

          {/* Resource File */}
          <FormItem>
            <FormLabel>Upload Your Resource</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".zip,.jar"
                onChange={(e) => {
                  setSelectedJar(e.target.files?.[0] || null);
                }}
              />
            </FormControl>
            {selectedJarError !== null && (
              <FormMessage>{selectedJarError}</FormMessage>
            )}
          </FormItem>

          <div className="flex justify-center">
            <Button className="w-[200px] " type="submit" disabled={posting}>
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

function validateJar(jar: File | null): string | null {
  if (!jar) {
    return "Please select a file";
  } else {
    if (!(jar.size <= MAX_JAR_SIZE)) {
      return `Max file size exceeded (${(jar.size / 1000000).toFixed(
        2
      )}MB / 50MB)`;
    } else {
      for (const type of ACCEPTED_JAR_TYPES) {
        if (jar.name.endsWith(type)) return null;
      }
      return "Only .zip, .jar formats are supported";
    }
  }
}

async function downsizeImage(file: any, callback: any) {
  resizeFile(file).then((newFile) => callback(newFile));
}
