import { useDisplayCategory } from "layout/Responsive";
import style from "./style";
import PolicyEngineMainLogo from "../images/logos/policyengine/white.svg";
import PolicyEngineSmallLogo from "../images/logos/policyengine/profile/white.svg";
import CalculatorIcon from "./images/icons/calculator.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

const quoteData = {
  uk: [
    {
      name: "Robert Colvile",
      position: "Director of the Centre for Policy Studies",
      quote:
        "PolicyEngine has been a really valuable addition to the UK policy space, democratising access to economic modelling and making it easier than ever to apply actual numbers to the policy debate.",
      headshot: RobertColvile,
      org: "cps",
    },
    {
      name: "Martin Farley",
      position:
        "Convener of the Green Party's Tax and Fiscal Policy Working Group",
      quote:
        "PolicyEngine has transformed the Green Party's ability to measure and understand the impact of its policy platform in a way that seemed impossible before. Its ability to process complex data and turn it into policy outcomes brings clarity and direction to policies at a stroke. An amazing tool that should be used in all discussions about policy in the future.",
      headshot: MartinFarley,
      org: "green_party",
    },
    {
      name: "Dr Christopher Holmes",
      position:
        "Director of the Citizens’ Economic Council on the Cost of Living",
      quote:
        "PolicyEngine is an essential tool in the fight to democratise economics, because it gives a much wider group of people and organisations the ability to test out fiscal policy decisions, and see the potential impacts for themselves. Their input has been really important for our project, helping us to show ordinary citizens the effects of various tax/spend decisions on different types of households in the UK.",
      headshot: ChrisHolmes,
      org: "cec",
    },
    {
      name: "Dr Simon Duffy",
      position: "Director of Citizen Network Research",
      quote:
        "PolicyEngine is exactly what the world of policy-making needs today. For too long policy on tax and benefits has been lost in a fog of confusion and misleading rhetoric. To have democratic conversations about tax and benefits we need to look the overall picture and see what policies will mean for individuals and families. PolicyEngine pulls back the curtain on tax and benefits and helps us find the courage to introduce real reforms.",
      headshot: SimonDuffy,
      org: "ubilabs",
    },
    {
      name: "Torrin Wilkins",
      position: "Director and Founder of Centre Think Tank",
      quote:
        "PolicyEngine is an incredible tool for think tanks, policy makers and anyone who wants to understand the impact of policy decisions. It has been invaluable for Centre Think Tank when writing reports and has allowed us to propose new policies with ease whilst clearly breaking down the impacts on different groups. For us it has been a game changer.",
      headshot: TorrinWilkins,
      org: "centre",
    },
  ],
  us: [
    {
      name: "Darryl Finkton Jr.",
      position: "Founder of End Poverty Make Trillions",
      quote:
        "PolicyEngine is bringing applied science and rationality to governance. We have the ability to design sustainable, effective systems if we just use all the wonderful data we have at our disposal. Move partisan politics aside so we can create a world that makes sense.",
      headshot: DarrylFinkton,
      org: "epmt",
    },
    {
      name: "Nate Golden",
      position: "Founder and President of the Maryland Child Alliance",
      quote:
        "As an advocacy organization, it is crucial that we approach conversations with elected officials armed with the most accurate and relevant data possible. PolicyEngine is a valuable tool in this regard, enabling us not only to effectively address concerns about funding, but also to present detailed and robust analyses of how our proposals would affect the state economy in a variety of ways, such as reducing poverty and inequality.", // The use of PolicyEngine's data has been instrumental in establishing our organization as a credible and respected voice in the state capitol.",
      headshot: NateGolden,
      org: "mca",
    },
    {
      name: "Brian Hiatt",
      position: "Vice President of Technology at Gary Community Ventures",
      quote:
        "Thanks to PolicyEngine, we have been able to help more families access the resources they need to grow income and build wealth. We're grateful to have such a reliable partner on our side.",
      headshot: BrianHiatt,
      org: "gcv",
    },
    {
      name: "Nika Soon-Shiong",
      position:
        "Founder and Executive Director of the Fund for Guaranteed Income",
      quote:
        "As low-income families face a web of opaque, disconnected welfare systems, millions are left excluded or unsupported from the benefits they deserve. It’s critical for organizations such as PolicyEngine to chart new research, technology, and coalitions that can change this unacceptable status quo. I’m very excited to show our new Benefits Screener to the world this year.",
      headshot: NikaSoonShiong,
      org: "f4gi",
    },
  ],
};

