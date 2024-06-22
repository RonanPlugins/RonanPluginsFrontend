import { useFilterResourceContext } from "@/context/FilterResourceContext";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../../context/MultiSelector";
import { PLUGIN_VERSION } from "minecentral-api";
import { formatToTitleCase } from "@/utils/formatter";

export const FilterVersion = () => {
  const { filter_versions, setFilter_versions } = useFilterResourceContext();
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
                {formatToTitleCase(filter)}
              </MultiSelectorItem>
            );
          })}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};
