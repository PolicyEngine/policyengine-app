import style from "../style";
import Footer from "./Footer";
import Header from "./Header";
import Section from "./Section";
import useCountryId from "./useCountryId";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Input, Card, Divider, Tag, Drawer } from "antd";
import { Helmet } from "react-helmet";
import { defaultYear } from "data/constants";

function APIResultCard(props) {
  const { metadata, type, setSelectedCard } = props;

  // type can be: parameter, variable
  // parameters look like this: "gov.dcms.bbc.tv_licence.discount.aged.discount":{"description":"Percentage discount for qualifying aged households.","economy":true,"household":true,"label":"Aged TV Licence discount","parameter":"gov.dcms.bbc.tv_licence.discount.aged.discount","period":null,"type":"parameter","unit":"/1","values":{"2003-01-01":1}}
  // variables look like this: "income_tax":{"adds":["earned_income_tax","savings_income_tax","dividend_income_tax","CB_HITC"],"category":"tax","defaultValue":0,"definitionPeriod":"year","documentation":"Total Income Tax liability","entity":"person","hidden_input":false,"indexInModule":22,"isInputVariable":false,"label":"Income Tax","moduleName":"gov.hmrc.income_tax.liability","name":"income_tax","subtracts":["capped_mcad"],"unit":"currency-GBP","valueType":"float"}
  // use antd card component
  // rounded edges, display all metadata and distinguish between parameters and variables

  return (
    <>
      <Card
        bordered={true}
        style={{
          width: 400,
          backgroundColor: style.colors.WHITE,
          margin: 15,
          overflow: "hidden",
        }}
        onClick={() => setSelectedCard({ ...metadata, type: type })}
      >
        {type === "parameter" ? (
          <APIParameterCard metadata={metadata} />
        ) : (
          <APIVariableCard metadata={metadata} />
        )}
      </Card>
    </>
  );
}

function APIParameterCard(props) {
  const { metadata } = props;
  // use antd card component
  // rounded edges, display all metadata and distinguish between parameters and variables
  // "gov.dcms.bbc.tv_licence.discount.aged.discount":{"description":"Percentage discount for qualifying aged households.","economy":true,"household":true,"label":"Aged TV Licence discount","parameter":"gov.dcms.bbc.tv_licence.discount.aged.discount","period":null,"type":"parameter","unit":"/1","values":{"2003-01-01":1}}

  return (
    <>
      <Tag style={{ marginBottom: 10 }} color="green">
        Parameter
      </Tag>
      <h3>{metadata.label}</h3>
      <p>{metadata.description}</p>
      <p>Period: {metadata.period || "None"}</p>
      <p>Unit: {metadata.unit}</p>
      <p>Python name: {metadata.parameter}</p>
    </>
  );
}

function APIVariableCard(props) {
  const { metadata } = props;
  // use antd card component
  // rounded edges, display all metadata and distinguish between parameters and variables

  return (
    <>
      <Tag style={{ marginBottom: 10 }} color="red">
        Variable
      </Tag>
      <h3>{metadata.label}</h3>
      <p>{metadata.description}</p>
      <p>Entity: {metadata.entity}</p>
      <p>Period: {metadata.period || "none"}</p>
      <p>Python name: {metadata.name}</p>
      <p>Unit: {metadata.unit}</p>
    </>
  );
}

function VariableParameterExplorer(props) {
  const { metadata, id } = props;
  const [query, setQuery] = useState("");
  const [selectedCardData, setSelectedCardData] = useState(null);

  if (!metadata) {
    return <></>;
  }

  const parameterCards = Object.values(metadata.parameters)
    .filter((parameter) => parameter.type === "parameter")
    .filter((parameter) => {
      if (query === "") {
        return true;
      }
      return (parameter.label || "")
        .replaceAll(" ", "")
        .toLowerCase()
        .includes(query.replaceAll(" ", "").toLowerCase());
    })
    .slice(0, 50)
    .map((parameter) => {
      return (
        <APIResultCard
          key={parameter.name}
          metadata={parameter}
          type="parameter"
          setSelectedCard={setSelectedCardData}
        />
      );
    });

  const variableCards = Object.values(metadata.variables)
    .filter((variable) => {
      if (query === "") {
        return true;
      }
      return (variable.label || "")
        .replaceAll(" ", "")
        .toLowerCase()
        .includes(query.replaceAll(" ", "").toLowerCase());
    })
    .slice(0, 50)
    .map((variable) => {
      return (
        <APIResultCard
          key={variable.name}
          metadata={variable}
          type="variable"
          setSelectedCard={setSelectedCardData}
        />
      );
    });

  return (
    <>
      <Drawer
        title={selectedCardData ? selectedCardData.label : ""}
        placement="right"
        closable={true}
        onClose={() => setSelectedCardData(null)}
        width={400}
      >
        <CardDrawer metadata={selectedCardData} />
      </Drawer>
      <Container>
        <div
          style={{
            marginTop: 50,
            marginBottom: 50,
            marginLeft: 8,
          }}
        >
          <h3 id={id}>Variables and parameters</h3>
        </div>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          bordered={false}
          placeholder="Search for a variable or parameter"
          style={{
            fontSize: 20,
            // Show cursor
            caretColor: style.colors.BLACK,
            marginLeft: 0,
          }}
        />
        <Divider />

        <div // make cards display in a grid
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "left",
          }}
        >
          {parameterCards}
          {variableCards}
        </div>
      </Container>
    </>
  );
}