// eslint-disable-next-line
const orgData = {
  uk: {
    ukeu: {
      name: "UK in a Changing Europe",
      logo: UKEU,
      link: "https://ukandeu.ac.uk/energy-subsidy/",
    },
    green_party: {
      name: "Green Party of England and Wales",
      logo: GPEW,
      link: "https://martin-farley.medium.com/poverty-buster-the-impact-of-the-2019-green-party-manifesto-on-household-incomes-and-equality-9663c39b783b",
    },
    centre: {
      name: "Centre Think Tank",
      logo: Centre,
      link: "https://centrethinktank.co.uk/2022/04/19/the-land-dividend/",
    },
    smf: {
      name: "Social Market Foundation",
      logo: SMF,
      link: "https://www.smf.co.uk/commentary_podcasts/cost-of-living-crisis-response/",
    },
    cps: {
      name: "Centre for Policy Studies",
      logo: CPS,
      link: "https://cps.org.uk/research/national-insurance-a-plan-to-blunt-the-pain/",
    },
    ubilabs: {
      name: "UBILabs",
      logo: UBILabs,
      link: "https://www.opendemocracy.net/en/oureconomy/we-want-to-give-everyone-in-britain-400-a-month-no-strings-attached/",
    },
    liberal: {
      name: "The Liberal Party",
      logo: LiberalParty,
      link: "https://liberal.org.uk",
    },
    ubicenter: {
      name: "UBI Center",
      logo: UBICenter,
      link: "https://ubicenter.org/",
    },
    asi: {
      name: "Adam Smith Institute",
      logo: ASI,
      link: "https://www.adamsmith.org/blog/welfare-shouldnt-be-complicated",
    },
    cec: {
      name: "Citizens' Economic Council",
      logo: CEC,
      link: "https://citizensecon.org.uk/get-involved",
    },
  },
  us: {
    f4gi: {
      name: "Fund for Guaranteed Income",
      logo: F4GI,
      link: "https://f4gi.org",
    },
    epmt: {
      name: "End Poverty, Make Trillions",
      logo: EPMT,
      link: "https://endpovertymaketrillions.medium.com/economic-modeling-of-how-to-end-poverty-in-the-united-states-while-saving-taxpayers-trillions-of-1679b751d0c0",
    },
    gcv: {
      name: "Gary Community Ventures",
      logo: GCV,
      link: "https://garycommunity.org",
    },
    mca: {
      name: "Maryland Child Alliance",
      logo: MCA,
      link: "https://www.marylandchildalliance.org/revenue-raisers",
    },
    cgo: {
      name: "Center for Growth and Opportunity",
      logo: CGO,
      link: "https://www.thecgo.org/research/how-does-targeted-cash-assistance-affect-incentives-to-work/",
    },
    ubicenter: {
      name: "UBI Center",
      logo: UBICenter,
      link: "https://ubicenter.org/",
    },
    mothers_outreach_network: {
      name: "Mothers Outreach Network",
      logo: MothersOutreachNetwork,
      link: "https://mothersoutreachnetwork.org/",
    },
  },
};

export default function PolicyEngine() {
  const [countryId] = useState("us");
  return (
    <div>
      <HeaderBar />
      <IntroductionToPolicyEngine countryId={countryId} />
      <CalculatorCallToAction />
      <SubscribeToPolicyEngine />
    </div>
  );
}

function HeaderBar() {
  const displayCategory = useDisplayCategory();
  return (
    <>
      <div
        style={{
          backgroundColor: style.colors.BLUE_PRIMARY,
          width: "100%",
          height: 90,
          display: "flex",
          alignItems: "center",
          position: "fixed",
          zIndex: 100,
        }}
      >
        {
          {
            mobile: <MobileHeaderBar />,
            tablet: <TabletHeaderBar />,
            desktop: <DesktopHeaderBar />,
          }[displayCategory]
        }
      </div>
      <div
        style={{
          height: 90,
        }}
      />
    </>
  );
}

