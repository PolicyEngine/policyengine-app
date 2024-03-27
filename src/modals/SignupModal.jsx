
import { useState } from "react";
import { Modal } from "antd";
import FormContext from "../layout/forms/FormContext";
import FormItem from "../layout/forms/FormItem";
import colors from "../style/colors";

export default function SignupModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <Modal 
      open={isModalOpen}
      footer={null}
    >
      <h6
        style={{
          paddingBottom: "16px",
          paddingTop: "20px",
          fontWeight: "bold",
          fontSize: 20
        }}
      >PolicyEngine depends on you</h6>
      <p>PolicyEngine&apos;s free, open-source software relies on your feedback to make further improvements.</p>
      <p>To see your results, please provide your email address below.</p>
      <FormContext
        submitButtonText="Submit"
      >
        <FormItem
          label=""
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          containerStyle={{
            paddingTop: "16px",
          }}
        />
      </FormContext>
    </Modal>
  );
}