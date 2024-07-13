import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useFilterContext_Common } from "@/context/FilterContext_Common";

export const FilterSearch = () => {
  const { filter_search, setFilter_search } = useFilterContext_Common();
  return (
    <div className="w-full relative h-10">
      <Search
        size={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      />
      <Input
        type="text"
        placeholder="Search resources..."
        className="pl-10 pr-3 text-md w-full border-0"
        value={filter_search || ""}
        onChange={(e) => {
          setFilter_search(e.target.value);
        }}
      />
    </div>
  );
};
