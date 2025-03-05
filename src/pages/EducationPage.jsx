import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCountryId from "../hooks/useCountryId";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Helmet } from "react-helmet";
import PageHeader from "../layout/PageHeader";
import Section from "../layout/Section";
import { Link } from "react-router-dom";
import style from "../style";

/**
 * Educational Use page component - placeholder for future content
 */
const EducationPage = () => {
  const location = useLocation();
  const countryId = useCountryId();
  const isUK = countryId === "uk";

  useEffect(() => {
    document.title = "Educational Use | PolicyEngine";
    window.scrollTo(0, 0);
  }, [location]);

  const generalPages = [
    { id: "ai", label: "AI & ML", path: `/${countryId}/ai` },
    { id: "api", label: "API", path: `/${countryId}/api` },
    {
      id: "microsim",
      label: "Microsimulation",
      path: `/${countryId}/microsim`,
    },
    {
      id: "education",
      label: "Educational Use",
      path: `/${countryId}/education`,
    },
    {
      id: "opensource",
      label: "Open Source",
      path: `/${countryId}/opensource`,
    },
  ];

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

      {/* General navigation tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#F7FAFD",
          padding: "0 1rem 1rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {generalPages.map((page) => (
          <Link
            key={page.id}
            to={page.path}
            style={{
              padding: "0.5rem 1rem",
              textDecoration: "none",
              fontWeight: page.id === "education" ? "bold" : "normal",
              borderBottom:
                page.id === "education"
                  ? `2px solid ${style.colors.BLUE}`
                  : "none",
              color: style.colors.BLACK,
            }}
          >
            {page.label}
          </Link>
        ))}
      </div>

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
