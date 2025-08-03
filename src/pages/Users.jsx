import Header from "../layout/Header.jsx";
import Footer from "../layout/Footer.jsx";
import Section from "../layout/Section.jsx";
import style from "../style/index.js";
import PageHeader from "../layout/PageHeader.jsx";
import { users, userCategories } from "../data/users.js";
import useDisplayCategory from "../hooks/useDisplayCategory.js";
import { Helmet } from "react-helmet";

export default function Users() {
  // Group users by category
  const usersByCategory = users.reduce((acc, user) => {
    if (!acc[user.category]) {
      acc[user.category] = [];
    }
    acc[user.category].push(user);
    return acc;
  }, {});

  return (
    <>
      <Helmet>
        <title>Our Users | PolicyEngine</title>
        <meta
          name="description"
          content="Organizations and institutions using PolicyEngine for policy analysis and research, including government agencies, think tanks, universities, and advocacy groups."
        />
      </Helmet>
      <div>
        <Header />
        <PageHeader title="Our users" backgroundColor={style.colors.BLUE_98}>
          <p style={{ margin: 0 }}>
            PolicyEngine is trusted by government agencies, think tanks,
            universities, and advocacy organizations to provide rigorous policy
            analysis and evidence-based research.
          </p>
        </PageHeader>

        {/* Hero section with blended logos - placeholder for now */}
        <Section backgroundColor={style.colors.WHITE}>
          <div
            style={{
              textAlign: "center",
              padding: "40px 0",
              backgroundColor: style.colors.LIGHT_GRAY_98,
              marginBottom: "40px",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: style.colors.DARK_GRAY,
              }}
            >
              [Blended user logos will be displayed here]
            </div>
          </div>
        </Section>

        {/* User categories */}
        {Object.entries(userCategories).map(([categoryKey, categoryName]) => {
          const categoryUsers = usersByCategory[categoryKey];
          if (!categoryUsers || categoryUsers.length === 0) return null;

          return (
            <Section
              key={categoryKey}
              backgroundColor={
                categoryKey === "government"
                  ? style.colors.BLUE
                  : style.colors.WHITE
              }
            >
              <h2
                style={{
                  color:
                    categoryKey === "government"
                      ? style.colors.WHITE
                      : style.colors.BLACK,
                  marginBottom: "30px",
                }}
              >
                {categoryName}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "30px",
                }}
              >
                {categoryUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    inverted={categoryKey === "government"}
                  />
                ))}
              </div>
            </Section>
          );
        })}

        <Footer />
      </div>
    </>
  );
}

function UserCard({ user, inverted = false }) {
  const displayCategory = useDisplayCategory();
  const isMobile = displayCategory === "mobile";

  const cardStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "center" : "flex-start",
    padding: "20px",
    backgroundColor: inverted ? style.colors.BLUE : style.colors.WHITE,
    border: inverted
      ? `1px solid ${style.colors.LIGHT_BLUE}`
      : `1px solid ${style.colors.LIGHT_GRAY}`,
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    textAlign: isMobile ? "center" : "left",
  };

  const logoStyle = {
    width: "120px",
    height: "80px",
    objectFit: "contain",
    marginRight: isMobile ? 0 : "20px",
    marginBottom: isMobile ? "15px" : 0,
  };

  const textStyle = {
    color: inverted ? style.colors.WHITE : style.colors.BLACK,
  };

  return (
    <div style={cardStyle}>
      {user.logo && (
        <a
          href={user.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${user.name} website`}
        >
          <img src={user.logo} alt={`${user.name} logo`} style={logoStyle} />
        </a>
      )}
      <div>
        <h3
          style={{
            ...textStyle,
            margin: "0 0 8px 0",
            fontSize: "18px",
          }}
        >
          {user.website ? (
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: inverted ? style.colors.WHITE : style.colors.BLUE,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = "none";
              }}
            >
              {user.name}
            </a>
          ) : (
            user.name
          )}
        </h3>
        <p
          style={{
            ...textStyle,
            margin: 0,
            fontSize: "14px",
            lineHeight: "1.4",
          }}
        >
          {user.description}
        </p>
      </div>
    </div>
  );
}
