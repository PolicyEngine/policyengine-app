import Centre from "../images/logos/orgs/centre.png";
import CPS from "../../images/logos/orgs/cps.png";
import GPEW from "../../images/logos/orgs/gpew.png";
import LiberalParty from "../../images/logos/orgs/liberal-party.jpeg";
import SMF from "../../images/logos/orgs/smf.png";
import UBILabs from "../../images/logos/orgs/ubilabs.png";
import UKEU from "../../images/logos/orgs/ukeu.svg";
import ASI from "../../images/logos/orgs/asi.webp";
import CEC from "../../images/logos/orgs/cec.svg";
import CGO from "../../images/logos/orgs/cgo.jpg";
import EPMT from "../../images/logos/orgs/epmt.jpg";
import F4GI from "../../images/logos/orgs/f4gi.jpg";
import GCV from "../../images/logos/orgs/gary-community-ventures.png";
import MCA from "../../images/logos/orgs/mca.jpg";
import UBICenter from "../../images/logos/orgs/ubicenter.png";
import MothersOutreachNetwork from "../../images/logos/orgs/mothers-outreach-network.png";
import NIESR from "../images/logos/orgs/niesr.jpeg";

// eslint-disable-next-line
export const orgData = {
  uk: {
    ukeu: {
      name: "UK in a Changing Europe",
      logo: UKEU,
      link: "https://ukandeu.ac.uk/energy-subsidy/",
    },
    niesr: {
      name: "National Institute of Economic and Social Research",
      logo: NIESR,
      link: "https://www.niesr.ac.uk/",
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

export const allOrgs = Object.assign({}, ...Object.values(orgData));
