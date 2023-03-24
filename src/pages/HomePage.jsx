import style from "../style";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import useMobile from "../layout/Responsive";
import BlogPostHolder from "../layout/BlogPostHolder";
import householdBaseline from "../images/home/householdBaseline.png";
import policyImpact from "../images/home/policyImpact.png";
import policyScore from "../images/home/policyScore.png";
import gtag from "../api/analytics";
import { Carousel } from "antd";

import RobertColvile from "../images/headshots/robert-colvile.jpeg";
import SimonDuffy from "../images/headshots/simon-duffy.jpeg";
import MartinFarley from "../images/headshots/martin-farley.jpeg";
import TorrinWilkins from "../images/headshots/torrin-wilkins.webp";
import ChrisHolmes from "../images/headshots/chris-holmes.webp";

import BrianHiatt from "../images/headshots/brian-hiatt.png";
import DarrylFinkton from "../images/headshots/darryl-finkton.jpeg";
import NateGolden from "../images/headshots/nate-golden.jpg";
import NikaSoonShiong from "../images/headshots/nika-soon-shiong.png";

import Centre from "../images/logos/orgs/centre.webp";
import CPS from "../images/logos/orgs/cps.png";
import GPEW from "../images/logos/orgs/gpew.png";
import LiberalParty from "../images/logos/orgs/liberal-party.jpeg";
import SMF from "../images/logos/orgs/smf.png";
import UBILabs from "../images/logos/orgs/ubilabs.png";
import UKEU from "../images/logos/orgs/ukeu.svg";
import ASI from "../images/logos/orgs/asi.webp";
import CEC from "../images/logos/orgs/cec.svg";

import CGO from "../images/logos/orgs/cgo.jpg";
import EPMT from "../images/logos/orgs/epmt.jpg";
import F4GI from "../images/logos/orgs/f4gi.jpg";
import GCV from "../images/logos/orgs/gary-community-ventures.png";
import MCA from "../images/logos/orgs/mca.jpg";
import UBICenter from "../images/logos/orgs/ubicenter.png";
import MothersOutreachNetwork from "../images/logos/orgs/mothers-outreach-network.png";
import PRCarousel from "./home/GitHubActivity";

function HouseholdPolicyOptions(props) {
  const { countryId } = props;
  const navigate = useNavigate();
  const mobile = useMobile();

  const boxWidth = 300;

  return (
    <div
      style={{
        paddingTop: 20,
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        alignItems: "center",
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <motion.div
        style={{
          width: boxWidth,
          height: boxWidth,
          backgroundColor: style.colors.LIGHT_GRAY,
          padding: 20,
          cursor: "pointer",
          marginRight: mobile ? 0 : 20,
          marginBottom: mobile ? 20 : 0,
        }}
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          navigate(`/${countryId}/household`);
          gtag("event", "navigate", {
            event_category: "home",
            event_label: "Home -> Household",
          });
        }}
      >
        <h2>Compute my household income</h2>
        <p>
          Use PolicyEngine to calculate your taxes and benefits, and explore how
          they&apos;d change under different scenarios and policies.
        </p>
      </motion.div>
      <motion.div
        style={{
          width: boxWidth,
          height: boxWidth,
          backgroundColor: style.colors.LIGHT_GRAY,
          padding: 20,
          cursor: "pointer",
        }}
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          navigate(`/${countryId}/policy`);
          gtag("event", "navigate", {
            event_category: "home",
            event_label: "Home -> Policy",
          });
        }}
      >
        <h2>Compute the impact of policy reforms</h2>
        <p>
          Use PolicyEngine to build reforms to taxes and benefits, and see how
          they&apos;d affect the economy and individual households.
        </p>
      </motion.div>
    </div>
  );
}

