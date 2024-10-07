import React, { lazy, Suspense } from "react";
import { Navigate, Route, useParams } from "react-router-dom";
import RedirectToCountry from "./routing/RedirectToCountry";
import AuthCallback from "./layout/AuthCallback";
import CountryIdLayout from "./routing/CountryIdLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import Testimonials from "./pages/Testimonials";
import CalculatorInterstitial from "./pages/CalculatorInterstitial";
import SimulationsPage from "./pages/Simulations";
import Research from "./pages/Research";
import BlogPage from "./pages/BlogPage";
import Donate from "./pages/Donate";
import PrivacyPage from "./pages/PrivacyPage";
import TACPage from "./pages/TermsAndConditions";
import RedirectBlogPost from "./routing/RedirectBlogPost";
import CitizensEconomicCouncil from "./applets/CitizensEconomicCouncil";
import ManifestosComparison from "./applets/ManifestosComparison";
import { StatusPage } from "./pages/StatusPage";
import TrafwaCalculator from "./applets/TrafwaCalculator";
import StateEitcsCtcs from "./applets/StateEitcsCtcs";
import CTCComparison from "./applets/CTCComparison";

import Header from "./layout/Header";
import LoadingCentered from "./layout/LoadingCentered";
import ErrorPage from "./layout/ErrorPage";
import APIDocumentationPage from "./pages/APIDocumentationPage";
import UserProfilePage from "./pages/UserProfilePage";
import useMetadata from "./hooks/useMetadata";
import usePolicy from "./hooks/usePolicy";
import { extractCountryId } from "./pages/policy/output/utils";
import useUserProfile from "./hooks/useUserProfile";

const PolicyPage = lazy(() => import("./pages/PolicyPage"));
const HouseholdPage = lazy(() => import("./pages/HouseholdPage"));

const Routes = () => {
  const countryId = extractCountryId();

  

  return (
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
        <Route path="research" element={<Research />} />
        <Route path="research/:postName" element={<BlogPage />} />
        <Route path="donate" element={<Donate />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TACPage />} />

        <Route path="household/*" element={<HouseholdPageLayout />} />
        <Route path="policy/*" element={<PolicyPageLayout />} />

        <Route path="profile/:user_id" element={<UserProfileRoute />} />

        <Route path="api" element={<APIDocumentationPage />} />
        {/* redirect from /countryId/blog/slug to /countryId/research/slug */}
        <Route path="blog/:postName" element={<RedirectBlogPost />} />
      </Route>
      <Route path="/uk/cec" element={<CitizensEconomicCouncil />} />
      <Route path="/uk/2024-manifestos" element={<ManifestosComparison />} />
      <Route path="/:countryId/api_status" element={<StatusPage />} />
      <Route path="/us/trafwa-ctc-calculator" element={<TrafwaCalculator />} />
      <Route path="/us/state-eitcs-ctcs" element={<StateEitcsCtcs />} />
      <Route
        path="/us/child-tax-credit-2024-election-calculator"
        element={<CTCComparison />}
      />

      {/* Redirect for unrecognized paths */}
      <Route path="*" element={<Navigate to={`/${countryId}`} />} />
    </Routes>
  );
};

export default Routes;

export const LoadingPage = () => (
  <>
    <Header />
    <LoadingCentered />
  </>
);

const HouseholdPageLayout = () => {
  const {
    metadata,
    isMetadataLoading,
    metadataError,
    isMetadataError,
    isMetadataSuccess,
  } = useMetadata();
  const { policy } = usePolicy();
  if (isMetadataLoading) {
    return <LoadingPage />;
  }
  if (isMetadataError) {
    return <ErrorPage />;
  }

  return (
    <SuspenseLayout>
      <HouseholdPage metadata={metadata} policy={policy} />
    </SuspenseLayout>
  );
};

const PolicyPageLayout = () => {
  const {
    metadata,
    isMetadataLoading,
    metadataError,
    isMetadataError,
    isMetadataSuccess,
  } = useMetadata();
  const { policy } = usePolicy(isMetadataSuccess);
  if (isMetadataLoading) {
    return <LoadingPage />;
  }
  if (isMetadataError) {
    return <ErrorPage />;
  }
  return (
    <SuspenseLayout>
      <PolicyPage metadata={metadata} policy={policy} userProfile={null} />
    </SuspenseLayout>
  );
};

const SuspenseLayout = ({ children }) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Header />
      {children}
    </Suspense>
  );
};

const UserProfileRoute = () => {
  const { user_id, countryId } = useParams();
  // const countryId = extractCountryId();
  const { userProfile, isUserProfileLoading, isUserProfileError } =
    useUserProfile();

  // If userProfile doesn't exist, render ErrorPage
  if (isUserProfileError) {
    return <ErrorPage />;
  }
  if (isUserProfileLoading) {
    return <LoadingPage />;
  }

  // If user_id matches the authed user profile, render UserProfilePage
  if (userProfile && user_id === userProfile.user_id) {
    return <UserProfilePage authedUserProfile={userProfile} />;
  }

  // Otherwise, redirect to the correct profile path
  return <Navigate to={`/profile/${userProfile.user_id}`} />;
};
