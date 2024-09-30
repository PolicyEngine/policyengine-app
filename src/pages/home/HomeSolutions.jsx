import React from "react";
import Section from "../../layout/Section";
import ShowcaseItem from "../../layout/ShowcaseItem";
import style from "../../style";
import BenefitAccessImage from "../../images/home/benefit-access.png";
import EducationImage from "../../images/home/education.png";
import ArtificialIntelligenceImage from "../../images/home/artificial-intelligence.png";
import MicrosimulationModelImage from "../../images/home/microsimulation.png";

export default function HomeSolutions() {
  return (
    <Section title="Our solutions" backgroundColor={style.colors.WHITE}>
      <ShowcaseItem
        title="Microsimulation model"
        description="Dive deep into the mechanics of our microsimulation model and understand how it works."
        linkTitle="Learn More"
        link="/solutions/microsimulation-model"
        image={MicrosimulationModelImage}
        altText="Microsimulation model"
        imageShrinkPercentage={20}
      />
      <ShowcaseItem
        title="Benefit access"
        description="Streamline and simplify the process of accessing government benefits with our intuitive tools."
        linkTitle="Learn More"
        link="/solutions/benefit-access"
        image={BenefitAccessImage}
        altText="Benefit access"
        imageShrinkPercentage={20}
      />
      <ShowcaseItem
        title="Education"
        description="Empowering educators to bring economic policy lessons to life."
        linkTitle="Learn More"
        link="/solutions/education"
        image={EducationImage}
        altText="Education"
        imageShrinkPercentage={20}
      />
      <ShowcaseItem
        title="Artificial intelligence"
        description="Harness the power of AI to explain results of sophisticated economic models in plain language."
        linkTitle="Learn More"
        link="/solutions/artificial-intelligence"
        image={ArtificialIntelligenceImage}
        altText="Artificial intelligence"
        imageShrinkPercentage={20}
      />
    </Section>
  );
}
