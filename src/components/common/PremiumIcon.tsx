import { Crown } from "lucide-react";
import { TooltipWidget } from "./TooltipWidget";

export default function PremiumIcon({ className }: { className?: string }) {
  return (
    <div
      className={className ? className : "absolute -top-[10px] -right-[10px]"}
    >
      <TooltipWidget tooltip="Premium">
        <Crown fill="gold" stroke="black" size={20} />
      </TooltipWidget>
    </div>
  );
}
