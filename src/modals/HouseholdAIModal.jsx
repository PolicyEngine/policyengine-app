import { Button, Modal } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { countryApiCall } from "../api/call";
import { COUNTRY_BASELINE_POLICIES } from "../data/countries";
import useCountryId from "../hooks/useCountryId";
import ErrorComponent from "../layout/ErrorComponent";
import LoadingCentered from "../layout/LoadingCentered";
import { MarkdownFormatter } from "../layout/MarkdownFormatter";

/**
 * Modal for displaying AI output
 * @param {Object} props
 * @param {Object} props.variableName The name of the variable
 * @param {Boolean} props.isModalVisible Whether the modal is visible
 * @param {Function} props.setIsModalVisible Function to set the visibility of the modal
 * @returns {React.Component} The modal component
 */

export default function HouseholdAIModal(props) {
  const {
    isModalVisible = false,
    setIsModalVisible,
    variableName,
  } = props || {};

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
    setIsModalVisible(false);
  };

  // Convert this and fetchTracer to async/await
  const fetchAnalysis = useCallback(async () => {
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
  }, [countryId, householdId, policyId, variableName]);

  useEffect(() => {
    function resetModalData() {
      prevVariableName.current = variableName;
    }

    // If modal isn't shown, don't do anything
    if (!isModalVisible) {
      return;
    }

    // If variable hasn't changed and we generated analysis,
    // don't do anything (e.g., user clicked on same variable)
    if (variableName === prevVariableName.current) {
      return;
    }

    fetchAnalysis();
    resetModalData();
  }, [isModalVisible, variableName, fetchAnalysis]);

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
