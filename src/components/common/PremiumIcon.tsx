import { Crown } from "lucide-react";

export default function PremiumIcon({ className }: { className?: string }) {
  return (
    <Crown
      className={className ? className : "absolute -top-[10px] -right-[10px]"}
      fill="gold"
      stroke="black"
      size={20}
    />
  );
}
