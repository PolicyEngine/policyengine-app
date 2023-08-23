import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import PageHeader from "./PageHeader";

export default function Research() {
  return (
    <div>
      <Header />
      <PageHeader title="Research and analysis">
        Blah blah blah
      </PageHeader>
      <Section height={800} title="Federal law" />
      <Section height={800} title="State law" />
      <Footer />
    </div>
  );
}
