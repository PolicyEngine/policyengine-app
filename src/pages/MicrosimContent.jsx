import React from "react";
import GeneralContent from "./GeneralContent";

/**
 * Microsimulation page content using the new general page structure
 * @param {Object} props
 * @param {string} props.countryId - The country ID (us or uk)
 * @param {boolean} props.isUK - Whether this is the UK version
 */
const MicrosimContent = ({ countryId, isUK = false }) => {
  // Use appropriate spelling based on country
  const optimize = isUK ? "optimise" : "optimize";
  const analyze = isUK ? "analyse" : "analyze";
  const modeling = isUK ? "modelling" : "modeling";

  // Configure content specific to the Microsimulation page
  const microsimContent = {
    title: "Microsimulation",
    subtitle: "How PolicyEngine's tax and benefit models work",
    heroTitle: "Tax-Benefit Microsimulation",
    heroSubtitle: `PolicyEngine uses microsimulation models to ${analyze} the impact of policy reforms on real households`,
    heroImage: require("../images/posts/how-machine-learning-tools-make-policyengine-more-accurate.png"),
    heroButtonText: "Try Policy Analysis",
    heroButtonLink: `/${countryId}/policy`,
    sections: [
      {
        title: "What is Microsimulation?",
        id: "microsim-intro",
        content: (
          <div className="microsim-intro">
            <p>
              Microsimulation is a computational technique used to estimate the effects of policy changes on individuals, households, or other microeconomic units. Unlike macroeconomic models that focus on aggregate variables, microsimulation models:
            </p>
            <ul>
              <li>Apply tax and benefit rules to representative samples of the population</li>
              <li>Calculate outcomes for each household based on their unique characteristics</li>
              <li>Aggregate results to estimate population-wide impacts</li>
              <li>Allow for detailed distributional analysis by income, demographic groups, and more</li>
            </ul>
            <p>
              PolicyEngine&apos;s microsimulation models implement tax and benefit systems as code, allowing users to modify parameters and see how changes affect different households and the overall population.
            </p>
          </div>
        )
      },
      {
        title: "How PolicyEngine's Models Work",
        id: "model-architecture",
        className: "model-section",
        content: (
          <>
            <div className="model-description">
              <h3>Open-Source Foundation</h3>
              <p>
                PolicyEngine builds on OpenFisca, an open-source microsimulation framework developed by the French government. Our models implement tax and benefit rules as code, creating a computational representation of current policy and allowing for modifications to explore reform impacts.
              </p>
              
              <h3>Data-Driven Approach</h3>
              <p>
                Our models use nationally representative household surveys enhanced with administrative data to create accurate population samples:
              </p>
              <ul>
                <li><strong>UK:</strong> Family Resources Survey with custom survey weights</li>
                <li><strong>US:</strong> Enhanced Current Population Survey with synthetic tax records</li>
              </ul>
              
              <h3>Machine Learning Enhancement</h3>
              <p>
                We apply machine learning techniques to {optimize} our population samples:
              </p>
              <ul>
                <li>Gradient descent algorithms to calibrate survey weights to match administrative totals</li>
                <li>Quantile regression forests to synthesize missing tax information for US data</li>
                <li>Statistical validation against administrative benchmarks</li>
              </ul>
            </div>
            <div className="model-diagram">
              <img 
                src={require("../images/posts/how-machine-learning-tools-make-policyengine-more-accurate.png")} 
                alt="PolicyEngine model architecture" 
                className="diagram-img" 
              />
            </div>
          </>
        )
      },
      {
        title: "Model Accuracy and Validation",
        id: "validation",
        content: (
          <div className="validation-section">
            <p>
              PolicyEngine continuously validates our models against administrative data to ensure accuracy:
            </p>
            <ul>
              <li>Aggregate tax and benefit totals compared to government budget figures</li>
              <li>Distributional impacts validated against administrative statistics</li>
              <li>Tax and benefit calculators tested against official examples</li>
              <li>Ongoing calibration to match the latest data from government sources</li>
            </ul>
            <p>
              Our UK model has achieved up to 80% lower aggregate error rates compared to standard survey-based approaches, and our US Enhanced CPS represents a significant improvement over public microdata for tax {modeling}.
            </p>
          </div>
        )
      }
    ]
  };

  return (
    <>
      <GeneralContent
        countryId={countryId}
        isUK={isUK}
        pageType="microsim"
        content={microsimContent}
      >
        {/* Additional microsimulation-specific content */}
        <section className="section">
          <div className="section-content">
            <h2>Technical Documentation</h2>
            <div className="documentation-links">
              <div className="doc-card">
                <h3>UK Model Documentation</h3>
                <p>
                  Detailed information about the UK tax and benefit model, including data sources, calibration methodology, and validation results.
                </p>
                <a href={`/${countryId}/research/uk-spi-validation`} className="doc-link">
                  UK Model Validation →
                </a>
              </div>
              <div className="doc-card">
                <h3>US Model Documentation</h3>
                <p>
                  Technical details about the US Enhanced Current Population Survey (ECPS), tax and benefit calculators, and validation methodology.
                </p>
                <a href={`/${countryId}/research/enhanced-cps-beta`} className="doc-link">
                  Enhanced CPS Documentation →
                </a>
              </div>
              <div className="doc-card">
                <h3>GitHub Repositories</h3>
                <p>
                  Access our open-source code repositories for all PolicyEngine models, including tax-benefit rules, data processing pipelines, and web interface.
                </p>
                <a href="https://github.com/PolicyEngine" className="doc-link" target="_blank" rel="noopener noreferrer">
                  PolicyEngine on GitHub →
                </a>
              </div>
            </div>
          </div>
        </section>
      </GeneralContent>

      <style>{`
        .microsim-intro {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .model-section {
          display: flex;
          gap: 3rem;
          align-items: center;
        }
        
        .model-description {
          flex: 3;
        }
        
        .model-diagram {
          flex: 2;
        }
        
        .diagram-img {
          max-width: 100%;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .validation-section {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .documentation-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .doc-card {
          background: #f8f9fa;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .doc-card:hover {
          transform: translateY(-5px);
        }
        
        .doc-link {
          color: #1a5fb4;
          font-weight: 500;
          margin-top: auto;
          padding-top: 1rem;
          display: block;
        }
        
        .section {
          padding: 3rem 0;
        }
        
        .section-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        @media (max-width: 768px) {
          .model-section {
            flex-direction: column;
          }
          
          .model-diagram {
            margin-top: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default MicrosimContent;