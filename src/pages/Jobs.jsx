import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Section from "../layout/Section";
import style from "../style";
import PageHeader from "../layout/PageHeader";
import { HoverBox } from "../layout/HoverBox";

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

function JobContent({ content }) {
  return (
    <div>
      <p>
        <strong>{content.summary}</strong>
      </p>
      <p>
        <strong>Location:</strong> {content.location}
      </p>
      <p>
        <strong>
          {content.type === "Full-Time" ? "Contract" : "Duration"}:
        </strong>{" "}
        {content.contract || content.duration}
      </p>
      <p>{content.description}</p>
      <p>
        <strong>Key Responsibilities:</strong>
      </p>
      <ul>
        {content.responsibilities.map((resp, index) => (
          <li key={index}>{resp}</li>
        ))}
      </ul>
      <p>
        <strong>Qualifications:</strong> {content.qualifications}
      </p>
      <p>
        <strong>Benefits:</strong> {content.benefits}
      </p>
    </div>
  );
}

export default function Jobs() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/job-openings.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch job openings");
        }
        return response.json();
      })
      .then((data) => {
        setJobOpenings(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const fullTimePositions = jobOpenings.filter(
    (job) => job.type === "Full-Time",
  );
  const internshipPositions = jobOpenings.filter(
    (job) => job.type === "Internship",
  );

  const renderJobSection = (position, index, isFullTime) => (
    <Section key={position.title} title={position.title}>
      <JobContent content={position.content} />
    </Section>
  );

  if (isLoading) {
    return <div>Loading job openings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <PageHeader title="Join our team" backgroundColor={style.colors.BLUE_98}>
        <p style={{ margin: 0 }}>
          Join PolicyEngine&apos;s team and contribute to a global movement of
          open-source software development for public policy analysis and
          benefit access.
        </p>
      </PageHeader>
      <Section backgroundColor={style.colors.WHITE}>
        <h2>Ready to make an impact?</h2>
        <p>
          At PolicyEngine, we&apos;re revolutionizing public policy analysis and
          benefit access with open-source software. Be part of a team
          that&apos;s shaping the future of economic policy and making a real
          difference in society.
        </p>
        <ApplyButton />
        {/* Update this section depending on open positions */}
        <p>
          We&apos;re currently accepting applications for internship positions.
        </p>
      </Section>
      <Section backgroundColor={style.colors.LIGHT_GRAY}>
        <h2>About PolicyEngine</h2>
        <p>
          PolicyEngine is an innovative platform dedicated to making public
          policy more accessible, transparent, and evidence-based. By leveraging
          cutting-edge technology, we empower individuals and organizations to
          understand and analyze the impacts of tax and benefit policies on
          budgets, economic growth, poverty, and inequality.
        </p>
      </Section>
      {fullTimePositions.length > 0 && (
        <Section backgroundColor={style.colors.WHITE}>
          <h2>Full-Time Positions</h2>
          {fullTimePositions.map((position, index) =>
            renderJobSection(position, index, true),
          )}
        </Section>
      )}
      {internshipPositions.length > 0 && (
        <Section backgroundColor={style.colors.LIGHT_GRAY}>
          <h2>Internship Opportunities</h2>
          {internshipPositions.map((position, index) =>
            renderJobSection(position, index, false),
          )}
        </Section>
      )}
      <Section backgroundColor={style.colors.WHITE}>
        <h2>Take the next step</h2>
        <p>
          If you&apos;re passionate about transforming public policy analysis
          and want to contribute to meaningful change, we&apos;d love to hear
          from you.
        </p>
        <ApplyButton />
      </Section>
      <Footer />
    </div>
  );
}
