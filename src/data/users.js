// User organizations that have used PolicyEngine for policy analysis and research

import NiskanenCenter from "../images/logos/users/niskanen-center.png";
import JEC from "../images/logos/users/jec.png";
import NBER from "../images/logos/users/nber.png";
import Georgetown from "../images/logos/users/georgetown.png";
import UMichigan from "../images/logos/users/umich.png";
import USC from "../images/logos/users/usc.png";
import UHawaii from "../images/logos/users/hawaii.png";
import PN3Policy from "../images/logos/users/pn3policy.png";
import NewYorkSenate from "../images/logos/users/ny-senate.png";
import MarylandChildAlliance from "../images/logos/users/mca.jpg";

export const users = [
  {
    id: "niskanen-center",
    name: "Niskanen Center",
    logo: NiskanenCenter,
    website: "https://www.niskanencenter.org/",
    description:
      "A center-right think tank focused on pragmatic policy solutions",
    category: "think-tank",
  },
  {
    id: "joint-economic-committee",
    name: "Joint Economic Committee",
    logo: JEC,
    website: "https://www.jec.senate.gov/",
    description: "A bipartisan committee of the U.S. Congress",
    category: "government",
  },
  {
    id: "nber",
    name: "National Bureau of Economic Research",
    logo: NBER,
    website: "https://www.nber.org/",
    description: "America's leading nonprofit economic research organization",
    category: "research",
  },
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
  {
    id: "usc",
    name: "University of Southern California",
    logo: USC,
    website: "https://www.usc.edu/",
    description: "Private research university with strong policy programs",
    category: "academic",
  },
  {
    id: "university-hawaii",
    name: "University of Hawaii",
    logo: UHawaii,
    website: "https://www.hawaii.edu/",
    description: "State university system focused on policy research",
    category: "academic",
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
    id: "new-york-senate",
    name: "New York Senate",
    logo: NewYorkSenate,
    website: "https://www.nysenate.gov/",
    description: "Upper chamber of the New York State Legislature",
    category: "government",
  },
  {
    id: "maryland-child-alliance",
    name: "Maryland Child Alliance",
    logo: MarylandChildAlliance,
    website: "https://www.marylandchildalliance.org/",
    description: "Advocacy organization for children and families in Maryland",
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
