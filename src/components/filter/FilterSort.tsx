import { useFilterResourceContext } from "@/context/FilterResourceContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SORTBY, getTitle } from "@/utils/SORTBY";

export const FilterSort = () => {
  const { filter_sort, setFilter_sort } = useFilterResourceContext();
  return (
    <Select
      onValueChange={setFilter_sort}
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
