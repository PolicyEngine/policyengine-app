import { useNavigate, useSearchParams } from "react-router-dom";
import { copySearchParams } from "../api/call";
import Button from "./Button";


export default function NavigationButton(props) {
    const { text, focus, target, style } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    return <Button text={text} style={{...style, margin: 20}} onClick={() => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("focus", focus);
        if (target) {
            navigate(target + "?" + newSearch);
        } else {
            setSearchParams(newSearch);
        }
      }} />
}