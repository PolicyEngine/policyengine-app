import Header from "./pages/header"
import {
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import HouseholdEditPage from "./pages/householdEdit";
import HomePage from "./pages/home";
import PolicyPage from "./pages/policy";
import HouseholdPage from "./pages/household";
import EconomyPage from "./pages/economy";
import { useState } from "react";
import PolicyEngineContext from "./countries/PolicyEngine";
import PolicyEngineUK from "./countries/PolicyEngineUK";
import PolicyEngineUS from "./countries/PolicyEngineUS";
import PostPage from "./pages/post";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";

export default function PolicyEngineCountry(props) {
    const [PolicyEngine, setPolicyEngineState] = useState({
        state: (props.country === "us" ? 
            new PolicyEngineUS() : 
            new PolicyEngineUK())
    });

    const location = useLocation();
    const search = new URLSearchParams(location.search);

    let searchParamsToAdd = {};
    // Get policy ID if present in query parameters under policy=...
    const policyId = search.get("policy");
    if (policyId && (policyId !== PolicyEngine.state.policyId)) {
        PolicyEngine.state.setPolicy(policyId);
    } else if (!policyId) {
        searchParamsToAdd["policy"] = PolicyEngine.state.policyId;
    }

    const reformPolicyId = search.get("reform");
    if (reformPolicyId && (reformPolicyId !== PolicyEngine.state.reformPolicyId)) {
        PolicyEngine.state.setReformPolicy(reformPolicyId);
    } else if (!reformPolicyId) {
        searchParamsToAdd["reform"] = PolicyEngine.state.reformPolicyId;
    }

    // If policy and/or reform policy are not in the URL, add them.

    if (Object.keys(searchParamsToAdd).length > 0) {
        const url = new URL(window.location);
        Object.keys(searchParamsToAdd).forEach((key) => {
            url.searchParams.set(key, searchParamsToAdd[key]);
        });
        window.history.replaceState({}, "", url);
    }

    // Finally, sort search parameters alphabetically
    const url = new URL(window.location);
    const searchParams = new URLSearchParams(url.search);
    const sortedSearchParams = new URLSearchParams();
    Array.from(searchParams.keys()).sort().forEach((key) => {
        sortedSearchParams.set(key, searchParams.get(key));
    });
    url.search = sortedSearchParams.toString();
    window.history.replaceState({}, "", url);

    if (!PolicyEngine.state.initialised) {
        PolicyEngine.state.initialise(setPolicyEngineState);
    }

    const blogPostPages = PolicyEngine.state.countryRelevantBlogPosts.map((blogPost) => {
        let url = blogPost.url.replace(`/${props.country}`, "");
        // Remove search parameters from url
        url = url.split("?")[0];
        return <Route key={blogPost.url} path={url} element={<PostPage post={blogPost} />} />
    });

    return <PolicyEngineContext.Provider value={PolicyEngine.state}>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/household/edit" element={<HouseholdEditPage />} />
            <Route path="/household" element={<HouseholdPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/economy" element={<EconomyPage />} />
            {blogPostPages}
        </Routes>
    </PolicyEngineContext.Provider>
}