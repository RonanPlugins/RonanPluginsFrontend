import { useEffect, useState } from "react";

import resourceAPI from "@/api/resource";
import Image from "../common/Image";

export function ResourceImage({
  id,
  classname,
}: {
  id: string;
  classname?: string;
}) {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resourceAPI.getIcon(id).then((data) => {
      setImage(data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Image loading={loading} classname={classname} url={image} />;
}
