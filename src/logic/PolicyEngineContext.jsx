import { createContext } from "react";
import { buildVariableTree, getTreeLeavesInOrder, getVariablesInOrder } from "../components/pages/household/common";
import { buildParameterTree } from "../components/pages/policy/common";
import { formatVariableValue } from "./variableValues";

export class PolicyEngineContextClass {
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
  initialised = false;
  debug = true;
  isFetchingMetadata = false;
  metadata = null;

  householdPage = "structure.maritalStatus"
  policyPage = "";
  variableNames = {};
  earningsVariationIsOutdated = true;
  policyReform = {};

  constructor(country) {
    this.country = country;
    if (this.debug) {
      this.apiURL = "http://127.0.0.1:5000";
    } else {
      this.apiURL = "https://api.policyengine.org";
    }
    if (country === "uk") {
      this.variableNames = {
        netIncome: "household_net_income",
        marketIncome: "household_market_income",
        taxes: "household_tax",
        benefits: "household_benefits",
        earnings: "employment_income",
        mtr: "marginal_tax_rate",
      }
    } else if (country === "us") {
      this.variableNames = {
        netIncome: "spm_unit_net_income",
        marketIncome: "spm_unit_market_income",
        taxes: "spm_unit_taxes",
        benefits: "spm_unit_benefits",
        refundableTaxCredits: "refundable_tax_credits",
        earnings: "employment_income",
        mtr: "marginal_tax_rate",
      }
    }
  }

  baseApiCall(endpoint, postData) {
    if (postData) {
      return fetch(this.apiURL + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
    } else {
      return fetch(this.apiURL + endpoint);
    }
  }

  apiCall(endpoint, postData) {
    return this.baseApiCall(`/${this.country}${endpoint}`, postData);
  }

  initialiseIfNeeded(setHolderState) {
    if (!this.initialised) {
      this.setState = (data, callback) => {
        setHolderState({ state: Object.assign(this, data) });
      };

      this.setState({
        initialised: true,
      })
    }
  }

  getCountryUrl(path) {
    return `/${this.country}${path}`;
  }

  storeCountryMetadataIfNeeded() {
    if (!this.metadata && !this.isFetchingMetadata) {
      this.isFetchingMetadata = true;
      this.apiCall("/metadata")
        .then((response) => response.json())
        .then((data) => {
          const variableTree = buildVariableTree(data.variables, data.variableModules);
          const parameterTree = buildParameterTree(data.parameters);
          const parametersInOrder = getTreeLeavesInOrder(parameterTree);
          this.setState({
            metadata: data,
            isFetchingMetadata: false,
            variableTree: variableTree,
            variablesInOrder: getTreeLeavesInOrder(variableTree).slice(2),
            parametersInOrder: parametersInOrder,
            parameterTree: parameterTree,
            policyPage: parametersInOrder[0],
          });
        });
    }
  }

  simulateHousehold(household) {
    this.apiCall("/calculate", household)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          simulatedHousehold: data,
        });
      });
  }

  getSimulatedValue(variable, timePeriod, entityName, household) {
    if (!household) {
      household = this.simulatedHousehold;
    }
    const entityPlural = this.metadata.entities[this.metadata.variables[variable].entity].plural;
    if (!this.simulatedHousehold) {
      return null;
    }
    if (!entityName) {
      const possibleEntities = Object.keys(this.simulatedHousehold[entityPlural]);
      let total = 0;
      for (let entity of possibleEntities) {
        total += this.getSimulatedValue(variable, timePeriod, entity);
      }
      return total;
    }
    const timePeriodValues = this.simulatedHousehold[entityPlural][entityName][variable];
    if (!timePeriod) {
      const possibleTimePeriods = Object.keys(timePeriodValues);
      let total = 0;
      for (let timePeriod of possibleTimePeriods) {
        total += this.getSimulatedValue(variable, timePeriod, entityName);
      }
      return total;
    }
    return timePeriodValues[timePeriod];
  }

  getFormattedSimulatedValue(variable, timePeriod, entityName) {
    const value = this.getSimulatedValue(variable, timePeriod, entityName);
    if (value === null) {
      return null;
    }
    return formatVariableValue(this.metadata.variables[variable], value);
  }

  getEconomicImpact

}

const PolicyEngineContext = createContext(null);

export default PolicyEngineContext;
