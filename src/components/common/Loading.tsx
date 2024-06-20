import { LoaderCircle } from "lucide-react";

export default function Loading({ className }: { className?: string }) {
  return (
    // <div className="flex h-[calc(100vh-74px)]">
    <div className={className}>
      <LoaderCircle className="mx-auto my-auto animate-spin size-12" />
    </div>
  );
}
