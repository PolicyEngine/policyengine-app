import style from "../../../style";
import LoadingCentered from "../../../layout/LoadingCentered";
import { getPolicyOutputTree, policyOutputs } from "./tree";
import ResultsPanel from "../../../layout/ResultsPanel";
import PolicyImpactPopup from "../../../modals/PolicyImpactPopup";
import { useScreenshot } from "use-react-screenshot";
import { getImpactReps } from "./ImpactTypes";
import { Progress, message } from "antd";
import { useEffect, useRef, useState } from "react";
import Analysis from "./Analysis";
import PolicyReproducibility from "./PolicyReproducibility";
import useMobile from "layout/Responsive";
import ErrorPage from "layout/ErrorPage";
import ResultActions from "layout/ResultActions";
import { downloadCsv } from "./utils";
import { useReactToPrint } from "react-to-print";
import PolicyBreakdown from "./PolicyBreakdown";
import { Helmet } from "react-helmet";
import useCountryId from "../../../hooks/useCountryId";
import BottomImpactDescription from "../../../layout/BottomImpactDescription";
import { Link } from "react-router-dom";

/**
 *
 * @returns component for displaying a message that the policy is empty
 */
export function DisplayEmpty() {
  return (
    <ResultsPanel
      style={{ paddingTop: 50 }}
      title="Your policy is empty"
      description="You haven't added any reforms to your policy yet. Change policy parameters and see the results here."
    />
  );
}

/**
 *
 * @param {object} props
 * @param {object} props.error the error object
 * @returns component for displaying an error
 */

export function DisplayError(props) {
  return (
    <ErrorPage
      message={`We ran into an issue when trying to simulate your policy. \
      Please try again later.`}
    />
  );
}

/**
 *
 * @param {object} props
 * @param {number} props.secondsElapsed the time that has passed
 * @param {number} props.averageImpactTime the average impact time
 * @returns component for displaying a progress bar that fills up over time
 */
export function DisplayWait(props) {
  const { secondsElapsed, averageImpactTime, queuePos } = props;

  const countryId = useCountryId();

  let queueMsg = "";
  if (Number(queuePos) === 0) {
    queueMsg = "We are currently running your simulation.";
  } else {
    queueMsg = `Your position in the queue is ${queuePos}.`;
  }

  const averageSeconds = Math.min(
    Math.round(averageImpactTime / 5) * 5,
    60 * 5,
  );

  const formatDuration = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes === 0) {
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    } else if (seconds === 0) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} and ${seconds} second${seconds !== 0 ? "s" : 0}`;
    }
  };

  const averageTime = formatDuration(averageSeconds);

  return (
    <div style={{ textAlign: "center", paddingTop: 50 }}>
      <LoadingCentered message="Simulating the impact of your policy..." />
      <Progress
        showInfo={false}
        percent={
          averageImpactTime
            ? Math.min(90, (secondsElapsed / averageImpactTime) * 100)
            : 0
        }
        strokeColor={style.colors.BLUE}
      />
      <p style={{ paddingTop: "12px", marginBottom: "2px" }}>{queueMsg}</p>
      <p style={{ color: "grey" }}>
        This usually takes around {averageTime}, but may take longer.
      </p>
      <p>
        You can track the queue{" "}
        <Link
          to={`/${countryId}/simulations`}
          style={{ color: style.colors.BLUE, textDecoration: "underline" }}
        >
          here
        </Link>
        .
      </p>
    </div>
  );
}

/**
 *
 * @param {object} policy the policy object
 * @returns the policy label
 */
function getPolicyLabel(policy) {
  const urlParams = new URLSearchParams(window.location.search);
  const reformPolicyId = urlParams.get("reform");
  const baselinePolicyId = urlParams.get("baseline");
  let reformLabel = policy.reform.label || `Policy #${reformPolicyId}`;
  let baselineLabel = policy.baseline.label || `Policy #${baselinePolicyId}`;
  let policyLabel;
  if (
    (reformLabel !== "Current law" && baselineLabel === "Current law") ||
    reformLabel === baselineLabel
  ) {
    policyLabel = reformLabel;
  } else {
    policyLabel = `${baselineLabel} → ${reformLabel}`;
  }
  return policyLabel;
}

/**
 *
 * @param {object} props
 * @param {object} props.impact the impact object
 * @param {object} props.policy the policy object
 * @param {object} props.metadata the metadata object
 * @returns a component for displaying the impact using charts and buttons for
 * performing actions such as downloading data and sharing results
 */
export function DisplayImpact(props) {
  const { impact, policy, metadata, showPolicyImpactPopup } = props;
  const countryId = useCountryId();
  const urlParams = new URLSearchParams(window.location.search);
  const focus = urlParams.get("focus");
  const region = urlParams.get("region");
  const timePeriod = urlParams.get("timePeriod");
  const impactType = /policyOutput\.(.+)/.exec(focus)[1];
  const policyLabel = getPolicyLabel(policy);
  const mobile = useMobile();
  const filename = impactType + `${policyLabel}`;
  let pane, downloadCsvFn;

  if (impactType === "analysis") {
    pane = (
      <Analysis
        impact={impact}
        metadata={metadata}
        policy={policy}
        region={region}
        timePeriod={timePeriod}
        policyLabel={policyLabel}
      />
    );
  } else if (impactType === "policyBreakdown") {
    pane = (
      <PolicyBreakdown
        policyLabel={policyLabel}
        metadata={metadata}
        impact={impact}
        timePeriod={timePeriod}
        region={region}
      />
    );
  } else if (impactType === "codeReproducibility") {
    pane = <PolicyReproducibility metadata={metadata} policy={policy} />;
  }
  // Remove the below else-if block when labor supply impacts are expanded
  // back to all countries
  else {
    const { chart, csv } = getImpactReps(impactType, {
      impact: impact,
      metadata: metadata,
      policyLabel: policyLabel,
      mobile: mobile,
      countryId: countryId,
    });
    pane = chart;
    if (csv) {
      downloadCsvFn = () => downloadCsv(csv(), filename);
    }
  }
  return (
    <>
      <Helmet>
        <title>
          {`${policyLabel} | ${policyOutputs[impactType]} | PolicyEngine`}
        </title>
      </Helmet>
      <LowLevelDisplay
        downloadCsv={downloadCsvFn}
        metadata={metadata}
        policy={policy}
        showPolicyImpactPopup={showPolicyImpactPopup}
      >
        {pane}
      </LowLevelDisplay>
    </>
  );
}

