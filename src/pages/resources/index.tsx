import usePageTitle from "@/utils/usePageTitle";

import { FilterResource } from "@/context/FilterResourceContext";
import { Resources } from "./main";

export function ResourcesIndex() {
  usePageTitle("Resources");

  return (
    <FilterResource>
      <Resources />
    </FilterResource>
  );
}
