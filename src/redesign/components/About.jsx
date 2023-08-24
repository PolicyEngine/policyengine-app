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
        <h2>Founders</h2>
        <Founder founder={founders.max_ghenis} />
        <Founder founder={founders.nikhil_woodruff} />
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
      <Section height={500}>
        <h2>Staff</h2>
      </Section>
      <Footer />
    </div>
  );
}

function Founder({ founder }) {
  return <div style={{
    display: "flex",
    marginTop: 50,
  }}>
    <div>
    <img src={founder.image} 
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
    <p><span className="spaced-sans-serif">{founder.name}</span> {founder.bio}</p>
    </div>
  </div>
}