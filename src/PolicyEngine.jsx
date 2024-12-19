import Home from "./pages/Home";
import Research from "./pages/Research";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import Donate from "./pages/Donate";
import { useLocation } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import { COUNTRY_BASELINE_POLICIES, COUNTRY_CODES } from "./data/countries";

import { useEffect, useState, lazy, Suspense } from "react";
import {
  apiCall,
  copySearchParams,
  countryApiCall,
  updateMetadata,
} from "./api/call";
import LoadingCentered from "./layout/LoadingCentered";
import ErrorPage from "./layout/ErrorPage";
import Header from "./layout/Header";
import Testimonials from "./pages/Testimonials";
import CalculatorInterstitial from "./pages/CalculatorInterstitial";
import CitizensEconomicCouncil from "./applets/CitizensEconomicCouncil";
import APIDocumentationPage from "./pages/APIDocumentationPage";
import SimulationsPage from "./pages/Simulations";
import CookieConsent from "./modals/CookieConsent";
import TrafwaCalculator from "./applets/TrafwaCalculator";
import StateEitcsCtcs from "./applets/StateEitcsCtcs";
import AuthCallback from "./layout/AuthCallback";
import UserProfilePage from "./pages/UserProfilePage";
import PrivacyPage from "./pages/PrivacyPage";
import TACPage from "./pages/TermsAndConditions";
import { useAuth0 } from "@auth0/auth0-react";
import { ConfigProvider } from "antd";
import style from "./style";
import RedirectToCountry from "./routing/RedirectToCountry";
import CountryIdLayout from "./routing/CountryIdLayout";
import RedirectBlogPost from "./routing/RedirectBlogPost";
import { StatusPage } from "./pages/StatusPage";
import ManifestosComparison from "./applets/ManifestosComparison";
import DeveloperLayout from "./pages/DeveloperLayout";
import DeveloperHome from "./pages/DeveloperHome";
import CTCComparison from "./applets/CTCComparison";
import CTCCalculator from "./applets/CTCCalculator";
import GiveCalc from "./applets/GiveCalc";
import { wrappedResponseJson } from "./data/wrappedJson";
import US2024ElectionCalculator from "./applets/US2024ElectionCalculator";
import SaltAMTCalculator from "./applets/SaltAMTCalculator";

