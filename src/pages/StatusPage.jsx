import { useEffect, useState } from "react";

import useMobile from "../layout/Responsive";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { countryApiCall, apiCall } from "../api/call";
import { DEFAULT_COUNTRY_HOUSEHOULD_INPUTS, INITIAL_COUNTRY_STATUSES, COUNTRY_CODES, STATUS_COLORS, STATUS_TEXT_COLORS } from "./statusPageDefaults";


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
    return {[country]: {status: `${res.status.toUpperCase()}`, latency: `${latency} ms`}}
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
            <h1>{`PolicyEngine's API Status Information`}</h1>
            <section>
              <h3>Country Pages</h3>
              <h6>{`These requests represent accessing the home page for PolicyEngine's supported countries.`}</h6>
                {Object.keys(countryStatuses).map((countryStatus, idx) => 
                    <div 
                      key={`${idx + 1}-country`} 
                      style={{ 
                        color: STATUS_TEXT_COLORS[countryStatuses[countryStatus]["status"]],
                        backgroundColor: STATUS_COLORS[countryStatuses[countryStatus]["status"]],
                        maxWidth: "50%",
                        marginTop: 2,
                        marginLeft: "auto",
                        marginRight: "auto"
                      }} 
                    >
                        {countryStatus.toUpperCase()} - {countryStatuses[countryStatus]["status"] ? countryStatuses[countryStatus]["status"] : "Checking Status"} - {countryStatuses[countryStatus]["latency"] ? countryStatuses[countryStatus]["latency"] : "Calculating Latency"}
                    </div> 
                )}
            </section>
            <section>
              <h3 style={{marginTop: 5}}>Metadata</h3>
              <h6>{`These requests represent accessing the metadata for PolicyEngine's supported countries.`}</h6>
              {Object.keys(metaDataStatuses).map((metaDataStatus, idx) => 
                  <div 
                    key={`${idx + 1}-metaData`} 
                    style={{ 
                        color: STATUS_TEXT_COLORS[metaDataStatuses[metaDataStatus]["status"]],
                        backgroundColor: STATUS_COLORS[metaDataStatuses[metaDataStatus]["status"]],
                        maxWidth: "50%",
                        marginTop: 2,
                        marginLeft: "auto",
                        marginRight: "auto"
                      }} 
                  >
                    {metaDataStatus.toUpperCase()} - {metaDataStatuses[metaDataStatus]["status"] ? metaDataStatuses[metaDataStatus]["status"] : "Checking Status"} - {metaDataStatuses[metaDataStatus]["latency"] ? metaDataStatuses[metaDataStatus]["latency"] : "Calculating Latency"}
                  </div> 
              )}
            </section>
            <section>
              <h3 style={{marginTop: 5}}>Calculate</h3>
              <h6>{`These requests represent generating analysis with basic household data for PolicyEngine's supported countries.`}</h6>
              {Object.keys(calculateStatuses).map((calcStatus, idx) => 
                  <div 
                    key={`${idx + 1}-calculate`} 
                    style={{ 
                        marginBottom: 2, 
                        color: STATUS_TEXT_COLORS[calculateStatuses[calcStatus]["status"]],
                        backgroundColor: STATUS_COLORS[calculateStatuses[calcStatus]["status"]],
                        maxWidth: "50%",
                        marginTop: 2,
                        marginLeft: "auto",
                        marginRight: "auto"
                      }} 
                  >
                    {calcStatus.toUpperCase()} - {calculateStatuses[calcStatus]["status"] ? calculateStatuses[calcStatus]["status"] : "Checking Status"} - {calculateStatuses[calcStatus]["latency"] ? calculateStatuses[calcStatus]["latency"] : "Calculating Latency"}
                  </div> 
              )}
            </section>
          </div>
        </div>
      <Footer />
    </>
  )
}