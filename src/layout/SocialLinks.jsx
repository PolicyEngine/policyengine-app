/*
 * Social links component - the social media icons.
 */

import {
  InstagramOutlined,
  TwitterOutlined,
  GithubOutlined,
  MailOutlined,
} from "@ant-design/icons";

import LinkedInLogo from "../images/logos/linkedin_logo.png";
import FacebookLogo from "../images/logos/facebook_logo.png";

export default function SocialLinks(props) {
  const iconStyle = { marginLeft: 15, fontSize: 15, color: props.color };
  const importedIconStyle = {
    height: "14px",
    marginLeft: 15,
    filter: props.color === "black" ? "" : "invert(1)",
  };
  const aStyle = { alignItems: "center", display: "flex"}
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <a href="https://twitter.com/ThePolicyEngine" style={aStyle}>
        <TwitterOutlined style={iconStyle} />
      </a>
      <a href="https://facebook.com/PolicyEngine" style={aStyle}>
        <img src={FacebookLogo} style={importedIconStyle} alt="Facebook logo" />
      </a>
      <a href="https://linkedin.com/company/ThePolicyEngine" style={aStyle}>
        <img src={LinkedInLogo} style={importedIconStyle} alt="LinkedIn logo" />
      </a>
      <a href="https://instagram.com/PolicyEngine" style={aStyle}>
        <InstagramOutlined style={iconStyle} />
      </a>
      <a href="https://github.com/PolicyEngine" style={aStyle}>
        <GithubOutlined style={iconStyle} />
      </a>
      <a href="mailto:hello@policyengine.org" style={aStyle}>
        <MailOutlined style={iconStyle} />
      </a>
    </div>
  );
}
