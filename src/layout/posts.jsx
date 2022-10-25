import Post from "./post";
import React from 'react';


export default function Posts() {
    return <div style={{
        display: "flex",
        flexWrap: "wrap",
    }}>
        <Post 
            size={3} 
            header="Policy/ The mini-budget is announced"
            subheader="See how it affects your household finances, and the UK economy."
            minHeight="400px"
        />
        <Post 
            size={1} 
            header="Policy/ Pension Credit upratings released for FY 2023"
            subheader="See if you're eligible and how much your entitlement will change."
        />
        <Post 
            size={2} 
            header="Blog/ Stamp duties in PolicyEngine"
            subheader="Model custom reforms to stamp duties in England, Wales, Scotland and Northern Ireland."
        />
        <Post 
            size={2} 
            header="Blog/ Stamp duties in PolicyEngine"
            subheader="Model custom reforms to stamp duties in England, Wales, Scotland and Northern Ireland."
        />
    </div>
}