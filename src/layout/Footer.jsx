import style from "../redesign/style";
import Section from "../redesign/components/Section";
import PolicyEngineMainLogo from "../images/logos/policyengine/white.svg";
import useDisplayCategory from "../hooks/useDisplayCategory";
import { SubscribeToPolicyEngine } from "../redesign/components/HomeSubscribe";
import {
  FacebookFilled,
  GithubFilled,
  InstagramFilled,
  LinkedinFilled,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import { createElement } from "react";
import useCountryId from "../hooks/useCountryId";
import { Link } from "react-router-dom";

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

function LinkSection() {
  const countryId = useCountryId();

  const title = countryId === "uk" ? "Our organisation" : "Our organization";

  const linkData = [
    {
      link: "mailto:hello@policyengine.org",
      label: "Email Us",
      isInternal: false,
    },
    {
      link: `/${countryId}/about`,
      label: "About Us",
      isInternal: true,
    },
    {
      link: `/${countryId}/donate`,
      label: "Donate",
      isInternal: true,
    },
    {
      link: `/${countryId}/privacy`,
      label: "Privacy Policy",
      isInternal: true,
    },
    {
      link: `/${countryId}/terms`,
      label: "Terms and Conditions",
      isInternal: true,
    },
  ];

  const links = linkData.map((link, index) => {
    return (
      <p
        key={index}
        style={{
          marginBottom: "0.5rem",
        }}
      >
        {link.isInternal ? (
          <Link
            to={link.link}
            className="link-inverted"
            style={{ textDecorationLine: "none" }}
          >
            {link.label}
          </Link>
        ) : (
          <a
            href={link.link}
            className="link-inverted"
            style={{ textDecorationLine: "none" }}
          >
            {link.label}
          </a>
        )}
      </p>
    );
  });

  return (
    <div>
      <h2 style={{ color: "white" }}>{title}</h2>
      {links}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ color: "white", margin: "0" }}>
          Follow us on social media
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
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
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: "20px",
      }}
    >
      <h2 style={{ color: "white", marginBottom: "0" }}>
        Follow us on social media
      </h2>
      <div
        style={{
          marginBottom: displayCategory === "desktop" ? 0 : 30,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {firstThree}
        {lastThree}
      </div>
    </div>
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <img src={PolicyEngineMainLogo} alt="PolicyEngine logo" width="100%" />
      <LinkSection />
      <SubscribeToPolicyEngine displaySize="mobile" />
      <SocialLinks />
    </div>
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
        <LinkSection />
        <SubscribeToPolicyEngine displaySize="mobile" />
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
          <LinkSection />
          <SocialLinks />
        </div>

        <div>
          <SubscribeToPolicyEngine displaySize="mobile" />
        </div>
      </div>
    </div>
  );
}
