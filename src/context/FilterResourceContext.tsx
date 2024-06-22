import { createContext, useContext, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SORTBY } from "@/utils/SORTBY";

type FilterProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

interface FilterContextProps {
  //Sidebar
  filter_show: boolean;
  setFilter_show: React.Dispatch<React.SetStateAction<boolean>>;
  //Versions
  filter_versions: string[];
  setFilter_versions: React.Dispatch<React.SetStateAction<string[]>>;
  // Search
  filter_search: string | null;
  setFilter_search: React.Dispatch<React.SetStateAction<string | null>>;
  // Sort
  filter_sort: string;
  setFilter_sort: React.Dispatch<React.SetStateAction<string>>;
  //Category
  filter_category: string;
  setFilter_category: React.Dispatch<React.SetStateAction<string>>;
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
  const [filter_versions, setFilter_versions] = useState<string[]>([]);
  const [filter_search, setFilter_search] = useState<string | null>(null);
  const [filter_sort, setFilter_sort] = useState<string>(SORTBY.LAST_UPDATE);
  const [filter_category, setFilter_category] = useState<string>(
    SORTBY.LAST_UPDATE
  );

  return (
    <FilterResourceContext.Provider
      value={{
        // Sidebar
        filter_show,
        setFilter_show,
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
      }}
    >
      {children}
    </FilterResourceContext.Provider>
  );
};
