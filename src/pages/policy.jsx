import { useContext } from "react";
import { Container } from "react-bootstrap";
import PolicyEngineContext from "../countries/PolicyEngine";
import Page from "./Layout/Page";
import PageSection from "./Layout/PageSection";


export default function PolicyPage() {
    const PolicyEngine = useContext(PolicyEngineContext);
    return <Page 
        title="Design the tax-benefit system" 
        subtitle="Change parameters for taxes and benefits from their default values below." 
    >
        <PageSection title="Income tax">
            <PageSection title="Tax rates" />
            <PageSection title="Tax brackets" />
        </PageSection>
    </Page>
    }