/**
 *
 * This component makes the component it wraps around screenshottable. It also
 * adds buttons for performing actions such as downloading data and sharing
 * results at the top, an informational carousel at the bottom, and an
 * informational popup. This component should not be used directly under normal
 * circumstances. It is already a part of the higher-level component
 * DisplayImpact: the higher-level component should be used whenever possible.
 *
 * @param {object} props
 * @param {function} props.downloadCsv callback for download csv button
 * @param {function} props.downloadPng callback for download png button
 * @param {object} props.policy the policy object
 * @param {object} props.metadata the metadata object
 * @returns a component that adds decorations around a child component that is
 * the main object, e.g., a chart
 */
export function LowLevelDisplay(props) {
  const {
    children,
    downloadCsv,
    downloadPng,
    metadata,
    policy,
    showPolicyImpactPopup,
  } = props;

  const mobile = useMobile();

  const [preparingForScreenshot, setPreparingForScreenshot] = useState(false);

  const [, takeScreenShot] = useScreenshot();
  const componentRef = useRef(null);

  useEffect(() => {
    if (preparingForScreenshot) {
      setTimeout(() => {
        takeScreenShot(componentRef.current).then((img) => {
          setPreparingForScreenshot(false);
          // send a request to /image with the image
          // The filename should be the current path (including query strings), but with /, &, ? etc. replaced with _
          const filename =
            (window.location.pathname + window.location.search)
              .replaceAll("/", "_")
              .replaceAll("&", "_")
              .replaceAll("?", "_")
              .replaceAll("=", "_")
              .replaceAll(".", "_") + ".png";
          fetch("/image", {
            method: "POST",
            body: JSON.stringify({
              filename,
              image: img,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Something went wrong");
            }
          });
        });
      }, 1000);
    }
  }, [preparingForScreenshot, takeScreenShot]);

  const urlParams = new URLSearchParams(window.location.search);
  const focus = urlParams.get("focus");
  const selectedVersion = urlParams.get("version") || metadata.version;
  const region = urlParams.get("region");
  const policyOutputTree = getPolicyOutputTree(metadata.countryId);
  const url = encodeURIComponent(window.location.href);
  const encodedPolicyLabel = encodeURIComponent(getPolicyLabel(policy));
  const twitterLink = `https://twitter.com/intent/tweet?url=${url}&text=${encodedPolicyLabel}%2C%20on%20PolicyEngine`;
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const linkedInLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    message.info("Link copied to clipboard");
  };

  const print = useReactToPrint({
    content: () => componentRef.current,
  });

  let bottomText = "";
  let bottomLink = null;

  if (metadata.countryId === "us") {
    bottomText = `PolicyEngine US v${selectedVersion} estimates reform impacts using microsimulation. `;

    if (region === "enhanced_us") {
      bottomText = bottomText.concat(
        "These calculations utilize enhanced CPS data, a beta feature. ",
      );
      bottomLink = "/us/research/enhanced-cps-beta";
    }
  } else if (metadata.countryId === "uk") {
    bottomText = `PolicyEngine UK v${selectedVersion} estimates reform impacts using microsimulation. `;
  }

  const embed = new URLSearchParams(window.location.search).get("embed");
  //eslint-disable-next-line
  const bottomElements =
    mobile & !embed ? null : (
      <p
        style={{
          marginBottom: 0,
          fontSize: "12px",
        }}
      >
        {bottomText}
        {bottomLink && (
          <a href={bottomLink} target="_blank" rel="noreferrer">
            Learn more
          </a>
        )}
      </p>
    );

  // If ?embed=True, just show `pane`, full screen.

  if (embed || preparingForScreenshot) {
    return (
      <>
        <div
          ref={componentRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: embed ? "100%" : 800 * 1.5,
            height: embed ? "100%" : 418 * 1.5,
            zIndex: 1001,
            padding: embed ? 0 : 50,
            paddingBottom: embed ? 0 : 100,
          }}
        >
          {children}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: 1000,
            backgroundColor: "rgba(255, 255, 255, 1)",
          }}
        />
      </>
    );
  }

  return (
    <ResultsPanel>
      {!preparingForScreenshot && (
        <ResultActions
          downloadPng={downloadPng}
          print={print}
          downloadCsv={downloadCsv}
          copyLink={copyLink}
          twitterLink={twitterLink}
          facebookLink={facebookLink}
          linkedInLink={linkedInLink}
        />
      )}
      <PolicyImpactPopup
        metadata={metadata}
        showPolicyImpactPopup={showPolicyImpactPopup}
      />
      <div ref={componentRef} id="downloadable-content">
        {children}
      </div>
      {!mobile && (
        <BottomImpactDescription
          selected={focus}
          options={policyOutputTree[0].children}
          bottomElements={bottomElements}
        />
      )}
    </ResultsPanel>
  );
}
