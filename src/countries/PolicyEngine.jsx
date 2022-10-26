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

        this.countryRelevantBlogPosts = blogPosts.filter((post) => post.country === country | post.country === "global");
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
            setHolderState({state: Object.assign(this, data)}, callback);
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

    getCountryLink(path) {
        return `/${this.country}${path}`;
    }

}

const PolicyEngineContext = createContext(null);

export default PolicyEngineContext;