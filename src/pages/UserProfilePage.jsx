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
import { apiCall } from "../api/call";
import { useEffect, useState } from "react";
import useCountryId from "../hooks/useCountryId";
import useLocalStorage from "../hooks/useLocalStorage";
import { postUserPolicy, cullOldPolicies } from "../api/userPolicies";

export default function UserProfilePage() {
  const [userPolicies, setUserPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedPolicies, setSavedPolicies] = useLocalStorage("saved-policies", []);
  const countryId = useCountryId();
  const { user } = useAuth0();
  const windowWidth = useWindowWidth();
  const dispCat = useDisplayCategory();

  const maxCardWidth = 300; // Max card width (relative to screen, so not exact), in pixels

  const gridColumns = dispCat === "mobile" ? 1 : Math.floor(windowWidth / maxCardWidth);
  useEffect(() => {
    async function fetchPolicies() {
      setIsLoading(true);
      try {
        const data = await apiCall(
          `/${countryId}/user_policy/${user.sub}`
        );
        const dataJson = await data.json();
        setUserPolicies(dataJson.result);
      } catch (err) {
        console.error("Error within UserProfilePage: ");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    async function emitPreAuthPolicies() {

      // Check if user has any policies from before account creation
      // or policies that have failed to emit correctly before
      // If so, batch emit these via sequential POSTs to back end
      const filteredPolicies = cullOldPolicies(savedPolicies);
      let failedAttempts = [];
      for (let policy of filteredPolicies) {
        // Add user id to policies, since we now have one
        policy = {
          ...policy,
          user_id: user.sub
        };

        try {
          await postUserPolicy(countryId, policy);
        } catch (err) {
          // If for some reason, policy addition fails,
          // add it to a failed attempts array - this will
          // overwrite the existing policies, which will be
          // cleared out
          failedAttempts = failedAttempts.concat(policy);
        }
      }
      // Finally, overwrite savedPolicies with fails (could be empty)
      setSavedPolicies(failedAttempts);
    }

    if (countryId && user?.sub) {
      emitPreAuthPolicies().then(() => {fetchPolicies()});
    }
  // ESLint wants to monitor savedPolicies and setSavedPolicies, but these
  // are themselves a hook, with setSavedPolicies being a setter
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, user?.sub]);

  const loadingCards = Array(4).fill(<Card loading={true} />);

  const userPolicyCards = userPolicies.map((userPolicy, index) => {
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
        >{userPolicy.reform_label || `Policy #${userPolicy.reform_id}`}</h6>
        {/*The below div is necessary because Ant Design Card components
        add :before and :after pseudos with height=0, meaning a flex with
        space-between will add space before them, ruining the layout*/}
        {dispCat !== "mobile" && (
          <div 
            style={{
              height: "100%",
              flexGrow: 2
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: dispCat === "mobile" ? "row" : "column",
            columnGap: dispCat === "mobile" && "20px",
            flexWrap: "wrap"
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
              flex: dispCat === "mobile" && "0 0 100%"
            }}
          >
            <Link to={`/${userPolicy.country_id}/policy/?reform=${userPolicy.reform_id}&baseline=${userPolicy.baseline_id}`}>
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
            {isLoading ? loadingCards : userPolicyCards}
          </div>
        </Section>
        <Footer />
      </div>
    </>
  )

}

function UserProfileSection() {
  const { isAuthenticated, isLoading, user } = useAuth0();
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
              isAuthenticated || isLoading ? (
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