import { Button } from "../ui/button";
import { formatToTitleCase } from "@/utils/formatter";
import { enumToArray } from "@/utils/enum";
import { CATEGORY_PLUGIN } from "minecentral-api";

export function TypeList({
  selected,
  className,
  onSelect,
  variant,
}: {
  selected?: any;
  className: string;
  onSelect: any;
  variant?: any;
}) {
  return (
    <>
      {enumToArray(CATEGORY_PLUGIN) //Filter out Number values (typescript stuff)
        .map((type) => {
          // const type = CATEGORY_PLUGIN[key as keyof typeof CATEGORY_PLUGIN];
          return (
            <Button
              key={type}
              variant={selected === type ? "special" : variant}
              className={`${className}`}
              onClick={onSelect ? () => onSelect(type) : () => {}}
            >
              {formatToTitleCase(type)}
            </Button>
          );
        })}
    </>
  );
}