function MobileHeaderBar() {
  return (
    <>
      <MobileHeaderLogo />
      <MobileCalculatorButton />
      <Hamburger />
    </>
  );
}

function TabletHeaderBar() {
  return (
    <>
      <MainHeaderLogo />
      <DesktopCalculatorButton />
      <Hamburger />
    </>
  );
}

function DesktopHeaderBar() {
  return (
    <>
      <MainHeaderLogo />
      <PageLinks />
      <DesktopCalculatorButton />
    </>
  );
}

function MobileHeaderLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        maxWidth: "20vw",
      }}
    >
      <img
        src={PolicyEngineSmallLogo}
        alt="PolicyEngine logo"
        style={{
          height: 50,
          margin: 20,
        }}
      />
    </div>
  );
}

function MobileCalculatorButton() {
  return (
    <div
      style={{
        backgroundColor: "#39C6C0",
        height: 50,
        width: 50,
        margin: 20,
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <img
        src={CalculatorIcon}
        alt="Calculator icon"
        style={{
          height: 30,
          width: 30,
          objectFit: "contain",
        }}
      />
    </div>
  );
}

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        style={{
          height: 50,
          width: 50,
          margin: 20,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          padding: 15,
          color: "white",
          border: "1px solid white",
          fontSize: 20,
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="material-symbols-outlined"
          alt="Hamburger icon"
          style={{
            objectFit: "contain",
            color: "white",
          }}
        >
          {isOpen ? "close" : "menu"}
        </span>
      </div>
      <LeftNavigationMenu isOpen={isOpen} />
    </>
  );
}

function DesktopCalculatorButton() {
  return (
    <>
      <HoverBox
        hoverBackgroundColor={style.colors.TEAL_PRESSED}
        direction="left"
        style={{
          margin: 20,
          marginLeft: "auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          backgroundColor: style.colors.TEAL_ACCENT,
          color: "white",
          padding: 15,
          paddingLeft: 30,
          paddingRight: 30,
          fontSize: 20,
          fontFamily: "Roboto",
          fontWeight: 500,
          letterSpacing: 2.4,
          cursor: "pointer",
        }}
      >
        CALCULATE
      </HoverBox>
    </>
  );
}

function MainHeaderLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "min(300px, 25vw)",
        margin: 20,
      }}
    >
      <img
        src={PolicyEngineMainLogo}
        alt="PolicyEngine logo"
        style={{
          // make whatever height fits the container
          width: "min(300px, 25vw)",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

function PageLinks() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "min(600px, 50vw)",
        paddingLeft: 30,
      }}
    >
      {["Research", "About", "Contact", "Donate"].map((link) => {
        return (
          <div
            style={{
              color: "white",
              margin: 15,
              fontSize: 20,
              fontFamily: "Roboto",
              fontWeight: 500,
              letterSpacing: 2.4,
              textTransform: "uppercase",
            }}
            key={link}
          >
            <HoverBox
              hoverBackgroundColor={style.colors.WHITE}
              direction="bottom"
            >
              <motion.div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 90,
                  padding: 15,
                  cursor: "pointer",
                }}
                whileHover={{
                  color: style.colors.BLUE_PRIMARY,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                {link}
              </motion.div>
            </HoverBox>
          </div>
        );
      })}
    </div>
  );
}

