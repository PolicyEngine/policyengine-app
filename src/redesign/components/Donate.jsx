import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import PageHeader from "./PageHeader";
import useDisplayCategory from "./useDisplayCategory";

export default function Donate() {
  const displayCategory = useDisplayCategory();
  const mobile = displayCategory === "mobile";
  const desktop = displayCategory === "top";
  const pslFoundUrl = "https://psl-foundation.org";
  const openCollectiveUrl = "https://opencollective.com/psl-foundation";
  const pslFoundEmail = "mailto:jason.debacker@psl-foundation.org";
  const policyEngineEmail = "mailto:hello@policyengine.org";

  const getDonateContent = () => {
    return (
      <>
        <div
          style={{
            flex: 1.5,
            marginRight: displayCategory === "mobile" ? 0 : 100,
            marginTop: 20,
            fontFamily: style.fonts.BODY_FONT,
          }}
        >
          <p style={{ fontFamily: style.fonts.BODY_FONT }}>
            You can support PolicyEngine&apos;s work by donating through our
            fiscal sponsor, the{" "}
            <a href={pslFoundUrl} target="_blank" rel="noreferrer">
              PSL Foundation
            </a>
            .
          </p>
          <p style={{ fontFamily: style.fonts.BODY_FONT }}>
            Donate by credit card{" "}
            <a href={openCollectiveUrl} target="_blank" rel="noreferrer">
              here
            </a>{" "}
            or <a href={pslFoundEmail}>email</a> the PSL Foundation for other
            options. Please email <a href={policyEngineEmail}>us</a> or the{" "}
            <a href={pslFoundEmail}>PSL Foundation </a>
            when you&apos;ve donated to ensure your gift is directed to
            PolicyEngine.
          </p>
          <p style={{ fontFamily: style.fonts.BODY_FONT }}>
            Your donation is tax-deductible in the US.
          </p>
        </div>
      </>
    );
  };

  return (
    <div>
      <Header />
      <PageHeader title="Donate" backgroundColor={style.colors.BLUE_98}>
        <p style={{ margin: 0 }}>
          PolicyEngine is a nonprofit fiscally sponsored by the PSL Foundation
          in the United States.
        </p>
      </PageHeader>

      {/* Donate Online Section */}
      <Section
        backgroundColor={style.colors.BLUE_PRIMARY}
        title="Donate online"
      >
        <div
          style={{
            display: "flex",
            flexDirection: displayCategory === "mobile" ? "column" : "row",
            alignItems: "center",
          }}
        >
          {getDonateContent()}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              maxHeight: 100,
            }}
          >
            <a
              href={openCollectiveUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: style.colors.TEAL_ACCENT,
                padding: "15px",
                textAlign: "center",
                width: desktop ? 450 : mobile ? "70vw" : "30vw",
                marginTop: 0,
                color: "white",
                paddingLeft: 30,
                paddingRight: 30,
                fontSize: 15,
                fontFamily: "Roboto",
                fontWeight: 500,
                letterSpacing: 2.4,
                textTransform: "uppercase",
              }}
            >
              <div style={{ textAlign: "center", color: "white" }}>
                <span style={{ whiteSpace: "pre-line" }}>
                  Donate on{"\n"}Open Collective
                </span>
              </div>
            </a>
          </div>
        </div>
      </Section>

      {/* Donate By Check Section */}
      <Section backgroundColor={style.colors.WHITE} title="Donate by check">
        <div
          style={{
            display: "flex",
            flexDirection: displayCategory === "mobile" ? "column" : "row",
            alignItems: "center",
            color: style.colors.BLACK,
          }}
        >
          {getDonateContent()}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D7F4F2",
              padding: "15px",
              color: style.colors.BLACK,
              textAlign: "left",
              width: displayCategory === "mobile" ? "100%" : null,
            }}
          >
            <div>
              <p
                style={{ color: "#808080", fontFamily: style.fonts.BODY_FONT }}
              >
                ADDRESS CHECKS TO:
              </p>
              <p style={{ fontFamily: style.fonts.BODY_FONT }}>
                PolicyEngine LLC
                <br />
                124 Streetname
                <br />
                Washington, DC
                <br />
                10001
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
