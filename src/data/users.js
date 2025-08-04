// User organizations that have used PolicyEngine for policy analysis and research

// Import logos from users directory
import NiskanenCenter from "../images/logos/users/niskanen-center.png";
import JEC from "../images/logos/users/jec.png";
import NBER from "../images/logos/users/nber.png";
import Georgetown from "../images/logos/users/georgetown.png";
import UMichigan from "../images/logos/users/umich.png";
import PN3Policy from "../images/logos/users/pn3policy.png";
import MCA from "../images/logos/users/mca.jpg";
import ArnoldVentures from "../images/logos/users/arnold-ventures.svg";
import ImagineLA from "../images/logos/users/imagine-la.png";

// Import all logos from orgs directory (shown on homepage)
import Centre from "../images/logos/orgs/centre.png";
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
import MFB from "../images/logos/orgs/myfriendben.png";
import UBICenter from "../images/logos/orgs/ubicenter.png";
import MothersOutreachNetwork from "../images/logos/orgs/mothers-outreach-network.png";
import NIESR from "../images/logos/orgs/niesr.jpeg";

export const users = [
  // US Government
  {
    id: "joint-economic-committee",
    name: "Joint Economic Committee",
    logo: JEC,
    website: "https://www.jec.senate.gov/",
    description: "A bipartisan committee of the U.S. Congress",
    category: "government",
  },
  
  // US Think Tanks
  {
    id: "niskanen-center",
    name: "Niskanen Center",
    logo: NiskanenCenter,
    website: "https://www.niskanencenter.org/",
    description: "A center-right think tank focused on pragmatic policy solutions",
    category: "think-tank",
  },
  
  // US Research
  {
    id: "nber",
    name: "National Bureau of Economic Research",
    logo: NBER,
    website: "https://www.nber.org/",
    description: "America's leading nonprofit economic research organization",
    category: "research",
  },
  {
    id: "prenatal-to-3-policy-impact-center",
    name: "Prenatal-to-3 Policy Impact Center",
    logo: PN3Policy,
    website: "https://pn3policy.org/",
    description: "Research center focused on early childhood policy",
    category: "research",
  },
  {
    id: "ubi-center",
    name: "UBI Center",
    logo: UBICenter,
    website: "https://ubicenter.org/",
    description: "Research hub for universal basic income analysis",
    category: "research",
  },
  {
    id: "center-growth-opportunity",
    name: "Center for Growth and Opportunity",
    logo: CGO,
    website: "https://www.thecgo.org/",
    description: "University research center focused on economic policy",
    category: "research",
  },
  
  // US Academic
  {
    id: "georgetown",
    name: "Georgetown University",
    logo: Georgetown,
    website: "https://www.georgetown.edu/",
    description: "Leading research university with expertise in public policy",
    category: "academic",
  },
  {
    id: "university-michigan",
    name: "University of Michigan",
    logo: UMichigan,
    website: "https://umich.edu/",
    description: "Public research university with renowned economics programs",
    category: "academic",
  },
  
  // US Advocacy
  {
    id: "maryland-child-alliance",
    name: "Maryland Child Alliance",
    logo: MCA,
    website: "https://www.marylandchildalliance.org/",
    description: "Advocacy organization for children and families in Maryland",
    category: "advocacy",
  },
  {
    id: "fund-guaranteed-income",
    name: "Fund for Guaranteed Income",
    logo: F4GI,
    website: "https://f4gi.org/",
    description: "Organization advancing guaranteed income initiatives",
    category: "advocacy",
  },
  {
    id: "mothers-outreach-network",
    name: "Mothers Outreach Network",
    logo: MothersOutreachNetwork,
    website: "https://mothersoutreachnetwork.org/",
    description: "Supporting mothers and families through policy advocacy",
    category: "advocacy",
  },
  {
    id: "end-poverty-make-trillions",
    name: "End Poverty Make Trillions",
    logo: EPMT,
    website: "https://endpovertymaketrillions.com/",
    description: "Advocacy for policies to end poverty through economic growth",
    category: "advocacy",
  },
  {
    id: "myfriendben",
    name: "MyFriendBen",
    logo: MFB,
    website: "https://myfriendben.org/",
    description: "Benefits eligibility screener helping families access programs",
    category: "advocacy",
  },
  {
    id: "arnold-ventures",
    name: "Arnold Ventures",
    logo: ArnoldVentures,
    website: "https://www.arnoldventures.org/",
    description: "Philanthropy tackling pressing problems with evidence and innovation",
    category: "advocacy",
  },
  {
    id: "imagine-la",
    name: "Imagine LA",
    logo: ImagineLA,
    website: "https://www.imaginela.org/",
    description: "Ending the cycle of family poverty and homelessness",
    category: "advocacy",
  },
  
  // UK Think Tanks
  {
    id: "centre-think-tank",
    name: "Centre Think Tank",
    logo: Centre,
    website: "https://centrethinktank.co.uk/",
    description: "Independent think tank focused on political reform",
    category: "think-tank",
  },
  {
    id: "social-market-foundation",
    name: "Social Market Foundation",
    logo: SMF,
    website: "https://www.smf.co.uk/",
    description: "Cross-party think tank for evidence-based public policy",
    category: "think-tank",
  },
  {
    id: "centre-for-policy-studies",
    name: "Centre for Policy Studies",
    logo: CPS,
    website: "https://cps.org.uk/",
    description: "Centre-right think tank promoting free market policies",
    category: "think-tank",
  },
  {
    id: "adam-smith-institute",
    name: "Adam Smith Institute",
    logo: ASI,
    website: "https://www.adamsmith.org/",
    description: "Libertarian think tank advocating free market policies",
    category: "think-tank",
  },
  
  // UK Research
  {
    id: "uk-in-a-changing-europe",
    name: "UK in a Changing Europe",
    logo: UKEU,
    website: "https://ukandeu.ac.uk/",
    description: "Research on UK-EU relations and UK governance",
    category: "research",
  },
  {
    id: "niesr-uk",
    name: "National Institute of Economic and Social Research",
    logo: NIESR,
    website: "https://www.niesr.ac.uk/",
    description: "Britain's longest established independent economic research institute",
    category: "research",
  },
  {
    id: "ubilabs",
    name: "UBILabs",
    logo: UBILabs,
    website: "https://www.ubilabsnetwork.org/",
    description: "Network researching universal basic income",
    category: "research",
  },
  
  // UK Political/Advocacy
  {
    id: "green-party-england-wales",
    name: "Green Party of England and Wales",
    logo: GPEW,
    website: "https://www.greenparty.org.uk/",
    description: "Political party advocating environmental and social justice",
    category: "advocacy",
  },
  {
    id: "liberal-party",
    name: "The Liberal Party",
    logo: LiberalParty,
    website: "https://liberal.org.uk/",
    description: "Political party promoting liberal values and policies",
    category: "advocacy",
  },
  {
    id: "citizens-economic-council",
    name: "Citizens' Economic Council",
    logo: CEC,
    website: "https://citizensecon.org.uk/",
    description: "Promoting citizen engagement in economic policy",
    category: "advocacy",
  },
];

export const userCategories = {
  government: "Government Agencies",
  "think-tank": "Think Tanks",
  research: "Research Organizations",
  academic: "Academic Institutions",
  advocacy: "Advocacy Organizations",
};