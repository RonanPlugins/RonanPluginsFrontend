import { useFilterContext_Resource } from "@/context/FilterContext_Resource";
import { enumToArray } from "@/utils/enum";
import { PLUGIN_CATEGORY } from "minecentral-api";
import { Button } from "../../ui/button";
import { formatToTitleCase } from "@/utils/formatter";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "special";

export function FilterCategory_Resource({
  className,
  variant = "ghost",
}: {
  className?: string;
  variant?: ButtonVariant;
}) {
  const { filter_category, setFilter_category } = useFilterContext_Resource();
  return (
    <>
      {enumToArray(PLUGIN_CATEGORY) //Filter out Number values (typescript stuff)
        .map((type: any) => {
          // const type = CATEGORY_PLUGIN[key as keyof typeof CATEGORY_PLUGIN];
          return (
            <Button
              key={type}
              variant={
                filter_category?.toString() === type ? "special" : variant
              }
              className={`${className} rounded-xl`}
              onClick={() => setFilter_category(type)}
            >
              {formatToTitleCase(type)}
            </Button>
          );
        })}
    </>
  );
}
