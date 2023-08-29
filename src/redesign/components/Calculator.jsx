import style from "../style"
import PolicyEngineMainLogo from "../images/logos/policyengine/white.svg";
import Section from "./Section";

export default function Calculator() {
    return <>
        <Sidebar />
        <div style={{marginLeft: 200}}>
        <Section title="1. Select policy parameters">
        </Section>
        <Section backgroundColor={style.colors.LIGHT_GRAY} title="2. Change parameter values">
        </Section>
        <Section title="3. Choose what to model">
            <a href="/" className="highlighted-link" style={{backgroundColor: style.colors.LIGHT_GRAY, padding: 10}}>Model all policies</a>
        </Section>
        </div>
    </>
}

function Sidebar() {
    return <div style={{
        width: 200,
        height: "100vh",
        position: "fixed",
        backgroundColor: style.colors.BLUE_PRESSED,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
    }}>
        <img src={PolicyEngineMainLogo} style={{
            width: 200,
            padding: 20,
        }} />
    </div>
}