import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../api/call";
import style from "../style";
import ResultsPanel from "./ResultsPanel";
import { motion } from "framer-motion";
import useMobile from "./Responsive";
import { capitalize } from "../lang/format";
import Divider from "./Divider";
import { getPolicyOutputTree } from "pages/policy/output/tree";

function FolderPageDescription(props) {
  // Try to find the current focus in the tree.
  const [searchParams, setSearchParams] = useSearchParams();
  const focus = searchParams.get("focus");
  const { metadata, inPolicySide } = props;
  if (!metadata) return null;
  const POLICY_OUTPUT_TREE = getPolicyOutputTree(metadata.countryId);
  let currentNode;

  if (focus && focus.startsWith("policyOutput")) {
    currentNode = { children: POLICY_OUTPUT_TREE };
  } else {
    currentNode = { children: [metadata.parameterTree] };
  }
  let breadcrumbs = [];
  try {
    let stem = "";
    for (let name of focus.split(".")) {
      stem += name;
      const fixedStem = stem;
      currentNode = currentNode.children.find(
        (node) => node.name === fixedStem,
      );
      breadcrumbs.push({
        name: stem,
        label: currentNode.label,
      });
      stem += ".";
    }
  } catch (e) {
    currentNode = null;
  }
  return (
    <div style={{display: "flex", alignItems: "center", height: "60vh"}}>
      <div>
      <h3>{inPolicySide ? "Create a policy reform" : "Household variables"}</h3>
      <p style={{fontFamily: "Roboto Serif"}}>
        {inPolicySide ? (
          <>
            Build a tax-benefit reform by selecting parameters from the menu
            to the left (organised by government department). Then when you&apos;re ready, click{" "}
            <i>Calculate economic impact</i> on the right to see how your reform
            would affect the economy, or <i>Enter my household</i> to see how it would affect a specific household.
          </>
        ) : (
          "Select a household variable from the menu items below to enter your own information."
        )}
      </p>
      </div>
    </div>
  );
}

export default function FolderPage(props) {
  const { children, metadata, inPolicySide } = props;
  // Try to find the current focus in the tree.
  const [searchParams, setSearchParams] = useSearchParams();
  const mobile = useMobile();

  return (
    <ResultsPanel>
      {!mobile && inPolicySide && (
        <FolderPageDescription
          metadata={metadata}
          inPolicySide={inPolicySide}
        />
      )}
    </ResultsPanel>
  );
}
