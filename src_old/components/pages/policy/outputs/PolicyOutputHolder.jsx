import { useContext } from "react";
import PolicyEngineContext from "../../../../logic/PolicyEngineContext";
import { formatVariableValue } from "../../../../logic/variableValues";
import ResultsPanel from "../../../layout/ResultsPanel";
import BudgetaryImpact from "./BudgetaryImpact";
import DistributionalImpact from "./DistributionalImpact";

export default function PolicyOutputHolder() {
  const PolicyEngine = useContext(PolicyEngineContext);

  // This component should hold all policy output pages, displaying a loading message if
  // the simulation results aren't finished yet.

  if (!PolicyEngine.reformImpact) {
    PolicyEngine.getReformImpact();
    return <div>Loading...</div>;
  }

  const page = PolicyEngine.policyPage;

  return (
    <>
      {page === "policyOutput.budgetaryImpact" && <BudgetaryImpact />}
      {page === "policyOutput.distributionalImpact" && <DistributionalImpact />}
    </>
  );
}
