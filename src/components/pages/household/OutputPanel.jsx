import { useContext } from "react";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import style from "../../../style";
import { AnimatePresence, motion } from "framer-motion";
import NetIncomeBreakdown from "./NetIncomeBreakdown";
import { EarningsVariation } from "./EarningsVariation";
import { MarginalTaxRates } from "./MarginalTaxRates";

export default function OutputPanel() {
    const PolicyEngine = useContext(PolicyEngineContext);
    const netIncome = PolicyEngine.getSimulatedValue(PolicyEngine.variableNames.netIncome);
    const netIncomeFormatted = PolicyEngine.getFormattedSimulatedValue(PolicyEngine.variableNames.netIncome);
    const isExpanded = PolicyEngine.page.startsWith("householdOutput.")
    const page = PolicyEngine.page;
    return <div
        style={{
            backgroundColor: style.colors.LIGHT_GRAY,
            color: style.colors.BLACK,
            width: "60%",
            position: "fixed",
            bottom: 0,
            height: isExpanded ? `calc(100% - ${style.spacing.HEADER_SIZE}px)` : 100,
            cursor: PolicyEngine.simulatedHousehold && "pointer",
            borderTopWidth: !isExpanded ? 3 : 0,
            borderTopStyle: "solid",
            borderTopColor: style.colors.DARK_GRAY,
        }}
        onClick={() => {
            if (!isExpanded && PolicyEngine.simulatedHousehold) {
                PolicyEngine.setState({
                    page: "householdOutput.netIncome",
                });
            }
        }}
    >
        <>
            {!isExpanded && <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    height: "100%",
                }}
            >
                {
                    netIncome ?
                        <h3>You'll take home {netIncomeFormatted} after taxes and benefits</h3> :
                        <h3>Enter your household information to see your net income.</h3>
                }
            </div>}
            {isExpanded && <div
            >
                {(page === "householdOutput.netIncome") && <NetIncomeBreakdown />}
                {(page === "householdOutput.earnings") && <EarningsVariation />}
                {(page === "householdOutput.mtr") && <MarginalTaxRates />}
            </div>}
        </>
        
    </div>
}