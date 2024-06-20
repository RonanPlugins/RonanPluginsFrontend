import Links from "@/lib/Links";
import { getEnumValue } from "@/utils/enum";
import { CATEGORY_PLUGIN } from "minecentral-api/dist/categories/CATEGORY_PLUGIN";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const initialState = {
  category: undefined,
  setCategory: (p: CATEGORY_PLUGIN) => {},
};

const ResourceContext = createContext(initialState);

export const useResourceContext = () => {
  return useContext(ResourceContext);
};

export function ResourceProvider({ children }: { children: any }) {
  const [category, setCategoryContext] = useState<
    CATEGORY_PLUGIN | undefined
  >();

  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (location.pathname === Links.Resources) {
      const category: CATEGORY_PLUGIN | undefined = getEnumValue(
        CATEGORY_PLUGIN,
        searchParams.get("category")
      );
      if (category) {
        setCategory(category);
      }
    }
  }, []);

  function setCategory(category: CATEGORY_PLUGIN) {
    // console.log("Context", category);
    setCategoryContext(category);
    setUrlSearch({ category });
  }

  return (
    <ResourceContext.Provider
      value={{
        category,
        setCategory,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
}

function setUrlSearch(newParams: any) {
  const url = new URL(window.location.href);
  Object.keys(newParams).forEach((key) => {
    if (newParams[key] !== null) {
      url.searchParams.set(key, newParams[key]);
    } else {
      url.searchParams.delete(key);
    }
  });
  window.history.replaceState({}, "", url.toString());
}
