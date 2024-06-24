import { CircleX } from "lucide-react";
import { useFilterResourceContext } from "@/context/FilterResourceContext";
import { Button } from "../ui/button";
import { useEffect } from "react";

export const FilterClear = () => {
  const {
    isFiltering,
    filter_category,
    filter_search,
    filter_versions,
    filter_loader,
    filter_proxy,
    setisFiltering,
    setFilter_category,
    setFilter_search,
    setFilter_versions,
    setFilter_loader,
    setFilter_proxy,
  } = useFilterResourceContext();

  function clearFilter() {
    setFilter_category(null);
    setFilter_search(null);
    setFilter_versions([]);
    setFilter_loader(null);
    setFilter_proxy(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  useEffect(() => {
    setisFiltering(
      [
        filter_category,
        filter_search,
        filter_versions.length,
        filter_proxy?.length,
        filter_loader,
      ].some((val) => val)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filter_category,
    filter_search,
    filter_versions,
    filter_proxy,
    filter_loader,
  ]);

  return (
    <div className="flex w-full mt-2 justify-center">
      <Button
        variant="outline"
        className="mx-auto rounded-full hover:text-red"
        onClick={clearFilter}
        disabled={!isFiltering}
      >
        <CircleX size={20} className="mr-2" />
        Clear Filters
      </Button>
    </div>
  );
};