function WidePanelHalf(props) {
  const { direction, children } = props;
  return (
    <motion.div
      style={{
        padding: 20,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 10,
        width: "100%",
        height: "100%",
      }}
      initial={{ opacity: 0, x: direction === "left" ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}

export function WidePanel(props) {
  const { left, right, direction, backgroundColor } = props;
  const mobile = useMobile();

  if (mobile) {
    return (
      <div
        style={{
          backgroundColor: backgroundColor,
          marginTop: 25,
          marginBottom: 25,
          overflowX: "hidden",
        }}
      >
        <Container style={{ paddingTop: 100, paddingBottom: 100 }}>
          <WidePanelHalf direction={direction}>{left}</WidePanelHalf>
          <WidePanelHalf direction={direction}>{right}</WidePanelHalf>
        </Container>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        height: !mobile && 500,
        marginTop: 25,
        marginBottom: 25,
      }}
    >
      <Container style={{ paddingTop: 100, paddingBottom: 100 }}>
        <Row>
          <Col>
            <WidePanelHalf direction={direction}>{left}</WidePanelHalf>
          </Col>
          <Col>
            <WidePanelHalf direction={direction}>{right}</WidePanelHalf>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default function HomePage(props) {
  const { countryId } = props;
  const mobile = useMobile();
  // Items are centered horizontally, and placed in order vertically.
  return (
    <>
      <div
        style={{
          paddingLeft: 50,
          paddingRight: 50,
          paddingTop: 70,
          display: "flex",
          flexDirection: "column",
          alignItems: !mobile && "center",
          marginBottom: 50,
        }}
      >
        <div
          style={{
            paddingRight: 0,
            paddingLeft: 0,
          }}
        >
          <h1>We compute the impact of public policy.</h1>
          <h4>
            PolicyEngine&apos;s free, open-source software turns law into code.
          </h4>
        </div>
        <HouseholdPolicyOptions countryId={countryId} />
      </div>
      <BlogPostHolder countryId={countryId} />
      <Collaborations countryId={countryId} />
      <WidePanel
        direction="right"
        backgroundColor={style.colors.WHITE}
        right={
          <>
            <h1 style={{ paddingBottom: 30 }}>
              Simulate the full tax-benefit system on any household
            </h1>
            <h5>
              Our free and open-source models describe a country&apos;s tax and
              benefit laws. Describe a household&apos;s characteristics and
              instantly compute their taxes, benefits, marginal tax rates and
              more.
            </h5>
          </>
        }
        left={
          <img
            src={householdBaseline}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            alt="Household baseline"
          />
        }
      />
      <WidePanel
        direction="left"
        backgroundColor={style.colors.LIGHT_GRAY}
        left={
          <>
            <h1 style={{ paddingBottom: 30 }}>Design custom policy reforms</h1>
            <h5>
              PolicyEngine&apos;s country models contains hundreds of
              customisable policy parameters and can handle structural reforms.
            </h5>
          </>
        }
        right={
          <img
            src={policyScore}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            alt="Policy score"
          />
        }
      />
      <WidePanel
        direction="right"
        backgroundColor={style.colors.WHITE}
        right={
          <>
            <h1 style={{ paddingBottom: 30 }}>
              See how reforms affect households
            </h1>
            <h5>
              Evaluate the impact of changes to policy rules on households or
              entire economics within seconds, and iterate quickly over policy
              ideas.
            </h5>
          </>
        }
        left={
          <img
            src={policyImpact}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            alt="Policy impact"
          />
        }
      />
      <PRCarousel />
      <APIDemo countryId={countryId} />
    </>
  );
}

function Collaborations(props) {
  const { countryId } = props;

  const quoteData = {
    uk: [
      {
        name: "Robert Colvile",
        position: "Director of the Centre for Policy Studies",
        quote:
          "PolicyEngine has been a really valuable addition to the UK policy space, democratising access to economic modelling and making it easier than ever to apply actual numbers to the policy debate.",
        headshot: RobertColvile,
      },
      {
        name: "Martin Farley",
        position:
          "Convener of the Green Party&apos;s Tax and Fiscal Policy Working Group",
        quote:
          "PolicyEngine has transformed the Green Party&apos;s ability to measure and understand the impact of its policy platform in a way that seemed impossible before. Its ability to process complex data and turn it into policy outcomes brings clarity and direction to policies at a stroke. An amazing tool that should be used in all discussions about policy in the future.",
        headshot: MartinFarley,
      },
      {
        name: "Dr Christopher Holmes",
        position:
          "Director of the Citizens’ Economic Council on the Cost of Living",
        quote:
          "PolicyEngine is an essential tool in the fight to democratise economics, because it gives a much wider group of people and organisations the ability to test out fiscal policy decisions, and see the potential impacts for themselves. Their input has been really important for our project, helping us to show ordinary citizens the effects of various tax/spend decisions on different types of households in the UK.",
        headshot: ChrisHolmes,
      },
      {
        name: "Dr Simon Duffy",
        position: "Director of Citizen Network Research",
        quote:
          "PolicyEngine is exactly what the world of policy-making needs today. For too long policy on tax and benefits has been lost in a fog of confusion and misleading rhetoric. To have democratic conversations about tax and benefits we need to look the overall picture and see what policies will mean for individuals and families. PolicyEngine pulls back the curtain on tax and benefits and helps us find the courage to introduce real reforms.",
        headshot: SimonDuffy,
      },
      {
        name: "Torrin Wilkins",
        position: "Director and Founder of Centre Think Tank",
        quote:
          "PolicyEngine is an incredible tool for think tanks, policy makers and anyone who wants to understand the impact of policy decisions. It has been invaluable for Centre Think Tank when writing reports and has allowed us to propose new policies with ease whilst clearly breaking down the impacts on different groups. For us it has been a game changer.",
        headshot: TorrinWilkins,
      },
    ],
    us: [
      {
        name: "Darryl Finkton Jr.",
        position: "Founder of End Poverty Make Trillions",
        quote:
          "PolicyEngine is bringing applied science and rationality to governance. We have the ability to design sustainable, effective systems if we just use all the wonderful data we have at our disposal. Move partisan politics aside so we can create a world that makes sense.",
        headshot: DarrylFinkton,
      },
      {
        name: "Nate Golden",
        position: "Founder and President of the Maryland Child Alliance",
        quote:
          "As an advocacy organization, it is crucial that we approach conversations with elected officials armed with the most accurate and relevant data possible. PolicyEngine is a valuable tool in this regard, enabling us not only to effectively address concerns about funding, but also to present detailed and robust analyses of how our proposals would affect the state economy in a variety of ways, such as reducing poverty and inequality. The use of PolicyEngine&apos;s data has been instrumental in establishing our organization as a credible and respected voice in the state capitol.",
        headshot: NateGolden,
      },
      {
        name: "Brian Hiatt",
        position: "Vice President of Technology at Gary Community Ventures",
        quote:
          "Thanks to PolicyEngine, we have been able to help more families access the resources they need to grow income and build wealth. We&apos;re grateful to have such a reliable partner on our side.",
        headshot: BrianHiatt,
      },
      {
        name: "Nika Soon-Shiong",
        position:
          "Founder and Executive Director of the Fund for Guaranteed Income",
        quote:
          "As low-income families face a web of opaque, disconnected welfare systems, millions are left excluded or unsupported from the benefits they deserve. It’s critical for organizations such as PolicyEngine to chart new research, technology, and coalitions that can change this unacceptable status quo. I’m very excited to show our new Benefits Screener to the world this year.",
        headshot: NikaSoonShiong,
      },
    ],
  };

  // eslint-disable-next-line
  const orgData = {
    uk: {
      ukeu: {
        logo: UKEU,
        link: "https://ukandeu.ac.uk/energy-subsidy/",
      },
      green_party: {
        logo: GPEW,
        link: "https://martin-farley.medium.com/poverty-buster-the-impact-of-the-2019-green-party-manifesto-on-household-incomes-and-equality-9663c39b783b",
      },
      centre: {
        logo: Centre,
        link: "https://centrethinktank.co.uk/2022/04/19/the-land-dividend/",
      },
      smf: {
        logo: SMF,
        link: "https://www.smf.co.uk/commentary_podcasts/cost-of-living-crisis-response/",
      },
      cps: {
        logo: CPS,
        link: "https://cps.org.uk/research/national-insurance-a-plan-to-blunt-the-pain/",
      },
      ubilabs: {
        logo: UBILabs,
        link: "https://www.opendemocracy.net/en/oureconomy/we-want-to-give-everyone-in-britain-400-a-month-no-strings-attached/",
      },
      liberal: {
        logo: LiberalParty,
        link: "https://liberal.org.uk",
      },
      ubicenter: {
        logo: UBICenter,
        link: "https://ubicenter.org/",
      },
      asi: {
        logo: ASI,
        link: "https://www.adamsmith.org/blog/welfare-shouldnt-be-complicated",
      },
      cec: {
        logo: CEC,
        link: "https://citizensecon.org.uk/get-involved",
      },
    },
    us: {
      f4gi: {
        logo: F4GI,
        link: "https://f4gi.org",
      },
      epmt: {
        logo: EPMT,
        link: "https://endpovertymaketrillions.medium.com/economic-modeling-of-how-to-end-poverty-in-the-united-states-while-saving-taxpayers-trillions-of-1679b751d0c0",
      },
      gcv: {
        logo: GCV,
        link: "https://garycommunity.org",
      },
      mca: {
        logo: MCA,
        link: "https://www.marylandchildalliance.org/revenue-raisers",
      },
      cgo: {
        logo: CGO,
        link: "https://www.thecgo.org/research/how-does-targeted-cash-assistance-affect-incentives-to-work/",
      },
      ubicenter: {
        logo: UBICenter,
        link: "https://ubicenter.org/",
      },
      mothers_outreach_network: {
        logo: MothersOutreachNetwork,
        link: "https://mothersoutreachnetwork.org/",
      },
    },
  };
  const mobile = useMobile();
  const countryQuotes = quoteData[countryId] || [];
  if (countryQuotes.length === 0) {
    return null;
  }
  let quoteBlocks = [];

  for (let i = 0; i < countryQuotes.length; i++) {
    const data = countryQuotes[i];
    quoteBlocks.push(
      <div
        key={data.name}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ textAlign: "center" }}>
          {i + 1} of {countryQuotes.length}
        </p>
        <p
          style={{ fontFamily: "Merriweather", fontSize: 20, marginBottom: 50 }}
        >
          {data.quote}
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={data.headshot}
            alt={`${data.name} headshot`}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 20,
              objectFit: "cover",
            }}
          />
        </div>
        <h6 style={{ textAlign: "center" }}>
          <b>{data.name}</b>
        </h6>
        <h6 style={{ textAlign: "center", marginBottom: 50 }}>
          {data.position}
        </h6>
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundColor: style.colors.WHITE,
        marginTop: 25,
      }}
    >
      <Container style={{ paddingTop: 100 }}>
        <Row
          style={{
            paddingLeft: mobile ? 30 : 300,
            paddingRight: mobile ? 30 : 300,
          }}
        >
          <Carousel autoplay autoplaySpeed={10000}>
            {quoteBlocks}
          </Carousel>
        </Row>
        <Row style={{ justifyContent: "center", alignItems: "center" }}>
          {Object.values(orgData[countryId] || {}).map((org) => (
            <Col
              key={org.link}
              style={{
                padding: mobile ? 20 : 10,
                minWidth: 50,
                justifyContent: "center",
                display: "flex",
              }}
            >
              <a href={org.link}>
                <img
                  src={org.logo}
                  height={mobile ? 30 : 50}
                  width={mobile ? 90 : 130}
                  style={{ objectFit: "contain" }}
                  alt="test"
                />
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

function APIDemo(props) {
  const mobile = useMobile();
  const { countryId } = props;
  return (
    <div
      style={{
        backgroundColor: style.colors.WHITE,
        marginTop: 25,
        marginBottom: 50,
      }}
    >
      <Container fluid>
        <Row
          style={{
            paddingLeft: mobile ? 30 : 50,
            paddingRight: mobile ? 30 : 50,
            paddingTop: 100,
          }}
        >
          <h2 style={{ paddingLeft: 90, paddingRight: 90 }}>
            PolicyEngine&apos;s free API computes policy impacts
          </h2>
          <h5 style={{ paddingLeft: 90, paddingRight: 90 }}>
            Instantly compute taxes and benefits for any household under current
            or reformed policy rules, using the PolicyEngine REST API.
          </h5>
          <iframe
            src={`https://policyengine-policyengine-api-demo-app-xy5rgn.streamlit.app/~/+/?mode=${countryId}`}
            title="PolicyEngine API demo"
            width={mobile ? 400 : 1_500}
            height="500px"
          />
        </Row>
      </Container>
    </div>
  );
}
