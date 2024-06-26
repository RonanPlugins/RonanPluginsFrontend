import { Crown } from "lucide-react";
import { Tooltip, TooltipProvider } from "../ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

export default function PremiumIcon({ className }: { className?: string }) {
  return (
    <div
      className={className ? className : "absolute -top-[10px] -right-[10px]"}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Crown fill="gold" stroke="black" size={20} />
          </TooltipTrigger>
          <TooltipContent>
            <div className="bg-muted p-1 rounded-xl shadow-md">
              <p>Premium</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
