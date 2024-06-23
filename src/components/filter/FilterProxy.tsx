import { enumToArray } from "@/utils/enum";
import { PLUGIN_PROXY } from "minecentral-api";
import { useFilterResourceContext } from "@/context/FilterResourceContext";
import { formatToTitleCase } from "@/utils/formatter";
import { Checkbox } from "../ui/checkbox";

export const FilterProxy = () => {
  const { filter_proxy, setFilter_proxy } = useFilterResourceContext();

  function handleToggle(type: PLUGIN_PROXY) {
    return setFilter_proxy((prev) => {
      if (!prev) {
        return [type];
      } else if (prev.includes(type)) {
        // Remove the item if it's in the array
        return prev.filter((item) => item !== type);
      } else {
        // Add the item if it's not in the array
        return [...prev, type];
      }
    });
  }

  return (
    <div className="flex flex-col space-y-2 mb-2">
      {enumToArray(PLUGIN_PROXY) //Filter out Number values (typescript stuff)
        .map((type: any) => {
          // const type = CATEGORY_PLUGIN[key as keyof typeof CATEGORY_PLUGIN];
          return (
            <section
              key={type}
              className="flex flex-row items-center space-x-2 cursor-pointer hover:text-secondary-foreground/50 transition-colors"
              onClick={() => handleToggle(type)}
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
