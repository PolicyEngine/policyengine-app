/**
 * Supporters.jsx  (React component)
 *
 * Displays organisations and individuals that fund PolicyEngine
 * through grants, contracts, or donations.
 */

import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Section from "../layout/Section";
import PageHeader from "../layout/PageHeader";
import style from "../style";

/* ---------- helpers ---------- */

// Parse date string (e.g., "September 2024") into a Date object
const parseDate = (dateStr) => {
  if (!dateStr) return new Date(0);
  try {
    // Handle Month Year format (e.g., "September 2024")
    const parts = dateStr.split(" ");
    if (parts.length === 2) {
      const monthNames = [
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
      ];
      const month = monthNames.indexOf(parts[0].toLowerCase());

      if (month !== -1) {
        return new Date(parseInt(parts[1]), month);
      }
    }
    // If not in Month Year format, try standard Date parsing
    return new Date(dateStr);
  } catch (e) {
    console.error("Error parsing date:", e);
    return new Date(0);
  }
};

// Parse amount string to a numeric value
const parseAmount = (amountStr) => {
  if (!amountStr) return 0;
  // Extract numeric value, removing currency symbols and commas
  const numericValue = amountStr.replace(/[£$,]/g, "");
  return parseFloat(numericValue) || 0;
};

/* ---------- sub-components ---------- */

const SupportedProject = ({ project }) => (
  <div
    style={{
      margin: "16px 0",
      padding: "16px",
      borderLeft: `4px solid ${style.colors.TEAL_ACCENT}`,
      backgroundColor: style.colors.LIGHT_GRAY_98,
    }}
  >
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
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      <span>
        <strong>Award:</strong> {project.amount}
      </span>
      <span>
        <strong>Date:</strong> {project.awardDate}
      </span>
    </div>
    <p>{project.description}</p>
  </div>
);

const SupporterCard = ({ supporter, projects }) => (
  <div
    style={{
      marginBottom: 48,
      padding: 24,
      border: `1px solid ${style.colors.LIGHT_GRAY}`,
      borderRadius: 4,
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    }}
  >
    {/* Header */}
    <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
      {supporter.logoUrl && (
        <a
          href={supporter.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: 24 }}
        >
          <img
            src={supporter.logoUrl}
            alt={`${supporter.name} logo`}
            style={{
              width: 200,
              height: 80,
              objectFit: "contain",
              objectPosition: "left center",
            }}
          />
        </a>
      )}
      <p style={{ margin: 0 }}>
        {supporter.websiteUrl ? (
          <a
            href={supporter.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: style.colors.BLUE, fontWeight: "bold" }}
          >
            {supporter.name}
          </a>
        ) : (
          <span style={{ fontWeight: "bold" }}>{supporter.name}</span>
        )}
        {" — "}
        {supporter.description}
      </p>
    </div>

    {/* Projects */}
    {projects.map((p, i) => (
      <SupportedProject project={p} key={i} />
    ))}
  </div>
);

/* ---------- main component ---------- */

export default function Supporters() {
  const [supporters, setSupporters] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchJSON = async (path) => {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Failed to fetch ${path}`);
      return res.json();
    };

    Promise.all([
      fetchJSON("/data/supporters.json"),
      fetchJSON("/data/supported-projects.json"),
    ])
      .then(([s, p]) => {
        setSupporters(s);
        setProjects(p);
        setLoading(false);
      })
      .catch((e) => {
        setErr(e.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <>
        <Header />
        <PageHeader
          title="Our supporters"
          backgroundColor={style.colors.BLUE_98}
        />
        <Section backgroundColor={style.colors.WHITE}>
          <p>Loading supporters…</p>
        </Section>
        <Footer />
      </>
    );

  if (err)
    return (
      <>
        <Header />
        <PageHeader
          title="Our supporters"
          backgroundColor={style.colors.BLUE_98}
        />
        <Section backgroundColor={style.colors.WHITE}>
          <p>Error: {err}</p>
        </Section>
        <Footer />
      </>
    );

  /* group + sort */
  const projectsBySupporter = supporters.reduce((o, s) => {
    o[s.id] = projects
      .filter((p) => p.supporter === s.id)
      .sort((a, b) => parseDate(b.awardDate) - parseDate(a.awardDate));
    return o;
  }, {});

  // Calculate total funding by supporter
  const calculateTotalFunding = (supporterId) => {
    const supporterProjects = projectsBySupporter[supporterId] || [];
    return supporterProjects.reduce(
      (sum, project) => sum + parseAmount(project.amount),
      0,
    );
  };

  // Sort supporters by total funding amount (descending)
  const sortedSupporters = [...supporters].sort((a, b) => {
    const totalA = calculateTotalFunding(a.id);
    const totalB = calculateTotalFunding(b.id);
    return totalB - totalA;
  });

  return (
    <>
      <Header />

      <PageHeader title="Our supporters" backgroundColor={style.colors.BLUE_98}>
        <p style={{ margin: 0 }}>
          PolicyEngine gratefully acknowledges the organisations and individuals
          whose <strong>grants, contracts, and donations</strong> make our work
          possible.
        </p>
      </PageHeader>

      <Section backgroundColor={style.colors.WHITE}>
        {sortedSupporters.map((s) => (
          <SupporterCard
            supporter={s}
            projects={projectsBySupporter[s.id]}
            key={s.id}
          />
        ))}
      </Section>

      <Footer />
    </>
  );
}
