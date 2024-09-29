import React from "react";
import Section from "../layout/Section";
import { devTools } from "../data/developerToolsList";
import style from "../style/index.js";
import LinkButton from "../controls/LinkButton.jsx";
import useDisplayCategory from "../hooks/useDisplayCategory.js";
import { useLocation } from "react-router-dom";

const DeveloperHome = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const displayCategory = useDisplayCategory();
  return (
    <>
      <Section>
        <h2>Developer Tools</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: "40px",
          }}
        >
          {devTools.map((tool, index) => (
            <ToolBox
              key={index}
              top={
                <div style={{ width: 500, height: 300 }}>
                  <img style={{ width: 500, height: 300 }} src={tool.image} alt="" />
                </div>
              }
              bottomRight={
                <div style={{ marginRight: 10, marginBottom: 10 }}>
                  <LinkButton text="Open" link={`${tool.path}`} width="100%" />
                </div>
              }
              style={{
                backgroundColor: style.colors.LIGHT_GRAY,
                height: "100%",
                position: "relative",
              }}
            >
              <div
                style={{
                  padding: 10,
                  paddingTop: 0,
                  minHeight: displayCategory === "desktop" ? 100 : null,
                  width: "500px",
                }}
              >
                <h4>{tool.title}</h4>
                <p>{tool.desc}</p>
              </div>
            </ToolBox>
          ))}
        </div>
      </Section>
      {/* <Section backgroundColor={style.colors.BLUE_PRIMARY}>
        <h2 style={{ color: style.colors.WHITE }}>Team</h2>
        hi
      </Section> */}
    </>
  );
};

export default DeveloperHome;

function ToolBox({ children, top, bottomLeft, bottomRight, noBorder, style }) {
  return (
    <div
      style={{
        display: "flex",
        border: noBorder ? null : `1px solid black`,
        ...style,
        flexDirection: "row",
      }}
    >
      {/* <div style={{ display: "flex" }}>{left}</div> */}
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {top}{" "}
        </div>
        {children}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <div>{bottomLeft}</div>
          <div>{bottomRight}</div>
        </div>
      </div>
    </div>
  );
}
