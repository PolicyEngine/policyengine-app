import { useEffect, useState } from "react";

import { countryApiCall, apiCall } from "../api/call";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const DEFAULT_US_HOUSEHOLD = {
  "people": {
    "you": {
      "age": {
        "2023": 40
      },
      "employment_income": {
        "2023": 0
      }
    }
  },
  "families": {
    "your family": {
      "members": [
        "you"
      ]
    }
  },
  "marital_units": {
    "your marital unit": {
      "members": [
        "you"
      ]
    }
  },
  "tax_units": {
    "your tax unit": {
      "members": [
        "you"
      ]
    }
  },
  "spm_units": {
    "your household": {
      "members": [
        "you"
      ]
    }
  },
  "households": {
    "your household": {
      "members": [
        "you"
      ],
      "state_name": {
        "2023": "CA"
      }
    }
  }
}

const DEFAULT_COUNTRY_HOUSEHOULD_INPUTS = {
  us: DEFAULT_US_HOUSEHOLD,
}

const COUNTRY_IDS = ["uk", "us", "ca", "ng"]
const INITIAL_COUNTRY_STATUSES = { 
  uk: "Pending", 
  us: "Pending", 
  ca: "Pending", 
  ng: "Pending", 
}

export function StatusPage() {
  const [countryStatuses, setCountryStatuses] = useState(INITIAL_COUNTRY_STATUSES);
  const [metaDataStatuses, setMetaDataStatuses] = useState(INITIAL_COUNTRY_STATUSES);
  const [calculateStatus, setCalculateStatus] = useState({us: "Pending"})

  const [counter, setCounter] = useState(Object.keys(countryStatuses).length);

  
  if (counter < 0) {
    setCounter(1)
    console.log(COUNTRY_IDS)
  }
  
  
function getAPIRoute(country, path, setState, api, body = {}) {
  const startTime = Date.now();
  const calledApi = Object.keys(body).length > 0 ? api(path, body) : api(country, path)
  
  calledApi
      .then((res) => res.json())
      .then((res) => {
        const endTime = Date.now();
        const latency = endTime - startTime;
        console.log(country, latency, res.status)
        return {[country]: `${res.status.toUpperCase()} - ${latency} ms`}
      })
      .then((result) => {
        setState((prevState) => ({...prevState, ...result}))
      })
      .catch((err) => {
        console.log(err)
        setState((prevState) => ({...prevState, [country]: "ERROR"}))
      })
    
}


  useEffect(() => {
    const baselinePolicyId = { uk: 1, us: 2, ca: 3, ng: 4};
    for (let key in countryStatuses) {
      const path = `/policy/${baselinePolicyId[key]}`
      getAPIRoute(key, path, setCountryStatuses, countryApiCall)
    }

    for(let key in metaDataStatuses) {
      const path = "/metadata";
      getAPIRoute(key, path, setMetaDataStatuses, countryApiCall)
    }

    for(let key in calculateStatus) {
      const path = `/${key}/calculate`;
      getAPIRoute(key, path, setCalculateStatus, apiCall, {household: DEFAULT_COUNTRY_HOUSEHOULD_INPUTS[key], policyId: `${baselinePolicyId[key]}`})
      
    }
    
  }, [])

  return (
    <>
      <Header />
      <h1>Status</h1>
      <>
      <h2>Country Pages</h2>
      {Object.keys(countryStatuses).map((countryStatus, idx) => 
        <> 
          <p key={`${idx}-country`}>{countryStatus} - {countryStatuses[countryStatus]}</p> 
        </>
      )}
      <h2>Metadata</h2>
      {Object.keys(metaDataStatuses).map((metaDataStatus, idx) => 
        <> 
          <p key={`${idx}-metaData`}>{metaDataStatus} - {metaDataStatuses[metaDataStatus]}</p> 
        </>
      )}
      <h2>Calculate</h2>
      {Object.keys(calculateStatus).map((calcStatus, idx) => 
        <> 
          <p key={`${idx}-calculate`}>{calcStatus} - {calculateStatus[calcStatus]}</p> 
        </>
      )}
      
      
      </>
      <Footer />
    </>
  )
}