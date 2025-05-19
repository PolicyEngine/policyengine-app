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
import Plot from "react-plotly.js";

/* ---------- helpers ---------- */

// Calculate total funding by year
const calculateFundingByYear = (projects) => {
  const fundingByYear = {};
  
  projects.forEach((project) => {
    // Extract year from award date
    const awardDate = parseDate(project.awardDate);
    const year = awardDate.getFullYear();
    
    // Parse amount
    const amount = parseAmount(project.amount);
    
    // Add to year total
    if (!fundingByYear[year]) {
      fundingByYear[year] = 0;
    }
    fundingByYear[year] += amount;
  });
  
  // Convert to sorted array of {year, amount} objects
  return Object.entries(fundingByYear)
    .map(([year, amount]) => ({ year: parseInt(year), amount }))
    .sort((a, b) => a.year - b.year);
};

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

// Parse amount string to a numeric value in USD
const parseAmount = (amountStr) => {
  if (!amountStr) return 0;
  
  // Conversion rate (GBP to USD)
  const GBP_TO_USD = 1.27; // Exchange rate as of May 2025
  
  // Check if amount is in GBP
  const isGBP = amountStr.includes('£');
  
  // Extract numeric value, removing currency symbols and commas
  const numericValue = amountStr.replace(/[£$,]/g, "");
  const parsedValue = parseFloat(numericValue) || 0;
  
  // Convert to USD if amount is in GBP
  return isGBP ? parsedValue * GBP_TO_USD : parsedValue;
};

/* ---------- sub-components ---------- */

const FundingByYearChart = ({ projects }) => {
  const fundingData = calculateFundingByYear(projects);
  
  // Skip rendering if no data
  if (fundingData.length === 0) return null;
  
  // Prepare data for Plotly
  const years = fundingData.map(item => item.year.toString());
  const amounts = fundingData.map(item => item.amount);
  
  // Create colors array - 2025 is shaded to indicate partial year
  const currentYear = new Date().getFullYear();
  const colors = years.map(year => parseInt(year) === currentYear ? 
    style.colors.GRAY : style.colors.BLUE);
  
  // Format hover text with currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Calculate total funding
  const totalFunding = amounts.reduce((sum, amount) => sum + amount, 0);
  
  // Format text labels to display on the bars
  const textLabels = amounts.map(amount => formatCurrency(amount));
  
  return (
    <div style={{ width: '100%', marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ margin: 0 }}>At a glance</h2>
          <p style={{ margin: '12px 0 0 0' }}>
            PolicyEngine has received {formatCurrency(totalFunding)} in funding across {years.length} years.
            {years.includes(currentYear.toString()) && " 2025 indicates funding received so far this year."}
          </p>
        </div>
        <div style={{ flex: '2 1 600px' }}>
          <Plot
            data={[
              {
                type: 'bar',
                x: years,
                y: amounts,
                marker: {
                  color: colors,
                },
                text: textLabels,
                textposition: 'auto',
                textfont: {
                  size: 12,
                  color: 'white',
                },
                hoverinfo: 'text',
                hovertext: textLabels,
              },
            ]}
            layout={{
              height: 400,
              margin: { t: 10, b: 50, l: 60, r: 10 },
              xaxis: {
                title: '',
                tickvals: years,
                ticktext: years,
              },
              yaxis: {
                title: '',
                tickformat: '$,.0f',
              },
              bargap: 0.3,
              autosize: true,
            }}
            style={{ width: '100%' }}
            config={{ responsive: true, displayModeBar: false }}
          />
        </div>
      </div>
    </div>
  );
};

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
        {/* Funding by Year Chart */}
        <FundingByYearChart projects={projects} />
        
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
