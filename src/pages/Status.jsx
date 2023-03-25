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
  }
  
  // console.log(counter)
  console.log(COUNTRY_IDS)
  
  useEffect(() => {
    const baselinePolicyId = { uk: 1, us: 2, ca: 3, ng: 4};

    const countryRequests = [];
    for (let key in countryStatuses) {
      const responseResults = {};
      responseResults[key] = {};
      const startTime = Date.now();
      responseResults[key]["startTime"] = startTime;
      countryRequests.push(
        countryApiCall(key, `/policy/${baselinePolicyId[key]}`)
          .then((res) => res.json())
          .then((res) => {
            responseResults[key]["status"] = res.status;
            const endTime = Date.now();
            responseResults[key]["endTime"] = endTime;
          })
          .then(() => {
            return responseResults
          })
        )
      }
    const countryLatencies = {}
    Promise.all(countryRequests).then((response) => {
      console.log(response)
      for (let result of response) {
        for (let country in result) {
          console.log(result[country], country)
          const latency = result[country]["endTime"] - result[country]["startTime"];  
          countryLatencies[country] = `${result[country]["status"].toUpperCase()} - ${latency}`
        }
      }
    })
      .then(() => setCountryStatuses(countryLatencies))
      .catch(err => console.log(err))

    const metaDataRequests = []
      for (let key in metaDataStatuses) {
        const responseResults = {};
        responseResults[key] = {};
        const startTime = Date.now();
        responseResults[key]["startTime"] = startTime;
        metaDataRequests.push(
          countryApiCall(key, "/metadata")
            .then((res) => res.json())
            .then((res) => {
              responseResults[key]["status"] = res.status;
              const endTime = Date.now();
              responseResults[key]["endTime"] = endTime;
            })
            .then(() => {
              return responseResults
            })
          )
        }
      const metaDataLatencies = {}
      Promise.all(metaDataRequests).then((response) => {
        console.log(response)
        for (let result of response) {
          for (let country in result) {
            console.log(result[country], country)
            const latency = result[country]["endTime"] - result[country]["startTime"];  
            metaDataLatencies[country] = `${result[country]["status"].toUpperCase()} - ${latency}`
          }
        }
      })
        .then(() => setMetaDataStatuses(metaDataLatencies))
        .catch(err => console.log(err))
    
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