function HoverBox(props) {
  const { hoverBackgroundColor, direction, children, size, ...rest } = props;

  let topStart, leftStart, topEnd, leftEnd, spread;

  const boxSize = size || "200px";

  spread = "0px";

  if (direction === "top") {
    topStart = "0px";
    leftStart = "0px";
    topEnd = boxSize;
    leftEnd = "0px";
  } else if (direction === "bottom") {
    topStart = "0px";
    leftStart = "0px";
    topEnd = `-${boxSize}`;
    leftEnd = "0px";
  } else if (direction === "left") {
    topStart = "0px";
    leftStart = "0px";
    topEnd = "0px";
    leftEnd = boxSize;
  } else if (direction === "right") {
    topStart = "0px";
    leftStart = "0px";
    topEnd = "0px";
    leftEnd = `-${boxSize}`;
  }

  const containerStyle = {
    transition: "box-shadow 0.1s ease-out",
    position: "relative",
    overflow: "hidden", // Hide the box-shadow overflow
    boxShadow: `inset ${leftStart} ${topStart} ${spread} ${hoverBackgroundColor}`,
  };

  const hoverStyle = {
    boxShadow: `inset ${leftEnd} ${topEnd} 0 ${spread} ${hoverBackgroundColor}`, // This will create the effect
  };

  // Should use box-shadow to have a different background fill up from the bottom on hover
  return (
    <div
      {...rest}
      style={{ ...containerStyle, ...(props.style || {}) }}
      onMouseOver={(e) =>
        (e.currentTarget.style.boxShadow = hoverStyle.boxShadow)
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.boxShadow = containerStyle.boxShadow)
      }
    >
      {children}
    </div>
  );
}

function LeftNavigationMenu(props) {
  // The menu that slides in from the left when the hamburger is clicked
  const { isOpen } = props;
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: style.colors.BLUE_PRIMARY,
        zIndex: -1,
        paddingTop: 100,
      }}
      initial={{
        y: "-100vh",
      }}
      animate={{
        y: isOpen ? 0 : "-100vh",
      }}
      transition={{
        duration: 0.4,
      }}
    >
      {["Research", "About", "Contact", "Donate"].map((link, i) => {
        return (
          <HoverBox
            key={link}
            direction="left"
            size="100vw"
            hoverBackgroundColor={style.colors.WHITE}
            style={{
              margin: 30,
            }}
          >
            <motion.div
              style={{
                cursor: "pointer",
                color: "white",
                fontSize: 20,
                fontFamily: "Roboto",
                fontWeight: 500,
                letterSpacing: 2.4,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 90,
                padding: 15,
                border: "1px solid white",
                zIndex: 100,
              }}
              key={link}
              initial={{
                opacity: 0,
                x: -50,
                color: style.colors.WHITE,
              }}
              whileHover={{
                color: style.colors.BLUE_PRIMARY,
              }}
              animate={
                isOpen
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : {
                      opacity: 0,
                      x: -50,
                    }
              }
              transition={{
                duration: isOpen ? 0.3 : 0.1,
                delay: isOpen ? 0.1 * i + 0.2 : 0,
                color: {
                  duration: 0.1,
                  delay: 0,
                },
              }}
            >
              {link}
            </motion.div>
          </HoverBox>
        );
      })}
    </motion.div>
  );
}

function IntroductionToPolicyEngine(props) {
  const { countryId } = props;
  const displayCategory = useDisplayCategory();
  return {
    mobile: <MobileIntroduction countryId={countryId} />,
    tablet: <TabletIntroduction countryId={countryId} />,
    desktop: <DesktopIntroduction countryId={countryId} />,
  }[displayCategory];
}

function DesktopIntroduction(props) {
  const { countryId } = props;
  return (
    <div
      style={{
        padding: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Roboto Serif",
      }}
    >
      <ComputingPublicPolicyForEveryone />
      <div
        style={{
          border: "0.5px solid black",
          height: 250,
          margin: 20,
        }}
      />
      <QuoteBox countryId={countryId} />
    </div>
  );
}

function ComputingPublicPolicyForEveryone() {
  const displayCategory = useDisplayCategory();
  const desktop = {
    width: 200,
    margin: 20,
  };
  const tablet = {
    width: "75vw",
    margin: 20,
    marginBottom: 0,
  };
  const mobile = {
    width: "75vw",
    margin: 20,
    marginBottom: 0,
  };
  return (
    <div style={{ desktop, tablet, mobile }[displayCategory]}>
      <h4
        style={{
          fontSize: 30,
          color: style.colors.BLUE_PRIMARY,
        }}
      >
        Computing public policy for everyone
      </h4>
    </div>
  );
}

