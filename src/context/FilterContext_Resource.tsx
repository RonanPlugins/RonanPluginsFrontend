import { createContext, useContext, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";
import {
  PLUGIN_CATEGORY,
  PLUGIN_LOADER,
  PLUGIN_PROXY,
  PLUGIN_SORTBY,
} from "minecentral-api";
import { Filter_Common, useFilterContext_Common } from "./FilterContext_Common";

type FilterProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

interface FilterContextProps {
  //Versions
  filter_versions: string[];
  setFilter_versions: React.Dispatch<React.SetStateAction<string[]>>;
  // Sort
  filter_sort: string | null;
  setFilter_sort: React.Dispatch<React.SetStateAction<PLUGIN_SORTBY | null>>;
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
}

const FilterContext_Resource = createContext<FilterContextProps | null>(null);

export const useFilterContext_Resource = () => {
  const context = useContext(FilterContext_Resource);
  if (!context) {
    throw new Error(
      "useFilterContext_Resource must be used within FilterContext_Resource.Provider"
    );
  }
  const common = useFilterContext_Common();
  return { ...context, ...common };
};

export const Filter_Resource = ({ children }: FilterProps) => {
  //Only used in mobile
  const [filter_versions, setFilter_versions] = useState<string[]>([]);
  const [filter_sort, setFilter_sort] = useState<PLUGIN_SORTBY | null>(
    PLUGIN_SORTBY.LAST_UPDATE
  );
  const [filter_category, setFilter_category] =
    useState<PLUGIN_CATEGORY | null>(null);
  const [filter_proxy, setFilter_proxy] = useState<PLUGIN_PROXY[] | null>(null);
  const [filter_loader, setFilter_loader] = useState<PLUGIN_LOADER[] | null>(
    null
  );

  return (
    <Filter_Common>
      <FilterContext_Resource.Provider
        value={{
          // Version
          filter_versions,
          setFilter_versions,
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
        }}
      >
        {children}
      </FilterContext_Resource.Provider>
    </Filter_Common>
  );
};
