import React, { useEffect } from "react";
import Section from "../layout/Section";
import { devTools } from "../data/developerToolsList";
import style from "../style/index.js";
import LinkButton from "../controls/LinkButton.jsx";
import useDisplayCategory from "../hooks/useDisplayCategory.js";
import { useLocation } from "react-router-dom";

const DeveloperHome = () => {
  const displayCategory = useDisplayCategory();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("Scrolling to top on pathname change:", pathname);
    window.scrollTo(0, 0); // Fallback to non-smooth scroll
  }, [pathname]);
  return (
    <>
      <Section>
        <div
          style={
            {
              desktop: {
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)", // Creates three equal columns
                columnGap: "40px",
                rowGap: "20px", // Adds some space between rows
              },
              tablet: {
                display: "flex",
                flexDirection: "column",
                rowGap: "3rem",
              },
              mobile: {
                display: "flex",
                flexDirection: "column",
                rowGap: "2rem",
              },
            }[displayCategory]
          }
        >
          {devTools.map((tool, index) => (
            <ToolsCard key={index} tool={tool} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default DeveloperHome;

function ToolsCard({ tool }) {
  const displayCategory = useDisplayCategory();
  const mobile = displayCategory === "mobile";
  const tablet = displayCategory === "tablet";

  return (
    <ToolsStruct
      tablet={tablet}
      mobile={mobile}
      top={
        <div
          style={{
            width: mobile ? "150px" : tablet ? "350px" : "100%",
            height: mobile ? 150 : 300,
          }}
        >
          {" "}
          {/* Set width to 100% */}
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={tool.image}
            alt=""
          />
        </div>
      }
      bottomRight={
        <div
          style={{
            marginRight: !mobile && 10,
            marginBottom: !mobile && 10,
            height: mobile && "100%",
          }}
        >
          <LinkButton
            text="Open"
            link={`${tool.path}`}
            width="100%"
            height={"100%"}
          />
        </div>
      }
      style={{
        backgroundColor: style.colors.LIGHT_GRAY,
        // maxWidth: "1000px", // Set a max width for ToolBox
        height: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          padding: "0",
          minHeight: 100,
          width: "100%", // Change to 100% for grid layout
        }}
      >
        <h4
          style={{
            paddingTop: "1rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            width: `${mobile ? "150px" : "100%"}`,
          }}
        >
          {tool.title}
        </h4>
        {displayCategory !== "mobile" && (
          <p
            style={{
              paddingLeft: "1rem",
              paddingTop: "10px",
              paddingRight: "1rem",
            }}
          >
            {tool.desc}
          </p>
        )}
      </div>
    </ToolsStruct>
  );
}

function ToolsStruct({
  children,
  top,
  tablet,

  bottomRight,
  noBorder,
  style,
  mobile,
}) {
  return (
    <div
      style={{
        display: "flex",
        border: noBorder ? null : `1px solid black`,
        ...style,
        flexDirection: mobile ? "column" : "row",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: mobile ? "row" : tablet ? "row" : "column",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {top}
        </div>
        <div
          style={{
            width: mobile && "100%",
            display: "flex",
            flexDirection: !mobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          {children}
          <div
            style={{
              display: "flex",
              height: mobile && "100%",
              justifyContent: "flex-end",
              width: "100%",
              marginTop: "auto",
            }}
          >
            <div>{bottomRight}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