function TabletIntroduction(props) {
  const { countryId } = props;
  return (
    <div
      style={{
        padding: 20,
        paddingTop: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Roboto Serif",
      }}
    >
      <ComputingPublicPolicyForEveryone />
      <div
        style={{
          border: "0.5px solid black",
          width: "75vw",
          marginTop: 0,
          marginBottom: 45,
        }}
      />
      <QuoteBox countryId={countryId} />
    </div>
  );
}

function MobileIntroduction(props) {
  const { countryId } = props;
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Roboto Serif",
      }}
    >
      <ComputingPublicPolicyForEveryone />
      <div
        style={{
          border: "0.5px solid black",
          width: "75vw",
          margin: 20,
          marginTop: 0,
        }}
      />
      <QuoteBox countryId={countryId} />
    </div>
  );
}

function QuoteBox(props) {
  const { countryId } = props;
  const displayCategory = useDisplayCategory();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Automatically cycle through quotes, moving once every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(
        (currentQuoteIndex + 1) % quoteData[countryId].length
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [currentQuoteIndex, countryId]);
  const currentQuote = quoteData[countryId][currentQuoteIndex];
  return (
    <div
      style={{
        backgroundColor: style.colors.TEAL_LIGHT,
        width: displayCategory === "desktop" ? "50vw" : "75vw",
        minHeight: displayCategory === "desktop" ? 250 : 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20,
      }}
    >
      <QuoteText text={currentQuote.quote} />
      <div
        style={{
          border: `0.5px solid ${style.colors.MEDIUM_DARK_GRAY}`,
          marginTop: 10,
          marginBottom: 10,
          width: "100%",
        }}
      ></div>
      <div style={{ width: "100%" }}>
        <QuoteBio
          headshot={currentQuote.headshot}
          orgLink={orgData[countryId][currentQuote.org].link}
          orgLogo={orgData[countryId][currentQuote.org].logo}
          author={currentQuote.name}
          org={orgData[countryId][currentQuote.org].name}
        />
        {displayCategory === "mobile" && (
          <div
            style={{ display: "flex", justifyContent: "center", margin: 10 }}
          >
            <ReadMoreAboutThisQuote />
          </div>
        )}
      </div>
      <div
        style={{
          border: `0.5px solid ${style.colors.MEDIUM_DARK_GRAY}`,
          marginTop: 10,
          width: "100%",
        }}
      ></div>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <QuoteBoxProgressIndicator
          current={currentQuoteIndex}
          total={quoteData[countryId].length}
          setCurrent={setCurrentQuoteIndex}
        />
      </div>
    </div>
  );
}

function QuoteBio(props) {
  const { headshot, orgLogo, orgLink, author, org } = props;
  const displayCategory = useDisplayCategory();
  if (displayCategory !== "mobile") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <QuoteImages headshot={headshot} orgLogo={orgLogo} orgLink={orgLink} />
        <div>
          <QuoteOrg org={org} />
          <QuoteAuthor author={author} />
        </div>
        <div style={{ marginLeft: "auto" }} />
        <ReadMoreAboutThisQuote />
      </div>
    );
  } else {
    return (
      <>
        <div style={{ paddingLeft: 20, paddingBottom: 10 }}>
          <QuoteAuthor author={author} />
          <QuoteOrg org={org} />
        </div>
        <QuoteImages headshot={headshot} orgLogo={orgLogo} />
      </>
    );
  }
}

function QuoteText(props) {
  const { text } = props;
  const displayCategory = useDisplayCategory();
  return (
    <p
      style={{
        paddingLeft: displayCategory === "mobile" ? 20 : 40,
        paddingRight: displayCategory === "mobile" ? 20 : 40,
        minHeight: displayCategory === "desktop" ? 120 : 50,
        display: "flex",
        alignItems: "center",
      }}
    >
      {text}
    </p>
  );
}

function QuoteAuthor(props) {
  const { author } = props;
  return (
    <p
      style={{
        paddingRight: 40,
        textTransform: "uppercase",
        fontFamily: "Roboto",
        fontWeight: 500,
        fontSize: 12,
        margin: 0,
      }}
    >
      {author}
    </p>
  );
}

function QuoteOrg(props) {
  const { org } = props;
  return (
    <p
      style={{
        paddingRight: 40,
        textTransform: "uppercase",
        fontFamily: "Roboto",
        fontWeight: 300,
        fontSize: 12,
        margin: 0,
      }}
    >
      {org}
    </p>
  );
}

