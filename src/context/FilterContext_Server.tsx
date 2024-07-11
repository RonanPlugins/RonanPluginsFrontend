import { createContext, useContext, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SERVER_CATEGORY, SERVER_SORTBY } from "minecentral-api";
import {
  Filter_Common,
  FilterContextProps_Common,
  useFilterContext_Common,
} from "./FilterContext_Common";

type FilterProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

interface FilterContextProps extends FilterContextProps_Common {
  //Versions
  filter_versions: string[];
  setFilter_versions: React.Dispatch<React.SetStateAction<string[]>>;
  // Sort
  filter_sort: string | null;
  setFilter_sort: React.Dispatch<React.SetStateAction<SERVER_SORTBY | null>>;
  //Category
  filter_category: SERVER_CATEGORY | null;
  setFilter_category: React.Dispatch<
    React.SetStateAction<SERVER_CATEGORY | null>
  >;
}

const FilterContext_Server = createContext<FilterContextProps | null>(null);

export const useFilterContext_Server = () => {
  const context = useContext(FilterContext_Server);
  if (!context) {
    throw new Error(
      "useFilterContext_Server must be used within FilterContext_Server.Provider"
    );
  }
  return context;
};

export const Filter_Server = ({ children }: FilterProps) => {
  //Only used in mobile
  const [filter_versions, setFilter_versions] = useState<string[]>([]);
  const [filter_sort, setFilter_sort] = useState<SERVER_SORTBY | null>(
    SERVER_SORTBY.LAST_BUMPED
  );
  const [filter_category, setFilter_category] =
    useState<SERVER_CATEGORY | null>(null);

  return (
    <Filter_Common>
      <FilterContext_Server.Provider
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
          ...useFilterContext_Common(),
        }}
      >
        {children}
      </FilterContext_Server.Provider>
    </Filter_Common>
  );
};
