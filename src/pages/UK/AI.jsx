import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CenteredMiddleColumn from "../../layout/CenteredMiddleColumn";
import Section from "../../layout/Section";
import PageHeader from "../../layout/PageHeader";
import FontIcon from "../../layout/FontIcon";
import useCountryId from "../../hooks/useCountryId";
import LinkButton from "../../controls/LinkButton";
import Button from "../../controls/Button";
import { Modal } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import HouseholdAIModal from "../../modals/HouseholdAIModal";

const AIPage = () => {
  const location = useLocation();
  const countryId = useCountryId();
  const [demoModalVisible, setDemoModalVisible] = useState(false);

  useEffect(() => {
    document.title = "AI | PolicyEngine";
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <PageHeader title="AI & Machine Learning" backgroundColor="#F7FAFD">
        <p style={{ margin: 0 }}>
          PolicyEngine uses artificial intelligence and machine learning to make policy analysis more accurate and accessible.
        </p>
      </PageHeader>
      
      <Section style={{ marginTop: 0, paddingTop: "1rem" }}>
        <div className="hero-section">
          <div className="hero-content">
            <h2>Making Policy Accessible With AI</h2>
            <p className="hero-subtitle">
              PolicyEngine combines tax-benefit microsimulation with cutting-edge AI to democratise policy understanding
            </p>
            <div className="hero-buttons">
              <LinkButton
                link={`/${countryId}/household`}
                text="Try AI Explanations"
                type="primary"
              >
                <FontIcon name="calculator" />
              </LinkButton>
              <LinkButton
                link={`#demo-video`}
                text="Watch Demo"
                type="secondary"
              />
            </div>
          </div>
          <div className="hero-image">
            <img 
              src={require("../../images/posts/uk-household-ai.png")} 
              alt="AI explanation example" 
              className="hero-img"
            />
          </div>
        </div>
      </Section>

      <Section title="AI-Powered Policy Analysis">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Instant Analysis</h3>
            <p>Generate comprehensive policy analysis with natural language, tailored to different knowledge levels</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Plain Language Explanations</h3>
            <p>Understand complex tax and benefit calculations through clear, accessible explanations of your household&apos;s finances</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Data-Driven Insights</h3>
            <p>Combine computational precision with narrative insights to tell the complete story of policy impacts</p>
          </div>
        </div>
      </Section>

      <Section title="Our AI Journey">
        <div className="journey-container">
          <div className="journey-text">
            <h3>Machine Learning Foundations: 2021-2022</h3>
            <p>
              PolicyEngine has leveraged artificial intelligence since our inception. In 2021, we pioneered the use of machine learning to enhance our microsimulation models, applying gradient descent to optimise survey weights and match administrative totals with unprecedented accuracy.
            </p>
            <p>
              By 2022, our UK model had achieved up to 80% lower aggregate errors compared to other microsimulation models. This foundation of AI-enhanced accuracy has been central to our mission of providing reliable policy analysis.
            </p>
            
            <h3>Data Science Innovation: 2023</h3>
            <p>
              We expanded our AI capabilities in 2023 with our Enhanced Current Population Survey (ECPS) for the US model, using quantile regression forests to integrate tax record information with survey data, creating the first open alternative to restricted tax microdata for policy microsimulation.
            </p>
            
            <h3>AI-Powered Analysis: 2023-Present</h3>
            <p>
              When OpenAI released GPT-4 in March 2023, we immediately recognised its potential to democratise policy understanding. Within just one month, we launched our AI-powered Analysis tool that translates complex computational results into accessible narratives.
            </p>
            <p>
              In 2024, we extended this capability to household-level calculations with Anthropic&apos;s Claude API, enabling users to understand exactly how their taxes and benefits are calculated through plain-language explanations.
            </p>
          </div>
        </div>
      </Section>

      <Section title="How It Works">
        <div className="how-it-works">
          <div className="how-it-works-text">
            <p>
              PolicyEngine integrates large language models with our computational tax-benefit engine to transform complex calculations into clear explanations.
            </p>
            <p>
              For household calculations, we process thousands of intermediate values across tax and benefit programs, then use Anthropic&apos;s Claude API to generate plain-language explanations of eligibility, amounts, and potential changes.
            </p>
            <p>
              For policy analysis, we leverage GPT-4 to weave narratives from our computational results, explaining reforms in terms anyone can understand - from simplified &quot;ELI5&quot; explanations to detailed technical analyses for policy experts.
            </p>
          </div>
          <div className="how-it-works-image">
            <img 
              src={require("../../images/posts/ai-analysis.png")} 
              alt="AI-powered analysis" 
              className="architecture-img"
            />
          </div>
        </div>
      </Section>

      <Section title="Features">
        <div className="features-container">
          <div className="feature">
            <h3>Household AI Explanations</h3>
            <p>
              Understand exactly how your taxes and benefits are calculated with AI-generated explanations that break down complex rules into plain language.
            </p>
            <div className="feature-image">
              <img 
                src={require("../../images/posts/uk-household-ai.png")} 
                alt="Household AI explanation example" 
              />
            </div>
          </div>
          
          <div className="feature">
            <h3>Policy Reform Analysis</h3>
            <p>
              Our Analysis tool offers three audience modes to make policy impacts accessible to everyone:
            </p>
            <ul>
              <li><strong>ELI5:</strong> Simple language for general audiences</li>
              <li><strong>Normal:</strong> Balanced for policy analysts</li>
              <li><strong>Wonk:</strong> Technical language for experts</li>
            </ul>
            <div className="feature-image">
              <img 
                src={require("../../images/posts/automate-policy-analysis-with-policy-engines-new-chatgpt-integration.png")} 
                alt="Policy analysis audience modes" 
              />
            </div>
          </div>
          
          <div className="feature">
            <h3>Research & Innovation</h3>
            <p>
              We&apos;re advancing the field through research on how AI can enhance policy analysis:
            </p>
            <ul>
              <li><strong>LLM Tax Behaviour Analysis:</strong> Exploring how large language models perceive behavioural responses to tax policy changes</li>
              <li><strong>Enhanced Microsimulation Data:</strong> Using machine learning to integrate tax records with survey data for more accurate policy analysis</li>
              <li><strong>Optimised Survey Data:</strong> Applying gradient descent algorithms to improve the representativeness of underlying survey data</li>
              <li><strong>AI-Enhanced Communication:</strong> Developing techniques to combine computational precision with narrative accessibility</li>
            </ul>
            <div className="feature-image">
              <img 
                src={require("../../images/posts/how-machine-learning-tools-make-policyengine-more-accurate.png")} 
                alt="Research visualization" 
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Our Vision">
        <div className="vision-container">
          <div className="vision-text">
            <p>
              At PolicyEngine, we believe everyone should have access to accurate, personalised information about public policy. Our vision is to democratise understanding of complex policy systems through both conventional means and artificial intelligence.
            </p>
            <p>
              By combining the precision of microsimulation with the accessibility of AI, we&apos;re building tools that make public policy more transparent, personal, and accessible to all - from researchers and policymakers to advocates and individuals.
            </p>
            <p>
              As we continue to develop these capabilities, we&apos;re committed to maintaining the highest standards of accuracy, transparency, and responsibility in our use of AI - ensuring our tools provide trustworthy information while making complex policy systems easier to understand.
            </p>
          </div>
          <div className="vision-image">
            <img 
              src={require("../../images/posts/how-machine-learning-tools-make-policyengine-more-accurate.png")} 
              alt="Future of policy understanding" 
              className="vision-img"
            />
          </div>
        </div>
      </Section>

      <Section title="Try PolicyEngine AI">
        <div className="cta-container">
          <div className="cta-text">
            <h3>Experience the future of policy understanding</h3>
            <p>
              Explore your household finances with AI explanations or analyse policy reforms with our intelligent analysis tools.
            </p>
          </div>
          <div className="cta-buttons">
            <LinkButton
              link={`/${countryId}/household`}
              text="Household Calculator"
              type="primary"
            />
            <LinkButton
              link={`/${countryId}/policy`}
              text="Policy Analysis"
              type="secondary"
            />
          </div>
        </div>
      </Section>

      <Section title="Watch Our AI Demo" id="demo-video">
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
      </Section>

      {/* Demo modal for household AI */}
      <div className="demo-button-container" style={{ textAlign: "center", margin: "2rem 0" }}>
        <h3>Try the AI explanation feature</h3>
        <HouseholdAIModal isDemo={true} />
      </div>

      <style>{`
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

        h1 {
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

        .features-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          margin: 2rem 0;
        }

        .feature {
          background: #f8f9fa;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .feature-image {
          margin-top: 1.5rem;
          text-align: center;
        }

        .feature-image img {
          max-width: 100%;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .vision-container {
          display: flex;
          gap: 3rem;
          align-items: center;
          margin: 2rem 0;
        }

        .vision-text {
          flex: 3;
        }

        .vision-image {
          flex: 2;
          display: flex;
          justify-content: center;
        }

        .vision-img {
          max-width: 100%;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .cta-container {
          background: linear-gradient(to right, #1a5fb4, #3584e4);
          padding: 3rem;
          border-radius: 12px;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin: 2rem 0;
        }

        .cta-text {
          margin-bottom: 2rem;
        }

        .cta-text h3 {
          color: white;
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
        }
        
        .video-container {
          margin: 2rem 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .hero-section, 
          .how-it-works, 
          .vision-container {
            flex-direction: column;
          }

          .hero-image, 
          .how-it-works-image, 
          .vision-image {
            margin-top: 2rem;
          }

          .hero-buttons,
          .cta-buttons {
            flex-direction: column;
            width: 100%;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AIPage;