import Footer from "../layout/Footer";
import Header from "../redesign/components/Header";
import Helmet from "react-helmet";
import Section from "../redesign/components/Section";
import PageHeader from "../redesign/components/PageHeader";
import style from "../redesign/style";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingOutlined, FileImageOutlined, UserOutlined } from "@ant-design/icons";
import { useDisplayCategory } from "../layout/Responsive";
import { Card, Skeleton } from "antd";
import { useWindowWidth } from "../hooks/useWindow";
import { apiCall } from "../api/call";
import { useEffect, useState } from "react";
import useCountryId from "../hooks/useCountryId";
import useLocalStorage from "../hooks/useLocalStorage";
import { postUserPolicy, cullOldPolicies } from "../api/userPolicies";
import { countryNames } from "../data/countries";
import moment from "moment";
import { formatCurrencyAbbr } from "../lang/format";

export default function UserProfilePage(props) {
  // This component has three possible display states, saved as the stateful
  // variable dispState:
  // * empty - no data has yet been loaded
  // * noProfile - fetched user was not found
  // * otherProfile - fetched user is not logged in user
  // * ownProfile - fetched user is logged in user

  // Loading is treated separately, through two stateful variables, as
  // two different parts of the component fetch data separately

  // To disambiguate, this component uses two user profiles: 
  // authedUserProfile, representing the authenticated user navigating 
  // the site, and accessedUserProfile, the profile the site user is 
  // visiting. authedUserProfile is shared via props, as the entire 
  // app has access to this info, while accessedUserProfile requires a fetch

  const {metadata, authedUserProfile } = props;
  let params = useParams();
  const accessedUserId = params.user_id;
  const isOwnProfile = Number(authedUserProfile?.user_id) === Number(accessedUserId);

  const [dispState, setDispState] = useState("empty");
  const [isHeaderLoading, setIsHeaderLoading] = useState(true);
  const [arePoliciesLoading, setArePoliciesLoading] = useState(true);
  const [accessedUserPolicies, setAccessedUserPolicies] = useState([]);
  const [accessedUserProfile, setAccessedUserProfile] = useState({});
  const [savedPolicies, setSavedPolicies] = useLocalStorage("saved-policies", []);
  const countryId = useCountryId();
  const windowWidth = useWindowWidth();
  const dispCat = useDisplayCategory();

  const maxCardWidth = 300; // Max card width (relative to screen, so not exact), in pixels
  const gridColumns = dispCat === "mobile" ? 1 : Math.floor(windowWidth / maxCardWidth);

  useEffect(() => {

    async function fetchProfile() {
      setIsHeaderLoading(true);
      if (metadata) {
        try {
          const data = await apiCall(
            `/${countryId}/user_profile?user_id=${accessedUserId}`
          );
          const dataJson = await data.json();
          if (data.status === 404 && dataJson.status === "ok") {
            setAccessedUserProfile({});
            setDispState("noProfile");
          }
          if (data.status < 200 || data.status >= 300) {
            console.error("Error while fetching accessed user profile");
            console.error(dataJson);
            setAccessedUserProfile({});
          } else {
            setAccessedUserProfile(dataJson.result);
            setDispState("otherProfile");
          }
        } catch (err) {
          console.error("Error within UserProfilePage: ");
          console.error(err);
        } finally {
          setIsHeaderLoading(false);
        }
      }
    }

    if (!countryId) {
      return;
    }

    if (!isOwnProfile) {
      // Execute fetch
      fetchProfile();
    } else {
      setDispState("ownProfile");
      setAccessedUserProfile(authedUserProfile);
      setIsHeaderLoading(false);
    }
  }, [countryId, isOwnProfile, authedUserProfile, accessedUserId, metadata]);

  useEffect(() => {
    async function fetchAccessedPolicies() {
      setArePoliciesLoading(true);
      // Only evaluate (and thus set loading to false) if metadata has been fetched
      if (metadata) {
        try {

          const data = await apiCall(
            `/${countryId}/user_policy/${accessedUserId}`
          );
          const dataJson = await data.json();
          if (data.status < 200 || data.status >= 300) {
            console.error("Error while fetching policies");
            console.error(dataJson);
            setAccessedUserPolicies([]);
          } else {
            setAccessedUserPolicies(dataJson.result);
          }
        } catch (err) {
          console.error("Error within UserProfilePage: ");
          console.error(err);
        } finally {
          setArePoliciesLoading(false);
        }
      }
    }

    async function emitPreAuthPolicies() {
      // Only run if the user has accessed their personal
      // profile page

      // Check if user has any policies from before account creation
      // or policies that have failed to emit correctly before
      // If so, batch emit these via sequential POSTs to back end
      const filteredPolicies = cullOldPolicies(savedPolicies);
      let failedAttempts = [];
      for (let policy of filteredPolicies) {
        // Add user id to policies, since we now have one
        policy = {
          ...policy,
          user_id: authedUserProfile.user_id
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

    if (countryId && authedUserProfile?.user_id) {
      // Would use async/await, but not possible in useEffect body
      if (isOwnProfile) {
        emitPreAuthPolicies().then(() => fetchAccessedPolicies());
      }
      else {
        fetchAccessedPolicies();
      }

    }
  // ESLint wants to monitor savedPolicies and setSavedPolicies, but these
  // are themselves a hook, with setSavedPolicies being a setter
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, authedUserProfile, isOwnProfile, accessedUserId, metadata]);

  const dateFormatter = new Intl.DateTimeFormat(
    `en-${countryId}`, {
      dateStyle: "long",
    }
  );

  const loadingCards = Array(4).fill(<Card loading={true} />);

  const noCardPlaceholder = (
    <p style={{gridColumn: "1 / -1"}}>{dispState === "noProfile" ? "User not found" : `${dispState === "ownProfile" ? "You have" : "This user has"} no saved policy simulations.`}</p>
  )

  console.log(accessedUserPolicies)

  const accessedUserPolicyCards = accessedUserPolicies.map((userPolicy, index) => {
    if (!metadata) return null;

    return (
      <PolicySimulationCard 
        metadata={metadata}
        userPolicy={userPolicy}
        key={`${index}-${userPolicy.id}`}
        dateFormatter={dateFormatter}
      />
    )

  });

  let sectionTitle = "Saved policy simulations";
  if (dispState === "ownProfile") {
    sectionTitle = "My saved policy simulations";
  } else if (dispState === "otherProfile" && accessedUserProfile.username) {
    sectionTitle = `${accessedUserProfile.username}'s saved policy simulations`;
  } else if (dispState === "otherProfile") {
    sectionTitle = `User #${accessedUserProfile.user_id}'s saved policy simulations`;
  }

  let title = "Profile | PolicyEngine";
  if ((dispState === "ownProfile" || dispState === "otherProfile") && accessedUserProfile.username) {
    title = `${accessedUserProfile.username}'s Profile | PolicyEngine`;
  } else if (dispState === "ownProfile" || dispState === "otherProfile") {
    title = `User #${accessedUserProfile.user_id}'s Profile | PolicyEngine`;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div>
        <Header />
        <PageHeader
          title="Profile"
          backgroundColor={style.colors.BLUE_98}
        >
          <UserProfileSection accessedUserProfile={accessedUserProfile} isOwnProfile={isOwnProfile} accessedUserId={accessedUserId} dispState={dispState} isHeaderLoading={isHeaderLoading} dateFormatter={dateFormatter}/>
        </PageHeader>
        <Section
          title={sectionTitle}
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
            {arePoliciesLoading ? loadingCards : accessedUserPolicies.length === 0 ? noCardPlaceholder : accessedUserPolicyCards}
          </div>
        </Section>
        <Footer />
      </div>
    </>
  )

}

function UserProfileSection(props) {
  const { 
    accessedUserProfile,
    isOwnProfile,
    accessedUserId,
    dispState,
    isHeaderLoading,
    dateFormatter
  } = props;
  const { isAuthenticated, isLoading, user } = useAuth0();
  const countryId = useCountryId();
  const displayCategory = useDisplayCategory();


  let dispUsername = "";
  if (dispState === "noProfile") {
    dispUsername = "No user found";
  } else if (dispState === "empty") {
    dispUsername = "Loading"
  } else if (accessedUserProfile.username) {
    dispUsername = accessedUserProfile.username
  } else {
    dispUsername = "None created";
  }

  let dispUserSince = "";
  if (dispState === "noProfile") {
    dispUserSince = "No user found";
  } else if (dispState === "empty") {
    dispUserSince = "Loading"
  } else {
    dispUserSince = dateFormatter.format(accessedUserProfile.user_since);
  }

  let dispCountry = "";
  if (dispState === "noProfile") {
    dispCountry = "No user found";
  } else if (dispState === "empty") {
    dispCountry = "Loading"
  } else if (countryNames[accessedUserProfile.primary_country].singleWord) {
    dispCountry = countryNames[accessedUserProfile.primary_country].singleWord;
  } else {
    dispCountry = countryNames[accessedUserProfile.primary_country].standard;
  }
        
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
        dispState === "ownProfile" && isAuthenticated && user && user.picture ? (
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
              isHeaderLoading ? (
                <LoadingOutlined 
                  style={{
                    fontSize: "32px"
                  }}
                />
              ) : dispState === "otherProfile" ? (
                <UserOutlined
                  style={{
                    fontSize: "32px"
                  }}
                />
              ) :
               (
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
      <Skeleton loading={isHeaderLoading} title={false} paragraph={{rows: 3}}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "max-content 1fr",
            gridColumnGap: "20px"
          }}
        >
          {
            dispState === "ownProfile" && (
              <>
                <p style={{fontWeight: "bold", margin: 0}}>Name</p>
                <p style={{margin: 0}}>{user ? user.name : "Error: No user logged in"}</p>
                <p style={{fontWeight: "bold", margin: 0}}>Email</p>
                <p style={{margin: 0}}>{user ? user.email: "Error: No user logged in"}</p>
              </>
            )
          }
            <p style={{fontWeight: "bold", margin: 0}}>User ID</p>
            <p style={{margin: 0}}>{accessedUserId}</p>
            <p style={{fontWeight: "bold", margin: 0}}>Username</p>
            <p style={{margin: 0}}>
              <span style={{
                fontStyle: !accessedUserProfile.username && "italic"
              }}>
                {dispUsername}
              </span>
            </p>
            <p style={{fontWeight: "bold", margin: 0}}>User since</p>
            <p style={{margin: 0}}>{dispUserSince}</p>
            <p style={{fontWeight: "bold", margin: 0}}>Primary country</p>
            <p style={{margin: 0}}>{dispCountry}</p>
        </div>
      </Skeleton>
    </div>
  );
}

function PolicySimulationCard(props) {
  const {
    metadata,
    userPolicy,
    dateFormatter
  } = props;

  const dispCat = useDisplayCategory();
  const CURRENT_API_VERSION = metadata?.version;
  const geography = metadata.economy_options.region.filter((region) => region.name === userPolicy.geography)[0].label || "Unknown";

  const apiVersion = userPolicy.api_version;
  const dateAdded = userPolicy.added_date;
  const dateLastUpdated = userPolicy.updated_date;

  let updatedStatusMessage = null;
  if (apiVersion == CURRENT_API_VERSION) {
    if (dateAdded === dateLastUpdated) {
      updatedStatusMessage = `First simulated ${moment(dateAdded).fromNow()} (reflects latest model updates)`;
    } else {
      updatedStatusMessage = `Last updated ${moment(dateLastUpdated).fromNow()} (reflects latest model updates)`;
    }
  } else {
    if (dateAdded === dateLastUpdated) {
      updatedStatusMessage = `First simulated ${moment(dateAdded).fromNow()} (reflects outdated model version ${apiVersion}, click to update).`;
    } else {
      updatedStatusMessage = `Last updated ${moment(dateLastUpdated).fromNow()} (reflects outdated model version ${apiVersion}, click to update).`;
    }
  }
    return (
      <Link to={`/${userPolicy.country_id}/policy/?reform=${userPolicy.reform_id}&baseline=${userPolicy.baseline_id}`} style={{height: "100%"}}>
      <Card 
        style={{
          width: "100%",
          minWidth: 0,
          height: "100%"
        }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          height: "100%",
          backgroundColor: userPolicy.api_version < CURRENT_API_VERSION && style.colors.LIGHT_GRAY
        }}
        hoverable={true}
      >
        <h6
          style={{
            fontSize: "1.2rem",
            fontFamily: style.fonts.HEADER_FONT,
            marginBottom: "16px"
          }}
        >{userPolicy.reform_label || `Policy #${userPolicy.reform_id}`}</h6>
        <p>
          Simulated in <i>{userPolicy.year}</i> over <i>{geography}</i> against <i>{userPolicy.baseline_label}</i>.
        </p>
        <p>
          {userPolicy.number_of_provisions} provision{userPolicy.number_of_provisions == 1 ? "" : "s"}{userPolicy.budgetary_impact ? `, ${userPolicy.budgetary_impact < 0 ? "costing" : "raising"} ${formatCurrencyAbbr(Math.abs(userPolicy.budgetary_impact), userPolicy.country_id)}` : "; budgetary impact not yet simulated"}.
        </p>
        <p>
          {updatedStatusMessage}
        </p>
      </Card>
      </Link>
    );
}