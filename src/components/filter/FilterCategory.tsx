import { useFilterResourceContext } from "@/context/FilterResourceContext";
import { enumToArray } from "@/utils/enum";
import { PLUGIN_CATEGORY } from "minecentral-api";
import { Button } from "../ui/button";
import { formatToTitleCase } from "@/utils/formatter";

export function FilterCategory({ className }: { className?: string }) {
  const { filter_category, setFilter_category } = useFilterResourceContext();
  return (
    <>
      {enumToArray(PLUGIN_CATEGORY) //Filter out Number values (typescript stuff)
        .map((type) => {
          // const type = CATEGORY_PLUGIN[key as keyof typeof CATEGORY_PLUGIN];
          return (
            <Button
              key={type}
              variant={filter_category === type ? "special" : "ghost"}
              className={`${className}`}
              onClick={() => setFilter_category(type)}
            >
              {formatToTitleCase(type)}
            </Button>
          );
        })}
    </>
    // <TypeList
    //   variant="ghost"
    //   className="rounded-full ml-1"
    //   selected={filter_category}
    //   onSelect={setFilter_category}
    // />
  );
}
