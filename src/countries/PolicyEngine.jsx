import { createContext } from "react";
import blogPosts from "../blog";

export class PolicyEngine {
    /**
     * This class holds site-level logic and data. It is passed directly
     * to React components through the Context API, rather than being
     * passed down each level of the component tree as props. It is instantiated
     * once in the PolicyEngineCountry component's state.
     * 
     * This is essentially the 'brain' of the app.
     */
    country = null;
    region = null;

    householdId = null;
    policyId = null;
    reformPolicyId = null;

    household = null;
    policy = null;
    reformPolicy = null;

    parameters = null;
    variables = null;

    setState = null;

    debug = true;
    apiURL = null;
    initialised = false;

    countryRelevantBlogPosts = [];

    constructor(country) {
        if (this.debug) {
            this.apiURL = "http://127.0.0.1:5000";
        } else {
            this.apiURL = "https://api.policyengine.org";
        }

        this.countryRelevantBlogPosts = blogPosts
            .filter((post) => post.country === country | post.country === "global")
            .map((post) => {
                // Create a new URL for each blog post
                const url = new URL(`/${country}/blog/${post.key}`, window.location);
                // Set search parameters for the policy and reform policy
                if (post.reformPolicy) {
                    url.searchParams.set("reform", post.reformPolicy);
                }
                if (post.policy) {
                    url.searchParams.set("policy", post.policy);
                }
                post.url = url.pathname + url.search;
                return post;
            });
    }



    apiCall(endpoint) {
        return fetch(`${this.apiURL}${endpoint}`)
            .then(response => response.json());
    }

    countryApiCall(endpoint) {
        return this.apiCall(`/${this.country}${endpoint}`);
    }

    householdApiCall(endpoint) {
        return this.countryApiCall(`/household/${this.householdId}${endpoint}`);
    }

    householdUnderPolicyApiCall(endpoint) {
        return this.countryApiCall(`/household/${this.householdId}/${this.policyId}${endpoint}`);
    }

    householdUnderReformPolicyApiCall(endpoint) {
        return this.countryApiCall(`/household/${this.householdId}/${this.reformPolicyId}${endpoint}`);
    }

    initialise(setHolderState) {
        this.setState = (data, callback) => {
            setHolderState({state: Object.assign(this, data)});
        };
        const endpoints = [
            `/household/${this.householdId}`,
            `/policy/${this.policyId}`,
            `/policy/${this.reformPolicyId}`,
            "/parameters",
            "/variables",
        ];
        const keys = ["household", "policy", "reformPolicy", "parameters", "variables"];
        const promises = endpoints.map((endpoint) => this.countryApiCall(endpoint));
        return Promise.all(promises).then((data) => {
            const state = {};
            data.forEach((item, index) => {
                state[keys[index]] = item;
            });
            state.initialised = true;
            this.setState(state);
        });
    }

    setPolicy(policyId) {
        this.countryApiCall(`/policy/${policyId}`).then((policy) => {
            this.setState({policyId: policyId, policy: policy});
        });
    }

    navigateToPolicy(policyId) {
        // Add query parameter policy={...} to URL
        const url = new URL(window.location);
        url.searchParams.set("policy", policyId);
        window.history.pushState({}, "", url);
    }

    setReformPolicy(reformPolicyId) {
        this.countryApiCall(`/policy/${reformPolicyId}`).then((reformPolicy) => {
            this.setState({reformPolicyId: reformPolicyId, reformPolicy: reformPolicy});
        });
    }

    navigateToReformPolicy(reformPolicyId) {
        // Add query parameter reformPolicy={...} to URL
        const url = new URL(window.location);
        url.searchParams.set("reform", reformPolicyId);
        window.history.pushState({}, "", url);
    }

    getCountryLink(path) {
        return `/${this.country}${path}`;
    }

}

const PolicyEngineContext = createContext(null);

export default PolicyEngineContext;