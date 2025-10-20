import React from "react";
import Section from "../../layout/Section";
import PageHeader from "../../layout/PageHeader";
import FontIcon from "../../layout/FontIcon";
import LinkButton from "../../controls/LinkButton";
import SecondaryNav from "./SecondaryNav";

// During front-end redesign, this component should be heavily
// refactored. This component is too limiting of an implementation
// for the pages it uses. Better would be to break these up into
// modular components minimally adapted from the design system
// that each page can implement individually.

/**
 * Shared component for general information pages
 * Used as a base for pages like AI, API, Microsimulation, Benefit Access, etc.
 *
 * @param {Object} props
 * @param {string} props.countryId - The country ID (us or uk)
 * @param {boolean} props.isUK - Whether this is the UK version
 * @param {string} props.pageType - The type of page ('ai', 'api', 'microsim', 'benefits', 'education', 'opensource')
 * @param {Object} props.content - Content configuration specific to the page type
 * @param {React.ReactNode} props.children - Additional content specific to the page type
 */
const GeneralContent = ({
  countryId,
  isUK = false,
  pageType,
  content = {},
  children,
}) => {
  // Use appropriate spelling based on country
  // Uncomment and use these variables as needed
  // const democratize = isUK ? "democratise" : "democratize";

  // Default content that can be overridden
  const defaultContent = {
    title: "General information",
    subtitle: "Information about PolicyEngine",
    heroTitle: "PolicyEngine",
    heroSubtitle: "Making policy analysis accessible",
    heroImage: null, // Will be filled in by specific page implementations
    heroButtonText: "Learn More",
    heroButtonLink: `/${countryId}`,
    sections: [], // Will be filled by specific page implementations
  };

  // Merge provided content with defaults
  const pageContent = { ...defaultContent, ...content };

  return (
    <div>
      <PageHeader title={pageContent.title} backgroundColor="#F7FAFD">
        <p style={{ margin: 0 }}>{pageContent.subtitle}</p>
      </PageHeader>
      <SecondaryNav countryId={countryId} pageType={pageType} />

      <Section style={{ marginTop: 0, paddingTop: "1rem" }}>
        <div className="hero-section">
          <div className="hero-content">
            <h2>{pageContent.heroTitle}</h2>
            <p className="hero-subtitle">{pageContent.heroSubtitle}</p>
            <div className="hero-buttons">
              <LinkButton
                link={pageContent.heroButtonLink}
                text={pageContent.heroButtonText}
                type="primary"
              >
                <FontIcon name="calculator" />
              </LinkButton>
            </div>
          </div>
          {pageContent.heroImage && (
            <div className="hero-image">
              <img
                src={pageContent.heroImage}
                alt={pageContent.title}
                className="hero-img"
              />
            </div>
          )}
        </div>
      </Section>

      {/* Page-specific sections */}
      {pageContent.sections.map((section, index) => (
        <Section key={index} title={section.title} id={section.id}>
          <div className={section.className || ""}>{section.content}</div>
        </Section>
      ))}

      {/* Additional content specific to the page type */}
      {children}

      <style>{`
        .hero-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0 0 2rem;
          gap: 2rem;
        }

        .hero-content {
          flex: 1;
        }

        .hero-image {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }

        h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: #555;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
        }

        .hero-img {
          max-width: 100%;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .hero-section {
            flex-direction: column;
          }

          .hero-image {
            margin-top: 2rem;
          }

          .hero-buttons {
            flex-direction: column;
            width: 100%;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default GeneralContent;
