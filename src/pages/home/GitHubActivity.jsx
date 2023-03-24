import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import moment from "moment/moment";
import style from "../../style";
import { Container, Row } from "react-bootstrap";
import useMobile from "../../layout/Responsive";
import { motion } from "framer-motion";

const Card = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  margin: 10px;
  max-width: 350px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const Content = styled.div`
  margin-left: 10px;
`;

const RepoName = styled.div`
  color: #0366d6;
`;

const PRTitle = styled.div`
  margin-top: 5px;
`;

const PRInfo = styled.div`
  font-size: 12px;
`;

//const API_TOKEN = 'your_github_api_token'; // Replace with your GitHub API token
const REPOS = [
  "policyengine/policyengine-app",
  "policyengine/policyengine-api",
  "policyengine/policyengine-us",
  "policyengine/policyengine-uk",
  "policyengine/policyengine-canada",
  "policyengine/policyengine-core",
  // Add more repos as needed
];

const open = (
  <svg
    style={{ fill: "rgb(26, 127, 55)" }}
    className="octicon octicon-git-pull-request color-fg-open"
    viewBox="0 0 16 16"
    version="1.1"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
  </svg>
);
const closed = (
  <svg
    style={{ fill: "rgb(130, 80, 223)" }}
    className="octicon octicon-git-merge color-fg-done"
    viewBox="0 0 16 16"
    version="1.1"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z"></path>
  </svg>
);
const fetchPRs = async () => {
  const PRs = [];
  for (const repo of REPOS) {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/pulls?state=all&per_page=10`
    ).then((res) => res.json());
    PRs.push(...response);
  }
  // sort by most recent
  PRs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return PRs;
};

const PRCard = ({ pr }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    style={{
      cursor: "pointer",
    }}
    onClick={() => window.open(pr.html_url, "_blank")}
  >
    <Card
      style={{
        width: 400,
        height: 150,
        borderRadius: 30,
        display: "flex",
        flexDirection: "row",
        overflowY: "hidden",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <Avatar src={pr.user.avatar_url} alt={pr.user.login} />
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <RepoName>
          {pr.state === "open" ? open : closed} {pr.head.repo.full_name}
        </RepoName>
        <PRTitle>{pr.title}</PRTitle>
        <PRInfo>
          #{pr.number} opened by {pr.user.login}{" "}
          {moment(pr.created_at).fromNow()}
        </PRInfo>
      </Content>
    </Card>
  </motion.div>
);

const PRCarousel = () => {
  const [prs, setPRs] = useState([]);
  const mobile = useMobile();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPRs();
      setPRs(data);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: style.colors.DARK_GRAY,
        paddingTop: 100,
        paddingBottom: 100,
      }}
    >
      <Container fluid>
        <Row
          style={{
            paddingLeft: mobile ? 30 : 50,
            paddingRight: mobile ? 30 : 50,
            paddingBottom: 20,
          }}
        >
          <h1 style={{ paddingLeft: 90, paddingRight: 90, color: "white" }}>
            We&apos;re fully open source
          </h1>
          <h5 style={{ paddingLeft: 90, paddingRight: 90, color: "white" }}>
            All PolicyEngine models, code, and data are open source and
            available in their latest form on GitHub, with code, documentation
            and validation from over fifty open-source contributors. This is our
            real-time, unfiltered development.
          </h5>
        </Row>
      </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          overflowX: "scroll",
          alignItems: "center",
          paddingLeft: 50,
        }}
      >
        {prs.map((pr) => (
          <div key={pr.id}>
            <PRCard pr={pr} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PRCarousel;
