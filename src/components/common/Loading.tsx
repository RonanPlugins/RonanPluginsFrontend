import { LoaderCircle } from "lucide-react";

export default function Loading({
  className,
  size = 48,
}: {
  className?: string;
  size?: number;
}) {
  return (
    // <div className="flex h-[calc(100vh-74px)]">
    <div className={className}>
      <LoaderCircle className="mx-auto my-auto animate-spin" size={size} />
    </div>
  );
}
