import { createContext, useContext, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";

type FilterProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

interface FilterContextProps {
  //Sidebar
  filterShow: boolean;
  setFilterShow: React.Dispatch<React.SetStateAction<boolean>>;
  //Versions
  filter_versions: string[];
  setFilter_Versions: React.Dispatch<React.SetStateAction<string[]>>;
  // Search
  filter_search: string | null;
  setFilter_search: React.Dispatch<React.SetStateAction<string | null>>;
}

const ResourceFilterContext = createContext<FilterContextProps | null>(null);

export const useFilterContext = () => {
  const context = useContext(ResourceFilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within MultiSelectProvider");
  }
  return context;
};

export const ResourceFilter = ({ children }: FilterProps) => {
  const [filterShow, setFilterShow] = useState<boolean>(false); //Only used in mobile
  const [filter_versions, setFilter_Versions] = useState<string[]>([]); //Only used in mobile
  const [filter_search, setFilter_search] = useState<string | null>(null); //Only used in mobile

  return (
    <ResourceFilterContext.Provider
      value={{
        // Sidebar
        filterShow,
        setFilterShow,
        // Version
        filter_versions,
        setFilter_Versions,
        // Search
        filter_search,
        setFilter_search,
      }}
    >
      {children}
    </ResourceFilterContext.Provider>
  );
};
