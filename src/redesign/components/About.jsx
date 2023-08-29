import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import PageHeader from "./PageHeader";
import { founders } from "../data/Staff";
import { fullQuotes } from "../data/Quotes";
import { allOrgs } from "redesign/data/Organisations";

export default function About() {
  return (
    <div>
      <Header />
      <PageHeader title="Our people" backgroundColor={style.colors.BLUE_98}>
        <p style={{margin: 0}}>PolicyEngine&apos;s team lead a global movement of open-source contributors.</p>
      </PageHeader>
      <Section>
        <h2>Team</h2>
        <TeamMember member={founders.max_ghenis} />
        <TeamMember member={founders.nikhil_woodruff} />
        <TeamMember member={founders.pavel_makarchuk} />
      </Section>
      <Section title="What people say about PolicyEngine" backgroundColor={style.colors.LIGHT_GRAY}>
        <QuotesDetail />
      </Section>
      <Footer />
    </div>
  );
}

function QuotesDetail() {
  return <div style={{marginTop: 50}}>
    {fullQuotes.map((quote) => {
      return <IndividualQuoteDetail quote={quote} key={quote.name} />
    })}
  </div>
}

function IndividualQuoteDetail({ quote }) {
  const text = quote.longQuote || quote.quote;
  const lines = text.split("\n");
  const slug = quote.name.replace(" ", "-").toLowerCase();
  return <div 
    id={slug}
    style={{display: "flex", marginBottom: 50, alignItems: "flex-end", borderBottom: `1px solid ${style.colors.GRAY}`}}>
    <div>
      <img src={quote.headshot} height={150} width={150} style={{objectFit: "cover"}} />
    </div>
    <div style={{marginLeft: 20}}>
      <img src={allOrgs[quote.org]?.logo}  width={150} style={{objectFit: "cover"}} />
    </div>
    <div style={{marginLeft: 50}}>
      {lines.map(line => 
        <p key={line} style={{
          fontFamily: "Roboto Serif",
          fontSize: 16,
        }}>{line}</p>
      )}
      <h6 className="spaced-sans-serif">{quote.name}</h6>
      <h6>{quote.position}</h6>
    </div>
  </div>
}

function TeamMember({ member }) {
  return <div style={{
    display: "flex",
    marginTop: 50,
  }}>
    <div>
    <img src={member.image} 
    height={250}
    width={250}
    style={{
      objectFit: "cover",
    }}
    />
    </div>
    <div style={{
      marginLeft: 100,
      borderBottom: `1px solid ${style.colors.BLACK}`,
    }}>
    <p><span className="spaced-sans-serif">{member.name}</span> {member.bio}</p>
    </div>
  </div>
}