import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import PageHeader from "./PageHeader";
import style from "../style";

export default function Contact() {
  return (
    <div>
      <Header />
      <PageHeader title="Contact" backgroundColor={style.colors.BLUE_98} />
      <Section height={400} title="Email" />
      <Footer />
    </div>
  );
}
