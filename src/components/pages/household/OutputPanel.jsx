import { useContext } from "react";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import style from "../../../style";


export default function OutputPanel() {
    const PolicyEngine = useContext(PolicyEngineContext);
    const netIncome = PolicyEngine.getSimulatedValue(PolicyEngine.variableNames.netIncome);
    const netIncomeFormatted = PolicyEngine.getFormattedSimulatedValue(PolicyEngine.variableNames.netIncome);
    return <div
        style={{
            backgroundColor: style.colors.BLUE,
            color: style.colors.WHITE,
            width: "60%",
            position: "fixed",
            bottom: 0,
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
        }}
    >
        {
            netIncome ?
                <h3>You'll take home {netIncomeFormatted} after taxes and benefits</h3> :
                <h3>Enter your household information to see your net income.</h3>
        }
    </div>
}