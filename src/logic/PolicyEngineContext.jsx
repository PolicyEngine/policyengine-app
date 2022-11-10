import { createContext } from "react";

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

  constructor(country) {
    this.country = country;
    if (this.debug) {
      this.apiURL = "http://127.0.0.1:5000";
    } else {
      this.apiURL = "https://api.policyengine.org";
    }
  }

  apiCall(endpoint) {
    return fetch(`${this.apiURL}${endpoint}`).then((response) =>
      response.json()
    );
  }

  countryApiCall(endpoint) {
    return this.apiCall(`/${this.country}${endpoint}`);
  }

  initialise(setHolderState) {
    this.setState = (data, callback) => {
      setHolderState({ state: Object.assign(this, data) });
    };

    this.setState({
      initialised: true,
    })
  }

}

const PolicyEngineContext = createContext(null);

export default PolicyEngineContext;
