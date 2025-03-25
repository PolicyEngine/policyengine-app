import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCountryId from "../../hooks/useCountryId";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { Helmet } from "react-helmet";
import PageHeader from "../../layout/PageHeader";
import Section from "../../layout/Section";
import style from "../../style";
import { GithubOutlined } from "@ant-design/icons";
import SecondaryNav from "./SecondaryNav";

// During front-end redesign, this page should be refactored
// to use design system layout components and improved best practices.

/**
 * Open Source page component - placeholder for future content
 */
const OpenSourcePage = () => {
  const location = useLocation();
  const countryId = useCountryId();
  // Country identification logic

  useEffect(() => {
    document.title = "Open Source | PolicyEngine";
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Open Source | PolicyEngine</title>
      </Helmet>
      <Header />
      <PageHeader title="Open Source" backgroundColor="#F7FAFD">
        <p style={{ margin: 0 }}>
          PolicyEngine&apos;s commitment to open source software and transparent
          policy analysis
        </p>
      </PageHeader>

      <SecondaryNav countryId={countryId} pageType="open-source" />
      <Section>
        <div className="placeholder-content">
          <h2>Coming Soon</h2>
          <p>
            We&apos;re currently developing comprehensive content about
            PolicyEngine&apos;s open source software and our commitment to
            transparency. This page will include:
          </p>
          <ul>
            <li>
              Overview of our open source repositories and software architecture
            </li>
            <li>Contributor guidelines and how to get involved</li>
            <li>Our open source philosophy and commitment to transparency</li>
            <li>Case studies of community contributions</li>
            <li>Development roadmap and future plans</li>
          </ul>
          <p>In the meantime, you can explore our code on GitHub:</p>
          <div className="github-button">
            <a
              href="https://github.com/PolicyEngine"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <GithubOutlined /> Visit PolicyEngine on GitHub
            </a>
          </div>
        </div>
      </Section>

      <style>{`
        .placeholder-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          padding: 3rem 1rem;
        }
        
        .placeholder-content h2 {
          color: ${style.colors.BLUE};
          margin-bottom: 1.5rem;
        }
        
        .github-icon {
          margin: 2rem 0;
        }
        
        .placeholder-content ul {
          text-align: left;
          display: inline-block;
          margin: 1.5rem auto;
        }
        
        .placeholder-content li {
          margin-bottom: 0.5rem;
        }
        
        .github-button {
          margin-top: 2rem;
        }
        
        .github-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: ${style.colors.BLUE};
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: bold;
          transition: background-color 0.2s;
        }
        
        .github-link:hover {
          background-color: ${style.colors.BLUE_LIGHT};
        }
      `}</style>
      <Footer />
    </>
  );
};

export default OpenSourcePage;
