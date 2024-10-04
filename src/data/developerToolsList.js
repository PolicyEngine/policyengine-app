// A JSON data structure that describes PolicyEngine Developer tools,
// for use on the Developer Hub page
import apiImage from "../images/devHub/apistatus.png";
import simImage from "../images/devHub/simulation.png";
export const devTools = [
  {
    title: "API Status",
    desc: "Monitor the health and performance of the PolicyEngine API. View real-time status updates, scheduled maintenance notifications, and historical incident data to stay informed about the API's reliability and availability.",
    path: "api_status",
    image: apiImage,
  },
  {
    title: "Policy Simulations",
    desc: "View simulations that are currently running or have run in the past for the current version of the API. The table below updates every 15 seconds, providing you with real-time insights into your policy testing.",
    path: "simulations",
    image: simImage,
  },
  
];
