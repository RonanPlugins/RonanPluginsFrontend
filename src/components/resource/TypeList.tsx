import { RESOURCE_TYPE } from "minecentral-api";
import { Button } from "../ui/button";

export function TypeList({
  selected,
  className,
  onSelect,
}: {
  selected?: RESOURCE_TYPE[];
  className: string;
  onSelect: any;
}) {
  return (
    <>
      {Object.keys(RESOURCE_TYPE)
        .filter((key) => !isNaN(Number(key))) //Filter out Number values (typescript stuff)
        .map((key) => {
          const type = RESOURCE_TYPE[key as keyof typeof RESOURCE_TYPE];
          return (
            <Button
              key={type}
              variant={selected?.includes(type) ? "special" : "outline"}
              className={className}
              onClick={() => onSelect(type)}
            >
              {type}
            </Button>
          );
        })}
    </>
  );
}
