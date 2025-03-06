import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCountryId from "../../hooks/useCountryId";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { Helmet } from "react-helmet";
import PageHeader from "../../layout/PageHeader";
import Section from "../../layout/Section";
import style from "../../style";
import SecondaryNav from "./SecondaryNav";

// During front-end redesign, this page should be refactored
// to use design system layout components and improved best practices.

/**
 * Benefit Access page component - showcasing benefit screening tools powered by PolicyEngine
 */
const BenefitAccessPage = () => {
  const location = useLocation();
  const countryId = useCountryId();
  // Country identification logic

  useEffect(() => {
    document.title = "Benefit Access | PolicyEngine";
    window.scrollTo(0, 0);
  }, [location]);

  // Partner organizations using PolicyEngine API for benefit access tools
  const partnerOrganizations = [
    {
      name: "MyFriendBen",
      description:
        "An open-source multi-benefit screener operating in Colorado, currently expanding to North Carolina and Massachusetts. MyFriendBen helps individuals quickly identify benefits they may qualify for through an accessible, user-friendly interface.",
      website: "https://www.myfriendben.org/",
      imageUrl:
        "https://www.myfriendben.org/wp-content/uploads/2024/08/MFB-National-Site-Triple-Phone-1024x844.png",
      logoUrl:
        "https://www.myfriendben.org/wp-content/uploads/2024/05/MFB-Horizontal-color-nobk.webp",
      regions: ["Colorado", "North Carolina", "Massachusetts"],
    },
    {
      name: "Benefit Navigator",
      description:
        "A tool developed by IMAGINE LA to support case workers in Los Angeles County. Benefit Navigator helps social service providers quickly assess client eligibility for multiple benefit programs, streamlining the assistance process.",
      website: "https://www.imaginela.org/benefit-navigator",
      imageUrl:
        "https://images.squarespace-cdn.com/content/v1/5f6287b7ba52c722644c43c2/0938452b-fc33-483a-be9c-bc6ae1f98191/Screen+1.png?format=1500w",
      logoUrl:
        "https://static1.squarespace.com/static/5f6287b7ba52c722644c43c2/t/5f87a74f3990a2436a9f1b56/1740173730712/",
      regions: ["Los Angeles County"],
    },
    {
      name: "Navvy",
      description:
        "A benefits screener developed by Impactica for the Student Basic Needs Coalition. Navvy helps students identify and access critical support services and benefits specifically designed for higher education students.",
      website: "https://www.studentbasicneeds.com/navvy",
      imageUrl:
        "https://static.wixstatic.com/media/bc112d_b0a5a365b2ec4fa587724e776fa99934~mv2.png/v1/crop/x_0,y_10,w_1436,h_1322/fill/w_832,h_766,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/unnamed-2_edited.png",
      logoUrl:
        "https://images.fillout.com/orgid-238912/flowpublicid-ry5gBXBRnAus/widgetid-undefined/h3ChNmTFXJmNApWY1HQVt6/SBNC-Red-Logo.png?a=gtLw4QD91bZPuWMyguZPWw",
      regions: ["National (US)"],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Benefit Access | PolicyEngine</title>
      </Helmet>
      <Header />
      <PageHeader title="Benefit Access" backgroundColor="#F7FAFD">
        <p style={{ margin: 0 }}>
          Powering benefit eligibility screening tools through the PolicyEngine
          API
        </p>
      </PageHeader>

      <SecondaryNav countryId={countryId} pageType="benefits" />
      <Section>
        <div className="benefits-intro">
          <h2>Increasing Access to Public Benefits</h2>
          <p>
            PolicyEngine&apos;s tax-benefit engine and API power a range of
            benefit eligibility screening tools, helping people discover and
            access the support they&apos;re entitled to.
          </p>
          <p>
            Our partners leverage PolicyEngine&apos;s computational capabilities
            to create user-friendly applications that simplify the complex
            landscape of public benefits programs, making it easier for
            individuals, families, and case workers to identify available
            assistance.
          </p>
        </div>
      </Section>

      <Section
        title="Partner Organizations"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="partner-organizations">
          {partnerOrganizations.map((org, index) => (
            <div className="partner-card" key={index}>
              <div className="partner-header">
                <div className="partner-logo">
                  <img src={org.logoUrl} alt={`${org.name} logo`} />
                </div>
                <div className="partner-title">
                  <h3>{org.name}</h3>
                  <div className="partner-regions">
                    {org.regions.map((region, idx) => (
                      <span key={idx} className="region-tag">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="partner-description">{org.description}</p>
              {org.imageUrl && (
                <div className="partner-screenshot">
                  <img src={org.imageUrl} alt={`${org.name} screenshot`} />
                </div>
              )}
              <a
                href={org.website}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-website"
              >
                Visit Website →
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Build Your Own Benefit Screening Tool">
        <div className="cta-section">
          <p>
            Are you interested in creating a benefit screening tool for your
            organization or community? PolicyEngine&apos;s API provides
            accurate, up-to-date benefit calculations that can be integrated
            into your own applications.
          </p>
          <p>Our API offers:</p>
          <ul>
            <li>
              Calculation of eligibility and benefit amounts for major US and UK
              tax and benefit programs
            </li>
            <li>
              Flexible integration options to fit your organization&apos;s needs
            </li>
            <li>
              Regularly updated policy parameters to reflect current legislation
            </li>
            <li>Technical support from our team</li>
          </ul>
          <div className="cta-buttons">
            <a href={`/${countryId}/api`} className="cta-button primary">
              Explore Our API
            </a>
            <a
              href="mailto:hello@policyengine.org"
              className="cta-button secondary"
            >
              Contact Us
            </a>
          </div>
        </div>
      </Section>

      <style>{`
        .benefits-intro {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .benefits-intro h2 {
          color: ${style.colors.BLUE};
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .partner-organizations {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }
        
        .partner-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }
        
        .partner-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          gap: 1rem;
        }
        
        .partner-logo {
          width: 80px;
          height: 80px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .partner-logo img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .partner-title {
          flex: 1;
        }
        
        .partner-title h3 {
          margin: 0 0 0.5rem 0;
          color: ${style.colors.BLUE};
        }
        
        .partner-regions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        
        .region-tag {
          background-color: ${style.colors.BLUE_98};
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          white-space: nowrap;
        }
        
        .partner-description {
          margin-bottom: 1.5rem;
          flex: 1;
        }
        
        .partner-screenshot {
          width: 100%;
          margin: 1rem 0;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: center;
        }
        
        .partner-screenshot img {
          width: 100%;
          max-height: 350px;
          object-fit: contain;
          display: block;
        }
        
        .partner-website {
          display: inline-block;
          margin-top: auto;
          color: ${style.colors.BLUE};
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .partner-website:hover {
          color: ${style.colors.DARK_BLUE_HOVER};
        }
        
        .cta-section {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        .cta-section ul {
          text-align: left;
          display: inline-block;
          margin: 1.5rem auto;
        }
        
        .cta-section li {
          margin-bottom: 0.5rem;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }
        
        .cta-button {
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .cta-button.primary {
          background-color: ${style.colors.BLUE};
          color: white;
        }
        
        .cta-button.primary:hover {
          background-color: ${style.colors.DARK_BLUE_HOVER};
        }
        
        .cta-button.secondary {
          border: 1px solid ${style.colors.BLUE};
          color: ${style.colors.BLUE};
        }
        
        .cta-button.secondary:hover {
          background-color: ${style.colors.BLUE_98};
        }
        
        @media (max-width: 768px) {
          .cta-buttons {
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>
      <Footer />
    </>
  );
};

export default BenefitAccessPage;
