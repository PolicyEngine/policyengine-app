
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd"
import { getExplainerAIPromptContent } from "../pages/household/output/explainerAIPromptContent";
import { countryApiCall, asyncApiCall } from "../api/call";
import useCountryId from "../hooks/useCountryId";
import LoadingCentered from "../layout/LoadingCentered";

// Note that depending on implementation, this may instead be a 
// JSON object at runtime, requiring some form of parsing be written in
const tracerOutput = `
eitc<2024, (default)> = [6960.]
  eitc_eligible<2024, (default)> = [ True]
    eitc_investment_income_eligible<2024, (default)> = [ True]
      eitc_relevant_investment_income<2024, (default)> = [0.]
    eitc_demographic_eligible<2024, (default)> = [ True]
      eitc_child_count<2024, (default)> = [2]
      age<2024, (default)> = [40.  5.  5.]
      is_full_time_student<2024, (default)> = [False  True  True]
  eitc_maximum<2024, (default)> = [6960.]
    eitc_child_count<2024, (default)> = [2]
  eitc_phased_in<2024, (default)> = [6960.]
    eitc_maximum<2024, (default)> = [6960.]
    eitc_phase_in_rate<2024, (default)> = [0.4]
      eitc_child_count<2024, (default)> = [2]
    filer_adjusted_earnings<2024, (default)> = [20000.]
      adjusted_earnings<2024, (default)> = [20000.     0.     0.]
      is_tax_unit_dependent<2024, (default)> = [False  True  True]
  eitc_reduction<2024, (default)> = [0.]
    filer_adjusted_earnings<2024, (default)> = [20000.]
    adjusted_gross_income<2024, (default)> = [20000.]
      irs_gross_income<2024, (default)> = [20000.     0.     0.]
      above_the_line_deductions<2024, (default)> = [0.]
    eitc_phase_out_start<2024, (default)> = [22720.]
      eitc_child_count<2024, (default)> = [2]
      tax_unit_is_joint<2024, (default)> = [False]
    eitc_phase_out_rate<2024, (default)> = [0.2106]
      eitc_child_count<2024, (default)> = [2]
`;

/**
 * Modal for displaying AI output
 * @param {Object} props 
 * @param {Object} props.variable The object form of the variable, taken from metadata;
 * contains 'name' field referring to variable name in back end (e.g., household_net_income)
 * and 'label' referring to display label (e.g., household net income)
 * @param {String} props.value The value of the variable
 * @param {Boolean} props.isModalVisible Whether the modal is visible
 * @param {Function} props.setIsModalVisible Function to set the visibility of the modal
 * @returns {React.Component} The modal component
 */
export default function AISoftcodedModal(props) {
  const {
    isModalVisible, 
    setIsModalVisible,
    variable,
    value
  } = props;

  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const countryId = useCountryId();
  // Check if variable has changed by its name, not the 
  // object itself; React will treat two objects with same keys
  // and values as different if rendered separately
  const prevVariableName = useRef(null);

  // Function to hide modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to fetch tracer output; will just
  // fetch local object for now; may later require
  // adding JSON parsing
  function fetchTracer() {
    return tracerOutput;
  }

  // Convert this and fetchTracer to async/await
  const fetchAI = useCallback((prompt) => {

    let fullAnalysis = "";

    countryApiCall(countryId, `/analysis`, {
      prompt: prompt,
    })
      .then((res) => res.json())
      .then((data) => {
        return data.result.prompt_id;
      })
      .then((promptId) => {
        asyncApiCall(
          `/${countryId}/analysis/${promptId}`,
          null,
          9_000,
          4_000,
          (data) => {
            // We've got to wait ten seconds for the next part of the response to be ready,
            // so let's add the response word-by-word with a small delay to make it seem typed.
            // This almost certainly doesn't work at present due to bug in streaming in API.
            const analysisFromCall = data.result.analysis;
            // Start from the new bit (compare against fullAnalysis)
            const newAnalysis = analysisFromCall.substring(fullAnalysis.length);
            // Start from the
            const analysisWords = newAnalysis.split(" ");
            fullAnalysis = analysisFromCall;
            setAnalysis(fullAnalysis);
          },
        ).then((data) => {
          setAnalysis(data.result.analysis);
          setIsLoading(false);
        });
      });
  }, [countryId]);

  useEffect(() => {
    function resetModalData() {
      prevVariableName.current = variable.name;
      setIsLoading(true);
    }

    // If modal isn't shown, don't do anything
    if (!isModalVisible) {
      return;
    }

    // If variable hasn't changed and we generated analysis,
    // don't do anything (e.g., user clicked on same variable)
    if (variable.name === prevVariableName.current) {
      return;
    }

    const tracerOutput = fetchTracer();

    const prompt = getExplainerAIPromptContent(
      variable.label,
      value,
      tracerOutput
    );


    const aiAnalysis = fetchAI(prompt);
    setAnalysis(aiAnalysis);
    resetModalData();


  }, [isModalVisible, variable, value, fetchAI])

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
      >
        {isLoading && <LoadingCentered />}
        {analysis}
      </Modal>
  )
}