import { enumToArray } from "@/utils/enum";
import { PLUGIN_PROXY } from "minecentral-api";
import { useFilterContext_Resource } from "@/context/FilterContext_Resource";
import { formatToTitleCase } from "@/utils/formatter";
import { Checkbox } from "../ui/checkbox";
import { toggleFromArray } from "@/utils/array";

export const FilterProxy = () => {
  const { filter_proxy, setFilter_proxy } = useFilterContext_Resource();

  return (
    <div className="flex flex-col space-y-2 mb-2">
      {enumToArray(PLUGIN_PROXY) //Filter out Number values (typescript stuff)
        .map((type: any) => {
          // const type = CATEGORY_PLUGIN[key as keyof typeof CATEGORY_PLUGIN];
          return (
            <section
              key={type}
              className="flex flex-row items-center space-x-2 cursor-pointer hover:text-secondary-foreground/50 transition-colors"
              onClick={() =>
                setFilter_proxy((prev) => toggleFromArray(prev, type))
              }
            >
              <Checkbox
                checked={filter_proxy ? filter_proxy.includes(type) : false}
              />
              <p>{formatToTitleCase(type)}</p>
            </section>
          );
        })}
    </div>
  );
};