const PolicyPage = lazy(() => import("./pages/PolicyPage"));
const HouseholdPage = lazy(() => import("./pages/HouseholdPage"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function PolicyEngine() {
  // This will either return the country ID or null,
  // but the page is guaranteed to redirect to an ID
  const countryId = extractCountryId();

  const [searchParams, setSearchParams] = useSearchParams();
  const householdId = searchParams.get("household");

  let defaultBaselinePolicy = 1;
  if (COUNTRY_CODES.includes(countryId)) {
    defaultBaselinePolicy = COUNTRY_BASELINE_POLICIES[countryId];
  }

  const reformPolicyId = searchParams.get("reform") || defaultBaselinePolicy;
  const baselinePolicyId =
    searchParams.get("baseline") || defaultBaselinePolicy;

  const [metadata, setMetadata] = useState(null);
  const [metadataError, setMetadataError] = useState(false);

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

  // Update the metadata state when something happens to
  // the countryId (e.g. the user changes the country).
  useEffect(() => {
    // If we're accessing the page without a country ID,
    // our router will handle redirecting to a country ID;
    // this process is guaranteed, thus we will just not fetch
    // in this situation
    if (!countryId) {
      return;
    }

    async function asyncUpdateMetadata() {
      try {
        const metadata = await updateMetadata(countryId);
        if (!metadata) {
          setMetadataError(true);
          setMetadata(null);
        } else {
          setMetadata(metadata);
          setMetadataError(false);
        }
      } catch (e) {
        console.error(e);
        setMetadataError(true);
        setMetadata(null);
      }
    }

    asyncUpdateMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId]);

  // Get the baseline policy data when the baseline policy ID changes.
  useEffect(() => {
    if (metadata) {
      countryApiCall(countryId, `/policy/${baselinePolicyId}`)
        .then((res) => wrappedResponseJson(res))
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
        .then((res) => wrappedResponseJson(res))
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
        .then((res) => wrappedResponseJson(res))
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
      const USER_PROFILE_PATH = `/${countryId}/user-profile`;
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
        <Route path="/" element={<RedirectToCountry />} />
        <Route path="/callback" element={<AuthCallback />} />
        <Route path="/:countryId" element={<CountryIdLayout />}>
          <Route index={true} element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="calculator" element={<CalculatorInterstitial />} />
          <Route path="simulations" element={<SimulationsPage />} />
          <Route path="developer-tools" element={<DeveloperLayout />}>
            <Route index element={<DeveloperHome />} />
            <Route path="simulations" element={<SimulationsPage />} />
            <Route path="api_status" element={<StatusPage />} />
          </Route>
          <Route path="research" element={<Outlet />}>
            <Route index={true} element={<Research />} />
            <Route path=":postName" element={<BlogPage />} />
          </Route>
          <Route path="donate" element={<Donate />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TACPage />} />

          <Route
            path="household/*"
            element={
              metadataError ? errorPage : metadata ? householdPage : loadingPage
            }
          />
          <Route
            path="policy/*"
            element={
              metadataError ? errorPage : metadata ? policyPage : loadingPage
            }
          />

          <Route
            path="profile"
            element={
              !userProfile ? (
                <ErrorPage />
              ) : (
                <Navigate to={`/${countryId}/profile/${userProfile.user_id}`} />
              )
            }
          />
          <Route
            path="profile/:user_id"
            element={
              <UserProfilePage
                metadata={metadata}
                authedUserProfile={userProfile}
                metadataError={metadataError}
              />
            }
          />

          <Route
            path="api"
            element={<APIDocumentationPage metadata={metadata} />}
          />
          {/* redirect from /countryId/blog/slug to /countryId/research/slug */}
          <Route path="blog/:postName" element={<RedirectBlogPost />} />
        </Route>
        <Route path="/uk/cec" element={<CitizensEconomicCouncil />} />
        <Route path="/uk/2024-manifestos" element={<ManifestosComparison />} />
        <Route
          path="/us/trafwa-ctc-calculator"
          element={<TrafwaCalculator />}
        />
        <Route path="/us/state-eitcs-ctcs" element={<StateEitcsCtcs />} />
        <Route
          path="/us/child-tax-credit-2024-election-calculator"
          element={<CTCComparison />}
        />
        <Route
          path="/us/child-tax-credit-calculator"
          element={<CTCCalculator />}
        />
        <Route path="/us/givecalc" element={<GiveCalc />} />
        <Route
          path="/us/2024-election-calculator"
          element={<US2024ElectionCalculator />}
        />
        <Route path="/us/salt-amt-calculator" element={<SaltAMTCalculator />} />

        {/* Redirect for unrecognized paths */}
        <Route path="*" element={<Navigate to={`/${countryId}`} />} />
      </Routes>
    </ConfigProvider>
  );
}

/**
 * Extracts country ID from path or returns null if one doesn't exist
 * @returns {String|null}
 */
function extractCountryId() {
  const path = window.location.pathname;
  const pathParts = path.split("/").filter((item) => item.length > 0);

  // If valid, return the normal country ID
  if (pathParts.length > 0 && COUNTRY_CODES.includes(pathParts[0])) {
    return pathParts[0];
  }
  // If we have an invalid ID (e.g., "undefined" or "garbage"),
  // the router will redirect to "us", so return that as country ID
  else if (pathParts.length > 0) {
    return "us";
  }
  // Otherwise, we're on the standard page; return null and allow
  // router to redirect
  else {
    return null;
  }
}
