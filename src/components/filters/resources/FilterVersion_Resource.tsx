import { useFilterContext_Resource } from "@/context/FilterContext_Resource";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../../../context/MultiSelector";
import { PLUGIN_VERSION } from "minecentral-api";
import { toTitleCase } from "@/utils/formatter";

export const FilterVersion_Resource = () => {
  const { filter_versions, setFilter_versions } = useFilterContext_Resource();
  return (
    <MultiSelector values={filter_versions} onValuesChange={setFilter_versions}>
      <MultiSelectorTrigger className="border-input">
        <MultiSelectorInput placeholder="Choose versions..." />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {Object.values(PLUGIN_VERSION).map((filter) => {
            return (
              <MultiSelectorItem key={filter} value={filter}>
                {toTitleCase(filter)}
              </MultiSelectorItem>
            );
          })}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};
