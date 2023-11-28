import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import PageHeader from "./PageHeader";
import { founders, advisors } from "../data/Staff";
import useDisplayCategory from "./useDisplayCategory";
import { Link, useLocation } from "react-router-dom";

export default function About() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const countryId = pathParts[1]; // Assumes the countryId is always the second segment in the path

  return (
    <div>
      <Header />
      <PageHeader title="Our people" backgroundColor={style.colors.BLUE_98}>
        <p style={{ margin: 0 }}>
          PolicyEngine&apos;s team leads a global movement of open-source
          contributors.{" "}
          <Link
            to={`/${countryId}/jobs`}
            style={{
              color: style.colors.BLUE_PRIMARY,
              textDecoration: "underline",
            }}
          >
            Learn about opportunities to join us.
          </Link>
        </p>
      </PageHeader>
      <Section>
        <h2>Team</h2>
        <TeamMember member={founders.max_ghenis} />
        <TeamMember member={founders.nikhil_woodruff} />
        <TeamMember member={founders.pavel_makarchuk} />
      </Section>
      <div style={{ display: "none" }}>
        <Section backgroundColor={style.colors.BLUE_PRIMARY}>
          <h2 style={{ color: style.colors.WHITE }}>Advisory board</h2>
          <Advisor member={advisors.george_sadowsky} />
          <Advisor member={advisors.damiola_ogundipe} />
          <Advisor member={advisors.jesse_horwitz} />
          <Advisor member={advisors.matt_jensen} />
        </Section>
      </div>
      <Footer />
    </div>
  );
}

function TeamMember({ member }) {
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

function Advisor({ member }) {
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
