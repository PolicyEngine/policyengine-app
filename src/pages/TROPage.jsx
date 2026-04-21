import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { countryApiCall } from "../api/call";
import LoadingCentered from "../layout/LoadingCentered";
import ErrorPage from "../layout/ErrorPage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import CiteTROButton from "../controls/CiteTROButton";
import VersionBadge from "../controls/VersionBadge";
import colors from "../style/colors";

/**
 * Page for displaying a TRACE TRO permalink
 * This page fetches and renders a simulation result from a TRO ID
 * ensuring reproducibility with pinned versions
 */
export default function TROPage() {
  const { countryId, troId } = useParams();
  const [troData, setTroData] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTROData() {
      try {
        setLoading(true);
        // Fetch TRO metadata and result data
        // The API should provide an endpoint like: /{countryId}/trace/{troId}
        const response = await countryApiCall(
          countryId,
          `/trace/${troId}`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch TRO: ${response.statusText}`);
        }

        const data = await response.json();
        setTroData(data.tro);
        setResultData(data.result);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching TRO:", err);
        setError(err.message);
        setLoading(false);
      }
    }

    if (countryId && troId) {
      fetchTROData();
    }
  }, [countryId, troId]);

  if (loading) {
    return (
      <>
        <Header />
        <LoadingCentered message="Loading result..." />
      </>
    );
  }

  if (error || !troData) {
    return (
      <>
        <Header />
        <ErrorPage
          message={
            error ||
            "This result could not be found. The TRO may have been removed or the link may be invalid."
          }
        />
      </>
    );
  }

  return (
    <>
      <Header />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Header section with TRO info */}
        <div
          style={{
            backgroundColor: colors.LIGHT_GRAY,
            padding: 32,
            marginBottom: 40,
            borderLeft: `4px solid ${colors.TEAL_ACCENT}`,
          }}
        >
          <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 16 }}>
            Verified Simulation Result
          </h1>
          <p style={{ fontSize: 16, marginBottom: 24, color: colors.DARK_GRAY }}>
            This page displays a permanently archived simulation result from
            PolicyEngine. The result is cryptographically verified and
            reproducible using the TRACE Transparent Research Object (TRO)
            standard.
          </p>

          <div style={{ marginBottom: 20 }}>
            <VersionBadge
              manifest={troData.manifest}
              troUrl={troData.tro_url}
              size="large"
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <CiteTROButton
              troData={troData}
              country={countryId}
              simulationType={troData.simulation_type || "simulation"}
              buttonText="Cite this result"
              buttonType="primary"
            />
          </div>
        </div>

        {/* Result display section */}
        <div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 600,
              marginBottom: 24,
              borderBottom: `2px solid ${colors.TEAL_ACCENT}`,
              paddingBottom: 12,
            }}
          >
            Simulation Result
          </h2>

          {resultData ? (
            <div
              style={{
                backgroundColor: colors.WHITE,
                padding: 24,
                border: `1px solid ${colors.LIGHT_GRAY}`,
              }}
            >
              {/*
                TODO: Render the actual result based on simulation type
                This would need to import and use the appropriate result component
                For now, display as JSON for development
              */}
              <pre
                style={{
                  backgroundColor: colors.LIGHT_GRAY,
                  padding: 16,
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  overflowX: "auto",
                  maxHeight: 600,
                  overflow: "auto",
                }}
              >
                {JSON.stringify(resultData, null, 2)}
              </pre>
            </div>
          ) : (
            <p style={{ color: colors.DARK_GRAY }}>
              Result data not available for display.
            </p>
          )}
        </div>

        {/* Information section */}
        <div
          style={{
            marginTop: 60,
            padding: 32,
            backgroundColor: colors.LIGHT_GRAY,
            borderRadius: 4,
          }}
        >
          <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
            About this result
          </h3>
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.8,
              color: colors.DARK_GRAY,
            }}
          >
            <p>
              This result is permanently archived and reproducible. The TRACE
              TRO binds all inputs and outputs using SHA-256 cryptographic
              hashes, ensuring that the simulation can be independently verified
              and replicated.
            </p>
            <p style={{ marginTop: 16 }}>
              <strong>TRO ID:</strong> <code>{troId}</code>
            </p>
            {troData.tro_url && (
              <p style={{ marginTop: 12 }}>
                <strong>TRO URL:</strong>{" "}
                <a
                  href={troData.tro_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: colors.BLUE }}
                >
                  {troData.tro_url}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