function QuoteImages(props) {
  const { headshot, orgLogo, orgLink } = props;
  const displayCategory = useDisplayCategory();
  const headshotImg = (
    <img src={headshot} alt="Headshot" style={{ height: 40 }} />
  );
  const orgLogoImg = (
    <img
      src={orgLogo}
      alt="Org logo"
      style={{ height: 40, cursor: "pointer" }}
      onClick={
        // Open orgLink in new tab
        () => window.open(orgLink, "_blank")
      }
    />
  );
  const padding = <div style={{ width: 10 }} />;
  const images =
    displayCategory === "mobile"
      ? [headshotImg, padding, orgLogoImg]
      : [orgLogoImg, padding, headshotImg];
  // Headshot then org logo on the right
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingLeft: displayCategory === "mobile" ? 20 : 40,
        paddingRight: 10,
      }}
    >
      {images}
    </div>
  );
}

function QuoteBoxProgressIndicator(props) {
  const { current, total, setCurrent } = props;

  const displayCategory = useDisplayCategory();
  const isDesktop = displayCategory === "desktop";

  // Grey boxes horizontally next to each other, with the current one being a different colour

  let leftArrow = (
    <span
      className="material-symbols-outlined"
      style={{
        color:
          current > 0 ? style.colors.DARK_GRAY : style.colors.MEDIUM_DARK_GRAY,
        fontSize: 20,
        cursor: current > 0 ? "pointer" : "default",
      }}
      onClick={() => {
        if (current > 0) {
          setCurrent(current - 1);
        }
      }}
    >
      arrow_back
    </span>
  );

  leftArrow = isDesktop ? leftArrow : null;

  let rightArrow = (
    <span
      className="material-symbols-outlined"
      style={{
        color:
          current < total - 1
            ? style.colors.DARK_GRAY
            : style.colors.MEDIUM_DARK_GRAY,
        fontSize: 20,
        cursor: current < total - 1 ? "pointer" : "default",
      }}
      onClick={() => {
        if (current < total - 1) {
          setCurrent(current + 1);
        }
      }}
    >
      arrow_forward
    </span>
  );

  rightArrow = isDesktop ? rightArrow : null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
      }}
    >
      {leftArrow}
      {Array(total)
        .fill(0)
        .map((_, i) => {
          return (
            <div
              style={{
                height: 15,
                width: 15,
                backgroundColor:
                  i === current
                    ? style.colors.TEAL_ACCENT
                    : style.colors.MEDIUM_DARK_GRAY,
                border: `2px solid ${style.colors.DARK_GRAY}`,
                margin: 5,
                cursor: "pointer",
              }}
              key={i}
            />
          );
        })}
      {rightArrow}
    </div>
  );
}

function ReadMoreAboutThisQuote() {
  const [hover, setHovering] = useState(false);
  return (
    <HoverBox
      hoverBackgroundColor={style.colors.BLUE_PRIMARY}
      direction="left"
      size="300px"
    >
      <motion.div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: 10,
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        initial={{
          color: style.colors.BLUE_PRIMARY,
        }}
        animate={{
          color: hover ? style.colors.BLUE_LIGHT : style.colors.BLUE_PRIMARY,
        }}
      >
        <p
          style={{
            color: "inherit",
            margin: 0,
            textTransform: "uppercase",
            fontFamily: "Roboto",
            fontWeight: 500,
            marginRight: 10,
          }}
        >
          Read more about this
        </p>
        <span className="material-symbols-outlined">arrow_forward</span>
      </motion.div>
    </HoverBox>
  );
}

function ActionButton(props) {
  const { text, onClick, width, size } = props;
  return (
    <HoverBox
      hoverBackgroundColor={style.colors.TEAL_PRESSED}
      direction="left"
      style={{
        marginTop: 20,
        alignItems: "center",
        display: "flex",
        backgroundColor: style.colors.TEAL_ACCENT,
        color: "white",
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 15,
        fontFamily: "Roboto",
        fontWeight: 500,
        letterSpacing: 2.4,
        cursor: "pointer",
        textTransform: "uppercase",
        width: width || "min(300px, 70vw)",
      }}
      size={size ? size : width ? `${width}px` : "300px"}
      onClick={onClick}
    >
      {text}
      <div style={{ marginLeft: "auto" }} />
      <span className="material-symbols-outlined">arrow_forward</span>
    </HoverBox>
  );
}

