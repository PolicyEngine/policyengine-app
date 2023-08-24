import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import PageHeader from "./PageHeader";

export default function Donate() {
  return (
    <div>
      <Header />
      <PageHeader title="Donate">
          Explore Brookings’ research and commentary to deepen your understanding of local, national, and global challenges. 
          Our experts offer evidence-based analysis and innovative policy solutions that inform decision-making and drive positive change.
      </PageHeader>
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
