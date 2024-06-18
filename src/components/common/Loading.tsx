import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    // <div className="flex h-[calc(100vh-74px)]">
    <div className="mx-auto">
      <LoaderCircle className="m-auto animate-spin size-12" />
    </div>
  );
}
