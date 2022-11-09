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

  householdNeedsSaving = true; // After a household is edited, this flag is set to true to indicate that the household stored on PolicyEngine's servers is outdated compared to the new locally-defined household.
  householdUnderPolicyCache = {};
  householdUnderAxesPolicyCache = {};

  countryRelevantBlogPosts = [];
  pageTreeParentChildRelations = {};

  constructor(country) {
    if (this.debug) {
      this.apiURL = "http://127.0.0.1:5000";
    } else {
      this.apiURL = "https://api.policyengine.org";
    }

    this.countryRelevantBlogPosts = blogPosts
      .filter(
        (post) => (post.country === country) | (post.country === "global")
      )
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
    return fetch(`${this.apiURL}${endpoint}`).then((response) =>
      response.json()
    );
  }

  countryApiCall(endpoint) {
    return this.apiCall(`/${this.country}${endpoint}`);
  }

  householdApiCall(endpoint) {
    return this.countryApiCall(`/household/${this.householdId}${endpoint}`);
  }

  householdUnderPolicyApiCall(endpoint) {
    return this.countryApiCall(
      `/household/${this.householdId}/${this.policyId}${endpoint}`
    );
  }

  householdUnderReformPolicyApiCall(endpoint) {
    return this.countryApiCall(
      `/household/${this.householdId}/${this.reformPolicyId}${endpoint}`
    );
  }

  initialise(setHolderState) {
    this.setState = (data, callback) => {
      setHolderState({ state: Object.assign(this, data) });
    };
    const endpoints = [
      this.householdId ? `/household/${this.householdId}` : null,
      this.policyId ? `/policy/${this.policyId}` : null,
      this.reformPolicyId ? `/policy/${this.reformPolicyId}` : null,
      "/metadata",
    ].filter((endpoint) => endpoint !== null);
    const keys = [
      this.householdId ? "household" : null,
      this.policyId ? "policy" : null,
      this.reformPolicyId ? "reformPolicy" : null,
      "metadata",
    ].filter((key) => key !== null);
    const promises = endpoints.map((endpoint) => this.countryApiCall(endpoint));
    return Promise.all(promises).then((data) => {
      const state = {};
      data.forEach((item, index) => {
        state[keys[index]] = item;
      });
      state.parameters = state.metadata.parameters;
      state.variables = state.metadata.variables;
      state.entities = state.metadata.entities;
      state.variableModules = state.metadata.variableModules;
      state.variableModuleTree = this.getVariableModuleTree(state.variableModules);
      state.initialised = true;
      if (!this.householdId) {
        state.household = {
          country_id: this.country,
          household: this.getDefaultHousehold(state.variables),
          label: "Default household",
        };
      }
      if (!this.policy) {
        state.policy = {
          country_id: this.country,
          label: "Current law",
          policy: [],
        };
        state.policyId = "current-law";
      }
      if (!this.reformPolicy) {
        state.reformPolicy = JSON.parse(JSON.stringify(state.policy));
        state.reformPolicyId = "current-law";
      }
      this.setState(state);
    });
  }

  setPolicy(policyId) {
    this.countryApiCall(`/policy/${policyId}`).then((policy) => {
      this.setState({ policyId: policyId, policy: policy });
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
      this.setState({
        reformPolicyId: reformPolicyId,
        reformPolicy: reformPolicy,
      });
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
    this.setState({ household: newHousehold, householdNeedsSaving: true });
  }

  setHouseholdVariableValue(variableName, entityName, timePeriod, value) {
    let newHousehold = JSON.parse(JSON.stringify(this.household));
    const entityPlural =
      this.entities[this.variables[variableName].entity].plural;
    newHousehold.household[entityPlural][entityName][variableName][timePeriod] =
      value;
    this.setState({ household: newHousehold, householdNeedsSaving: true });
  }

  saveHousehold() {
    // Save the household to the server
    return fetch(`${this.apiURL}/${this.country}/household${this.householdId ? '/' + this.householdId : ''}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.household.household),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        this.countryApiCall(`/household/${data.household_id}`).then(
          (household) => {
            this.setState({
              householdId: data.household_id,
              householdUnderPolicyCache: {},
              householdUnderAxesPolicyCache: {},
              household: household,
              householdNeedsSaving: false,
            });
          }
        );
      });
  }

  getHouseholdUnderPolicy(policyId) {
    if (this.householdNeedsSaving) {
      return {};
    }
    if (this.householdUnderPolicyCache[policyId]) {
        return this.householdUnderPolicyCache[policyId];
    };
    this.householdUnderPolicyCache[policyId] = {};
    this.setState({ householdUnderPolicyCache: this.householdUnderPolicyCache });
    return this.countryApiCall(
      `/household/${this.householdId}/${policyId}`
    ).then((household) => {
      this.householdUnderPolicyCache[policyId] = household;
      return household;
    });
  }

  getHouseholdUnderAxesPolicy(policyId, variable, period, min, max, count) {
    if (this.householdNeedsSaving) {
      return {};
    }
    const key = `${policyId}-${variable}-${period}-${min}-${max}-${count}`;
    if (this.householdUnderAxesPolicyCache[key]) {
        return this.householdUnderAxesPolicyCache[key];
    };
    this.householdUnderAxesPolicyCache[key] = {};
    this.setState({ householdUnderAxesPolicyCache: this.householdUnderAxesPolicyCache });
    fetch(`${this.apiURL}/${this.country}/household/${this.householdId}/${policyId}?axis_variable=${variable}&axis_period=${period}&axis_min=${min}&axis_max=${max}&axis_count=${count}`, {
        method: "GET",
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((household) => {
        this.householdUnderAxesPolicyCache[key] = household;
        this.setState({ householdUnderAxesPolicyCache: this.householdUnderAxesPolicyCache });
        return household;
    });
    return {};
  }

  getVariableModuleTree(variableModules) {
    let variableNode = {children: []}

    for (let [key, value] of Object.entries(variableModules)) {
        let path = key.split(".");
        let current = variableNode;
        for (let i = 0; i < path.length; i++) {
            let found = false;
            for (let j = 0; j < current.children.length; j++) {
                if (current.children[j].key === path[i]) {
                    current = current.children[j];
                    found = true;
                    break;
                }
            }
            if (!found) {
                let newChild = {
                    title: value.title,
                    subtitle: value.description,
                    key: key,
                    children: [],
                }
                current.children.push(newChild);
                current = newChild;
            }
        }
    }

    return variableNode.children.filter((child) => child.key === "input");
  }

  getHouseholdValue(variableName, timePeriod, entityName, policyId) {
    if (Array.isArray(variableName)) {
      if (variableName.length === 0) {
        return null;
      }
      let sum = 0;
      for (let i = 0; i < variableName.length; i++) {
        sum += this.getHouseholdValue(
          variableName[i],
          timePeriod,
          entityName,
          policyId
        );
      }
      return sum;
    }
    if (policyId == null) {
      policyId = this.policyId;
    }
    const cache = this.householdUnderPolicyCache[policyId];
    if (cache == null) {
      return null;
    }

    const entityPlural = this.entities[this.variables[variableName].entity].plural;

    if (!cache[entityPlural]) {
      return null;
    }

    if (entityName == null) {
      const possibleEntities = Object.keys(cache[entityPlural]);
      let sum = 0;
      for (let i = 0; i < possibleEntities.length; i++) {
        sum += this.getHouseholdValue(variableName, timePeriod, possibleEntities[i], policyId);
      }
      return sum;
    }

    if (!cache[entityPlural][entityName] || !cache[entityPlural][entityName][variableName]) {
      return null;
    }

    if (timePeriod == null) {
      const possibleTimePeriods = Object.keys(cache[entityPlural][entityName][variableName]);
      let sum = 0;
      for (let i = 0; i < possibleTimePeriods.length; i++) {
        sum += this.getHouseholdValue(variableName, possibleTimePeriods[i], entityName, policyId);
      }
      return sum;
    }

    return cache[entityPlural][entityName][variableName][timePeriod];

  }

  getFormattedHouseholdValue(variableName, timePeriod, entityName, policyId) {
    const value = this.getHouseholdValue(variableName, timePeriod, entityName, policyId);
    if (value == null) {
      return null;
    }
    // If variableName is an array, use the first to decide on formatting.
    if (Array.isArray(variableName)) {
      variableName = variableName[0];
    }
    return this.formatValue(variableName, value);
  }

  formatValue(variableName, value) {
    const variable = this.variables[variableName];
    let formatter;
    if (variable.unit === "currency-GBP") {
      formatter = new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "GBP",
      });
      return formatter.format(value);
    } else if (variable.unit === "currency-USD") {
      formatter = new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "GBP",
      });
      return formatter.format(value);
    }
  }

  formatListOfVariables(variableNames, typeName, typeNamePlural) {
    // Format a list of variable names, e.g.:
    // ["income_tax", "national_insurance", "council_tax"] -> "Income Tax, National Insurance and 1 other tax"
    // ["income_tax", "national_insurance"] -> "Income Tax and National Insurance"
    // ["income_tax", "national_insurance", "council_tax", "vat"] -> "Income Tax, National Insurance and 2 other taxes"

    if (variableNames.length === 0) {
      return "";
    } else if (variableNames.length === 1) {
      return this.variables[variableNames[0]].label;
    } else if (variableNames.length === 2) {
      return `${this.variables[variableNames[0]].label} and ${this.variables[variableNames[1]].label}`;
    } else {
      return `${this.variables[variableNames[0]].label}, ${this.variables[variableNames[1]].label} and ${variableNames.length - 2} other ${variableNames.length - 2 === 1 ? typeName : typeNamePlural}`;
    }


  }

}

const PolicyEngineContext = createContext(null);

export default PolicyEngineContext;
