import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Select, Switch } from "antd";
import { useDisplayCategory } from "../../../layout/Responsive";

const DEFAULT_SIM_LENGTH = {
  us: 10,
  uk: 5,
  default: 5,
};

export default function MultiYearSelector(props) {
  const { metadata, startYear } = props;

  const defaultSimLength = calculateDefaultSimLength(metadata, startYear);

  const [searchParams, setSearchParams] = useSearchParams();
  const inboundSimYears = searchParams.get("simYears");
  const isInboundSimYearsValid = validateSimYears(
    inboundSimYears,
    metadata,
    startYear,
  );
  const [simLength, setSimLength] = useState(
    isInboundSimYearsValid ? inboundSimYears : defaultSimLength,
  );
  const [isMultiYearActive, setIsMultiYearActive] = useState(
    !!searchParams.get("simYears"),
  );
  const dC = useDisplayCategory();

  const simYearsMenuItems = generateSimYearsMenuItems(metadata, startYear);

  useEffect(() => {
    setSimLength(isInboundSimYearsValid ? inboundSimYears : defaultSimLength);
    setIsMultiYearActive(!!searchParams.get("simYears"));
  }, [
    startYear,
    searchParams,
    isInboundSimYearsValid,
    inboundSimYears,
    defaultSimLength,
  ]);

  function handleSwitchChange(checked) {
    setIsMultiYearActive(checked);
    if (checked) {
      setSearchParams((prev) => {
        const newSearch = new URLSearchParams(prev);
        newSearch.set("simYears", simLength);
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

  function handleSimYearsChange(value) {
    setSimLength(value);
    if (isMultiYearActive) {
      setSearchParams((prev) => {
        const newSearch = new URLSearchParams(prev);
        newSearch.set("simYears", value);
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
        Extend impacts over
      </p>
      <Select
        options={simYearsMenuItems}
        value={simLength}
        onChange={handleSimYearsChange}
        style={{ height: "1.4rem" }}
      />
      <p
        style={{
          margin: 0,
          fontSize: dC !== "mobile" && "0.95em",
        }}
      >
        years
      </p>
    </div>
  );
}

export function generateSimYearsMenuItems(metadata, startYear) {
  const lastSimYear = findLastSimYearFromMetadata(metadata);
  const maxSimLength = lastSimYear - startYear + 1;

  const simLengths = [];
  for (let simLength = 1; simLength <= maxSimLength; simLength++) {
    simLengths.push({ label: simLength, value: simLength });
  }

  return simLengths;
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

export function validateSimYears(simYearParam, metadata, startYear) {
  if (simYearParam === null || simYearParam === undefined) {
    return false;
  }
  const maxSimLength = findLastSimYearFromMetadata(metadata) - startYear + 1;
  return simYearParam >= 1 && simYearParam <= maxSimLength;
}
