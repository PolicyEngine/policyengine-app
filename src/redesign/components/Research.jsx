import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import PageHeader from "./PageHeader";
import style from "../style";

export default function Research() {
  return (
    <div>
      <Header />
      <PageHeader title="Research and analysis" backgroundColor={style.colors.BLUE_98}>
        Our research...
      </PageHeader>
      <Section height={800} title="Federal law" />
      <Section height={800} title="State law" />
      <Footer />
    </div>
  );
}
