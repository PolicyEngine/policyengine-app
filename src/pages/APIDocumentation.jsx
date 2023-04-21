import React from "react";
import { Container } from "react-bootstrap";
import "../style/endpoint.css";
import { LinkOutlined } from "@ant-design/icons";
import Divider from "../layout/Divider";

export default function APIDocumentation() {
  const [openAPIConfig, setOpenAPIConfig] = React.useState(null);
  openAPIConfig;
  React.useEffect(() => {
    fetch("https://api.policyengine.org/specification")
      .then((response) => response.json())
      .then((data) => {
        setOpenAPIConfig(data);
      });
  }, []);
  let endpoints = [];
  if (openAPIConfig) {
    endpoints = Object.entries(openAPIConfig.paths).map(([path, methods]) => {
      return Object.entries(methods).map(([method, endpoint]) => {
        return (
          <Endpoint
            key={endpoint.operationId}
            endpoint={{ ...endpoint, path, method }}
          />
        );
      });
    });
  }
  return (
    <Container>
      <h1 style={{ paddingTop: 50 }}>API documentation</h1>
      <p>
        {"PolicyEngine's free API allows you to compute the impact of public policy on households or economies in any app or website."}
      </p>
      <p>If you&apos;d like to use PolicyEngine&apos;s API for your organisation, please feel free to <a href="mailto:hello@policyengine.org">get in touch</a>.</p>
      <Divider />
      {endpoints}
    </Container>
  );
}

function Endpoint(props) {
  const { endpoint } = props;
  const {
    path,
    method,
    summary,
    operationId,
    description,
    parameters,
    responses,
  } = endpoint;

  return (
    <div className="endpoint" id={operationId}>
      <div className="columns">
        <div className="left-column sticky">
          <h3 className="endpoint-name">
            <a href={`#${operationId}`}><LinkOutlined style={{margin: 0}} /></a>
            {path}
            <span className="method">{method.toUpperCase()}</span>
          </h3>
          <p className="summary">{summary}</p>
          <p className="description">{description}</p>
          {parameters && (
            <div className="parameters">
              <h4>Parameters:</h4>
              <ul>
                {parameters.map((param, index) => (
                  <li key={index}>
                    <strong>
                      {param.name} ({param.in}):
                    </strong>{" "}
                    {param.description}
                    {param.required && " (required)"}
                    <br />
                    <em>Type: {param.schema.type}</em>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="right-column">
          <h4>Responses:</h4>
          {Object.entries(responses).map(([code, response]) => (
            <div key={code} className="response">
              <h5>
                {code}: {response.description}
              </h5>
              <div className="response-content">
                {Object.entries(response.content).map(
                  ([contentType, content]) => (
                    <div key={contentType}>
                      <strong>{contentType}</strong>
                      <pre>{JSON.stringify(content.schema, null, 2)}</pre>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
