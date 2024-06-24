import { useFilterResourceContext } from "@/context/FilterResourceContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SORTBY, getTitle } from "@/utils/SORTBY";
import { castStringToEnum } from "@/utils/enum";

export const FilterSort = () => {
  const { filter_sort, setFilter_sort } = useFilterResourceContext();
  return (
    <Select
      onValueChange={(val) => setFilter_sort(castStringToEnum(SORTBY, val))}
      value={filter_sort || SORTBY.LAST_UPDATE}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(SORTBY).map((filter) => (
          <SelectItem key={filter} value={filter}>
            {getTitle(filter)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
