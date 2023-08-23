import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import PageHeader from "./PageHeader";

export default function Contact() {
  return (
    <div>
      <Header />
      <PageHeader title="Contact" />
      <Section height={400} title="Email" />
      <Footer />
    </div>
  );
}
