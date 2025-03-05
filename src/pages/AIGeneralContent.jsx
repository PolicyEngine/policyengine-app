import React from "react";
import GeneralContent from "./GeneralContent";
import HouseholdAIModal from "../modals/HouseholdAIModal";

/**
 * AI page content using the new general page structure
 * @param {Object} props
 * @param {string} props.countryId - The country ID (us or uk)
 * @param {boolean} props.isUK - Whether this is the UK version
 */
const AIGeneralContent = ({ countryId, isUK = false }) => {
  // Use appropriate spelling based on country
  const democratize = isUK ? "democratise" : "democratize";
  const personalized = isUK ? "personalised" : "personalized";
  const optimized = isUK ? "optimised" : "optimized";
  const behavior = isUK ? "behaviour" : "behavior";
  const analyze = isUK ? "analyse" : "analyze";
  const recognized = isUK ? "recognised" : "recognized";

  // Use appropriate image paths based on country
  const householdImage = isUK
    ? require("../images/posts/uk-household-ai.png")
    : require("../images/posts/us-household-ai.png");

  // Configure content specific to the AI page
  const aiContent = {
    title: "AI & Machine Learning",
    subtitle:
      "PolicyEngine uses artificial intelligence and machine learning to make policy analysis more accurate and accessible.",
    heroTitle: "Making Policy Accessible With AI",
    heroSubtitle: `PolicyEngine combines tax-benefit microsimulation with cutting-edge AI to ${democratize} policy understanding`,
    heroImage: householdImage,
    heroButtonText: "Try AI Explanations",
    heroButtonLink: `/${countryId}/household`,
    sections: [
      {
        title: "AI-Powered Policy Analysis",
        id: "ai-features",
        className: "feature-grid",
        content: (
          <>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Instant Analysis</h3>
              <p>
                Generate comprehensive policy analysis with natural language,
                tailored to different knowledge levels
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Plain Language Explanations</h3>
              <p>
                Understand complex tax and benefit calculations through clear,
                accessible explanations of your household&apos;s finances
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Data-Driven Insights</h3>
              <p>
                Combine computational precision with narrative insights to tell
                the complete story of policy impacts
              </p>
            </div>
          </>
        ),
      },
      {
        title: "Our AI Journey",
        id: "ai-journey",
        className: "journey-container",
        content: (
          <div className="journey-text">
            <h3>Machine Learning Foundations: 2021-2022</h3>
            <p>
              PolicyEngine has leveraged artificial intelligence since our
              inception. In 2021, we pioneered the use of machine learning to
              enhance our microsimulation models, applying gradient descent to{" "}
              {optimized} survey weights and match administrative totals with
              unprecedented accuracy.
            </p>
            <p>
              By 2022, our UK model had achieved up to 80% lower aggregate
              errors compared to other microsimulation models. This foundation
              of AI-enhanced accuracy has been central to our mission of
              providing reliable policy analysis.
            </p>

            <h3>Data Science Innovation: 2023</h3>
            <p>
              We expanded our AI capabilities in 2023 with our Enhanced Current
              Population Survey (ECPS) for the US model, using quantile
              regression forests to integrate tax record information with survey
              data, creating the first open alternative to restricted tax
              microdata for policy microsimulation.
            </p>

            <h3>AI-Powered Analysis: 2023-Present</h3>
            <p>
              When OpenAI released GPT-4 in March 2023, we immediately{" "}
              {recognized} its potential to {democratize} policy understanding.
              Within just one month, we launched our AI-powered Analysis tool
              that translates complex computational results into accessible
              narratives.
            </p>
            <p>
              In 2024, we extended this capability to household-level
              calculations with Anthropic&apos;s Claude API, enabling users to
              understand exactly how their taxes and benefits are calculated
              through plain-language explanations.
            </p>
          </div>
        ),
      },
      {
        title: "How It Works",
        id: "how-it-works",
        className: "how-it-works",
        content: (
          <>
            <div className="how-it-works-text">
              <p>
                PolicyEngine integrates large language models with our
                computational tax-benefit engine to transform complex
                calculations into clear explanations.
              </p>
              <p>
                For household calculations, we process thousands of intermediate
                values across tax and benefit programs, then use
                Anthropic&apos;s Claude API to generate plain-language
                explanations of eligibility, amounts, and potential changes.
              </p>
              <p>
                For policy analysis, we leverage GPT-4 to weave narratives from
                our computational results, explaining reforms in terms anyone
                can understand - from simplified &quot;ELI5&quot; explanations
                to detailed technical analyses for policy experts.
              </p>
            </div>
            <div className="how-it-works-image">
              <img
                src={require("../images/posts/ai-analysis.png")}
                alt="AI-powered analysis"
                className="architecture-img"
              />
            </div>
          </>
        ),
      },
    ],
  };

  return (
    <>
      <GeneralContent
        countryId={countryId}
        isUK={isUK}
        pageType="ai"
        content={aiContent}
      >
        {/* Additional AI-specific content */}
        <section className="section">
          <div className="section-content">
            <h2>Try PolicyEngine AI</h2>
            <div
              className="demo-button-container"
              style={{ textAlign: "center", margin: "2rem 0" }}
            >
              <h3>Try the AI explanation feature</h3>
              <HouseholdAIModal isDemo={true} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h2 id="demo-video">Watch Our AI Demo</h2>
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/fnuDyLKpt90"
                width="100%"
                height="500"
                title="PolicyEngine AI Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      </GeneralContent>

      <style>{`
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .feature-card {
          background: #f8f9fa;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .journey-container {
          background: #f8f9fa;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin: 2rem 0;
        }
        
        .journey-text h3 {
          color: #1a5fb4;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .journey-text h3:first-child {
          margin-top: 0;
        }

        .how-it-works {
          display: flex;
          gap: 3rem;
          align-items: center;
          margin: 2rem 0;
        }

        .how-it-works-text {
          flex: 1;
        }

        .how-it-works-image {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .architecture-img {
          max-width: 100%;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .section {
          padding: 3rem 0;
        }

        .section-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .video-container {
          margin: 2rem 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .how-it-works {
            flex-direction: column;
          }

          .how-it-works-image {
            margin-top: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default AIGeneralContent;
