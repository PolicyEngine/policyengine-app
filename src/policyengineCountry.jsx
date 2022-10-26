import Header from "./layout/header"
import {
    Routes,
    Route,
} from "react-router-dom";
import HouseholdEditPage from "./pages/household_edit";
import HomePage from "./pages/home";
import PolicyPage from "./pages/policy";
import HouseholdPage from "./pages/household";
import EconomyPage from "./pages/economy";
import { useState } from "react";
import PolicyEngineContext from "./countries/PolicyEngine";
import PolicyEngineUK from "./countries/PolicyEngineUK";
import PolicyEngineUS from "./countries/PolicyEngineUS";
import PostPage from "./pages/post";

export default function PolicyEngineCountry(props) {
    const [PolicyEngine, setPolicyEngineState] = useState({
        state: (props.country === "us" ? 
            new PolicyEngineUS() : 
            new PolicyEngineUK())
    });


    if (!PolicyEngine.state.initialised) {
        PolicyEngine.state.initialise(setPolicyEngineState);
    }

    const blogPostPages = PolicyEngine.state.countryRelevantBlogPosts.map((blogPost) => (
        <Route key={blogPost.url} path={"/blog/" + blogPost.url} element={<PostPage post={blogPost} />} />
    ));

    return <PolicyEngineContext.Provider value={PolicyEngine.state}>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/household/edit" element={<HouseholdEditPage />} />
            <Route path="/household" element={<HouseholdPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/economy" element={<EconomyPage />} />
            {blogPostPages}
        </Routes>
    </PolicyEngineContext.Provider>
}