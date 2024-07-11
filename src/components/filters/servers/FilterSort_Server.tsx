import { useFilterContext_Server } from "@/context/FilterContext_Server";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { castStringToEnum } from "@/utils/enum";
import { getServerSortTitle, SERVER_SORTBY } from "minecentral-api";

export const FilterSort_Server = () => {
  const { filter_sort, setFilter_sort } = useFilterContext_Server();
  return (
    <Select
      onValueChange={(val) =>
        setFilter_sort(castStringToEnum(SERVER_SORTBY, val))
      }
      value={filter_sort || SERVER_SORTBY.LAST_BUMPED}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(SERVER_SORTBY).map((filter) => (
          <SelectItem key={filter} value={filter}>
            {getServerSortTitle(filter)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
