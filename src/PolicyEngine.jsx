import Home from "./pages/Home";
import Research from "./pages/Research";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import Donate from "./pages/Donate";
import { useLocation } from "react-router-dom";
import BlogPage from "./pages/BlogPage";

import { useEffect, useState, lazy, Suspense } from "react";
import {
  apiCall,
  copySearchParams,
  countryApiCall,
  updateMetadata,
} from "./api/call";
import LoadingCentered from "./layout/LoadingCentered";
import ErrorPage from "./layout/Error";
import Header from "./layout/Header";
import Testimonials from "./pages/Testimonials";
import CalculatorInterstitial from "./pages/CalculatorInterstitial";
import CitizensEconomicCouncil from "./applets/CitizensEconomicCouncil";
import APIDocumentationPage from "./pages/APIDocumentationPage";
import CookieConsent from "./modals/CookieConsent";
import TrafwaCalculator from "./applets/TrafwaCalculator";
import AuthCallback from "./layout/AuthCallback";
import UserProfilePage from "./pages/UserProfilePage";
import PrivacyPage from "./pages/PrivacyPage";
import TACPage from "./pages/TermsAndConditions";
import { useAuth0 } from "@auth0/auth0-react";
import { ConfigProvider } from "antd";
import style from "./style";
import { StatusPage } from "./pages/StatusPage";

