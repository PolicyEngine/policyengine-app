import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import PageHeader from "./PageHeader";
import { HoverBox } from "./HoverBox";

function SoftwareEngineeringIntern() {
  return (
    <div>
      <h3>Software Engineering Intern</h3>
      <ul>
        <li>
          Develop and enhance Python libraries, and build new applications using
          emerging technologies like generative AI.
        </li>
        <li>
          Work on React-based front-end and Flask/Python back-end development.
        </li>
        <li>Develop and review code collaboratively in GitHub.</li>
      </ul>
    </div>
  );
}

function PolicyModelingIntern() {
  return (
    <div>
      <h3>Policy Modeling Intern</h3>
      <ul>
        <li>
          Augment the policyengine-us Python package to model additional tax and
          benefit rules and regulations.
        </li>
        <li>
          Monitor legislative and policy proposals, strategizing their
          integration into PolicyEngine.
        </li>
        <li>Develop and review code collaboratively in GitHub.</li>
      </ul>
    </div>
  );
}

function DataAnalyticsIntern() {
  return (
    <div>
      <h3>Data Analytics Intern</h3>
      <ul>
        <li>Work with policy analysts to analyze tax and benefit policies.</li>
        <li>
          Create custom analyses and mini-apps using tools like Plotly and
          Streamlit.
        </li>
        <li>Develop and review code collaboratively in GitHub.</li>
      </ul>
    </div>
  );
}

function EconomicsResearchIntern() {
  return (
    <div>
      <h3>Economics Research Intern</h3>
      <ul>
        <li>Research and summarize economic data and academic research.</li>
        <li>Contribute to policy analysis discussions and write blog posts.</li>
        <li>
          Engage with policymakers and research institutions to inform and
          enhance PolicyEngine’s analysis capabilities.
        </li>
      </ul>
    </div>
  );
}

function CommunicationsIntern() {
  return (
    <div>
      <h3>Communications Intern</h3>
      <ul>
        <li>
          Assist in distributing PolicyEngine&apos;s findings and analyses.
        </li>
        <li>
          Engage in digital communications, including social media and webinars.
        </li>
        <li>Monitor media coverage and maintain contact lists.</li>
      </ul>
    </div>
  );
}

function ApplyButton() {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSdjIWrBXgQ95Pnogl5KfRnvcHbkflmPi2SHC-e3vR1jHS9VyA/viewform?usp=sf_link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <HoverBox
        hoverBackgroundColor={style.colors.TEAL_PRESSED}
        direction="left"
        style={{
          margin: 20,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          backgroundColor: style.colors.TEAL_ACCENT,
          color: "white",
          padding: 15,
          paddingLeft: 30,
          paddingRight: 30,
          fontSize: 20,
          fontFamily: "Roboto",
          fontWeight: 500,
          letterSpacing: 2.4,
          cursor: "pointer",
          textTransform: "uppercase",
          maxWidth: "256px",
        }}
        size="400px"
      >
        Apply
      </HoverBox>
    </a>
  );
}

export default function Jobs() {
  return (
    <div>
      <Header />
      <PageHeader title="Join Our Team" backgroundColor={style.colors.BLUE_98}>
        <p style={{ margin: 0 }}>
          Join PolicyEngine&apos;s team and contribute to a global movement of
          open-source software development for public policy analysis.
        </p>
      </PageHeader>
      <Section>
        <h2>Internship Opportunities</h2>
        <p>
          PolicyEngine invites dedicated individuals for internships in Software
          Engineering, Data Analytics, Policy Modeling, Economics Research, and
          Communications. These opportunities are ideal for those eager to delve
          into the world of policy analysis, focusing on tax and benefit
          policies and their broader economic implications.
        </p>
        <h3>Internship Details</h3>
        <ul>
          <li>Duration: One semester, with the possibility of extension.</li>
          <li>Time Commitment: Minimum 15 hours per week.</li>
          <li>
            Application Period: Rolling basis for spring, summer, and fall
            semesters.
          </li>
          <li>International applicants are welcome.</li>
        </ul>
        <h3>General Responsibilities Across All Roles</h3>
        <ul>
          <li>
            Use the PolicyEngine software for in-depth policy research and
            analysis.
          </li>
          <li>
            Suggest and contribute to improvements in the PolicyEngine software.
          </li>
          <li>
            Engage in collaborative team projects and contribute to shared
            knowledge.
          </li>
          <li>
            Present findings and progress in internal and external forums.
          </li>
        </ul>
        <SoftwareEngineeringIntern />
        <PolicyModelingIntern />
        <DataAnalyticsIntern />
        <EconomicsResearchIntern />
        <CommunicationsIntern />
        <h2>PolicyEngine&apos;s Commitment to Diversity and Inclusion</h2>
        <p>
          At PolicyEngine, we are dedicated to fostering a diverse and inclusive
          environment. We believe in the power of varied perspectives and
          backgrounds in driving innovation and success. We are committed to
          equality in opportunities and access for all individuals, irrespective
          of their background.
        </p>
        <ApplyButton />
      </Section>
      <Footer />
    </div>
  );
}
