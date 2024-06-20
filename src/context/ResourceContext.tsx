import { CATEGORY_PLUGIN } from "minecentral-api/dist/categories/CATEGORY_PLUGIN";
import { createContext, useContext, useState } from "react";

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

  // useEffect(() => {
  //   // console.log("Url changed!");
  // }, [location]);

  function setCategory(category: CATEGORY_PLUGIN) {
    // console.log("Context", category);
    setCategoryContext(category);
    const url = new URL(window.location.href);
    const newParams: any = { category };
    Object.keys(newParams).forEach((key) => {
      if (newParams[key] !== null) {
        url.searchParams.set(key, newParams[key]);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.replaceState({}, "", url.toString());
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
