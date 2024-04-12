import Footer from "../layout/Footer";
import Header from "../redesign/components/Header";
import Helmet from "react-helmet";
import Section from "../redesign/components/Section";
import PageHeader from "../redesign/components/PageHeader";
import style from "../redesign/style";
import { Link } from "react-router-dom";
import { countryNames } from "../data/countries";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingOutlined, FileImageOutlined } from "@ant-design/icons";
import { useDisplayCategory } from "../layout/Responsive";
import { Card } from "antd";
import { useWindowWidth } from "../hooks/useWindow";

export default function UserProfilePage() {
  const windowWidth = useWindowWidth();
  const dispCat = useDisplayCategory();

  const vertPad = "10px";
  const horizPad = "10px";
  const maxCardWidth = 300; // Max card width (relative to screen, so not exact), in pixels

  const gridColumns = dispCat === "mobile" ? 1 : Math.floor(windowWidth / maxCardWidth);
  // Fetch data here; below is examlpe data for the time being
  const EXAMPLE_DATA = [
    {
      id: 11111,
      reform_label: "Test Policy",
      reform_id: 44151,
      baseline_label: "Current law",
      baseline_id: 2,
      country_id: "us"
    },
    {
      id: 22222,
      reform_id: 14,
      reform_label: "Making the CTC fully refundable",
      baseline_label: "Current law",
      baseline_id: 2,
      country_id: "us",
    },
    {
      id: 33333,
      reform_id: 3349,
      reform_label: "Repealing Oregon's exemption credit",
      baseline_label: "Current law",
      baseline_id: 2,
      country_id: "us",
    },
    {
      id: 44444,
      reform_id: 3752,
      reform_label: "Raising the basic rate to 25%",
      baseline_label: "Current law",
      baseline_id: 1,
      country_id: "uk",
    },
    {
      id: 55555,
      reform_id: 14,
      reform_label: "Making the CTC Fully Refundable",
      baseline_label: "Doubling the CTC",
      baseline_id: 3695,
      country_id: "us",
    },
  ];

  const userPolicyCards = EXAMPLE_DATA.map((userPolicy, index) => {
    const { Meta } = Card;

    const geography = countryNames?.[userPolicy.country_id].singleWord || countryNames?.[userPolicy.country_id].standard || "unknown"

    return (
      <Card 
        key={`${index}-${userPolicy.id}`}
        style={{
          width: "100%",
          minWidth: 0,
        }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          height: "100%"
        }}
      >
        <h6
          style={{
            fontSize: "1.2rem",
            fontFamily: style.fonts.HEADER_FONT,
            marginBottom: "16px"
          }}
        >{userPolicy.reform_label}</h6>
        {/*The below div is necessary because Ant Design Card components
        {/*add :before and :after pseudos with height=0, meaning a flex with
        space-between will add space before them, ruining the layout*/}
        <div 
          style={{
            height: "100%",
            flexGrow: 2
          }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              fontFamily: style.fonts.BODY_FONT,
              margin: 0,
            }}
          >
            <span
              style={{
                fontWeight: 400
              }}
            >
              Geography:&nbsp;
            </span>
            {geography}
          </p>
          {
            userPolicy.baseline_label !== "Current law" && (
              <>
                <p
                  style={{
                    fontFamily: style.fonts.BODY_FONT,
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 400
                    }}
                  >
                    Baseline:&nbsp;
                  </span>
                  {userPolicy.baseline_label}
                </p>
              </>
            )
          }
          <p
            style={{
              fontFamily: style.fonts.BODY_FONT,
              margin: 0,
              gridColumn: "1 / -1"
            }}
          >
            <Link to={`https://www.policyengine.org/${userPolicy.country_id}/policy/?reform=${userPolicy.reform_id}&baseline=${userPolicy.baseline_id}`}>
              <span
                style={{
                  color: style.colors.BLUE_PRIMARY
                }}
              >
                Visit again
              </span>
            </Link>
          </p>
        </div>
      </Card>
    );
  });

  return (
    <>
      <Helmet>
        <title>My Profile | PolicyEngine</title>
      </Helmet>
      <div>
        <Header />
        <PageHeader
          title="Profile"
          backgroundColor={style.colors.BLUE_98}
        >
          <UserProfileSection />
        </PageHeader>
        <Section
          title="Saved policy simulations"
          backgroundColor={style.colors.BLUE_98}
        >
          <div
            style={{
              display: "grid",
              width: "100%",
              gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
              gap: "12px"
            }}
          >
            {userPolicyCards}
          </div>
        </Section>
        <Footer />
      </div>
    </>
  )

}

function UserProfileSection() {
  const { isAuthenticated, user } = useAuth0();
  const displayCategory = useDisplayCategory();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        paddingLeft: displayCategory !== "mobile" && "10px",
        gap: "20px"
      }}
    >
      {
        isAuthenticated && user && user.picture ? (
          <img
            src={user.picture}
            alt="Profile"
            style={{
              height: "100px",
              objectFit: "cover"
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              aspectRatio: 1,
              border: `0.5px solid ${style.colors.DARK_GRAY}`,
              color: style.colors.DARK_GRAY
            }}
          >
            {
              isAuthenticated ? (
                <LoadingOutlined 
                  style={{
                    fontSize: "32px"
                  }}
                />
              ) : (
                <FileImageOutlined 
                  style={{
                    fontSize: "32px"
                  }}
                />
              )
            }
          </div>
        )
      }
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
          gridColumnGap: "20px"
        }}
      >
        <p style={{fontWeight: "bold", margin: 0}}>Name</p>
        <p style={{margin: 0}}>{user ? user.name : "Error: No user logged in"}</p>
        <p style={{fontWeight: "bold", margin: 0}}>Email</p>
        <p style={{margin: 0}}>{user ? user.email: "Error: No user logged in"}</p>
      </div>
    </div>
  );
}