import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import { fullQuotes } from "../data/Quotes";
import { allOrgs } from "redesign/data/Organisations";
import useDisplayCategory from "./useDisplayCategory";

export default function Testimonials() {
  return (
    <div>
      <Header />
      <Section
        title="What people say about PolicyEngine"
        backgroundColor={style.colors.WHITE}
      >
        <QuotesDetail />
      </Section>
      <Footer />
    </div>
  );
}

function QuotesDetail() {
  return (
    <div style={{ marginTop: 50 }}>
      {fullQuotes.map((quote) => {
        return <IndividualQuoteDetail quote={quote} key={quote.name} />;
      })}
    </div>
  );
}

function IndividualQuoteDetail({ quote }) {
  const text = quote.longQuote || quote.quote;
  const lines = text.split("\n");
  const slug = quote.name.replace(" ", "-").toLowerCase();
  const displayCategory = useDisplayCategory();
  const headshot = (
    <img
      src={quote.headshot}
      alt={`${quote.name} headshot`}
      height={150}
      width={150}
      style={{ objectFit: "cover" }}
    />
  );
  const orgLogo = (
    <img
      src={allOrgs[quote.org]?.logo}
      alt={`${quote.org} logo`}
      width={150}
      style={{ objectFit: "cover" }}
    />
  );
  const quoteContent = (
    <>
      {lines.map((line) => (
        <p
          key={line}
          style={{
            fontFamily: "Roboto Serif",
            fontSize: 16,
          }}
        >
          {line}
        </p>
      ))}
      <h6 className="spaced-sans-serif">{quote.name}</h6>
      <h6>{quote.position}</h6>
    </>
  );
  const mobile = displayCategory !== "desktop";
  const authorship = mobile ? (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      {headshot}
      <div style={{ marginLeft: 20 }} />
      {orgLogo}
    </div>
  ) : (
    <>
      <div>{headshot}</div>
      <div style={{ marginLeft: 20 }}>{orgLogo}</div>
    </>
  );
  return (
    <div
      id={slug}
      style={{
        flexDirection: mobile ? "column" : "row",
        display: "flex",
        marginBottom: 50,
        paddingBottom: 50,
        alignItems: mobile ? "flex-start" : "flex-end",
        borderBottom: `1px solid ${style.colors.GRAY}`,
      }}
    >
      {!mobile && authorship}
      <div style={{ marginLeft: mobile ? 0 : 50 }}>{quoteContent}</div>
      {mobile && authorship}
    </div>
  );
}
