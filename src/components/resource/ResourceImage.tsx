import { useEffect, useState } from "react";

import resourceAPI from "@/api/resource";
import Loading from "../common/Loading";
import Image from "../common/Image";

export default function ResourceImage({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resourceAPI.getIcon(id).then((data) => {
      setImage(data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return <Image className={className} url={image} />;
}
