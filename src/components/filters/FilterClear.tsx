import { CircleX } from "lucide-react";
import { useFilterContext_Resource } from "@/context/FilterContext_Resource";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useFilterContext_Server } from "@/context/FilterContext_Server";
import { useFilterContext_Common } from "@/context/FilterContext_Common";

export function FilterClear_Resource({ className }: { className: string }) {
  const {
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
  } = useFilterContext_Resource();

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

  return <ClearButton clearFilter={clearFilter} className={className} />;
}

function ClearButton({
  clearFilter,
  className,
}: {
  clearFilter: any;
  className: string;
}) {
  const { isFiltering } = useFilterContext_Common();
  return (
    <div className={`flex justify-center ${className}`}>
      <Button
        variant="outline"
        className="mx-auto rounded-xl hover:text-red"
        onClick={clearFilter}
        disabled={!isFiltering}
      >
        <CircleX size={20} className="mr-2" />
        Clear Filters
      </Button>
    </div>
  );
}

export function FilterClear_Server({ className }: { className: string }) {
  const {
    filter_category,
    filter_search,
    filter_versions,
    setisFiltering,
    setFilter_category,
    setFilter_search,
    setFilter_versions,
  } = useFilterContext_Server();

  function clearFilter() {
    setFilter_category(null);
    setFilter_search(null);
    setFilter_versions([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  useEffect(() => {
    setisFiltering(
      [filter_category, filter_search, filter_versions.length].some(
        (val) => val
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter_category, filter_search, filter_versions]);

  return <ClearButton clearFilter={clearFilter} className={className} />;
}
