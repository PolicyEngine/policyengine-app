import { useContext } from "react";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import style from "../../../style";
import ThreeColumnPage from "../../layout/ThreeColumnPage";
import PolicyLeftSidebar from "./PolicyLeftSidebar";
import PolicyPage from "./PolicyPage";

export default function Policy() {
  const PolicyEngine = useContext(PolicyEngineContext);
  if (!PolicyEngine.metadata) {
    return null;
  }
  const parametersInOrder = PolicyEngine.parametersInOrder;
  return (
    <ThreeColumnPage
      left={<PolicyLeftSidebar />}
      middle={<PolicyPage />}
      right={<></>}
    />
  );
}
