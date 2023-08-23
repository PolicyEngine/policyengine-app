import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";

export default function About() {
  return (
    <div>
      <Header />
      <Section>
        <h2>Our people</h2>
      </Section>
      <Section height={500}>
        <h2>Founders</h2>
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
