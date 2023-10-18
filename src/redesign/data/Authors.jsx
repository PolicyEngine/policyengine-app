const Authors = {
  "nikhil-woodruff": {
    name: "Nikhil Woodruff",
    email: "nikhil@policyengine.org",
    twitter: "https://twitter.com/nikhil_woodruff",
    github: "https://github.com/nikhilwoodruff",
    linkedin: "https://www.linkedin.com/in/nikhil-woodruff/",
    headshot: require("../../images/authors/nikhil-woodruff.jpg"),
    bio: "is PolicyEngine's co-founder and CTO.",
    title: "PolicyEngine's Co-founder and CTO",
  },
  "max-ghenis": {
    name: "Max Ghenis",
    email: "max@policyengine.org",
    twitter: "https://twitter.com/maxghenis",
    github: "https://github.com/MaxGhenis",
    linkedin: "https://www.linkedin.com/in/maxghenis/",
    headshot: require("../../images/authors/max-ghenis.png"),
    bio: "is PolicyEngine's co-founder and CEO.",
    title: "PolicyEngine's Co-founder and CEO",
  },
  "kevin-foster": {
    name: "Kevin Foster",
    email: "newforza@gmail.com",
    github: "https://github.com/kfoster19",
    linkedin: "https://www.linkedin.com/in/kevin-h-foster/",
    headshot: require("../../images/authors/kevin-foster.jpeg"),
    bio: "is a researcher at PolicyEngine.",
    title: "Researcher at PolicyEngine",
  },
  "nicholas-rodelo": {
    name: "Nicholas Rodelo",
    email: "nick@policyengine.org",
    github: "https://github.com/nmrodelo",
    linkedin: "https://www.linkedin.com/in/nicholas-rodelo-aaaa18159/",
    twitter: "https://twitter.com/NicholasRodelo",
    headshot: require("../../images/authors/nicholas-rodelo.jpg"),
    bio: "is a researcher at PolicyEngine.",
    title: "Researcher at PolicyEngine",
  },
  "chat-gpt": {
    name: "ChatGPT",
    headshot: require("../../images/authors/chat-gpt.png"),
    bio: "is a contributing writer at PolicyEngine.",
    title: "Contributing writer at PolicyEngine",
  },
  "arthur-wright": {
    name: "Arthur Wright",
    email: "awrigh46@gmu.edu",
    twitter: "https://twitter.com/Arthur_Wright_",
    github: "awrigh46",
    headshot: require("../../images/authors/arthur-wright.jpg"),
    bio: "is a researcher at PolicyEngine.",
    title: "Researcher at PolicyEngine",
  },
  "donglai-xu": {
    name: "Donglai Xu",
    email: "donglaixu99@gmail.com",
    github: "xudonglai0426",
    linkedin: "https://www.linkedin.com/in/donglaixu11101",
    headshot: require("../../images/authors/donglai-xu.jpeg"),
    bio: "is a data analyst at PolicyEngine.",
    title: "Data Analyst at PolicyEngine",
  },
  "lin-tao": {
    name: "Lin Tao",
    email: "tao.lin1@northeastern.edu",
    github: "Kim1277",
    linkedin: "https://www.linkedin.com/in/lin-tao-384203207",
    headshot: require("../../images/authors/lin-tao.jpeg"),
    bio: "is a data analyst at PolicyEngine.",
    title: "Data Analyst at PolicyEngine",
  },
};

const authorKeys = Object.keys(Authors);
const authorKeyToLabel = Object.fromEntries(
  authorKeys.map((key) => [key, Authors[key].name]),
);

export { Authors, authorKeys, authorKeyToLabel };
