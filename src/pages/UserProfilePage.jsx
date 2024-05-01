import Footer from "../layout/Footer";
import Header from "../redesign/components/Header";
import Helmet from "react-helmet";
import Section from "../redesign/components/Section";
import PageHeader from "../redesign/components/PageHeader";
import style from "../redesign/style";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  LoadingOutlined,
  FileImageOutlined,
  UserOutlined,
  EditOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useDisplayCategory } from "../layout/Responsive";
import { Card, Input, Skeleton, Tooltip } from "antd";
import { useWindowWidth } from "../hooks/useWindow";
import { apiCall } from "../api/call";
import { useEffect, useState } from "react";
import useCountryId from "../hooks/useCountryId";
import useLocalStorage from "../hooks/useLocalStorage";
import { postUserPolicy, cullOldPolicies } from "../api/userPolicies";
import { countryNames } from "../data/countries";
import moment from "moment";
import { formatCurrencyAbbr } from "../lang/format";

const STATES = {
  EMPTY: "empty",
  NO_PROFILE: "noProfile",
  OTHER_PROFILE: "otherProfile",
  OWN_PROFILE: "ownProfile",
};

export default function UserProfilePage(props) {
  // This component has three possible display states, saved as the stateful
  // variable dispState:
  // * empty - display profile as if no data has yet been loaded
  // * noProfile - display profile as if fetched user was not found
  // * otherProfile - display profile as if fetched user is not logged in user
  // * ownProfile - display profile as if fetched user is logged in user

  // Most of the time, isOwnProfile below aligns with ownProfile dispState,
  // except when user wants to view their public-facing profile, in which case
  // dispState is set to otherProfile, but isOwnProfile remains true

  // Loading is treated separately, through two stateful variables, as
  // two different parts of the component fetch data separately

  // To disambiguate, this component uses two user profiles:
  // authedUserProfile, representing the authenticated user navigating
  // the site, and accessedUserProfile, the profile the site user is
  // visiting. authedUserProfile is shared via props, as the entire
  // app has access to this info, while accessedUserProfile requires a fetch

  const { metadata, authedUserProfile } = props;
  let params = useParams();
  const accessedUserId = params.user_id;
  const isOwnProfile =
    Number(authedUserProfile?.user_id) === Number(accessedUserId);

  const [dispState, setDispState] = useState(STATES.EMPTY);
  const [isHeaderLoading, setIsHeaderLoading] = useState(true);
  const [arePoliciesLoading, setArePoliciesLoading] = useState(true);
  const [accessedUserPolicies, setAccessedUserPolicies] = useState([]);
  const [accessedUserProfile, setAccessedUserProfile] = useState({});
  const [savedPolicies, setSavedPolicies] = useLocalStorage(
    "saved-policies",
    [],
  );
  const countryId = useCountryId();
  const windowWidth = useWindowWidth();
  const dispCat = useDisplayCategory();

  const maxCardWidth = 375; // Max card width (relative to screen, so not exact), in pixels
  const gridColumns =
    dispCat === "mobile" ? 1 : Math.floor(windowWidth / maxCardWidth);

  useEffect(() => {
    async function fetchProfile() {
      setIsHeaderLoading(true);
      if (metadata) {
        try {
          const data = await apiCall(
            `/${countryId}/user_profile?user_id=${accessedUserId}`,
          );
          const dataJson = await data.json();
          if (data.status === 404 && dataJson.status === "ok") {
            setAccessedUserProfile({});
            setDispState(STATES.NO_PROFILE);
          }
          if (data.status < 200 || data.status >= 300) {
            console.error("Error while fetching accessed user profile");
            console.error(dataJson);
            setAccessedUserProfile({});
          } else {
            setAccessedUserProfile(dataJson.result);
            setDispState(STATES.OTHER_PROFILE);
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
      setDispState(STATES.OWN_PROFILE);
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
            `/${countryId}/user_policy/${accessedUserId}`,
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
          user_id: authedUserProfile.user_id,
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

    if (countryId) {
      // Would use async/await, but not possible in useEffect body
      if (isOwnProfile && authedUserProfile?.user_id) {
        emitPreAuthPolicies().then(() => fetchAccessedPolicies());
      } else {
        fetchAccessedPolicies();
      }
    }
    // ESLint wants to monitor savedPolicies and setSavedPolicies, but these
    // are themselves a hook, with setSavedPolicies being a setter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, authedUserProfile, isOwnProfile, accessedUserId, metadata]);

  const dateFormatter = new Intl.DateTimeFormat(`en-${countryId}`, {
    dateStyle: "long",
  });

  const loadingCards = Array(4).fill(<Card loading={true} />);

  const noCardPlaceholder = (
    <p style={{ gridColumn: "1 / -1" }}>
      {dispState === STATES.NO_PROFILE
        ? "User not found"
        : `${dispState === STATES.OWN_PROFILE ? "You have" : "This user has"} no saved policy simulations.`}
    </p>
  );

  const accessedUserPolicyCards = accessedUserPolicies.map(
    (userPolicy, index) => {
      // This returns a React key error, but I see no way of fixing this (short of
      // returning empty JSX, which seems illogical), and React doesn't need the keys
      // to maintain the list anyway, since the list is empty
      if (!metadata) return null;

      return (
        <PolicySimulationCard
          metadata={metadata}
          userPolicy={userPolicy}
          key={`${index}-${userPolicy.id}`}
          keyValue={`${index}-${userPolicy.id}`}
          dateFormatter={dateFormatter}
        />
      );
    },
  );

  let sectionTitle = "Saved policy simulations";
  if (dispState === STATES.OWN_PROFILE) {
    sectionTitle = "My saved policy simulations";
  } else if (
    dispState === STATES.OTHER_PROFILE &&
    accessedUserProfile.username
  ) {
    sectionTitle = `${accessedUserProfile.username}'s saved policy simulations`;
  } else if (dispState === STATES.OTHER_PROFILE) {
    sectionTitle = `User #${accessedUserProfile.user_id}'s saved policy simulations`;
  }

  let title = "Profile | PolicyEngine";
  if (
    (dispState === STATES.OWN_PROFILE || dispState === STATES.OTHER_PROFILE) &&
    accessedUserProfile.username
  ) {
    title = `${accessedUserProfile.username}'s Profile | PolicyEngine`;
  } else if (
    dispState === STATES.OWN_PROFILE ||
    dispState === STATES.OTHER_PROFILE
  ) {
    title = `User #${accessedUserProfile.user_id}'s Profile | PolicyEngine`;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div>
        <Header />
        <PageHeader title="Profile" backgroundColor={style.colors.BLUE_98}>
          <UserProfileSection
            accessedUserProfile={accessedUserProfile}
            isOwnProfile={isOwnProfile}
            accessedUserId={accessedUserId}
            dispState={dispState}
            isHeaderLoading={isHeaderLoading}
            dateFormatter={dateFormatter}
            setAccessedUserProfile={setAccessedUserProfile}
            setDispState={setDispState}
          />
        </PageHeader>
        <Section title={sectionTitle} backgroundColor={style.colors.BLUE_98}>
          <div
            style={{
              display: "grid",
              width: "100%",
              gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
              gap: "12px",
              marginTop: 20,
            }}
          >
            {arePoliciesLoading
              ? loadingCards
              : accessedUserPolicies.length === 0
                ? noCardPlaceholder
                : accessedUserPolicyCards}
          </div>
        </Section>
        <Footer />
      </div>
    </>
  );
}

function UserProfileSection(props) {
  const {
    accessedUserProfile,
    isOwnProfile,
    accessedUserId,
    dispState,
    isHeaderLoading,
    dateFormatter,
    setAccessedUserProfile,
    setDispState,
  } = props;
  const { isAuthenticated, user } = useAuth0();
  const countryId = useCountryId();
  const displayCategory = useDisplayCategory();

  let dispUserSince = "";
  if (dispState === STATES.NO_PROFILE) {
    dispUserSince = "No user found";
  } else if (dispState === STATES.EMPTY) {
    dispUserSince = "Loading";
  } else {
    dispUserSince = dateFormatter.format(accessedUserProfile.user_since);
  }

  let dispCountry = "";
  if (dispState === STATES.NO_PROFILE) {
    dispCountry = "No user found";
  } else if (dispState === STATES.EMPTY) {
    dispCountry = "Loading";
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
        gap: "20px",
      }}
    >
      {dispState === STATES.OWN_PROFILE &&
      isAuthenticated &&
      user &&
      user.picture ? (
        <img
          src={user.picture}
          alt="Profile"
          style={{
            height: "100px",
            objectFit: "cover",
            alignSelf: "center",
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
            color: style.colors.DARK_GRAY,
            alignSelf: "center",
          }}
        >
          {isHeaderLoading ? (
            <LoadingOutlined
              style={{
                fontSize: "32px",
              }}
            />
          ) : dispState === STATES.OTHER_PROFILE ? (
            <UserOutlined
              style={{
                fontSize: "32px",
              }}
            />
          ) : (
            <FileImageOutlined
              style={{
                fontSize: "32px",
              }}
            />
          )}
        </div>
      )}
      <Skeleton loading={isHeaderLoading} title={false} paragraph={{ rows: 3 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "max-content 1fr",
            gridColumnGap: "20px",
          }}
        >
          {dispState === STATES.OWN_PROFILE && (
            <>
              <p style={{ fontWeight: 500, margin: 0 }}>Name</p>
              <p style={{ margin: 0 }}>
                {user ? user.name : "Error: No user logged in"}
              </p>
              <p style={{ fontWeight: 500, margin: 0 }}>Email</p>
              <p style={{ margin: 0 }}>
                {user ? user.email : "Error: No user logged in"}
              </p>
            </>
          )}
          <p style={{ fontWeight: 500, margin: 0 }}>User ID</p>
          <p style={{ margin: 0 }}>{accessedUserId}</p>
          <p style={{ fontWeight: 500, margin: 0 }}>Username</p>
          <UsernameDisplayAndEditor
            dispState={dispState}
            accessedUserProfile={accessedUserProfile}
            countryId={countryId}
            setAccessedUserProfile={setAccessedUserProfile}
          />
          <p style={{ fontWeight: 500, margin: 0 }}>User since</p>
          <p style={{ margin: 0 }}>{dispUserSince}</p>
          <p style={{ fontWeight: 500, margin: 0 }}>Primary country</p>
          <p style={{ margin: 0 }}>{dispCountry}</p>
          {isOwnProfile && (
            <PublicPrivateSwitch
              dispState={dispState}
              setDispState={setDispState}
            />
          )}
        </div>
      </Skeleton>
    </div>
  );
}

function PolicySimulationCard(props) {
  const { metadata, userPolicy, keyValue } = props;

  const CURRENT_API_VERSION = metadata?.version;
  const geography =
    metadata.economy_options.region.filter(
      (region) => region.name === userPolicy.geography,
    )[0].label || "Unknown";

  const apiVersion = userPolicy.api_version;
  const dateAdded = userPolicy.added_date;
  const dateLastUpdated = userPolicy.updated_date;

  let dateMessage = null;
  let apiVersionMessage = null;
  if (dateAdded === dateLastUpdated) {
    dateMessage = (
      <span>First simulated {`${moment(dateAdded).fromNow()}`}</span>
    );
  } else {
    dateMessage = (
      <span>Last updated {`${moment(dateLastUpdated).fromNow()}`}</span>
    );
  }

  if (apiVersion === CURRENT_API_VERSION) {
    apiVersionMessage = <span>(reflects latest model updates)</span>;
  } else {
    apiVersionMessage = (
      <span>
        (reflects outdated model version{" "}
        <span style={{ fontWeight: 500 }}>{`${apiVersion}`}</span>, click to
        update).
      </span>
    );
  }

  return (
    <Link
      key={keyValue}
      to={`/${userPolicy.country_id}/policy?focus=policyOutput.policyBreakdown&reform=${userPolicy.reform_id}&baseline=${userPolicy.baseline_id}&timePeriod=${userPolicy.year}&region=${userPolicy.geography}`}
      style={{ height: "100%" }}
    >
      <Card
        style={{
          width: "100%",
          minWidth: 0,
          height: "100%",
        }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          height: "100%",
          backgroundColor:
            userPolicy.api_version < CURRENT_API_VERSION &&
            style.colors.LIGHT_GRAY,
        }}
        hoverable={true}
        key={keyValue}
      >
        <h6
          style={{
            fontSize: "1.2rem",
            fontFamily: "Roboto Serif",
            marginBottom: "16px",
            fontWeight: 500,
          }}
        >
          {userPolicy.reform_label || `Policy #${userPolicy.reform_id}`}
        </h6>
        <p>
          Simulated in{" "}
          <span style={{ fontWeight: 500 }}>{userPolicy.year}</span> over{" "}
          <span style={{ fontWeight: 500 }}>{geography}</span> against{" "}
          <span style={{ fontWeight: 500 }}>{userPolicy.baseline_label}</span>.
        </p>
        <p>
          <span style={{ fontWeight: 500 }}>
            {userPolicy.number_of_provisions}
          </span>{" "}
          provision{userPolicy.number_of_provisions === 1 ? "" : "s"},{" "}
          {userPolicy.budgetary_impact < 0
            ? "costing "
            : userPolicy.budgetary_impact > 0
              ? "raising "
              : " "}
          <span style={{ fontWeight: 500 }}>
            {userPolicy.budgetary_impact
              ? `${formatCurrencyAbbr(Math.abs(userPolicy.budgetary_impact), userPolicy.country_id)}`
              : "budgetary impact not yet simulated"}
          </span>
          .
        </p>
        <p>
          {dateMessage} {apiVersionMessage}
        </p>
      </Card>
    </Link>
  );
}

function UsernameDisplayAndEditor(props) {
  const { dispState, accessedUserProfile, countryId, setAccessedUserProfile } =
    props;

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");

  function handleClick() {
    setIsEditing((prev) => !prev);
  }

  async function handleSubmit() {
    const USER_PROFILE_PATH = `/${countryId}/user_profile`;
    const body = {
      user_id: accessedUserProfile.user_id,
      username: value,
    };

    try {
      const res = await apiCall(USER_PROFILE_PATH, body, "PUT");
      const resJson = await res.json();
      if (resJson.status === "ok") {
        const data = await apiCall(
          `/${countryId}/user_profile?user_id=${accessedUserProfile.user_id}`,
        );
        const dataJson = await data.json();
        if (data.status === 404 && dataJson.status === "ok") {
          setAccessedUserProfile({});
        }
        if (data.status < 200 || data.status >= 300) {
          console.error("Error while fetching accessed user profile");
          console.error(dataJson);
          setAccessedUserProfile({});
        } else {
          setAccessedUserProfile(dataJson.result);
        }
        setIsEditing(false);
      } else {
        console.error("Error while attempting to update username");
      }
    } catch (err) {
      console.error(`Error while attempting to update username: ${err}`);
    }
  }

  function handleUpdate(e) {
    setValue(e.target.value);
  }

  let dispUsername = "";
  if (dispState === STATES.NO_PROFILE) {
    dispUsername = "No user found";
  } else if (dispState === STATES.EMPTY) {
    dispUsername = "Loading";
  } else if (accessedUserProfile.username) {
    dispUsername = accessedUserProfile.username;
  } else {
    dispUsername = "None created";
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
      }}
    >
      {isEditing ? (
        <>
          <Input
            defaultValue={accessedUserProfile.username}
            size="small"
            onPressEnter={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsEditing(false);
              }
            }}
            onChange={handleUpdate}
            style={{
              height: "1.3rem",
              borderRadius: 0,
            }}
          />
          <Tooltip title="Submit changes">
            <CheckOutlined
              onClick={handleSubmit}
              style={{ color: style.colors.DARK_GRAY }}
            />
          </Tooltip>
        </>
      ) : (
        <p style={{ margin: 0 }}>{dispUsername}</p>
      )}
      {dispState === STATES.OWN_PROFILE &&
        (isEditing ? (
          <Tooltip title="Cancel">
            <CloseOutlined
              onClick={handleClick}
              style={{ color: style.colors.DARK_GRAY }}
            />
          </Tooltip>
        ) : (
          <EditOutlined
            onClick={handleClick}
            style={{
              color: style.colors.DARK_GRAY,
            }}
          />
        ))}
    </div>
  );
}

function PublicPrivateSwitch(props) {
  const { dispState, setDispState } = props;

  function handleClick() {
    setDispState((prev) => {
      if (prev === STATES.OWN_PROFILE) {
        return STATES.OTHER_PROFILE;
      } else if (prev === STATES.OTHER_PROFILE) {
        return STATES.OWN_PROFILE;
      } else {
        console.error(
          "Error within PublicPrivateSwitch's click handler function",
        );
        return prev;
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: "transparent",
        border: 0,
        padding: 0,
        display: "inline",
        appearance: "none",
        color: style.colors.BLUE_PRIMARY,
        gridColumn: "1 / -1",
        width: "max-content",
        marginTop: 5,
      }}
    >
      <p
        style={{
          marginBottom: 0,
          textDecorationLine: "underline",
          textDecorationColor: style.colors.BLUE_PRIMARY,
        }}
      >
        {dispState === STATES.OWN_PROFILE
          ? "View public profile"
          : dispState === STATES.OTHER_PROFILE
            ? "View private profile"
            : ""}
      </p>
    </button>
  );
}
