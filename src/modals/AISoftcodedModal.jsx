
import { useState } from "react";
import { Button, Modal } from "antd"
import { getExplainerAIPromptContent } from "../pages/household/output/explainerAIPromptContent";

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

export default function AISoftcodedModal(props) {
  const {isModalVisible, setIsModalVisible} = props;

  const [tracerOutput, setTracerOutput] = useState("");

  // Function to hide modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to fetch tracer output; will just
  // fetch local object for now; may later require
  // adding JSON parsing
  function handleFetchTracer() {
    return tracerOutput;
  }

  // Temporarily hardcoding the explainer variable and value
  const EXPLAINER_VARIABLE_TEST = "eitc";
  const EXPLAINER_VALUE_TEST = 0;
  const explainerAIPromptContent = getExplainerAIPromptContent(
    EXPLAINER_VARIABLE_TEST,
    EXPLAINER_VALUE_TEST,
    tracerOutput
  );
  console.error(explainerAIPromptContent);

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
        <p>
          <strong>Earned Income Tax Credit (EITC):</strong> The EITC is a
          refundable tax credit for low to moderate-income working individuals
          and families in the United States. In this simulation, the EITC amount
          is <strong>$6,960</strong>.
        </p>

        <h4>Main factors leading to this result:</h4>
        <ul>
          <li>The household has 2 qualifying children</li>
          <li>The filer&apos;s adjusted earnings are $20,000</li>
          <li>The filer is eligible for the EITC</li>
        </ul>

        <h4>Key thresholds and rules:</h4>
        <ul>
          <li>
            The maximum EITC for a family with 2 children in 2024 is{" "}
            <strong>$6,960</strong>
          </li>
          <li>
            The phase-in rate for 2 children is <strong>40%</strong>
          </li>
          <li>
            The phase-out starts at <strong>$22,720</strong> for single filers
            with 2 children
          </li>
        </ul>

        <p>
          In this case, the filer&apos;s income of <strong>$20,000</strong> is
          high enough to receive the maximum EITC but not high enough to trigger
          the phase-out. The credit is fully phased in (40% * $20,000 = $8,000,
          which exceeds the maximum of $6,960).
        </p>

        <h4>Changes that could affect this result:</h4>
        <ul>
          <li>
            <strong>Higher income:</strong> If the filer&apos;s income exceeded{" "}
            <strong>$22,720</strong>, the credit would start to phase out
          </li>
          <li>
            <strong>Fewer children:</strong> This would lower the maximum credit
            and change phase-in/out rates
          </li>
          <li>
            <strong>Filing jointly:</strong> This would increase the phase-out
            threshold, potentially allowing a higher income before reduction
          </li>
        </ul>
      </Modal>
  )
}