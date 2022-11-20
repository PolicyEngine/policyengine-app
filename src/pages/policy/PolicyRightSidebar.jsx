import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../controls/Button";
import InputField from "../../controls/InputField";

function PolicyNamer(props) {
  const { policy, setPolicy, metadata } = props;
  const label = policy.label || `Policy #${policy.id}`;

  return <div style={{ display: "flex", alignItems: "center" }}>
    <InputField placeholder={label} padding={10} width="100%" onChange={name => {
      setPolicy(policy.policy, name);
    }} />
  </div>;
}

export default function PolicyRightSidebar(props) {
  const { policy, setPolicy, metadata } = props;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  if (!policy || !policy.id) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "60%",
        }}
      >
        <h4 style={{ marginBottom: 20 }}>No reform specified</h4>
        <Button
          text="Create a reform"
          onClick={() => {
            // Navigate to /<country>/household, preserving URL parameters
            const country = metadata.countryId;
            const newSearchParams = {};
            for (const [key, value] of searchParams) {
              newSearchParams[key] = value;
            }
            newSearchParams.focus = "policy";
            navigate(`/${country}/policy`, { state: { newSearchParams } });
          }}
        />
      </div>
    );
  }
  return <div style={{paddingTop: 10 }}>
    <PolicyNamer policy={policy} metadata={metadata} setPolicy={setPolicy} />
  </div>
}
