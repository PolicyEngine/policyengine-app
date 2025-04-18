import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Dropdown, Switch } from "antd";
import { useDisplayCategory } from "../../../layout/Responsive";

const DEFAULT_SIM_LENGTH = {
  us: 10,
  uk: 5,
  default: 5,
};

export default function MultiYearSelector(props) {
  const { metadata, startYear } = props;

  const countryId = metadata.countryId;

  const defaultSimLength = calculateDefaultSimLength(metadata, startYear);

  const [searchParams, setSearchParams] = useSearchParams();
  const [simYears, setSimYears] = useState(
    searchParams.get("simYears") || defaultSimLength,
  );
  const [isMultiYearActive, setIsMultiYearActive] = useState(
    !!searchParams.get("simYears"),
  );
  const dC = useDisplayCategory();

  function handleSwitchChange(checked) {
    setIsMultiYearActive(checked);
    if (checked) {
      setSearchParams((prev) => {
        const newSearch = new URLSearchParams(prev);
        newSearch.set("simYears", simYears);
        return newSearch;
      });
    } else {
      setSearchParams((prev) => {
        const newSearch = new URLSearchParams(prev);
        newSearch.delete("simYears");
        return newSearch;
      });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Switch
        checked={isMultiYearActive === true}
        size={dC !== "mobile" && "small"}
        onChange={handleSwitchChange}
      />
      <p
        style={{
          margin: 0,
          fontSize: dC !== "mobile" && "0.95em",
        }}
      >
        Extend impacts over&nbsp;
      </p>
      <Dropdown
        menu={{
          items: [],
        }}
      />
    </div>
  );
}

export function findLastSimYearFromMetadata(metadata) {
  const allYearsSorted = metadata.economy_options.time_period.sort(
    (a, b) => a.name - b.name,
  );
  const lastSimYear = allYearsSorted[allYearsSorted.length - 1].name;
  return lastSimYear;
}

export function calculateDefaultSimLength(metadata, startYear) {
  const lastSimYear = findLastSimYearFromMetadata(metadata);
  const maxSimLength = lastSimYear - startYear + 1;

  const defaultSimLength =
    DEFAULT_SIM_LENGTH[metadata.countryId] || DEFAULT_SIM_LENGTH["default"];
  return Math.min(maxSimLength, defaultSimLength);
}
