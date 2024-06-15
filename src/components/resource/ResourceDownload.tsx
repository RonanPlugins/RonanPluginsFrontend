import resourceAPI from "@/api/resource";
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import fileDownload from "js-file-download";
import { extension } from "mime-types";
export default function ResourceDownload({
  version,
  id,
  name,
}: {
  version: string;
  id: string;
  name: string;
}) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    const jarFile = await resourceAPI.getJar(id);
    console.log(
      blobToFile(
        jarFile,
        `${name}-${version}.${extension(jarFile.type) || "zip"}`
      )
    );
    fileDownload(jarFile, jarFile.name);
    setDownloading(false);
  }

  return (
    <Button
      className="ml-auto my-auto"
      disabled={downloading}
      onClick={handleDownload}
    >
      <Download className="mr-2" size={20} />
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
