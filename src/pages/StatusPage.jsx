import { useEffect, useState } from "react";

import useMobile from "../layout/Responsive";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { countryApiCall, apiCall } from "../api/call";
import { 
  DEFAULT_COUNTRY_HOUSEHOULD_INPUTS, 
  INITIAL_COUNTRY_STATUSES, 
  COUNTRY_CODES, 
  STATUS_COLORS, 
  STATUS_TEXT_COLORS, 
  COUNTRY_NAMES } from "./statusPageDefaults";


function ApiStatus({apiStatus, apiCategory, countryNames}) {
  return (
    <>
      {Object.keys(apiStatus).map((apiRoute, idx) => 
        <div 
          key={`${idx + 1}-${apiCategory}`} 
          style={{ 
            color: STATUS_TEXT_COLORS[apiStatus[apiRoute]["status"]],
            backgroundColor: STATUS_COLORS[apiStatus[apiRoute]["status"]],
            marginBottom: 2,
            marginLeft: 2,
          }} 
        >
            <p style={{margin: 0, display: "flex"}}>
              <span style={{flexGrow: 1, width: "30%"}}>{countryNames[apiRoute]}</span>
              <span style={{flexGrow: 0, width: "10%"}}>/{apiRoute}</span>
              <span style={{flexGrow: 1, width: "60%"}}>
                <strong> {apiStatus[apiRoute]["status"] ? apiStatus[apiRoute]["status"] : "Checking status"}</strong> 
                {apiStatus[apiRoute]["status"] ? " in" : " and"}
                <strong> {apiStatus[apiRoute]["latency"] ? apiStatus[apiRoute]["latency"] : "Calculating latency"}</strong>
              </span>
            </p>
        </div> 
      )}
    </>
  )
}


export function StatusPage() {
const mobile = useMobile();
  const [countryStatuses, setCountryStatuses] = useState(INITIAL_COUNTRY_STATUSES);
  const [metaDataStatuses, setMetaDataStatuses] = useState(INITIAL_COUNTRY_STATUSES);
  const [calculateStatuses, setCalculateStatuses] = useState({uk: "Pending", us: "Pending", ca: "Pending"});

  
  
function getAPIRoute(country, path, setState, api, body = {}) {
  const startTime = Date.now();
  const calledApi = Object.keys(body).length > 0 ? api(path, body) : api(country, path)
  
  calledApi
    .then((res) => res.json())
    .then((res) => {
      const endTime = Date.now();
      const latency = endTime - startTime;
      return {[country]: {status: `${res.status.toUpperCase()}`, latency: `${latency}ms`}}
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

    for (let country of COUNTRY_CODES) {
      getAPIRoute(country, 
                  `/policy/${baselinePolicyId[country]}`, 
                  setCountryStatuses, 
                  countryApiCall)
      getAPIRoute(country, "/metadata", setMetaDataStatuses, countryApiCall)
      getAPIRoute(country, 
                  `/${country}/calculate`, 
                  setCalculateStatuses, 
                  apiCall, 
                  {   
                      household: DEFAULT_COUNTRY_HOUSEHOULD_INPUTS[country], 
                      policyId: `${baselinePolicyId[country]}`
                  })
    }
  }, [])

  return (
    <>
      <Header />
        <div
          style={{
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 70,
            display: "flex",
            flexDirection: "column",
            alignItems: !mobile && "center",
            marginBottom: 50,
            textAlign: "center"
          }}
        >
          <div
              style={{
                paddingRight: 0,
                paddingLeft: 0,
              }}
            >
            <h1>PolicyEngine API status</h1>
            <section style={{display: "flex", marginBottom: 2}}>
              <div style={{flex: "50", textAlign:"left"}}>
                <h3>Country pages</h3>
                <h6>{`These requests represent accessing the home page for PolicyEngine's supported countries.`}</h6>
              </div>
              <div style={{flex: "50", marginTop: 10, marginBottom: 10}}>
                <ApiStatus apiStatus={countryStatuses} apiCategory={"country"} countryNames={COUNTRY_NAMES} />
              </div>
            </section>
            <section style={{display: "flex", marginBottom: 2}}>
              <div style={{flex: "50", textAlign:"left"}}>
                <h3 style={{marginTop: 5}}>Metadata</h3>
                <h6>{`These requests represent accessing the metadata for PolicyEngine's supported countries.`}</h6>
              </div>
              <div style={{flex: "50", marginTop: 10, marginBottom: 10}}>
                <ApiStatus apiStatus={metaDataStatuses} apiCategory={"metadata"} countryNames={COUNTRY_NAMES} />
              </div>
            </section>
            <section style={{display: "flex", marginBottom: 2}}>
              <div style={{flex: "50", textAlign:"left"}}>
                <h3 style={{marginTop: 5}}>Calculate</h3>
                <h6>{`These requests represent generating analysis with basic household data for PolicyEngine's supported countries.`}</h6>
              </div>
              <div style={{flex: "50", marginTop: 10, marginBottom: 10}}>
                <ApiStatus apiStatus={calculateStatuses} apiCategory={"calculate"} countryNames={COUNTRY_NAMES} />
              </div>
            </section>
          </div>
        </div>
      <Footer />
    </>
  )
}