import BlueLogo from "./images/logo_blue.png";
import React from 'react';
import { useLocation } from "react-router-dom";
import { getCountry } from "./context";

function PolicyEngineLogo() {
  return <img src={BlueLogo} alt="PolicyEngine logo" style={{height: 75, paddingLeft: 15}} />;
}

function HeaderNavigationItem(props) {
  return <h3 style={{
    paddingLeft: 15, 
    paddingRight: 15, 
    verticalAlign: "middle", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    ...props.style,
  }}>{props.label}</h3>
}

function RightAlignBarrier() {
  return <div style={{marginRight: "auto"}} />
}

function Household() {
  return <div style={{
    display: "flex",
    alignItems: "center",
    marginRight: 10,
  }}>
    <div style={{
      backgroundColor: "#F2F2F2",
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30,
      paddingLeft: 5,
      paddingRight: 5,
    }}><h5 style={{margin: 0, padding: 10}}>Household</h5></div>
    <div style={{
      backgroundColor: "#C4C4C4",
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      paddingLeft: 5,
      paddingRight: 5,
    }}><h5 style={{margin: 0, padding: 10, whiteSpace: "nowrap"}}>UK average</h5></div>
  </div>
}


function Policy() {
  return <div style={{
    display: "flex",
    alignItems: "center",
  }}>
    <div style={{
      backgroundColor: "#F2F2F2",
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30,
      paddingLeft: 5,
      paddingRight: 5,
    }}><h5 style={{margin: 0, padding: 10}}>Policy</h5></div>
    <div style={{
      backgroundColor: "#C4C4C4",
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      paddingLeft: 5,
      paddingRight: 5,
    }}><h5 style={{margin: 0, padding: 10, whiteSpace: "nowrap"}}>Current law</h5></div>
  </div>
}


export default function Header() {
  const location = useLocation();
  return (
    <div style={{
        width: "100%",
        height: 75,
        display: "flex",
    }}>
        <PolicyEngineLogo />
        <HeaderNavigationItem label="Home" />
        <HeaderNavigationItem label="Household" />
        <HeaderNavigationItem label="Economy" />
        <RightAlignBarrier />
        <Household />
        <Policy />
        <HeaderNavigationItem style={{marginRight: 20}} label={getCountry(location.pathname)} />
    </div>
  );
}