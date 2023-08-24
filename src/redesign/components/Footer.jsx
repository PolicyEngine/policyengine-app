import style from "../style";
import Section from "./Section";
import PolicyEngineMainLogo from "../images/logos/policyengine/white.svg";
import useDisplayCategory from "./useDisplayCategory";
import { SubscribeToPolicyEngineMobile } from "./HomeSubscribe";
import { FacebookFilled, GithubFilled, InstagramFilled, LinkedinFilled, TwitterOutlined, YoutubeFilled } from "@ant-design/icons";
import React from "react";

export default function Footer() {
  const displayCategory = useDisplayCategory();
  return (
    <Section backgroundColor={style.colors.BLUE_PRESSED}>
      {{
        mobile: <MobileFooter />,
        tablet: <TabletFooter />,
        desktop: <DesktopFooter />,
      }[displayCategory]}
    </Section>
  );
}

function ContactUs() {
  return <div style={{
    marginTop: 30,
  }}>
    <h2>Contact</h2>
    <p>hello@policyengine.org</p>
  </div>
}

function TwitterEmbed() {
  return <div style={{
    marginLeft: 40,
    marginRight: 40,
  }}>
    <a 
      className="twitter-timeline" 
      href="https://twitter.com/thepolicyengine"
      {...{
        "data-height": "300",
      }}
    >Tweets by ThePolicyEngine</a> 
  </div>
}

function SocialLinks() {
  const firstThree = <>
    <SocialLink icon={TwitterOutlined} url="https://twitter.com/ThePolicyEngine" />
    <SocialLink icon={FacebookFilled} url="https://twitter.com/ThePolicyEngine" />
    <SocialLink icon={LinkedinFilled} url="https://twitter.com/ThePolicyEngine" />
  </>;
  const lastThree = <>
    <SocialLink icon={YoutubeFilled} url="https://twitter.com/ThePolicyEngine" />
    <SocialLink icon={InstagramFilled} url="https://twitter.com/ThePolicyEngine" />
    <SocialLink icon={GithubFilled} url="https://twitter.com/ThePolicyEngine" />
  </>;
  const displayCategory = useDisplayCategory();
  if (displayCategory === "mobile") {
    return <>
      <div style={{display: "flex", justifyContent: "space-between", marginTop: 50 }}>
        {firstThree}
      </div>
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: 50 }}>
        {lastThree}
      </div>
    </>
  }
  return <>
    <div style={{
      marginTop: displayCategory === "desktop" ? "auto" : 50, 
      marginBottom: displayCategory === "desktop" ? 0 : 30, 
      display: "flex", 
      justifyContent: "space-between"}}>
      {firstThree}
      {lastThree}
    </div>
  </>
}

function SocialLink({ icon, url }) {
  const displayCategory = useDisplayCategory();
  const size = {
    mobile: 65,
    tablet: 65,
    desktop: 30,
  }[displayCategory];
  const fontSize = {
    mobile: 45,
    tablet: 45,
    desktop: 20,
  }[displayCategory];
  return <a
    href={url}
    >
      <div style={{
        backgroundColor: style.colors.WHITE,
        height: size,
        width: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        marginLeft: displayCategory === "mobile" ? 20 : 0,
      }}>
      {React.createElement(icon, { style: { 
        color: style.colors.BLUE_PRESSED,
        fontSize,
      } })}
    </div>
  </a>
}

function MobileFooter() {
  return <>
    <img src={PolicyEngineMainLogo} width="100%" style={{marginBottom: 50}} />
    <SubscribeToPolicyEngineMobile />
    <SocialLinks />
    <TwitterEmbed />
    <ContactUs />
  </>
}

function TabletFooter() {
  return <div>
    <img src={PolicyEngineMainLogo} width={350} style={{marginBottom: 50}} />
    <div style={{
      display: "flex",
      justifyContent: "space-between",
    }}>
      <div>
        <SubscribeToPolicyEngineMobile />
        <ContactUs />
      </div>
      <TwitterEmbed />
    </div>
    <SocialLinks />
  </div>
}

function DesktopFooter() {
  return <div>
    <img src={PolicyEngineMainLogo} width={350} style={{marginBottom: 50}} />
    <div style={{
      display: "flex",
      justifyContent: "space-between",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
      }}>
        <ContactUs />
        <SocialLinks />
      </div>
      <TwitterEmbed />
      <div style={{marginTop: 20}}>
      <SubscribeToPolicyEngineMobile />
      </div>
    </div>
  </div>
}
