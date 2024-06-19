import Messages from "@/lib/Messages";
import { useEffect } from "react";

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${Messages.BrandName} - ${title}`;
  }, [title]);
};

export default usePageTitle;
