import ThreeColumnPage from "../layout/ThreeColumnPage";
import { useSearchParams } from "react-router-dom";
import {
  createDefaultHousehold,
  getDefaultHouseholdId,
  findInTree,
  getNewHouseholdId,
} from "../api/variables";
import { copySearchParams, countryApiCall } from "../api/call";
import { useEffect, useState } from "react";
import VariableEditor from "./household/input/VariableEditor";
import LoadingCentered from "../layout/LoadingCentered";
import MaritalStatus from "./household/input/MaritalStatus";
import CountChildren from "./household/input/CountChildren";
import HouseholdRightSidebar from "./household/HouseholdRightSidebar";
import HouseholdOutput from "./household/output/HouseholdOutput";
import useMobile from "../layout/Responsive";
import FolderPage from "../layout/FolderPage";
import StackedMenu from "../layout/StackedMenu";
import HouseholdIntro from "./household/HouseholdIntro";
import HOUSEHOLD_OUTPUT_TREE from "./household/output/tree";
import VariableSearch from "./household/VariableSearch";
import MobileHouseholdPage from "./household/MobileHouseholdPage";
import { Result } from "antd";

export default function HouseholdPage(props) {
  // const { metadata, household, setHousehold, policy, loading, setHouseholdInput } = props;
  const { metadata, householdId, policy, hasShownHouseholdPopup, setHasShownHouseholdPopup } = props;
  const countryId = metadata.countryId;
  const [searchParams, setSearchParams] = useSearchParams();
  const mobile = useMobile();
  const [householdInput, setHouseholdInput] = useState(null);
  const [householdBaseline, setHouseholdBaseline] = useState(null);
  const [householdReform, setHouseholdReform] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [autoCompute, setAutoCompute] = useState(false);

  let middle;
  const focus = searchParams.get("focus") || "";

  // If we've landed on the page without a focus, point at the intro page.
  useEffect(() => {
    if (focus === "") {
      let newSearch = copySearchParams(searchParams);
      newSearch.set("focus", "intro");
      setSearchParams(newSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  // If we've landed on the page without a household, create a new one.
  useEffect(() => {
    if (!householdInput && !householdId) {
      const defaultHousehold = createDefaultHousehold(
        metadata.countryId,
        metadata.variables,
        metadata.entities
      );
      setHouseholdInput(defaultHousehold);
      if (autoCompute) {
        getDefaultHouseholdId(metadata).then((householdId) => {
          let newSearch = new URLSearchParams(window.location.search);
          newSearch.set("household", householdId);
          setSearchParams(newSearch);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!householdInput, !!householdId, autoCompute]);

  // If the household input changes, update the household.
  useEffect(() => {
    let requests = [];
    if (householdId || autoCompute) {
      if (!householdInput) {
        requests.push(
          countryApiCall(countryId, `/household/${householdId}`)
            .then((res) => res.json())
            .then((dataHolder) => {
              return { input: dataHolder.result.household_json };
            })
            .then((dataHolder) => {
              setHouseholdInput(dataHolder.input);
            })
        );
      }
      requests.push(
        countryApiCall(
          countryId,
          `/household/${householdId}/policy/${
            policy.baseline.id ||
            (metadata ? metadata.current_law_id : "current-law")
          }`
        )
          .then((res) => res.json())
          .then((dataHolder) => {
            if(dataHolder.status === "error") {
              setLoading(false);
              setError(dataHolder.result);
              return { baseline: null }
            } else {
              return { baseline: dataHolder.result };
            }
          })
          .then((dataHolder) => {
            setHouseholdBaseline(dataHolder.baseline);
          })
      );
      if (policy.reform.id && policy.reform.id !== policy.baseline.id) {
        requests.push(
          countryApiCall(
            countryId,
            `/household/${householdId}/policy/${policy.reform.id}`
          )
            .then((res) => res.json())
            .then((dataHolder) => {
              if(dataHolder.status === "error") {
                setLoading(false);
                setError(dataHolder.message);
                return { reform: null }
              } else {
                return { reform: dataHolder.result };
              }
            })
            .then((dataHolder) => {
              setHouseholdReform(dataHolder.reform);
            })
        );
      } else {
        requests.push(Promise.resolve({}));
      }
      setLoading(true);
      Promise.all(requests).then((results) => {
        setLoading(false);
      });
    } else {
      setHouseholdBaseline(null);
      setHouseholdReform(null);
      const defaultHousehold = createDefaultHousehold(
        metadata.countryId,
        metadata.variables,
        metadata.entities
      );
      setHouseholdInput(defaultHousehold);
      if (autoCompute) {
        getDefaultHouseholdId(metadata).then((householdId) => {
          let newSearch = new URLSearchParams(window.location.search);
          newSearch.set("household", householdId);
          setSearchParams(newSearch);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, householdId, policy.reform]);

  if (!householdInput) {
    middle = <LoadingCentered />;
  } else if (
    Object.keys(metadata.variables).includes(
      focus.split(".")[focus.split(".").length - 1]
    )
  ) {
    const variableNames = focus.includes("input.household.")
      ? metadata.basicInputs.map((variable) => `input.household.${variable}`)
      : metadata.variablesInOrder;
    let nextVariable =
      variableNames[variableNames.indexOf(searchParams.get("focus")) + 1];
    if (!nextVariable) {
      nextVariable = "householdOutput.netIncome";
    }
    middle = (
      <VariableEditor
        metadata={metadata}
        householdInput={householdInput}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        setHouseholdInput={setHouseholdInput}
        nextVariable={nextVariable}
        autoCompute={autoCompute}
      />
    );
  } else if (
    Object.keys(metadata.variableModules).includes(focus) ||
    ["input", "input.household"].includes(focus)
  ) {
    const node = findInTree({ children: [metadata.variableTree] }, focus);
    middle = (
      <FolderPage
        label={node.label}
        children={node.children}
        description={
          metadata.variableModules[focus] &&
          metadata.variableModules[focus].description
        }
      />
    );
  } else if (focus === "input.household.maritalStatus") {
    middle = (
      <MaritalStatus
        metadata={metadata}
        householdInput={householdInput}
        setHouseholdInput={setHouseholdInput}
        autoCompute={autoCompute}
      />
    );
  } else if (focus === "intro") {
    middle = <HouseholdIntro />;
  } else if (focus === "input.household.children") {
    middle = (
      <CountChildren
        metadata={metadata}
        householdInput={householdInput}
        setHouseholdInput={setHouseholdInput}
        autoCompute={autoCompute}
      />
    );
  } else if (focus && focus.startsWith("householdOutput.")) {
    if (!autoCompute) {
      setAutoCompute(true);
    }
    if (!householdId && !loading) {
      getNewHouseholdId(metadata.countryId, householdInput, metadata).then(
        (householdId) => {
          let newSearch = new URLSearchParams(window.location.search);
          newSearch.set("household", householdId);
          setSearchParams(newSearch);
        }
      );
      setLoading(true);
    }
    middle = (
      <>
        <HouseholdOutput
          metadata={metadata}
          householdBaseline={householdBaseline}
          householdReform={householdReform}
          householdInput={householdInput}
          policy={policy}
          loading={loading}
          hasShownHouseholdPopup={hasShownHouseholdPopup}
          setHasShownHouseholdPopup={setHasShownHouseholdPopup}
        />
      </>
    );
  } else if (focus === "householdOutput") {
    middle = (
      <FolderPage
        label="Household results"
        children={HOUSEHOLD_OUTPUT_TREE[0].children}
      />
    );
  } else {
    middle = <LoadingCentered />;
  }
  if (error) {
    let errorContent = error.error;
    middle = <Result
      status="error"
      title="Something went wrong"
      subTitle={
        <p>{errorContent}</p>
      }
    />
  }
  if (mobile) {
    return (
      <MobileHouseholdPage
        mainContent={middle}
        metadata={metadata}
        householdInput={householdInput}
        setHouseholdInput={setHouseholdInput}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        autoCompute={autoCompute}
      />
    );
  }
  return (
    <ThreeColumnPage
      left={<HouseholdLeftSidebar metadata={metadata} />}
      middle={middle}
      right={
        <HouseholdRightSidebar
          metadata={metadata}
          householdBaseline={householdBaseline}
          householdInput={householdInput}
          autoCompute={autoCompute}
          loading={loading}
          policy={policy}
        />
      }
      noMiddleScroll={!mobile && focus && focus.startsWith("householdOutput.")}
    />
  );
}

function HouseholdLeftSidebar(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("focus") || "";
  const onSelect = (name) => {
    let newSearch = copySearchParams(searchParams);
    newSearch.set("focus", name);
    setSearchParams(newSearch);
  };

  return (
    <div>
      <div style={{ padding: 10 }}>
        <VariableSearch metadata={metadata} />
      </div>
      <StackedMenu
        firstTree={metadata.variableTree.children}
        selected={selected}
        onSelect={onSelect}
        secondTree={HOUSEHOLD_OUTPUT_TREE[0].children}
      />
    </div>
  );
}
