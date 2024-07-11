import { enumToArray } from "@/utils/enum";
import { PLUGIN_LOADER } from "minecentral-api";
import { useFilterContext_Resource } from "@/context/FilterContext_Resource";
import { formatToTitleCase } from "@/utils/formatter";
import { Checkbox } from "../ui/checkbox";
import { toggleFromArray } from "@/utils/array";

export const FilterLoader = () => {
  const { filter_loader, setFilter_loader } = useFilterContext_Resource();

  return (
    <div className="flex flex-col space-y-2 mb-2">
      {enumToArray(PLUGIN_LOADER) //Filter out Number values (typescript stuff)
        .map((type: any) => {
          // const type = CATEGORY_PLUGIN[key as keyof typeof CATEGORY_PLUGIN];
          return (
            <section
              key={type}
              className="flex flex-row items-center space-x-2 mr-auto cursor-pointer hover:text-secondary-foreground/50 transition-colors"
              onClick={() =>
                setFilter_loader((prev) => toggleFromArray(prev, type))
              }
            >
              <Checkbox
                checked={filter_loader ? filter_loader.includes(type) : false}
                key={type}
              />
              <p>{formatToTitleCase(type)}</p>
            </section>
          );
        })}
    </div>
  );
};
