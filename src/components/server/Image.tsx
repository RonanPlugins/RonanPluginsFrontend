import { useEffect, useState } from "react";
import serverAPI from "@/api/server";
import Image from "../common/Image";

export function ServerImage({
  server,
  classname,
}: {
  server: any;
  classname?: string;
}) {
  const [image, setImage] = useState<string | null>(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    serverAPI.getIcon(server._id).then((data) => {
      setImage(data);
      // console.log(data);
      // setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`relative ${
        classname ? classname : "w-full pb-[calc(15/117*100%)]"
      } h-0`}
    >
      {image ? (
        <img
          className="absolute w-full top-0 left-0 object-cover"
          src={`${image}`}
        />
      ) : (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-primary">
          <p className="text-3xl font-bold">{extractInitials(server.title)}</p>
        </div>
      )}
    </div>
  );
}

export function ServerImageIcon({
  base64,
  classname,
}: {
  base64: any;
  classname?: string;
}) {
  return <Image loading={false} classname={classname} url={base64} />;
}

function extractInitials(input: string): string {
  let result = "";
  const seen = new Set<string>();

  // Iterate over each character in the input
  for (const char of input) {
    // Check if the character is the first letter of a word or a capital letter
    if (
      (char === input[0] ||
        input[input.indexOf(char) - 1] === " " ||
        (char >= "A" && char <= "Z")) &&
      !seen.has(char.toUpperCase())
    ) {
      result += char.toUpperCase();
      seen.add(char.toUpperCase());
    }
    if (result.length >= 4) {
      break;
    }
  }

  return result;
}