function CalculatorCallToAction() {
  const displayCategory = useDisplayCategory();
  return (
    <div
      style={{
        borderTop: `1px solid ${style.colors.MEDIUM_DARK_GRAY}`,
        borderBottom: `1px solid ${style.colors.MEDIUM_DARK_GRAY}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: displayCategory === "mobile" ? 50 : 100,
      }}
    >
      <h3 style={{ fontFamily: "Roboto Serif" }}>
        Compute any public policy reform
      </h3>
      <ActionButton text="Calculate" onClick={() => {}} />
    </div>
  );
}

function SubscribeToPolicyEngine() {
  const displayCategory = useDisplayCategory();
  return (
    <div
      style={{
        backgroundColor: style.colors.BLUE_PRESSED,
      }}
    >
      {
        {
          mobile: <SubscribeToPolicyEngineMobile />,
          tablet: <SubscribeToPolicyEngineTablet />,
          desktop: <SubscribeToPolicyEngineDesktop />,
        }[displayCategory]
      }
    </div>
  );
}

function SubscribeToPolicyEngineDesktop() {
  return (
    <div
      style={{
        padding: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 300,
      }}
    >
      <div style={{ width: "40vw" }}>
        <h2 style={{ fontFamily: "Roboto Serif", color: style.colors.WHITE }}>
          Subscribe to PolicyEngine
        </h2>
        <p style={{ fontFamily: "Roboto Serif", color: style.colors.WHITE }}>
          Get the latests posts delivered right to your inbox.
        </p>
      </div>
      <div style={{ width: "40vw" }}>
        <TextBox
          title="Email"
          placeholder="Enter your email address"
          width={500}
        />
        <ActionButton text="Subscribe" onClick={() => {}} width={500} />
      </div>
    </div>
  );
}

function SubscribeToPolicyEngineTablet() {
  return (
    <div
      style={{
        padding: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 300,
      }}
    >
      <div style={{ width: "40vw", paddingRight: 50 }}>
        <h2 style={{ fontFamily: "Roboto Serif", color: style.colors.WHITE }}>
          Subscribe to PolicyEngine
        </h2>
        <p style={{ fontFamily: "Roboto Serif", color: style.colors.WHITE }}>
          Get the latests posts delivered right to your inbox.
        </p>
      </div>
      <div style={{ width: "40vw" }}>
        <TextBox
          title="Email"
          placeholder="Enter your email address"
          width={400}
        />
        <ActionButton text="Subscribe" onClick={() => {}} width={400} />
      </div>
    </div>
  );
}

function SubscribeToPolicyEngineMobile() {
  return (
    <div
      style={{
        padding: 30,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 50 }}>
        <h2 style={{ fontFamily: "Roboto Serif", color: style.colors.WHITE }}>
          Subscribe to PolicyEngine
        </h2>
        <p style={{ fontFamily: "Roboto Serif", color: style.colors.WHITE }}>
          Get the latests posts delivered right to your inbox.
        </p>
      </div>
      <div>
        <TextBox
          title="Email"
          placeholder="Enter your email address"
          width="100%"
        />
        <ActionButton
          text="Subscribe"
          onClick={() => {}}
          width="100%"
          size="500px"
        />
      </div>
    </div>
  );
}

function TextBox(props) {
  const { placeholder, title, width } = props;

  return (
    <div>
      <h6
        style={{
          color: style.colors.WHITE,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        {title}
      </h6>
      <input
        placeholder={placeholder}
        style={{
          border: "none",
          borderBottom: `1px solid ${style.colors.WHITE}`,
          backgroundColor: style.colors.LIGHT_GRAY,
          color: style.colors.DARK_GRAY,
          width: width || "100%",
          height: 50,
          fontSize: 20,
          fontWeight: 300,
          padding: 10,
        }}
      />
    </div>
  );
}
