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
 * Educational Use page component - placeholder for future content
 */
const EducationPage = () => {
  const location = useLocation();
  const countryId = useCountryId();
  // Country identification logic

  useEffect(() => {
    document.title = "Educational Use | PolicyEngine";
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Educational Use | PolicyEngine</title>
      </Helmet>
      <Header />
      <PageHeader title="Educational Use" backgroundColor="#F7FAFD">
        <p style={{ margin: 0 }}>
          How PolicyEngine can be used in classrooms and educational settings
        </p>
      </PageHeader>

      <SecondaryNav countryId={countryId} pageType="education" />
      <Section>
        <div className="placeholder-content">
          <h2>Coming Soon</h2>
          <p>
            We&apos;re currently developing comprehensive content about how
            PolicyEngine can be used in educational settings. This page will
            include:
          </p>
          <ul>
            <li>Classroom guides for teaching tax and benefit policies</li>
            <li>
              University case studies of PolicyEngine in research and teaching
            </li>
            <li>Educational resources for various learning levels</li>
            <li>Integration with educational curricula</li>
            <li>Workshop materials and lesson plans</li>
          </ul>
          <p>
            If you&apos;re using PolicyEngine in an educational setting and
            would like to contribute your story or resources, please contact us
            at{" "}
            <a href="mailto:hello@policyengine.org">hello@policyengine.org</a>.
          </p>
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
        
        .placeholder-content ul {
          text-align: left;
          display: inline-block;
          margin: 1.5rem auto;
        }
        
        .placeholder-content li {
          margin-bottom: 0.5rem;
        }
      `}</style>
      <Footer />
    </>
  );
};

export default EducationPage;
