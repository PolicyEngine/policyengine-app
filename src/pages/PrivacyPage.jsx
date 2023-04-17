import { Container } from "react-bootstrap";


export default function PrivacyPage() {
    return <Container style={{paddingTop: 100, paddingLeft: 100, paddingRight: 100}}>
        <h1>Privacy</h1>
        <h3>How does PolicyEngine use my data?</h3>
        <p>
            PolicyEngine doesn&apos;t store cookies or personally identifiable information. We <b>do</b> use Google Analytics to track site statistics, but with cookies disabled.
        </p>
        <p>
            Sometimes external websites embed PolicyEngine-developed applications on their own pages as interactives. In these cases, the external website may on the same page collect data about your use of the PolicyEngine application: see their own privacy policy for details.
        </p>
        <h3>Contributing to PolicyEngine</h3>
        <p>Many people contribute to the development of PolicyEngine models and applications in our open-source repositories on GitHub, and we display a running feed of GitHub activity on our homepage to highlight these contributions. By agreeing to the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement">GitHub privacy policy</a>, contributors agree that their GitHub username can be used for this purpose.</p>
    </Container>
}