import LinkButton from "../../controls/LinkButton";
import style from "../../style";
import usFlags from "../../images/home/american-flags-flagpoles-blue-sky.jpg";
import useDisplayCategory from "../../hooks/useDisplayCategory";
import { useWindowWidth } from "../../hooks/useWindow";

const primaryArticles = [
  {
    title: "Harris Child Tax Credit Proposal",
    shortTitle: "Harris CTC",
    link: "/us/research/harris-ctc",
  },
  {
    title: "Harris Earned Income Tax Credit Proposal",
    shortTitle: "Harris EITC",
    link: "/us/research/harris-eitc",
  },
  {
    title: "Harris High-Income Tax Reform Proposal",
    shortTitle: "Harris High-Income",
    link: "#",
  },
  {
    title: "Trump Social Security Tax Exemption Proposal",
    shortTitle: "Trump Social Security",
    link: "/us/research/social-security-tax-exemption",
  },
  {
    title: "Trump Combined Tax Reform Proposal",
    shortTitle: "Trump Combined Tax Reforms",
    link: "#",
  },
];

const secondaryArticles = [
  {
    title: "Harris LIFT Act Proposal of 2018",
    shortTitle: "Harris LIFT Act (2018)",
    link: "/us/research/lift-act",
  },
  {
    title: "Harris Rent Relief Act of 2019",
    shortTitle: "Harris Rent Relief (2019)",
    link: "/us/research/rent-relief-act",
  },
  {
    title: "Walz Minnesota State Income Tax Reforms of 2023",
    shortTitle: "Walz MN Income Tax (2023)",
    link: "/us/research/mn-hf1938-walz",
  },
  {
    title: "Vance Child Tax Credit Suggestion",
    shortTitle: "Vance CTC",
    link: "/us/research/vance-ctc",
  },
  {
    title: "Extending Tax Cuts and Jobs Act",
    shortTitle: "TCJA",
    link: "/us/research/tcja-extension",
  },
];

export default function HomeElectionBanner() {
  const dC = useDisplayCategory();
  const windowWidth = useWindowWidth();

  const title = "Explore PolicyEngine's coverage of the 2024 election";
  const subtitle =
    "Use our new dashboard to estimate the " +
    "household-level impacts of each party's policy proposals, suggestions, and ideas";
  const ctaText = "Compare each party's impacts";
  const ctaLink = "#";
  const ariaLabel =
    "United States flag flying against grayish-blue sky. " +
    "Courtesy of Tim Mossholder, https://www.pexels.com/photo/flag-of-the-usa-on-a-pole-1709929/";
  const articlesHeader =
    "Read PolicyEngine's analysis of policy ideas " +
    "and proposals from both parties";

  const shouldUseShortTitle =
    (dC !== "mobile" && windowWidth < 1150 && windowWidth >= 950) ||
    (dC === "mobile" && windowWidth < 600);

  const primaryArticlesJSX = primaryArticles.map((article, index) => {
    return (
      <LinkButton
        type="primary"
        text={shouldUseShortTitle ? article.shortTitle : article.title}
        // style={{ width: "100%" }}
        link={article.link}
        key={String(index).concat(article.text)}
      />
    );
  });

  const secondaryArticlesJSX = secondaryArticles.map((article, index) => {
    return (
      <LinkButton
        type="secondary"
        text={shouldUseShortTitle ? article.shortTitle : article.title}
        style={{ width: "100%" }}
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
            backgroundImage: `url(${usFlags})`,
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
        >
          <h4 style={{ color: style.colors.BLACK }}>{articlesHeader}</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(5, 1fr)",
              gap: "16px",
            }}
          >
            {primaryArticlesJSX}
            {secondaryArticlesJSX}
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
            backgroundImage: `url(${usFlags})`,
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
            <LinkButton
              type="primary"
              text={ctaText}
              style={{ marginTop: "8px" }}
              link={ctaLink}
            />
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
          <h4
            style={{
              color: style.colors.BLACK,
              textAlign: "center",
            }}
          >
            {articlesHeader}
          </h4>
          <div
            style={{
              display: "grid",
              gap: "16px",
              gridTemplateColumns:
                windowWidth < 950 ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
              gridTemplateRows:
                windowWidth < 950 ? "repeat(5, 1fr)" : "repeat(2, 1fr)",
            }}
          >
            {primaryArticlesJSX}
            {secondaryArticlesJSX}
          </div>
        </div>
      </div>
    </div>
  );
}
