import { createContext, useContext, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SORTBY } from "@/utils/SORTBY";
import { PLUGIN_CATEGORY, PLUGIN_LOADER, PLUGIN_PROXY } from "minecentral-api";
import { useSearchParams } from "react-router-dom";

type FilterProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

interface FilterContextProps {
  //Sidebar
  filter_show: boolean;
  setFilter_show: React.Dispatch<React.SetStateAction<boolean>>;
  isFiltering: boolean;
  setisFiltering: React.Dispatch<React.SetStateAction<boolean>>;
  //Versions
  filter_versions: string[];
  setFilter_versions: React.Dispatch<React.SetStateAction<string[]>>;
  // Search
  filter_search: string | null;
  setFilter_search: React.Dispatch<React.SetStateAction<string | null>>;
  // Sort
  filter_sort: string | null;
  setFilter_sort: React.Dispatch<React.SetStateAction<SORTBY | null>>;
  //Category
  filter_category: PLUGIN_CATEGORY | null;
  setFilter_category: React.Dispatch<
    React.SetStateAction<PLUGIN_CATEGORY | null>
  >;
  //Proxy
  filter_proxy: PLUGIN_PROXY[] | null;
  setFilter_proxy: React.Dispatch<React.SetStateAction<PLUGIN_PROXY[] | null>>;
  //Loader
  filter_loader: PLUGIN_LOADER[] | null;
  setFilter_loader: React.Dispatch<
    React.SetStateAction<PLUGIN_LOADER[] | null>
  >;
  //Pages
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page_amount: number;
  setPageAmount: React.Dispatch<React.SetStateAction<number>>;
  filterParams: any;
  setFilterParams: any;
}

const FilterResourceContext = createContext<FilterContextProps | null>(null);

export const useFilterResourceContext = () => {
  const context = useContext(FilterResourceContext);
  if (!context) {
    throw new Error(
      "useFilterResourceContext must be used within FilterResourceContext.Provider"
    );
  }
  return context;
};

export const FilterResource = ({ children }: FilterProps) => {
  const [filter_show, setFilter_show] = useState<boolean>(false); //Only used in mobile
  const [isFiltering, setisFiltering] = useState<boolean>(false); //Only used in mobile
  const [filter_versions, setFilter_versions] = useState<string[]>([]);
  const [filter_search, setFilter_search] = useState<string | null>(null);
  const [filter_sort, setFilter_sort] = useState<SORTBY | null>(
    SORTBY.LAST_UPDATE
  );
  const [filter_category, setFilter_category] =
    useState<PLUGIN_CATEGORY | null>(null);
  const [filter_proxy, setFilter_proxy] = useState<PLUGIN_PROXY[] | null>(null);
  const [filter_loader, setFilter_loader] = useState<PLUGIN_LOADER[] | null>(
    null
  );
  //Pages
  const [filterParams, setFilterParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(filterParams.get("page")) || 0
  );
  const [page_amount, setPageAmount] = useState<number>(20);

  return (
    <FilterResourceContext.Provider
      value={{
        // Sidebar
        filter_show,
        setFilter_show,
        isFiltering,
        setisFiltering,
        // Version
        filter_versions,
        setFilter_versions,
        // Search
        filter_search,
        setFilter_search,
        //Sort
        filter_sort,
        setFilter_sort,
        //Categories
        filter_category,
        setFilter_category,
        //Proxy
        filter_proxy,
        setFilter_proxy,
        //Loader
        filter_loader,
        setFilter_loader,
        //Page
        page,
        setPage,
        page_amount,
        setPageAmount,
        filterParams,
        setFilterParams,
      }}
    >
      {children}
    </FilterResourceContext.Provider>
  );
};