function CardDrawer(props) {
  const { metadata } = props;

  if (!metadata) {
    return <></>;
  }
  const type = metadata.type;
  return (
    <>
      {type === "parameter" ? (
        <APIParameterCard metadata={metadata} />
      ) : (
        <APIVariableCard metadata={metadata} />
      )}
    </>
  );
}

export default function APIDocumentationPage({ metadata }) {
  const countryId = useCountryId();
  return (
    <>
      <Helmet>
        <title>API Documentation | PolicyEngine</title>
      </Helmet>
      <Header />
      <Section
        title="PolicyEngine API Documentation"
        backgroundColor={style.colors.BLUE_98}
      >
        <p>
          PolicyEngine&apos;s REST API (
          <a href="https://household.api.policyengine.org">
            https://household.api.policyengine.org
          </a>
          ) simulates tax-benefit policy outcomes and reform impacts for
          households. Access to the API requires an authentication token, which
          will expire monthly for security reasons. This token must be passed
          within the authorization heading of each request you make to the API.
          For more information or to request your own token, feel free to reach
          out to PolicyEngine at{" "}
          <a href="mailto: hello@policyengine.org">hello@policyengine.org</a>.
        </p>
        <br />
        <h4>On this page</h4>
        <ul>
          <li>
            <a href="#calculate">Calculate household-level policy outcomes</a>
          </li>
          <li>
            <a href="#variables">Variable and parameter metadata search</a>
          </li>
          <li>
            <a href="#playground">API playground</a>
          </li>
        </ul>
      </Section>
      <APIEndpoint
        pattern={`/${countryId}/calculate`}
        id="calculate"
        method="POST"
        title="Calculate household-level policy outcomes"
        description={`Returns household-level policy outcomes. Pass in a household object defining people, groups and any variable values (see the /metadata endpoint for a full list). Then, pass in null values for requested variables - these will be filled in with computed values. Using the group/name/variable/optional time period/value structure is recommended.`}
        exampleInputJson={{
          household: {
            people: {
              parent: {
                age: {
                  [defaultYear]: 30,
                },
                employment_income: {
                  [defaultYear]: 20_000,
                },
              },
              child: {
                age: {
                  [defaultYear]: 5,
                },
              },
            },
            spm_units: {
              spm_unit: {
                members: ["parent", "child"],
                snap: {
                  [defaultYear]: null,
                },
              },
            },
          },
        }}
        exampleOutputJson={{
          status: "ok",
          message: null,
          result: {
            people: {
              parent: {
                age: {
                  [defaultYear]: 30,
                },
                employment_income: {
                  [defaultYear]: 20_000,
                },
              },
              child: {
                age: {
                  [defaultYear]: 5,
                },
              },
            },
            spm_units: {
              spm_unit: {
                members: ["parent", "child"],
                snap: {
                  [defaultYear]: 2833.5,
                },
              },
            },
          },
        }}
      />
      <VariableParameterExplorer
        id="variables"
        countryId={countryId}
        metadata={metadata}
      />
      <Section title="API playground" id="playground">
        <p>Try out the API in this interactive demo.</p>
        <iframe
          src={`https://policyengine-policyengine-api-demo-app-xy5rgn.streamlit.app/?embed=true&embed_options=light_theme&embed_options=hide_footer&mode=${countryId}`}
          // the demo is in the policyengine-api-demo repository in PolicyEngine
          title="PolicyEngine API demo"
          height="600px"
          width={"100%"}
        />
      </Section>
      <Footer />
    </>
  );
}

function JSONBlock({ json }) {
  return (
    <div
      style={{
        backgroundColor: style.colors.DARK_GRAY,
        width: "100%",
        borderRadius: 25,
        fontFamily: "Courier New",
        padding: 30,
        color: "white",
      }}
    >
      <pre>{JSON.stringify(json, null, 2)}</pre>
    </div>
  );
}

function APIEndpoint({
  pattern,
  method,
  title,
  description,
  children,
  exampleInputJson,
  exampleOutputJson,
  id,
}) {
  const hasInput = Boolean(exampleInputJson);

  return (
    <Section>
      <h3 id={id}>{title}</h3>
      <h5>
        <code>
          {method} {pattern}
        </code>
      </h5>
      <p>{description}</p>

      <div
        style={{
          display: "flex",
        }}
      >
        {hasInput && (
          <div style={{ flex: 1 }}>
            <h4>Example input</h4>
            <JSONBlock json={exampleInputJson} />
          </div>
        )}
        <div
          style={{
            flex: 1,
            marginLeft: hasInput ? "50px" : "0",
          }}
        >
          {<h4>Output format</h4>}
          <JSONBlock json={exampleOutputJson} />
        </div>
      </div>
      {children}
    </Section>
  );
}
