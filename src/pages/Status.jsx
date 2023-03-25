import { useEffect, useState } from "react";

import { countryApiCall } from "../api/call";
import Header from "../layout/Header";
import Footer from "../layout/Footer";


const COUNTRY_IDS = ["uk", "us", "ca", "ng"]

export function StatusPage() {
  const [countryStatuses, setCountryStatuses] = useState({ 
    uk: "Pending", 
    us: "Pending", 
    ca: "Pending", 
    ng: "Pending", 
  });
  const [calculateStatus, setCalculateStatus] = useState("calculate - Pending")
  const [metaDataStatuses, setMetaDataStatuses] = useState({ 
    uk: "Pending", 
    us: "Pending", 
    ca: "Pending", 
    ng: "Pending", 
  })

  const [counter, setCounter] = useState(Object.keys(countryStatuses).length);

  
  if (counter < 0) {
    setCounter(1)
    setCountryStatuses("false")
    setCalculateStatus("false")
    setMetaDataStatuses("false")
    console.log(COUNTRY_IDS)
  }
  
  // console.log(counter)
  
function callAPIRoute(country, path, setState) {
  const startTime = Date.now();
  countryApiCall(country, path)
    .then((res) => res.json())
    .then((res) => {
      const endTime = Date.now();
      const latency = endTime - startTime;
      console.log(country, latency, res.status)
      return {[country]: `${res.status} - ${latency}`}
    })
    .then((result) => {
      setState((prevState) => ({...prevState, ...result}))
    })
    .catch(() => {
      setState((prevState) => ({...prevState, [country]: "ERROR"}))
    })
}

  useEffect(() => {
    const baselinePolicyId = { uk: 1, us: 2, ca: 3, ng: 4};
    for (let key in countryStatuses) {
      const path = `/policy/${baselinePolicyId[key]}`
      callAPIRoute(key, path, setCountryStatuses)
    }

    for(let key in metaDataStatuses) {
      const path = "/metadata";
      callAPIRoute(key, path, setMetaDataStatuses)

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
          <p key={idx}>{countryStatus} - {countryStatuses[countryStatus]}</p> 
        </>
      )}
      <h2>Metadata</h2>
      {Object.keys(metaDataStatuses).map((metaDataStatus, idx) => 
        <> 
          <p key={idx}>{metaDataStatus} - {metaDataStatuses[metaDataStatus]}</p> 
        </>
      )}
      <h2>Calculate</h2>
      <p>{calculateStatus}</p>
      
      </>
      <Footer />
    </>
  )
}