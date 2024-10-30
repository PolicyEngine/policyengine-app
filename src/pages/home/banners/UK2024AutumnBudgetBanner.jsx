import LinkButton from "../../../controls/LinkButton";
import style from "../../../style";
import reeves from "../../../images/home/chancellor_reeves_2024_autumn_budget.jpg";
import useDisplayCategory from "../../../hooks/useDisplayCategory";
import { useWindowWidth } from "../../../hooks/useWindow";

const articles = [
  {
    title: "Employer National Insurance Contributions",
    shortTitle: "Emlpoyer NICs",
    link: "#",
  },
  {
    title: "Capital Gains",
    shortTitle: "Capital Gains",
    link: "#",
  },
  {
    title: "Private School Value-Added Tax",
    shortTitle: "Private School VAT",
    link: "#",
  },
  {
    title: "Fuel Duty",
    shortTitle: "Fuel Duty",
    link: "#",
  }
];

export default function UK2024AutumnBudgetBanner() {
  const dC = useDisplayCategory();
  const windowWidth = useWindowWidth();

  const title = "Read PolicyEngine's detailed costings of the 2024 Autumn Budget";
  const subtitle =
    "View our in-depth analysis of each major provision from Number 11"
  const ariaLabel =
    "Chancellor of the Exchequer Rachel Reeves holding a budget box in front of Number 11 Downing Street" +
    "Courtesy of HM Treasury, https://www.flickr.com/photos/hmtreasury/54104908129/";

  const shouldUseShortTitle =
    (dC !== "mobile" && windowWidth < 1150 && windowWidth >= 950) ||
    (dC === "mobile" && windowWidth < 600);

  const articlesJSX = articles.map((article, index) => {
    return (
      <LinkButton
        type="primary"
        text={shouldUseShortTitle ? article.shortTitle : article.title}
        link={article.link}
        key={String(index).concat(article.text)}
      />
    );
  });

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
            backgroundImage: `url(${reeves})`,
            backgroundColor: style.colors.BLUE_LIGHT,
            backgroundSize: "cover",
            minHeight: "fit-content",
          }}
          role="img"
          aria-label={ariaLabel}
        >
          <div
            style={{
              minHeight: "fit-content",
              width: "100%",
              backgroundColor: "rgba(44, 100, 150, 0.88)",
              display: "flex",
              flexDirection: "column",
              padding: "24px",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              margin: "24px",
            }}
          >
            <h3 style={{ color: style.colors.WHITE }}>{title}</h3>
            <p style={{ color: style.colors.WHITE }}>{subtitle}</p>
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
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}
          >
            {articlesJSX}
          </div>
        </div>
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
            backgroundImage: `url(${reeves})`,
            // Fallback
            backgroundColor: style.colors.BLUE_LIGHT,
            backgroundSize: "cover",
            backgroundPosition: "right top",
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
              backgroundColor: "rgba(44, 100, 150, 0.88)",
              display: "flex",
              flexDirection: "column",
              padding: "48px",
              gap: "16px",
              margin: "24px",
            }}
          >
            <h3 style={{ color: style.colors.WHITE }}>{title}</h3>
            <p style={{ color: style.colors.WHITE }}>{subtitle}</p>
          </div>
        </div>

        {/* Buttons section */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: "16px",
              gridTemplateColumns:
                windowWidth < 950 ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            }}
          >
            {articlesJSX}
          </div>
        </div>
      </div>
    </div>
  );
}