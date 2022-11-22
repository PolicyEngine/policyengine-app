import { useNavigate, useSearchParams } from "react-router-dom";
import { getNewPolicyId } from "../../api/parameters";
import Button from "../../controls/Button";
import InputField from "../../controls/InputField";

function PolicyNamer(props) {
  const { policy, setPolicy, metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const label = policy.reform.label || `Policy #${searchParams.get("reform")}`;

  return <div style={{ display: "flex", alignItems: "center" }}>
    <InputField placeholder={label} padding={10} width="100%" onChange={name => {
      getNewPolicyId(metadata.countryId, policy.reform.data, name).then(() => {
        let newSearch = {};
        for (const [key, value] of searchParams) {
          newSearch[key] = value;
        }
        newSearch.renamed = true;
        setSearchParams(newSearch);
      });
    }} />
  </div>;
}

export default function PolicyRightSidebar(props) {
  const { policy, setPolicy, metadata } = props;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  if (!policy.reform.data) {
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
