import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import PageHeader from "./PageHeader";
import useDisplayCategory from "./useDisplayCategory";
import ActionButton from "./ActionButton";

export default function Donate() {
  const displayCategory = useDisplayCategory();

  const handleButtonClick = () => {
    window.open("https://opencollective.com/psl-foundation", "_blank");
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
          <div
            style={{
              flex: 1.5,
              marginRight: displayCategory === "mobile" ? 0 : 100,
              marginTop: 20,
            }}
          >
            <p style={{ fontFamily: style.fonts.BODY_FONT }}>
              You can support PolicyEngine&apos;s work by donating through our
              fiscal sponsor, the PSL Foundation.
            </p>
            <p style={{ fontFamily: style.fonts.BODY_FONT }}>
              Donate by credit card here or email the PSL Foundation for other
              options. Please email us or the PSL Foundation when you&apos;ve
              donated to ensure your gift is directed to PolicyEngine.
            </p>
            <p style={{ fontFamily: style.fonts.BODY_FONT }}>
              Your donation is tax-deductible in the US.
            </p>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              maxHeight: 100,
            }}
          >
            <ActionButton
              text={
                <div style={{ textAlign: "center", color: "white" }}>
                  <span style={{ whiteSpace: "pre-line" }}>
                    Donate on{"\n"}Open Collective
                  </span>
                </div>
              }
              onClick={handleButtonClick}
              width={displayCategory === "mobile" ? "420px" : "130%"}
              noArrow={true}
            />
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
          <div
            style={{
              flex: 1.5,
              marginTop: 20,
              marginRight: displayCategory === "mobile" ? 0 : 100,
            }}
          >
            <p style={{ fontFamily: style.fonts.BODY_FONT }}>
              You can support PolicyEngine&apos;s work by donating through our
              fiscal sponsor, the PSL Foundation.
            </p>
            <p style={{ fontFamily: style.fonts.BODY_FONT }}>
              Donate by credit card here or email the PSL Foundation for other
              options. Please email us or the PSL Foundation when you&apos;ve
              donated to ensure your gift is directed to PolicyEngine.
            </p>
            <p style={{ fontFamily: style.fonts.BODY_FONT }}>
              Your donation is tax-deductible in the US.
            </p>
          </div>

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
