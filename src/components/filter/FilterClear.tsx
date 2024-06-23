import { CircleX } from "lucide-react";
import { useFilterResourceContext } from "@/context/FilterResourceContext";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export const FilterClear = () => {
  const [enabled, setEnabled] = useState(false);
  const {
    filter_category,
    filter_search,
    filter_versions,
    filter_loader,
    filter_proxy,
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
    setEnabled(
      [
        filter_category,
        filter_search,
        filter_versions.length,
        filter_proxy?.length,
        filter_loader,
      ].some((val) => val)
    );
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
        disabled={!enabled}
      >
        <CircleX size={20} className="mr-2" />
        Clear Filters
      </Button>
    </div>
  );
};
