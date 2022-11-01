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

    householdNeedsSaving = false; // After a household is edited, this flag is set to true to indicate that the household stored on PolicyEngine's servers is outdated compared to the new locally-defined household.
    householdUnderPolicyCache = {};

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
            "/entities",
        ];
        const keys = ["household", "policy", "reformPolicy", "parameters", "variables", "entities"];
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
        // Add current query parameters to URL
        return `/${this.country}${path}${window.location.search}`;
    }

    setHouseholdData(householdData) {
        let newHousehold = JSON.parse(JSON.stringify(this.household));
        newHousehold.household = householdData;
        this.setState({household: newHousehold, householdNeedsSaving: true});
    }

    setHouseholdVariableValue(variableName, entityName, timePeriod, value) {
        let newHousehold = JSON.parse(JSON.stringify(this.household));
        const entityPlural = this.entities[this.variables[variableName].entity].plural;
        newHousehold.household[entityPlural][entityName][variableName][timePeriod] = value;
        this.setState({household: newHousehold, householdNeedsSaving: true});
    }

    saveHousehold() {
        // Save the household to the server
        fetch(`${this.apiURL}/${this.country}/household`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.household.household),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            this.countryApiCall(`/household/${data.household_id}`).then((household) => {
                this.setState({householdId: data.household_id, household: household, householdNeedsSaving: false});
        })});
    }

    getHouseholdUnderPolicy(policyId) {
        return this.countryApiCall(`/household/${this.householdId}/${policyId}`)
            .then((household) => {
                this.householdUnderPolicyCache[policyId] = household;
                return household;
            });
    }

}

const PolicyEngineContext = createContext(null);

export default PolicyEngineContext;