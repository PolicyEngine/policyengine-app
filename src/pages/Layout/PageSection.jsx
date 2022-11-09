import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";


export default function PageSection(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const title = props.title;
    const description = props.description;
    
    return <div>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
}