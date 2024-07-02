import resourceAPI from "@/api/resource";
import { Download, DownloadIcon, FileWarning } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import fileDownload from "js-file-download";
import { extension } from "mime-types";
import { toast } from "sonner";

export function ResourceDownload({
  version,
  resource,
  name,
  classname,
}: {
  version: string;
  resource: any;
  name: string;
  classname?: string;
}) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    const jarFile = await resourceAPI.getJar(resource._id);
    if (jarFile) {
      console.log(
        blobToFile(
          jarFile,
          `${name}-${version}.${extension(jarFile.type) || "zip"}`
        )
      );
      fileDownload(jarFile, jarFile.name);
      toast.success("Download has started", {
        icon: <DownloadIcon />,
      });
    } else {
      toast.error("Error downloading file!", {
        icon: <FileWarning />,
        className: "bg-red-700 border-none text-white",
      });
    }
    setDownloading(false);
  }

  return (
    <Button
      className={classname}
      disabled={downloading}
      onClick={handleDownload}
    >
      <Download className="mr-2" size="20" />
      Download {version}
    </Button>
  );
}

function blobToFile(theBlob: Blob, fileName: string): File {
  const b: any = theBlob;
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  //Cast to a File() type
  return theBlob as File;
}
