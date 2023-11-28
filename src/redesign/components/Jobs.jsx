import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import PageHeader from "./PageHeader";
import { HoverBox } from "./HoverBox";

function InternshipOpportunities() {
  return (
    <>
    <p>
      PolicyEngine invites dedicated individuals to internships in Software
      Engineering, Policy Modeling, Data Science, Economic Research, and
      Communications. These opportunities immerse you in efforts to make
      public policy more accessible, transparent, and evidence-based. Engaging
      with cutting-edge technology, you will learn how tax and benefit
      policies affect everything from the budget and economic growth to
      poverty and inequality. This invaluable experience prepares you for
      diverse career paths in software development, data science, economics,
      and policy, whether in academia, government, NGOs, or the private
      sector, equipping you with skills and insights to shape societal
      progress.
    </p>
    <p>
      As an intern, you will engage deeply with PolicyEngine software,
      contributing to its development and enhancing its utility. Collaborative
      team projects will allow you to share knowledge and learn from others.
      You will also have the opportunity to present your findings and progress
      in various internal and external forums, contributing to important
      policy discussions and decision-making processes.
    </p>
    <p>
      You can apply at any time for spring, summer, and fall semester
      internships (with the possibility of extension). PolicyEngine believes
      that a wide range of perspectives enrich our collective understanding
      and innovation, and we encourage candidates from all backgrounds to
      apply. We primarily collaborate remotely, ensuring a flexible and
      inclusive environment for all our team members. For those in the
      Washington, DC area, we provide additional opportunities for in-person
      collaboration. We prefer candidates who can commit 15 hours per week.
      Please note that all internships are currently unpaid.
    </p>
    </>
  );
}

function SoftwareEngineeringIntern() {
  return (
    <div>
      <p>
        Your software contributions will make policy analysis tools more
        accessible, from our web app users to our internal team of developers.
      </p>
      <p> You will:</p>
      <ul>
        <li>
          Develop and enhance Python libraries, and build new applications using
          emerging technologies like generative AI.
        </li>
        <li>
          Work on React-based front-end in the{" "}
          <a
            href="https://github.com/policyengine/policyengine-app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "monospace",
              color: style.colors.BLUE_PRIMARY,
            }}
          >
            policyengine-app
          </a>{" "}
          repo and Flask/Python back-end development in the{" "}
          <a
            href="https://github.com/policyengine/policyengine-api"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "monospace",
              color: style.colors.BLUE_PRIMARY,
            }}
          >
            policyengine-api
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/policyengine/policyengine-core"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "monospace",
              color: style.colors.BLUE_PRIMARY,
            }}
          >
            policyengine-core
          </a>{" "}
          libraries.
        </li>
        <li>Develop and review code collaboratively in GitHub.</li>
      </ul>
    </div>
  );
}

function PolicyModelingIntern() {
  return (
    <>
      <p>
        Your models of tax and benefit policies will power PolicyEngine&apos;s
        rules engine, the heart of our software.
      </p>
      <p> You will:</p>
      <ul>
        <li>
          Augment the{" "}
          <a
            href="https://github.com/policyengine/policyengine-us"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "monospace",
              color: style.colors.BLUE_PRIMARY,
            }}
          >
            policyengine-us
          </a>
          ,{" "}
          <a
            href="https://github.com/policyengine/policyengine-uk"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "monospace",
              color: style.colors.BLUE_PRIMARY,
            }}
          >
            policyengine-uk
          </a>
          , and{" "}
          <a
            href="https://github.com/policyengine/policyengine-canada"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "monospace",
              color: style.colors.BLUE_PRIMARY,
            }}
          >
            policyengine-canada
          </a>{" "}
          Python packages to model additional tax and benefit rules and
          regulations in the US, UK, and Canada, respectively.
        </li>
        <li>
          Monitor legislative and policy proposals, strategizing their
          integration into PolicyEngine.
        </li>
        <li>Develop and review code collaboratively in GitHub.</li>
      </ul>
    </>
  );
}

function DataScienceIntern() {
  return (
    <div>
      <p>
        Your policy analyses and data science tools will reveal the quantitative
        implications of the most visible policy reforms.
      </p>
      <p> You will:</p>
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

function EconomicResearchIntern() {
  return (
    <div>
      <p>
        Your economic research will apply PolicyEngine software to discussions
        that influence top public policy debates.
      </p>
      <p> You will:</p>
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
      <p>
        Your strategic communications, media engagement, and content creation
        will amplify PolicyEngine&apos;s impact by connecting more audiences to
        relevant policy insights.
      </p>
      <p> You will:</p>
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
  const positions = [
    <SoftwareEngineeringIntern key={0} />,
    <PolicyModelingIntern key={1} />,
    <DataScienceIntern key={2} />,
    <EconomicResearchIntern key={3} />,
    <CommunicationsIntern key={4} />,
  ]
  const titles = [
    "Software Engineering Intern",
    "Policy Modeling Intern",
    "Data Science Intern",
    "Economic Research Intern",
    "Communications Intern",
  ]
  const colors = [
    style.colors.WHITE,
    style.colors.LIGHT_GRAY,
    style.colors.WHITE,
    style.colors.LIGHT_GRAY,
    style.colors.WHITE,
  ]
  return (
    <div>
      <Header />
      <PageHeader title="Join Our Team" backgroundColor={style.colors.BLUE_98}>
        <p style={{ margin: 0 }}>
          Join PolicyEngine&apos;s team and contribute to a global movement of
          open-source software development for public policy analysis.
        </p>
      </PageHeader>
      <Section title="Internship Opportunities">
        <InternshipOpportunities />
      </Section>
      {
        positions.map((position, i) => (
          <Section key={i} title={titles[i]} backgroundColor={colors[i]}>
            {position}
          </Section>
        ))
      }
      <Section>
      <ApplyButton />
      </Section>
      <Footer />
    </div>
  );
}
