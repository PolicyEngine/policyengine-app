import { useContext } from "react";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import style from "../../../style";
import PolicyLeftSidebar from "./PolicyLeftSidebar";
import PolicyPage from "./PolicyPage";


export default function Policy() {
    const PolicyEngine = useContext(PolicyEngineContext);
    if (!PolicyEngine.metadata) {
        return null;
    }
    return <div style={{
        height: `calc(100vh - ${style.spacing.HEADER_SIZE}px)`,
        display: "flex",
    }}>
        <div style={{
            width: "20%",
            backgroundColor: "white",
            padding: 20,
        }}>
            <PolicyLeftSidebar />
        </div>
            <div style={{
                width: "60%",
                backgroundColor: "#f5f5f5",
            }}>
                <div 
                    style={{
                        padding: 20,
                    }}
                >
                    <PolicyPage />
                </div>
            </div>
            <div style={{
                width: "20%",
                backgroundColor: "white",
                padding: 20,
            }}>
                <h3>Overview</h3>
                {
                    PolicyEngine.page
                }
            </div>
    </div>
}