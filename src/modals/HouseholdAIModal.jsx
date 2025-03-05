import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { countryApiCall } from "../api/call";
import useCountryId from "../hooks/useCountryId";
import { MarkdownFormatter } from "../layout/MarkdownFormatter";
import { useSearchParams } from "react-router-dom";
import { COUNTRY_BASELINE_POLICIES } from "../data/countries";
import LoadingCentered from "../layout/LoadingCentered";
import ErrorComponent from "../layout/ErrorComponent";

/**
 * Modal for displaying AI output
 * @param {Object} props
 * @param {Object} props.variableName The name of the variable
 * @param {String} props.value The value of the variable
 * @param {Boolean} props.isModalVisible Whether the modal is visible
 * @param {Function} props.setIsModalVisible Function to set the visibility of the modal
 * @param {Boolean} props.isDemo Whether this is a demo of the feature (used on AI landing page)
 * @returns {React.Component} The modal component
 */

export default function HouseholdAIModal(props) {
  const { isModalVisible = false, setIsModalVisible, variableName, isDemo = false } = props || {};
  
  // For demo version on the AI page
  const [internalModalVisible, setInternalModalVisible] = useState(false);
  const showModal = isDemo ? internalModalVisible : isModalVisible;
  const setShowModal = isDemo ? setInternalModalVisible : setIsModalVisible;

  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const countryId = useCountryId();

  // Check if variable has changed by its name, not the
  // object itself; React will treat two objects with same keys
  // and values as different if rendered separately
  const prevVariableName = useRef(null);

  const [searchParams] = useSearchParams();
  const householdId = searchParams.get("household");
  // Currently not implemented for baseline/reform comparison pairs
  const policyId = COUNTRY_BASELINE_POLICIES[countryId];

  // Function to hide modal
  const handleCancel = () => {
    setShowModal(false);
  };

  // Example explanation for demo mode
  const demoExplanation = `# WIC Benefits Explanation

You qualify for $475 in WIC (Women, Infants, and Children) benefits based on your household's income and composition.

## Eligibility Criteria

Your household qualifies for WIC because:
- You have a 3-year-old child (WIC serves children up to age 5)
- Your household income of $47,000 is below 185% of the Federal Poverty Level for a family of 4
- Your household meets categorical eligibility requirements

## Benefit Calculation

Your WIC benefit is calculated as follows:
- Food package value for a child 1-4 years old: approximately $39.60 per month
- Annual calculation: $39.60 × 12 months = $475.20 (rounded to $475)

## Factors That Could Change Your Benefit

Your WIC benefit amount could change if:
- Your child turns 5 (you would lose eligibility)
- Your income increases above the 185% FPL threshold ($54,385 for a family of 4)
- Your household composition changes (adding an infant or pregnant woman would increase benefits)
- You move to a different state (WIC food package values vary by state)
`;

  // Convert this and fetchTracer to async/await
  const fetchAnalysis = useCallback(async () => {
    // If demo mode, use the sample explanation
    if (isDemo) {
      setIsLoading(false);
      setAnalysis(demoExplanation);
      return;
    }
    
    setIsError(false);
    const jsonObject = {
      household_id: householdId,
      policy_id: policyId,
      variable: variableName,
    };

    const res = await countryApiCall(
      countryId,
      `/tracer-analysis`,
      jsonObject,
      "POST",
    );

    if (!res || !res.ok) {
      console.error("Error response within fetchAnalysis");
      console.error(res);
      setIsLoading(false);
      setIsError(true);
      return;
    }

    // Response can either be static or streaming; if static, parse and set analysis
    if (res.headers.get("Content-Type") !== "application/x-ndjson") {
      const resJson = await res.json();
      const result = await JSON.parse(resJson.result);
      setIsLoading(false);
      setAnalysis(result);
      return;
    }

    // Otherwise, handle streaming using ReadableStream
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    setIsLoading(false);

    let isComplete = false;
    while (!isComplete) {
      const { done, value } = await reader.read().catch((error) => {
        console.error("Error reading response stream:", error);
      });
      if (done) {
        isComplete = true;
      }
      const chunks = decoder.decode(value, { stream: true }).split("\n");
      for (const chunk of chunks) {
        if (chunk) {
          try {
            const data = await JSON.parse(chunk);
            if (data.stream) {
              setAnalysis((prevAnalysis) => prevAnalysis + data.stream);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
            setIsError(true);
          }
        }
      }
    }
  }, [countryId, householdId, policyId, variableName, isDemo]);

  useEffect(() => {
    function resetModalData() {
      prevVariableName.current = variableName;
    }

    // If modal isn't shown, don't do anything
    if (!showModal) {
      return;
    }

    // If variable hasn't changed and we generated analysis,
    // don't do anything (e.g., user clicked on same variable)
    if (!isDemo && variableName === prevVariableName.current) {
      return;
    }

    fetchAnalysis();
    resetModalData();
  }, [showModal, variableName, fetchAnalysis, isDemo]);

  // For demo purposes on the AI page
  if (isDemo) {
    return (
      <>
        <Button 
          type="primary" 
          onClick={() => setInternalModalVisible(true)}
          style={{ marginTop: "1rem" }}
        >
          Try AI Explanation Demo
        </Button>

        <Modal
          title="AI Household Explanation Demo"
          open={internalModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>,
          ]}
          width="60%"
        >
          {isLoading ? (
            <LoadingCentered />
          ) : isError ? (
            <ErrorComponent message="Error loading demo. Please try again later." />
          ) : (
            <MarkdownFormatter markdown={analysis} pSize={14} />
          )}
        </Modal>
      </>
    );
  }

  return (
    <Modal
      title="Explanation"
      open={isModalVisible}
      onCancel={handleCancel} // Hide the modal on cancel/close
      footer={[
        <Button key="back" onClick={handleCancel}>
          Close
        </Button>,
      ]}
      width="50%"
    >
      {isLoading ? (
        <LoadingCentered />
      ) : isError ? (
        <ErrorComponent message="Error loading analysis. Please try again later." />
      ) : (
        <MarkdownFormatter markdown={analysis} pSize={14} />
      )}
    </Modal>
  );
}
