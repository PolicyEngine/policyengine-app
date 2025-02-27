import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../api/call";
import style from "../style";
import ResultsPanel from "./ResultsPanel";
import { motion } from "framer-motion";
import useMobile from "./Responsive";
import { capitalize } from "../lang/format";
import { getPolicyOutputTree } from "pages/policy/output/tree";

function FolderPageDescription(props) {
  // Try to find the current focus in the tree.
  const [searchParams] = useSearchParams();
  const focus = searchParams.get("focus");
  const { metadata, inPolicySide } = props;
  const mobile = useMobile();
  if (!metadata) return null;
  const POLICY_OUTPUT_TREE = getPolicyOutputTree(
    metadata.countryId,
    searchParams,
  );
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: mobile ? "30vh" : "60vh",
      }}
    >
      <div>
        <h3>
          {inPolicySide ? "Create a policy reform" : "Household variables"}
        </h3>
        <p style={{ fontFamily: "Roboto Serif" }}>
          {inPolicySide ? (
            <>
              Build a tax-benefit reform by selecting parameters from the menu
              (organised by government department). <br />
              <br />
              Then when you&apos;re ready, click{" "}
              <i>Calculate economic impact</i> to see how your reform would
              affect the economy, or <i>Enter my household</i> to see how it
              would affect a specific household.
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
      {inPolicySide && (
        <FolderPageDescription
          metadata={metadata}
          inPolicySide={inPolicySide}
        />
      )}

      {mobile && (
        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: mobile ? "center" : "left",
          }}
        >
          {children
            .filter((child) => !child.name.includes("pycache"))
            .map((child) => (
              <motion.div
                key={child.name}
                style={{
                  width: mobile ? 125 : 150,
                  height: 100,
                  backgroundColor: style.colors.LIGHT_GRAY,
                  margin: 10,
                  padding: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  flexGrow: mobile && 1.5,
                  border: "1px solid grey",
                }}
                whileHover={{
                  backgroundColor: style.colors.DARK_GRAY,
                  color: "#fff",
                }}
                transition={{
                  duration: 0.001,
                }}
                onClick={() => {
                  let newSearch = copySearchParams(searchParams);
                  newSearch.set("focus", child.name);
                  setSearchParams(newSearch);
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    color: "inherit",
                    margin: 0,
                  }}
                >
                  {capitalize(child.label)}
                </p>
              </motion.div>
            ))}
        </div>
      )}
    </ResultsPanel>
  );
}
