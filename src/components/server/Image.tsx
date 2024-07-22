import { useEffect, useState } from "react";
import serverAPI from "@/api/server";

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
      className={`relative w-full h-0 pb-[calc(15/117*100%)] ${classname} bg-muted`}
    >
      {image ? (
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
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
