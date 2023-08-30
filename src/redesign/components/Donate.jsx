import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import PageHeader from "./PageHeader";
import useDisplayCategory from "./useDisplayCategory";
import ActionButton from "./ActionButton";

export default function Donate() {
  const displayCategory = useDisplayCategory();
  const handleButtonClick = () => {
    window.open('https://opencollective.com/psl-foundation', '_blank'); 
  };

  return (
    <div>
      <Header />
      <PageHeader title="Donate" backgroundColor={style.colors.BLUE_98}>
        <p style={{margin: 0}}>PolicyEngine is a nonprofit fiscally sponsored by the PSL Foundation in the United States.</p>
      </PageHeader>
      <Section
        backgroundColor={style.colors.BLUE_PRIMARY}
        title="Donate online"
      >
        <div style={{
          display: "flex",
          flexDirection: displayCategory === "mobile" ? "column" : "row",
          alignItems: "center",
        }}>
          <div style={{flex: 2,
            marginRight: displayCategory === "mobile" ? 0 : 100,
            marginTop: 20,
          }}>
            <p>You can support PolicyEngine&apos;s work by donating through our fiscal sponsor, the PSL Foundation.</p>
            <p>
              Donate by credit card here or email the PSL Foundation for other options. Please email us or the PSL Foundation when you&apos;ve donated to ensure your gift is directed to PolicyEngine.
            </p>
            <p>
              Your donation is tax-deductible in the US.
            </p>
        </div>
        <div style={{flex: 1, display: "flex", justifyContent: "center", maxHeight: 100}}>
          <ActionButton text="Donate on Open Collective" onClick={handleButtonClick} width={
            displayCategory === "mobile" ? "100%" : null
          }/>
        </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
