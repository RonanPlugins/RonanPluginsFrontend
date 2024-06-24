import { useFilterResourceContext } from "@/context/FilterResourceContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const options: number[] = [2, 5, 10, 20, 32, 64];

export const FilterPerPage = () => {
  const { page_amount, setPageAmount } = useFilterResourceContext();
  return (
    <Select
      onValueChange={(val) => setPageAmount(Number(val) || 10)}
      value={String(page_amount)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(options).map((filter) => (
          <SelectItem key={filter} value={String(filter)}>
            {filter}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
