import Divider from "./Divider";
import Menu from "./Menu";


export default function StackedMenu(props) {
    const { firstTree, secondTree, selected, onSelect } = props;

    return <div style={{height: "70vh"}}>
        <div style={{overflow: "scroll", height: "50%", padding: 20}}>
        <Menu tree={firstTree} selected={selected} onSelect={onSelect} />
        </div>
        <Divider />
        <div style={{overflow: "scroll", height: "50%", padding: 20}}>
        <Menu tree={secondTree} selected={selected} onSelect={onSelect} />
        </div>
    </div>
}