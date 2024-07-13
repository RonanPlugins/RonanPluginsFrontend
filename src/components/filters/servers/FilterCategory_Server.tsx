import { enumToArray } from "@/utils/enum";
import { Button } from "../../ui/button";
import { toTitleCase } from "@/utils/formatter";
import { useFilterContext_Server } from "@/context/FilterContext_Server";
import { SERVER_CATEGORY } from "minecentral-api";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "special";

export function FilterCategory_Server({
  className,
  variant = "ghost",
}: {
  className?: string;
  variant?: ButtonVariant;
}) {
  const { filter_category, setFilter_category } = useFilterContext_Server();
  return (
    <>
      {enumToArray(SERVER_CATEGORY) //Filter out Number values (typescript stuff)
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
              {toTitleCase(type)}
            </Button>
          );
        })}
    </>
  );
}
