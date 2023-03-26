import { useEffect, useState } from "react";

import useMobile from "../layout/Responsive";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { countryApiCall, apiCall } from "../api/call";
import { DEFAULT_COUNTRY_HOUSEHOULD_INPUTS, INITIAL_COUNTRY_STATUSES, COUNTRY_CODES, STATUS_COLORS } from "./statusPageDefaults";


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
            <h1>Status</h1>
            <div>
              <h3>Country Pages</h3>
                {Object.keys(countryStatuses).map((countryStatus, idx) => 
                  <> 
                    <div 
                      key={`${idx}-country`} 
                      style={{ 
                        marginBottom: 2, 
                        backgroundColor: STATUS_COLORS[countryStatuses[countryStatus]["status"]]}} 
                    >
                        {countryStatus} - {countryStatuses[countryStatus]["status"] ? countryStatuses[countryStatus]["status"] : "Checking Status"} - {countryStatuses[countryStatus]["latency"] ? countryStatuses[countryStatus]["latency"] : "Calculating Latency"}
                    </div> 
                  </>
                )}
            </div>
            <div>
              <h3 style={{marginTop: 5}}>Metadata</h3>
              {Object.keys(metaDataStatuses).map((metaDataStatus, idx) => 
                <> 
                  <div 
                    key={`${idx}-metaData`} 
                    style={{ 
                        marginBottom: 2, 
                        backgroundColor: STATUS_COLORS[metaDataStatuses[metaDataStatus]["status"]]}} 
                  >
                    {metaDataStatus} - {metaDataStatuses[metaDataStatus]["status"] ? metaDataStatuses[metaDataStatus]["status"] : "Checking Status"} - {metaDataStatuses[metaDataStatus]["latency"] ? metaDataStatuses[metaDataStatus]["latency"] : "Calculating Latency"}
                  </div> 
                </>
              )}
            </div>
            <div>
              <h3 style={{marginTop: 5}}>Calculate</h3>
              {Object.keys(calculateStatuses).map((calcStatus, idx) => 
                <> 
                  <div 
                    key={`${idx}-calculate`} 
                    style={{ 
                        marginBottom: 2, 
                        backgroundColor: STATUS_COLORS[calculateStatuses[calcStatus]["status"]]}} 
                  >
                    {calcStatus} - {calculateStatuses[calcStatus]["status"] ? calculateStatuses[calcStatus]["status"] : "Checking Status"} - {calculateStatuses[calcStatus]["latency"] ? calculateStatuses[calcStatus]["latency"] : "Calculating Latency"}
                  </div> 
                </>
              )}
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
}