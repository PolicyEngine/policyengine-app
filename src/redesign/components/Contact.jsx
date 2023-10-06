import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import PageHeader from "./PageHeader";
import style from "../style";

export default function Contact() {
  return (
    <div>
      <Header />
      <PageHeader title="Contact" backgroundColor={style.colors.BLUE_98}>
        <p style={{ margin: 0 }}>Find out how you can contact us.</p>
      </PageHeader>
      <Section height={400} title="Email">
        <p style={{ marginTop: 30 }}>
          Email us at
          <a
            href="mailto:hello@policyengine.org"
            style={{
              border: `1px solid ${style.colors.BLUE_PRIMARY}`,
              color: style.colors.BLUE_PRIMARY,
              padding: 10,
              marginLeft: 10,
            }}
          >
            hello@policyengine.org
          </a>
        </p>
      </Section>
      <Footer />
    </div>
  );
}
