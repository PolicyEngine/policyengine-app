import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import PageHeader from "./PageHeader";
import { founders } from "../data/Staff";

export default function About() {
  return (
    <div>
      <Header />
      <PageHeader title="Our people" backgroundColor={style.colors.BLUE_98} />
      <Section>
        <h2>Team</h2>
        <TeamMember member={founders.max_ghenis} />
        <TeamMember member={founders.nikhil_woodruff} />
        <TeamMember member={founders.pavel_makarchuk} />
      </Section>
      <Section height={500} backgroundColor={style.colors.BLUE_PRIMARY}>
        <h2
          style={{
            color: style.colors.WHITE,
          }}
        >
          Advisory board
        </h2>
      </Section>
      <Footer />
    </div>
  );
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