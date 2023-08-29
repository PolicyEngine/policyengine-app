import PageHeader from "./PageHeader";
import style from "../style";
import useDisplayCategory from "./useDisplayCategory";
import { useState, useEffect } from "react";
import { quoteData } from "../data/Quotes.jsx";
import { orgData } from "../data/Organisations.jsx";
import Carousel from "./Carousel";
import useCountryId from "./useCountryId";
import { Link } from "react-router-dom";
import FontIcon from "./FontIcon";

export default function HomeQuoteCarousel() {
  return (
    <PageHeader
      title="Computing public policy for everyone"
      collapseTablet
      subtitle="PolicyEngine maintains a free, open-source tool enabling anyone to see how public policy affects them."
    >
      <QuoteBox />
    </PageHeader>
  );
}

export function QuoteBox({ noArrows }) {
  const countryId = useCountryId();
  const displayCategory = useDisplayCategory();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const countryQuotes = quoteData[countryId] || [];
  const countryOrgs = orgData[countryId] || [];

  // Automatically cycle through quotes, moving once every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((currentQuoteIndex + 1) % countryQuotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentQuoteIndex, countryId]);
  const currentQuote = countryQuotes[currentQuoteIndex] || {};
  const currentOrg = countryOrgs[currentQuote.org] || {};
  return (
    <div
      style={{
        backgroundColor: style.colors.WHITE,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20,
      }}
    >
      <QuoteText text={currentQuote.quote} />
      <div
        style={{
          border: `1px solid ${style.colors.MEDIUM_DARK_GRAY}`,
          marginTop: 10,
          marginBottom: 10,
          width: "100%",
        }}
      ></div>
      <div style={{ width: "100%" }}>
        <QuoteBio
          headshot={currentQuote.headshot}
          orgLink={currentOrg.link}
          orgLogo={currentOrg.logo}
          author={currentQuote.name}
          org={currentOrg.name}
        />
        {displayCategory === "mobile" && (
          <div
            style={{ display: "flex", justifyContent: "center", margin: 10 }}
          >
            <ReadMoreAboutThisQuote author={currentQuote.name}/>
          </div>
        )}
      </div>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Carousel
          current={currentQuoteIndex}
          total={countryQuotes.length}
          setCurrent={setCurrentQuoteIndex}
          noArrows={noArrows}
        />
      </div>
    </div>
  );
}

function QuoteBio(props) {
  const { headshot, orgLogo, orgLink, author, org } = props;
  const displayCategory = useDisplayCategory();
  if (displayCategory !== "mobile") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <QuoteImages headshot={headshot} orgLogo={orgLogo} orgLink={orgLink} />
        <div>
          <QuoteOrg org={org} />
          <QuoteAuthor author={author} />
        </div>
        <div style={{ marginLeft: "auto" }} />
        <ReadMoreAboutThisQuote author={author}/>
      </div>
    );
  } else {
    return (
      <>
        <div style={{ paddingLeft: 20, paddingBottom: 10 }}>
          <QuoteAuthor author={author} />
          <QuoteOrg org={org} />
        </div>
        <QuoteImages headshot={headshot} orgLogo={orgLogo} />
      </>
    );
  }
}

function QuoteText(props) {
  const { text } = props;
  const displayCategory = useDisplayCategory();
  return (
    <p
      style={{
        paddingLeft: displayCategory === "mobile" ? 20 : 0,
        paddingRight: displayCategory === "mobile" ? 20 : 40,
        display: "flex",
        minHeight: {
          mobile: 380,
          tablet: 100,
          desktop: null,
        }[displayCategory],
        fontFamily: "Roboto Serif",
      }}
    >
      {text}
    </p>
  );
}

function QuoteAuthor(props) {
  const { author } = props;
  return (
    <p
      style={{
        paddingRight: 40,
        textTransform: "uppercase",
        fontFamily: "Roboto",
        fontWeight: 500,
        fontSize: 12,
        margin: 0,
      }}
    >
      {author}
    </p>
  );
}

function QuoteOrg(props) {
  const { org } = props;
  return (
    <p
      style={{
        paddingRight: 40,
        textTransform: "uppercase",
        fontFamily: "Roboto",
        fontWeight: 300,
        fontSize: 12,
        margin: 0,
      }}
    >
      {org}
    </p>
  );
}

function QuoteImages(props) {
  const { headshot, orgLogo, orgLink } = props;
  const displayCategory = useDisplayCategory();
  const headshotImg = (
    <img key="headshot" src={headshot} alt="Headshot" style={{ height: 40, width: 40, objectFit: "cover" }} />
  );
  const orgLogoImg = (
    <img
      key="orgLogo"
      src={orgLogo}
      alt="Org logo"
      style={{ height: 40, width: 40, cursor: "pointer", objectFit: "contain" }}
      onClick={
        // Open orgLink in new tab
        () => window.open(orgLink, "_blank")
      }
    />
  );
  const padding = <div key="padding" style={{ width: 10 }} />;
  const images =
    displayCategory === "mobile"
      ? [headshotImg, padding, orgLogoImg]
      : [orgLogoImg, padding, headshotImg];
  // Headshot then org logo on the right
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingLeft: displayCategory === "mobile" ? 20 : 0,
        paddingRight: 10,
      }}
    >
      {images}
    </div>
  );
}

function ReadMoreAboutThisQuote({author}) {
  const countryId = useCountryId();
  console.log(author);
  const slug = author?.replace(" ", "-").toLowerCase();
  return (
    <Link to={`/${countryId}/about#${slug}`} className="highlighted-link spaced-sans-serif">
      More <FontIcon name="arrow_forward" size={15} />
    </Link>
  );
}
