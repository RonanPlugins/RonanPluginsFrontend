import { CATEGORY_PLUGIN } from "minecentral-api/dist/categories/CATEGORY_PLUGIN";
import { Button } from "../ui/button";
import { formatToTitleCase } from "@/utils/formatter";

export function TypeList({
  selected,
  className,
  onSelect,
  variant,
}: {
  selected?: CATEGORY_PLUGIN;
  className: string;
  onSelect: any;
  variant?: any;
}) {
  return (
    <>
      {Object.keys(CATEGORY_PLUGIN)
        .filter((key) => !isNaN(Number(key))) //Filter out Number values (typescript stuff)
        .map((key) => {
          const type = CATEGORY_PLUGIN[key as keyof typeof CATEGORY_PLUGIN];
          return (
            <Button
              key={type}
              variant={selected === type ? "special" : variant}
              className={`${className}`}
              onClick={onSelect ? () => onSelect(type) : () => {}}
            >
              {formatToTitleCase(type.toString())}
            </Button>
          );
        })}
    </>
  );
}
