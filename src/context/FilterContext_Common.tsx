import { createContext, useContext, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";

type FilterProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

export interface FilterContextProps_Common {
  //Sidebar
  filter_show: boolean;
  setFilter_show: React.Dispatch<React.SetStateAction<boolean>>;
  isFiltering: boolean;
  setisFiltering: React.Dispatch<React.SetStateAction<boolean>>;
  // Search
  filter_search: string | null;
  setFilter_search: React.Dispatch<React.SetStateAction<string | null>>;
  //Pages
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page_amount: number;
  setPageAmount: React.Dispatch<React.SetStateAction<number>>;
  setFilterParams: SetURLSearchParams;
}

const FilterContext_Common = createContext<FilterContextProps_Common | null>(
  null
);

export const useFilterContext_Common = () => {
  const context = useContext(FilterContext_Common);
  if (!context) {
    throw new Error(
      "useFilterContext_Common must be used within FilterContext_Common.Provider"
    );
  }
  return context;
};

export const Filter_Common = ({ children }: FilterProps) => {
  const [filter_show, setFilter_show] = useState<boolean>(false); //Only used in mobile
  const [isFiltering, setisFiltering] = useState<boolean>(false); //Only used in mobile
  const [filter_search, setFilter_search] = useState<string | null>(null);

  //Pages
  const [filterParams, setFilterParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(filterParams.get("page")) || 0
  );
  const [page_amount, setPageAmount] = useState<number>(16);

  return (
    <FilterContext_Common.Provider
      value={{
        // Sidebar
        filter_show,
        setFilter_show,
        isFiltering,
        setisFiltering,

        // Search
        filter_search,
        setFilter_search,

        //Page
        page,
        setPage,
        page_amount,
        setPageAmount,
        setFilterParams,
      }}
    >
      {children}
    </FilterContext_Common.Provider>
  );
};
