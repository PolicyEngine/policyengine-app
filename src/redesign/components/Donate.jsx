import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";

export default function Donate() {
  return (
    <div>
      <Header />
      <Section title="Donate" />
      <Section
        height={400}
        backgroundColor={style.colors.BLUE_PRIMARY}
        title="Donate online"
      />
      <Section height={400} title="Donate by check" />
      <Footer />
    </div>
  );
}
