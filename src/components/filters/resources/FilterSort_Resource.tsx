import { useFilterContext_Resource } from "@/context/FilterContext_Resource";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { castStringToEnum } from "@/utils/enum";
import { getPluginSortTitle, PLUGIN_SORTBY } from "minecentral-api";

export const FilterSort_Resource = () => {
  const { filter_sort, setFilter_sort } = useFilterContext_Resource();
  return (
    <Select
      onValueChange={(val) =>
        setFilter_sort(castStringToEnum(PLUGIN_SORTBY, val))
      }
      value={filter_sort || PLUGIN_SORTBY.LAST_UPDATE}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(PLUGIN_SORTBY).map((filter) => (
          <SelectItem key={filter} value={filter}>
            {getPluginSortTitle(filter)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
