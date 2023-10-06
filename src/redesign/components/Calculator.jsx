import style from "../style";
import PolicyEngineMainLogo from "../images/logos/policyengine/white.svg";
import Section from "./Section";
import useCountryId from "./useCountryId";
import { useEffect, useState } from "react";
import TextBox from "./TextBox";
import Fuse from "fuse.js";

export default function Calculator() {
  const countryId = useCountryId();
  const [metadata, setMetadata] = useState();
  useEffect(() => {
    fetch(`https://api.policyengine.org/${countryId}/metadata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setMetadata(data.result));
  }, [countryId]);
  metadata;
  const [parameterSearch, setParameterSearch] = useState("");
  const fuse = new Fuse(Object.values(metadata?.parameters || {}) || [], {
    keys: ["label", "description", "name"],
    threshold: 0.3,
  });
  const results =
    parameterSearch === "" ? [] : fuse.search(parameterSearch).slice(0, 3);
  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: 200 }}>
        <Section title="1. Select policy parameters">
          <div style={{ marginTop: 30 }} />
          <TextBox
            onChange={setParameterSearch}
            title="Search for a parameter"
            placeholder="Search by keyword or policy number"
            titleColor="black"
          />
          {results.map((result) => (
            <div
              key={result.item.name}
              style={{ marginTop: 10, alignItems: "center", display: "flex" }}
            >
              <a
                href="/"
                className="highlighted-link"
                style={{ backgroundColor: style.colors.LIGHT_GRAY }}
              >
                {result.item.label}
              </a>
              <p>{result.item.description}</p>
            </div>
          ))}
        </Section>
        <Section
          backgroundColor={style.colors.LIGHT_GRAY}
          title="2. Change parameter values"
        ></Section>
        <Section title="3. Choose what to model">
          <a
            href="/"
            className="highlighted-link"
            style={{ backgroundColor: style.colors.LIGHT_GRAY, padding: 10 }}
          >
            Model all policies
          </a>
        </Section>
      </div>
    </>
  );
}

function Sidebar() {
  return (
    <div
      style={{
        width: 200,
        height: "100vh",
        position: "fixed",
        backgroundColor: style.colors.BLUE_PRESSED,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <img
        src={PolicyEngineMainLogo}
        style={{
          width: 200,
          padding: 20,
        }}
      />
    </div>
  );
}
