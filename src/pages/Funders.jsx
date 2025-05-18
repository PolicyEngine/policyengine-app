import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Section from "../layout/Section";
import style from "../style";
import PageHeader from "../layout/PageHeader";

function FundedProject({ project, funder }) {
  const projectTitle = (
    <h3 style={{ marginTop: 0 }}>
      {project.projectUrl ? (
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: style.colors.BLUE }}
        >
          {project.title}
        </a>
      ) : (
        project.title
      )}
    </h3>
  );

  return (
    <div
      style={{
        margin: "20px 0",
        padding: "20px",
        borderLeft: `4px solid ${style.colors.TEAL_ACCENT}`,
        backgroundColor: style.colors.LIGHT_GRAY_98,
      }}
    >
      {projectTitle}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div>
          <strong>Award:</strong> {project.amount}
        </div>
        <div style={{ marginLeft: "20px" }}>
          <strong>Date:</strong> {project.awardDate}
        </div>
      </div>
      <p>{project.description}</p>
    </div>
  );
}

function FunderCard({ funder, projects }) {
  return (
    <div
      style={{
        marginBottom: "40px",
        padding: "20px",
        border: `1px solid ${style.colors.LIGHT_GRAY}`,
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        {funder.logoUrl ? (
          funder.websiteUrl ? (
            <a
              href={funder.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginRight: "20px" }}
            >
              <img
                src={funder.logoUrl}
                alt={`${funder.name} logo`}
                style={{
                  width: "200px",
                  height: "80px",
                  objectFit: "contain",
                  objectPosition: "left center",
                }}
              />
            </a>
          ) : (
            <div style={{ marginRight: "20px" }}>
              <img
                src={funder.logoUrl}
                alt={`${funder.name} logo`}
                style={{
                  width: "200px",
                  height: "80px",
                  objectFit: "contain",
                  objectPosition: "left center",
                }}
              />
            </div>
          )
        ) : (
          <div style={{ width: "200px", marginRight: "20px" }}></div>
        )}
        <div>
          <p style={{ margin: 0 }}>
            {funder.websiteUrl ? (
              <a
                href={funder.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: style.colors.BLUE, fontWeight: "bold" }}
              >
                {funder.name}
              </a>
            ) : (
              <span style={{ fontWeight: "bold" }}>{funder.name}</span>
            )}
            {" is "}
            {funder.description}
          </p>
        </div>
      </div>

      <h3>Funded Projects</h3>
      {projects.map((project, index) => (
        <FundedProject key={index} project={project} funder={funder} />
      ))}
    </div>
  );
}

export default function Funders() {
  const [funders, setFunders] = useState([]);
  const [fundedProjects, setFundedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fundersResponse = await fetch("/data/funders.json");
        const projectsResponse = await fetch("/data/funded-projects.json");

        if (!fundersResponse.ok || !projectsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const fundersData = await fundersResponse.json();
        const projectsData = await projectsResponse.json();

        setFunders(fundersData);
        setFundedProjects(projectsData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Parse amount string to a numeric value (for sorting)
  const parseAmount = (amountStr) => {
    if (!amountStr) return 0;
    // Extract numeric value, removing currency symbols and commas
    const numericValue = amountStr.replace(/[£$,]/g, "");
    return parseFloat(numericValue) || 0;
  };

  // Calculate total funding by funder
  const calculateTotalFunding = (funderId) => {
    const projects = fundedProjects.filter(
      (project) => project.funder === funderId,
    );
    return projects.reduce(
      (sum, project) => sum + parseAmount(project.amount),
      0,
    );
  };

  // Parse date string to a Date object (for sorting)
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    // Handle different date formats
    try {
      // Month Year format (e.g., "September 2024")
      const parts = dateStr.split(" ");
      if (parts.length === 2) {
        const month = [
          "january",
          "february",
          "march",
          "april",
          "may",
          "june",
          "july",
          "august",
          "september",
          "october",
          "november",
          "december",
        ].indexOf(parts[0].toLowerCase());

        if (month !== -1) {
          return new Date(parseInt(parts[1]), month);
        }
      }
      // If not in Month Year format, try standard Date parsing
      return new Date(dateStr);
    } catch (e) {
      return new Date(0);
    }
  };

  // Sort funders by total funding amount (descending)
  const sortedFunders = [...funders].sort((a, b) => {
    const totalA = calculateTotalFunding(a.id);
    const totalB = calculateTotalFunding(b.id);
    return totalB - totalA;
  });

  // Group projects by funder and sort by date (most recent first)
  const getProjectsByFunder = (funderId) => {
    const projects = fundedProjects.filter(
      (project) => project.funder === funderId,
    );

    return projects.sort((a, b) => {
      const dateA = parseDate(a.awardDate);
      const dateB = parseDate(b.awardDate);
      return dateB - dateA; // Sort in descending order (most recent first)
    });
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <PageHeader
          title="Our Funders"
          backgroundColor={style.colors.BLUE_98}
        />
        <Section backgroundColor={style.colors.WHITE}>
          <p>Loading funders information...</p>
        </Section>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <PageHeader
          title="Our Funders"
          backgroundColor={style.colors.BLUE_98}
        />
        <Section backgroundColor={style.colors.WHITE}>
          <p>Error loading funders information: {error}</p>
        </Section>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <PageHeader title="Our Funders" backgroundColor={style.colors.BLUE_98}>
        <p style={{ margin: 0 }}>
          PolicyEngine gratefully acknowledges the support of these funders who
          make our work possible.
        </p>
      </PageHeader>

      <Section backgroundColor={style.colors.WHITE}>
        <p>
          Our work is made possible through the generous support of foundations
          and individual donors who share our vision of accessible, transparent,
          and evidence-based policy analysis.
        </p>

        {sortedFunders.map((funder) => (
          <FunderCard
            key={funder.id}
            funder={funder}
            projects={getProjectsByFunder(funder.id)}
          />
        ))}
      </Section>

      <Footer />
    </div>
  );
}
