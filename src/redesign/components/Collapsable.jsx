import { Collapse } from "antd";
import style_ from "../../style";
import { PlusCircleOutlined } from "@ant-design/icons";


export default function Collapsable({label, child, style}) {
    return <Collapse
        defaultActiveKey={[]}
        ghost
        style={{...style, backgroundColor: style_.colors.LIGHT_GRAY, fontFamily: "Roboto"}}
        items={[{
            key: "child",
            label: <span style={{color: "grey"}}>{label}</span>,
            children: child,
        }]}
    />;

    }