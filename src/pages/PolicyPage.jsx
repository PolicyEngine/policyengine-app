import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiCall } from "../api/call";
import BiPanel from "../layout/BiPanel";
import Menu from "../layout/Menu";
import ThreeColumnPage from "../layout/ThreeColumnPage";
import HouseholdRightSidebar from "./household/HouseholdRightSidebar";

const POLICY_OUTPUT_TREE = [{
    name: "policyOutput",
    label: "Results",
    children: [{
        name: "policyOutput.netIncome",
        label: "Budgetary impact",
    }, {
        name: "policyOutput.distributionalImpact",
        label: "Distributional impact",
    }],
}]

function PolicyLeftSidebar(props) {
    const { metadata } = props;
    const [searchParams, setSearchParams] = useSearchParams();

    const tree = [{
        name: "policy",
        label: "Policy",
    }, ...metadata.parameterTree]
    
    return <BiPanel
        left={
            <Menu
                tree={tree}
                selected={searchParams.get("focus")}
                onSelect={(focus) => {
                    let newSearchParams = {};
                    for (const [key, value] of searchParams) {
                        newSearchParams[key] = value;
                    }
                    newSearchParams.focus = focus;
                    setSearchParams(newSearchParams);
                }}
            />
        }
        leftTitle="Parameters"
        right={
            <Menu
                tree={POLICY_OUTPUT_TREE}
                selected={searchParams.get("focus")}
                onSelect={(focus) => {
                    let newSearchParams = {};
                    for (const [key, value] of searchParams) {
                        newSearchParams[key] = value;
                    }
                    newSearchParams.focus = focus;
                    setSearchParams(newSearchParams);
                }}
            />
        }
        rightTitle="Impact"
        leftNavigatedSelected={!(searchParams.get("focus") || "").includes("policyOutput.")}
    />;
}


export default function PolicyPage(props) {
    const { metadata, policy, setPolicy } = props;

    const [searchParams, setSearchParams] = useSearchParams();
    const focus = searchParams.get("focus") || "";

    useEffect(() => {
        if (!focus) {
          let newSearch = {};
          for (const [key, value] of searchParams) {
              newSearch[key] = value;
          }
          newSearch.focus = "policy";
          setSearchParams(newSearch);
        }});

    return <ThreeColumnPage
        left={<PolicyLeftSidebar metadata={metadata} />}
        middle="Policy"
        right={<BiPanel 
            leftTitle="Household" 
            rightTitle="Policy" 
            left={<HouseholdRightSidebar metadata={metadata} />} 
          />}
    />
}