const PolicyPage = lazy(() => import("./pages/PolicyPage"));
const HouseholdPage = lazy(() => import("./pages/HouseholdPage"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function PolicyEngine({ pathname }) {
  const COUNTRIES = ["us", "uk", "ca", "ng", "il"];

  // First, check if the country is specified (.org/[country]/...)
  const path = pathname || window.location.pathname;
  const pathParts = path.split("/");
  let countryId = pathParts[1];

  if (!COUNTRIES.includes(countryId)) {
    // If the country is not specified, look up the country ID from the user's browser language
    const browserLanguage = navigator.language;
    countryId = {
      "en-US": "us",
      "en-GB": "uk",
      "en-CA": "ca",
      "en-NG": "ng",
      "en-IL": "il",
    }[browserLanguage];
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const householdId = searchParams.get("household");
  const defaultBaselinePolicy =
    countryId === "uk"
      ? 1
      : countryId === "us"
        ? 2
        : countryId === "ca"
          ? 3
          : countryId === "ng"
            ? 4
            : countryId === "il"
              ? 5
              : 1;
  const reformPolicyId = searchParams.get("reform") || defaultBaselinePolicy;
  const baselinePolicyId =
    searchParams.get("baseline") || defaultBaselinePolicy;

  const [metadata, setMetadata] = useState(null);
  const [error] = useState(null);

  const [baselinePolicy, setBaselinePolicy] = useState({
    id: baselinePolicyId,
    label: null,
    data: null,
  });
  const [reformPolicy, setReformPolicy] = useState({
    id: reformPolicyId,
    label: null,
    data: null,
  });
  const policy = {
    baseline: baselinePolicy,
    reform: reformPolicy,
  };

  const [hasShownHouseholdPopup, setHasShownHouseholdPopup] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  // Update the metadata state when something happens to the countryId (e.g. the user changes the country).
  useEffect(() => {
    try {
      updateMetadata(countryId, setMetadata);
    } catch (e) {
      // Sometimes this fails. When it does, refresh the page, but only once (use a param in the URL to make sure it only happens once).
      if (!searchParams.get("refreshed")) {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("refreshed", true);
        setSearchParams(newSearch);
        window.location.reload();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId]);

  // Get the baseline policy data when the baseline policy ID changes.
  useEffect(() => {
    if (metadata) {
      countryApiCall(countryId, `/policy/${baselinePolicyId}`)
        .then((res) => res.json())
        .then((dataHolder) => {
          if (dataHolder.result.label === "None") {
            dataHolder.result.label = null;
          }
          setBaselinePolicy({
            data: dataHolder.result.policy_json,
            label: dataHolder.result.label,
            id: baselinePolicyId,
          });
        });
    }
  }, [baselinePolicyId, countryId, metadata]);

  // Get the reform policy data when the reform policy ID changes.
  useEffect(() => {
    if (metadata) {
      countryApiCall(countryId, `/policy/${reformPolicyId}`)
        .then((res) => res.json())
        .then((dataHolder) => {
          if (dataHolder.result.label === "None") {
            dataHolder.result.label = null;
          }
          setReformPolicy({
            data: dataHolder.result.policy_json,
            label: dataHolder.result.label,
            id: reformPolicyId,
          });
        });
    }
  }, [countryId, reformPolicyId, metadata]);

  useEffect(() => {
    if (searchParams.get("renamed") && reformPolicyId) {
      countryApiCall(countryId, `/policy/${reformPolicyId}`)
        .then((res) => res.json())
        .then((dataHolder) => {
          setReformPolicy({
            data: dataHolder.result.policy_json,
            label: dataHolder.result.label,
            id: reformPolicyId,
          });
          let newSearch = copySearchParams(searchParams);
          newSearch.delete("renamed");
          setSearchParams(newSearch);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, searchParams.get("renamed")]);

  // When metadata exists and a user is logged in, fetch user profile
  const { isAuthenticated, user } = useAuth0();
  useEffect(() => {
    async function fetchUserProfile() {
      const USER_PROFILE_PATH = `/${countryId}/user_profile`;
      // Determine if user already exists in user profile db
      try {
        const resGet = await apiCall(
          USER_PROFILE_PATH + `?auth0_id=${user.sub}`,
        );
        const resGetJson = await resGet.json();

        if (resGet.status === 200) {
          return resGetJson.result;
        } else if (resGet.status === 404 && resGetJson.status === "ok") {
          // If not, create user first, then fetch user
          const body = {
            auth0_id: user.sub,
            primary_country: countryId,
            user_since: Date.now(),
          };
          const resPost = await apiCall(USER_PROFILE_PATH, body, "POST");
          const resPostJson = await resPost.json();
          if (resPost.status !== 201) {
            console.error(
              `Error while trying to create new user with auth0_id ${user.sub}`,
            );
            console.error(resPostJson);
            return;
          }
          return resPostJson.result;
        } else {
          console.error(
            `Error while attempting to fetch user profile for user ${user.sub}`,
          );
          console.error(resGetJson);
          return;
        }
      } catch (err) {
        console.error(
          `Connection error while attempting to fetch user profile for user ${user.sub}: ${err}`,
        );
        return;
      }
    }

    if (countryId && isAuthenticated && user?.sub) {
      fetchUserProfile().then((userProfile) => setUserProfile(userProfile));
    }
  }, [countryId, user?.sub, isAuthenticated]);

  const loadingPage = (
    <>
      <Header />
      <LoadingCentered />
    </>
  );

  const householdPage = (
    <Suspense fallback={loadingPage}>
      <Header />
      <HouseholdPage
        metadata={metadata}
        householdId={householdId}
        policy={policy}
        hasShownHouseholdPopup={hasShownHouseholdPopup}
        setHasShownHouseholdPopup={setHasShownHouseholdPopup}
      />
    </Suspense>
  );

  const errorPage = <ErrorPage />;

  const policyPage = (
    <Suspense fallback={loadingPage}>
      <Header />
      <PolicyPage
        metadata={metadata}
        householdId={householdId}
        policy={policy}
        userProfile={userProfile}
      />
    </Suspense>
  );

  // If the path is /, redirect to /[countryId]
  // If the path is /[countryId], render the homepage
  // If the path is /[countryId]/about, render the about page
  // If the path is /[countryId]/jobs, render the jobs page
  // If the path is /[countryId]/research, render the research page
  // If the path is not recognized, redirect to /[countryId]

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
          colorPrimary: style.colors.BLUE,
          fontFamily: "Roboto Serif",
        },
      }}
    >
      <ScrollToTop />
      <CookieConsent />
      <Routes>
        {/* Redirect from / to /[countryId] */}
        <Route path="/" element={<Navigate to={`/${countryId}`} />} />

        <Route path="/callback" element={<AuthCallback />} />
        <Route path="/:countryId" element={<Home />} />
        <Route path="/:countryId/about" element={<About />} />
        <Route path="/:countryId/jobs" element={<Jobs />} />
        <Route path="/:countryId/testimonials" element={<Testimonials />} />
        <Route
          path="/:countryId/calculator"
          element={<CalculatorInterstitial />}
        />
        <Route path="/:countryId/research" element={<Research />} />
        <Route path="/:countryId/donate" element={<Donate />} />
        <Route path="/:countryId/research/*" element={<BlogPage />} />
        <Route path="/:countryId/privacy" element={<PrivacyPage />} />
        <Route path="/:countryId/terms" element={<TACPage />} />

        <Route
          path="/:countryId/household/*"
          element={metadata ? householdPage : error ? errorPage : loadingPage}
        />
        <Route
          path="/:countryId/policy/*"
          element={metadata ? policyPage : error ? errorPage : loadingPage}
        />

        <Route
          path="/:countryId/profile"
          element={
            <Navigate to={`/${countryId}/profile/${userProfile.user_id}`} />
          }
        />
        <Route
          path="/:countryId/profile/:user_id"
          element={
            <UserProfilePage
              metadata={metadata}
              authedUserProfile={userProfile}
            />
          }
        />

        <Route
          path="/:countryId/api"
          element={<APIDocumentationPage metadata={metadata} />}
        />
        <Route path="/uk/cec" element={<CitizensEconomicCouncil />} />
        <Route path="/:countryId/api_status" element={<StatusPage />} />
        <Route
          path="/us/trafwa-ctc-calculator"
          element={<TrafwaCalculator />}
        />

        {/* redirect from /countryId/blog/slug to /countryId/research/slug */}
        <Route
          path="/:countryId/blog/:slug"
          element={<Navigate to={`/${countryId}/research/${pathParts[3]}`} />}
        />

        {/* Redirect for unrecognized paths */}
        <Route path="*" element={<Navigate to={`/${countryId}`} />} />
      </Routes>
    </ConfigProvider>
  );
}
