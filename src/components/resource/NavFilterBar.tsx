import { CATEGORY_PLUGIN } from "minecentral-api";
import { TypeList } from "./TypeList";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "special";

export function NavFilterBar({
  className,
  variant,
  onSelect,
  selected,
}: {
  className?: string;
  variant: ButtonVariant;
  onSelect?: any;
  selected?: CATEGORY_PLUGIN;
}) {
  return (
    <TypeList
      selected={selected}
      variant={variant}
      className={`${className}`}
      onSelect={onSelect}
    />
  );
}
