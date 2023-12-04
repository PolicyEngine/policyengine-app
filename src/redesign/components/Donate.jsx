import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import PageHeader from "./PageHeader";
import useDisplayCategory from "./useDisplayCategory";
import LinkButton from "controls/LinkButton";

export default function Donate() {
  const displayCategory = useDisplayCategory();
  const mobile = displayCategory === "mobile";
  const desktop = displayCategory === "top";
  const link = "https://opencollective.com/psl-foundation";

  return (
    <div>
      <Header />
      <PageHeader title="Donate" backgroundColor={style.colors.BLUE_98}>
        <p style={{ margin: 0 }}>
          Your donation to PolicyEngine isn&apos;t just a gift — it&apos;s an
          investment in a transparent, open-source approach to public policy
          analysis and benefit access in the US and UK. By supporting our work,
          you&apos;re helping to extend the reach of our software, allowing a
          global community of contributors to continually enrich and expand its
          capabilities.
        </p>
      </PageHeader>

      <Section
        backgroundColor={style.colors.LIGHT_GRAY}
        title="The Difference Your Support Makes"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "20px",
          }}
        >
          <ul style={{ fontFamily: style.fonts.BODY_FONT }}>
            <li>
              <b>Comprehensive Policy Analysis:</b> Funds enhance our ability to
              create robust policy simulations that align policymaking with
              societal goals.
            </li>
            <li>
              <b>Streamlined Benefit Access:</b> Your support simplifies the
              process of determining eligibility, ensuring vital benefits reach
              those in need.
            </li>
            <li>
              <b>Open-Source Development:</b> Contributions support a
              transparent, collaborative approach, amplifying the impact of each
              donation.
            </li>
            <li>
              <b>Global Impact:</b> Donations fuel our work across the US and
              the UK, with plans to grow our policy tools globally.
            </li>
          </ul>
        </div>
      </Section>

      {/* Donate Online Section */}
      <Section
        backgroundColor={style.colors.BLUE_PRIMARY}
        title="How to Donate"
      >
        <div
          style={{
            display: "flex",
            flexDirection: displayCategory === "mobile" ? "column" : "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: 1.5,
              marginRight: displayCategory === "mobile" ? 0 : 100,
              marginTop: 20,
            }}
          >
            <p>
              Donate securely through our fiscal sponsor, the PSL Foundation. We
              accept credit card, bank transfer, or check. After contributing,
              please email{" "}
              <u>
                <a href="mailto:hello@policyengine.org">
                  hello@policyengine.org
                </a>
              </u>{" "}
              to ensure we route and acknowledge your gift.
            </p>
            <p>
              Send checks to PolicyEngine, c/o PSL Foundation, 2108 Greene St.,
              PO Box 50932, Columbia, SC 29250, USA.
            </p>
            <p> Donations are tax-deductible in the US.</p>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxHeight: 100,
            }}
          >
            <LinkButton
              text={
                <div style={{ textAlign: "center", color: "white" }}>
                  <span style={{ whiteSpace: "pre-line" }}>
                    Support Transparent{"\n"}Policy Access
                  </span>
                </div>
              }
              link={link}
              width={desktop ? 450 : mobile ? "70vw" : "30vw"}
              noArrow={true}
            />
            <div
              style={{
                fontSize: 12,
                marginTop: 8,
                width: desktop ? 450 : mobile ? "70vw" : "30vw",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Donate on Open Collective through our fiscal sponsor, the PSL
              Foundation
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
