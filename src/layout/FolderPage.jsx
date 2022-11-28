import { useSearchParams } from "react-router-dom";
import ResultsPanel from "./ResultsPanel";


export default function FolderPage(props) {
    const { label, children } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    
    return <ResultsPanel
        title={label}
        >
            Folder page
        </ResultsPanel>
}