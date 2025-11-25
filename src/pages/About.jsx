import Header from "../layout/Header.jsx";
import Footer from "../layout/Footer.jsx";
import Section from "../layout/Section.jsx";
import style from "../style/index.js";
import PageHeader from "../layout/PageHeader.jsx";
import { founders, staff, contractors, advisors } from "../data/staff.js";
import useDisplayCategory from "../hooks/useDisplayCategory.js";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function About() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const countryId = pathParts[1]; // Assumes the countryId is always the second segment in the path

  Object.keys(founders).map((founder) => {
    return founder;
  });

  return (
    <>
      <Helmet>
        <title>About | PolicyEngine</title>
      </Helmet>
      <div>
        <Header />
        <PageHeader title="Our people" backgroundColor={style.colors.BLUE_98}>
          <p style={{ margin: 0 }}>
            PolicyEngine&apos;s team leads a global movement of open-source
            contributors.{" "}
            <Link
              to={`/${countryId}/jobs`}
              style={{
                color: style.colors.BLUE,
                textDecoration: "underline",
              }}
            >
              Learn about opportunities to join us.
            </Link>
          </p>
        </PageHeader>
        <Section>
          <h2>Founders</h2>
          {Object.keys(founders).map((founder, index) => {
            return <Bio key={index} member={founders[founder]} />;
          })}
        </Section>
        <Section backgroundColor={style.colors.BLUE}>
          <h2 style={{ color: style.colors.WHITE }}>Team</h2>
          {Object.keys(staff).map((member, index) => {
            return <InvertedBio key={index} member={staff[member]} />;
          })}
        </Section>
        <Section>
          <h2>Contractors</h2>
          {Object.keys(contractors).map((member, index) => {
            return <Bio key={index} member={contractors[member]} />;
          })}
        </Section>
        <div style={{ display: "none" }}>
          <Section backgroundColor={style.colors.BLUE}>
            <h2 style={{ color: style.colors.WHITE }}>Advisory board</h2>
            <InvertedBio member={advisors.tim_shaw} />
            <InvertedBio member={advisors.damola_ogundipe} />
            <InvertedBio member={advisors.jesse_horwitz} />
          </Section>
        </div>
        <Footer />
      </div>
    </>
  );
}

function Bio({ member }) {
  const displayCategory = useDisplayCategory();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: displayCategory === "mobile" ? "column" : "row",
        marginTop: 50,
      }}
    >
      <div>
        <img
          alt={member.name}
          src={member.image}
          height={250}
          width={250}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          marginLeft: displayCategory === "mobile" ? 0 : 100,
          marginTop: displayCategory === "mobile" ? 30 : 0,
          borderBottom: `1px solid ${style.colors.BLACK}`,
        }}
      >
        <p>
          <span className="spaced-sans-serif">{member.name}</span> {member.bio}
        </p>
      </div>
    </div>
  );
}

function InvertedBio({ member }) {
  const displayCategory = useDisplayCategory();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: displayCategory === "mobile" ? "column" : "row",
        marginTop: 50,
      }}
    >
      <div>
        <img
          alt={member.name}
          src={member.image}
          height={250}
          width={250}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          marginLeft: displayCategory === "mobile" ? 0 : 100,
          marginTop: displayCategory === "mobile" ? 30 : 0,
          borderBottom: `1px solid ${style.colors.WHITE}`,
        }}
      >
        <p>
          <span className="spaced-sans-serif">{member.name}</span> {member.bio}
        </p>
      </div>
    </div>
  );
}
