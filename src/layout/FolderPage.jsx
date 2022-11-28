import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../api/call";
import style from "../style";
import ResultsPanel from "./ResultsPanel";
import { motion } from "framer-motion";


export default function FolderPage(props) {
    const { label, children, description } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    
    return <ResultsPanel
        title={label}
        description={description}
        >
            <div style={{
                display: "flex",
                width: "100%",
                flexWrap: "wrap",
            }}
            >{children.map(child => (
                <motion.div
                    key={child.name}
                    style={{
                        width: 150,
                        height: 150,
                        backgroundColor: style.colors.LIGHT_GRAY,
                        margin: 10,
                        padding: 10,
                        borderRadius: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                        let newSearch = copySearchParams(searchParams);
                        newSearch.set("focus", child.name);
                        setSearchParams(newSearch);
                    }}
                    >
                        <h6 style={{textAlign: "center"}}>{child.label}</h6>
                    </motion.div>
            ))}
            </div>
            
        </ResultsPanel>
}