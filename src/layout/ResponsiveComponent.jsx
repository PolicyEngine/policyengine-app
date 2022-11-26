import DesktopView from "./DesktopView";
import MobileView from "./MobileView";


export default function ResponsiveComponent(props) {
    const { mobile, desktop } = props;
    return <>
        <DesktopView>
            {desktop}
        </DesktopView>
        <MobileView>
            {mobile}
        </MobileView>
    </>
}