import style from "../style";
import Section from "./Section";
import PolicyEngineMainLogo from "../images/logos/policyengine/white.svg";
import useDisplayCategory from "./useDisplayCategory";
import { SubscribeToPolicyEngine } from "./HomeSubscribe";
import {
  FacebookFilled,
  GithubFilled,
  InstagramFilled,
  LinkedinFilled,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import { createElement, useEffect } from "react";

export default function Footer() {
  const displayCategory = useDisplayCategory();
  return (
    <Section backgroundColor={style.colors.BLUE_PRESSED}>
      {
        {
          mobile: <MobileFooter />,
          tablet: <TabletFooter />,
          desktop: <DesktopFooter />,
        }[displayCategory]
      }
    </Section>
  );
}

function ContactUs() {
  return (
    <div
      style={{
        marginTop: 30,
      }}
    >
      <h2 style={{ color: "white" }}>Contact</h2>
      <p>
        <a href="mailto:hello@policyengine.org" className="link-inverted">
          <u>Email us</u>
        </a>{" "}
        at hello@policyengine.org
      </p>
    </div>
  );
}

function TwitterEmbed() {
  const dC = useDisplayCategory();

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://platform.twitter.com/widgets.js";
    script.charset = "utf-8";
    document.getElementById("twitter-container").appendChild(script);
  }, []);

  const widths = {
    mobile: "100%",
    tablet: "50%",
    desktop: "33%",
    default: "33%",
  };

  return (
    <div
      id="twitter-container"
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        width: Object.keys(widths).includes(dC) ? widths[dC] : widths.default,
      }}
    >
      <a
        className="twitter-timeline"
        data-theme="light"
        href="https://twitter.com/ThePolicyEngine?ref_src=twsrc%5Etfw"
        data-width="100%"
      >
        Loading tweets by ThePolicyEngine...
      </a>
    </div>
  );
}

function SocialLinks() {
  const firstThree = (
    <>
      <SocialLink
        icon={TwitterOutlined}
        url="https://twitter.com/ThePolicyEngine"
      />
      <SocialLink
        icon={FacebookFilled}
        url="https://www.facebook.com/PolicyEngine"
      />
      <SocialLink
        icon={LinkedinFilled}
        url="https://www.linkedin.com/company/thepolicyengine"
      />
    </>
  );
  const lastThree = (
    <>
      <SocialLink
        icon={YoutubeFilled}
        url="https://www.youtube.com/@policyengine"
      />
      <SocialLink
        icon={InstagramFilled}
        url="https://www.instagram.com/PolicyEngine/"
      />
      <SocialLink icon={GithubFilled} url="https://github.com/PolicyEngine" />
    </>
  );
  const displayCategory = useDisplayCategory();
  if (displayCategory === "mobile") {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 50,
          }}
        >
          {firstThree}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 50,
          }}
        >
          {lastThree}
        </div>
      </>
    );
  }
  return (
    <>
      <div
        style={{
          marginTop: displayCategory === "desktop" ? "auto" : 50,
          marginBottom: displayCategory === "desktop" ? 0 : 30,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {firstThree}
        {lastThree}
      </div>
    </>
  );
}

export function SocialLink({ icon, url, backgroundColor, color }) {
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
  return (
    <a href={url}>
      <div
        style={{
          backgroundColor: backgroundColor || style.colors.WHITE,
          height: size,
          width: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 20,
          marginLeft: displayCategory === "mobile" ? 20 : 0,
        }}
      >
        {createElement(icon, {
          style: {
            color: color || style.colors.BLUE_PRESSED,
            fontSize,
          },
        })}
      </div>
    </a>
  );
}

function MobileFooter() {
  return (
    <>
      <img
        src={PolicyEngineMainLogo}
        alt="PolicyEngine logo"
        width="100%"
        style={{ marginBottom: 50 }}
      />
      <SubscribeToPolicyEngine displaySize="mobile" />
      <SocialLinks />
      <TwitterEmbed />
      <ContactUs />
    </>
  );
}

function TabletFooter() {
  return (
    <div>
      <img
        src={PolicyEngineMainLogo}
        width={350}
        style={{ marginBottom: 50 }}
        alt="PolicyEngine logo"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <SubscribeToPolicyEngine displaySize="mobile" />
          <ContactUs />
        </div>
        <TwitterEmbed />
      </div>
      <SocialLinks />
    </div>
  );
}

function DesktopFooter() {
  return (
    <div>
      <img
        src={PolicyEngineMainLogo}
        width={350}
        style={{ marginBottom: 50 }}
        alt="PolicyEngine logo"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ContactUs />
          <SocialLinks />
        </div>
        <TwitterEmbed />
        <div style={{ marginTop: 20 }}>
          <SubscribeToPolicyEngine displaySize="mobile" />
        </div>
      </div>
    </div>
  );
}
