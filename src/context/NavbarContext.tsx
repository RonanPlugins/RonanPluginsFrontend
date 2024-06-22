// import Links from "@/lib/Links";
// import { getEnumValue } from "@/utils/enum";
// import { PLUGIN_CATEGORY } from "minecentral-api";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useLocation, useSearchParams } from "react-router-dom";

// const initialState = {
//   category: undefined,
//   setCategory: (p: PLUGIN_CATEGORY) => {},
// };
// const FilterResourceContext = createContext(initialState);

// // eslint-disable-next-line react-refresh/only-export-components
// export const useFilterResourceContext = () => {
//   return useContext(FilterResourceContext);
// };

// export function FilterResourceProvider({ children }: { children: any }) {
//   const [category, setCategoryContext] = useState<
//     PLUGIN_CATEGORY | undefined
//   >();

//   const location = useLocation();
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     if (location.pathname === Links.Resources) {
//       const category: PLUGIN_CATEGORY | undefined = getEnumValue(
//         PLUGIN_CATEGORY,
//         searchParams.get("category")
//       );
//       if (category) {
//         setCategory(category);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   function setCategory(category: PLUGIN_CATEGORY) {
//     // console.log("Context", category);
//     setCategoryContext(category);
//     setUrlSearch({ category });
//   }

//   return (
//     <FilterResourceContext.Provider
//       value={{
//         category,
//         setCategory,
//       }}
//     >
//       {children}
//     </FilterResourceContext.Provider>
//   );
// }

// function setUrlSearch(newParams: any) {
//   const url = new URL(window.location.href);
//   Object.keys(newParams).forEach((key) => {
//     if (newParams[key] !== null) {
//       url.searchParams.set(key, newParams[key]);
//     } else {
//       url.searchParams.delete(key);
//     }
//   });
//   window.history.replaceState({}, "", url.toString());
// }
