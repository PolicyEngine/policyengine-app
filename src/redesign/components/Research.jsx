import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";

export default function Research() {
  return (
    <div>
      <Header />
      <Section title="Research and analysis" />
      <Section height={800} title="Federal law" />
      <Section height={800} title="State law" />
      <Footer />
    </div>
  );
}
