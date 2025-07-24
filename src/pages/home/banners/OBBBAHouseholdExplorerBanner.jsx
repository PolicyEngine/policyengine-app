import LinkButton from "../../../controls/LinkButton";
import style from "../../../style";
import finalReconciliationImg from "../../../images/posts/final-2025-reconciliation-tax.png";
import useDisplayCategory from "../../../hooks/useDisplayCategory";

export default function OBBBAHouseholdBanner() {
  const dC = useDisplayCategory();

  const title = "Explore PolicyEngine's coverage of " +
  "The One Big Beautiful Bill Act";
  const subtitle =
    "Use our new dashboard to explore the " +
    "household by household impacts of the One Big Beautiful Bill Act";
  const ctaText = "Explore OBBBA household impacts";
  const ctaLink = "/us/obbba-household-by-household";
  const ariaLabel =
    "Illustration of the U.S. Capitol building, representing federal policy context for household impact analysis.";

  if (dC === "mobile") {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "fit-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: style.colors.LIGHT_GRAY,
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            backgroundImage: `url(${finalReconciliationImg})`,
            backgroundBlendMode: "multiply",
            backgroundColor: style.colors.BLUE_LIGHT,
            backgroundSize: "auto",
            backgroundPosition: "top left",
            minHeight: "fit-content",
          }}
          role="img"
          aria-label={ariaLabel}
        >
          <div
            style={{
              minHeight: "fit-content",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "24px",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              margin: "24px",
            }}
          >
            <div
              id="blurred-card-container"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderRadius: "8px",
                padding: "16px",
                display: "inline-block",
              }}
            >
              <h3 style={{ color: style.colors.DARK_BLUE_HOVER }}>{title}</h3>
              <p style={{ color: style.colors.DARK_BLUE_HOVER }}>{subtitle}</p>
            </div>
            <LinkButton
              type="primary"
              text={ctaText}
              style={{ marginTop: "16px" }}
              link={ctaLink}
            />
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            width: "100%",
            height: "1px",
            margin: "24px 0",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            height: "100%",
          }}
        ></div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "65vh",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        backgroundColor: style.colors.LIGHT_GRAY,
        paddingLeft: dC === "desktop" ? "calc((100% - 1200px) / 2)" : "100px",
        paddingRight: dC === "desktop" ? "calc((100% - 1200px) / 2)" : "100px",
        paddingTop: "24px",
        paddingBottom: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image and overlay container */}
        <div
          style={{
            width: "100%",
            position: "relative",
            marginBottom: "24px",
            backgroundImage: `url(${finalReconciliationImg})`,
            backgroundBlendMode: "multiply",
            // Fallback
            backgroundColor: style.colors.BLUE_LIGHT,
            backgroundSize: "auto",
            backgroundPosition: "top left",
            height: "min-content",
          }}
          role="img"
          aria-label={ariaLabel}
        >
          <div
            style={{
              // Margin doesn't count as part of percentage-based width.
              // Instead of struggling to find the right solution, just set to 92%
              // instead of 100% since this behavior only desired at select
              // visual breakpoint (like 800px width)
              width: "min(600px, 92%)",
              display: "flex",
              flexDirection: "column",
              padding: "48px",
              gap: "16px",
              margin: "24px",
            }}
          >
            <div
              id="blurred-card-container"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderRadius: "8px",
                padding: "16px",
                display: "inline-block",
              }}
            >
              <h3 style={{ color: style.colors.DARK_BLUE_HOVER }}>{title}</h3>
              <p style={{ color: style.colors.DARK_BLUE_HOVER }}>{subtitle}</p>
            </div>
            <LinkButton
              type="primary"
              text={ctaText}
              style={{ marginTop: "8px" }}
              link={ctaLink}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
