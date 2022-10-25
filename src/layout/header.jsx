import BlueLogo from "../images/logo_blue.png";
import React from 'react';
import { useNavigate } from "react-router-dom";

function PolicyEngineLogo() {
  return <img src={BlueLogo} alt="PolicyEngine logo" style={{height: 75, paddingLeft: 15}} />;
}

function HeaderNavigationItem(props) {
  const navigate = useNavigate();
  return <h3 style={{
    paddingLeft: 15, 
    paddingRight: 15, 
    verticalAlign: "middle", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
    ...props.style,
  }} onClick={() => navigate(props.href)}>{props.label}</h3>
}

function RightAlignBarrier() {
  return <div style={{marginRight: "auto"}} />
}

function Household(props) {
  const navigate = useNavigate();
  return <div style={{
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    cursor: "pointer",
  }} onClick={() => navigate(`/${props.country}/household/edit`)}>
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
    }}><h5 style={{margin: 0, padding: 10, whiteSpace: "nowrap"}}>{props.label}</h5></div>
  </div>
}


function Policy(props) {
  const navigate = useNavigate();
  return <div style={{
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    cursor: "pointer",
  }} onClick={() => navigate(`/${props.country}/policy`)}>
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
    }}><h5 style={{margin: 0, padding: 10, whiteSpace: "nowrap"}}>{props.label}</h5></div>
  </div>
}


export default function Header(props) {
  let householdLabel = "Loading..."
  if(props.household) {
    householdLabel = props.household.label;
  }

  let policyLabel = "Loading..."
  if(props.policy) {
    policyLabel = props.policy.label;
  }
  return (
    <div style={{
        width: "100%",
        height: 75,
        display: "flex",
    }}>
        <PolicyEngineLogo />
        <HeaderNavigationItem label="Home" href={`/${props.country}`} />
        <HeaderNavigationItem label="Household" href={`/${props.country}/household`} />
        <HeaderNavigationItem label="Economy" href={`/${props.country}/economy`} />
        <RightAlignBarrier />
        <Household country={props.country} label={householdLabel} />
        <Policy country={props.country} label={policyLabel} />
        <HeaderNavigationItem style={{marginRight: 20}} label={props.country} />
    </div>
  );
}