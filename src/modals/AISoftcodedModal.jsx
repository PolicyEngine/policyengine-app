import { Button, Modal } from "antd"

export default function AISoftcodedModal(props) {
  const {isModalVisible, setIsModalVisible} = props;

  // Function to hide modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

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