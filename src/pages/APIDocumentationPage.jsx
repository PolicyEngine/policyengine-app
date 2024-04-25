import style from "../style";
import Footer from "../layout/Footer";
import Header from "../redesign/components/Header";
import Section from "../redesign/components/Section";
import useCountryId from "../hooks/useCountryId";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Input, Card, Divider, Tag, Drawer, Button, Tooltip } from "antd";
import { Helmet } from "react-helmet";
import { defaultYear } from "data/constants";
import { CopyOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import useDisplayCategory from "../hooks/useDisplayCategory";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { espresso } from "thememirror";

export const exampleInputs = {
  us: {
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
  },
  uk: {
    household: {
      people: {
        parent: {
          age: {
            [defaultYear]: 40,
          },
          employment_income: {
            [defaultYear]: 1000,
          },
        },
        child: {
          age: {
            [defaultYear]: 10,
          },
          employment_income: {
            [defaultYear]: 0,
          },
        },
      },
      benunits: {
        exampleFamily: {
          members: ["parent", "child"],
          universal_credit_entitlement: {
            [defaultYear]: null,
          },
        },
      },
      households: {
        exampleFamily: {
          members: ["parent", "child"],
        },
      },
    },
  },
  default: {
    household: {
      people: {
        parent: {
          age: {
            [defaultYear]: 40,
          },
          employment_income: {
            [defaultYear]: 1000,
          },
        },
      },
      households: {
        sampleHousehold: {
          members: ["parent"],
        },
      },
    },
  },
};

const examplePolicies = {
  us: "SNAP benefit",
  uk: "Universal Credit entitlement",
};

export function APIResultCard(props) {
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
      <p>Unit: {metadata.unit || "N/A"}</p>
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
      <p>Period: {metadata.definitionPeriod || "none"}</p>
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
  const displayCategory = useDisplayCategory();

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
        description={`Returns household-level policy outcomes. Pass in a household object defining people, groups and any variable values (see the /metadata endpoint for a full list). Then, pass in null values for requested variables - these will be filled in with computed values. Using the group/name/variable/optional time period/value structure is recommended. ${Object.keys(examplePolicies).includes(countryId) ? `The below code block estimates a sample family's ${examplePolicies[countryId]}.` : ""}`}
        exampleInputJson={
          Object.keys(exampleInputs).includes(countryId)
            ? exampleInputs[countryId]
            : exampleInputs.default
        }
        countryId={countryId}
        displayCategory={displayCategory}
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

function CodeBlock({ data, title, language }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(data);
    setIsCopied(true);
  }

  useEffect(() => {
    if (isCopied) {
      const timeoutId = setTimeout(() => setIsCopied(false), 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isCopied]);

  const cardTitleComponent = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // Padding is necessary so that button click effect
        // is visible
        padding: "0 6px 0 0",
      }}
    >
      <p
        style={{
          margin: 0,
        }}
      >
        {language}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <Tooltip title={`${isExpanded ? "Close" : "Expand"} the code block`}>
          <Button
            type="default"
            style={{
              border: 0,
              fontWeight: 500,
              boxShadow: "none",
            }}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              {isExpanded ? <UpOutlined /> : <DownOutlined />}
              <p
                style={{
                  margin: 0,
                }}
              >
                {isExpanded ? "Shrink" : "Expand"}
              </p>
            </div>
          </Button>
        </Tooltip>
        <Tooltip title="Copy the code block">
          <Button
            type="default"
            style={{
              border: 0,
              fontWeight: 500,
              boxShadow: "none",
              width: "6rem",
            }}
            onClick={handleCopy}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <CopyOutlined />
              <p
                style={{
                  margin: 0,
                }}
              >
                {isCopied ? "Copied!" : "Copy"}
              </p>
            </div>
          </Button>
        </Tooltip>
      </div>
    </div>
  );

  return (
    <div
      style={{
        flex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>{title}</h4>
      </div>
      <Card
        style={{}}
        loading={!data}
        bodyStyle={{
          padding: 0,
        }}
        title={cardTitleComponent}
      >
        <CodeMirror
          value={data}
          maxHeight={!isExpanded && "260px"}
          editable={false}
          extensions={[language === "json" ? langs.json() : langs.python()]}
          theme={espresso}
        />
      </Card>
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
  id,
  countryId,
  displayCategory,
}) {
  const [outputJson, setOutputJson] = useState("");

  const hasInput = Boolean(exampleInputJson);

  useEffect(() => {
    const HOUSEHOLD_API_URL = "https://household.api.policyengine.org";

    // This has to be written as a standalone function because
    // useEffect can't handle anonymous async/await
    async function fetchOutput() {
      if (!countryId || !exampleInputJson) {
        setOutputJson(null);
        return;
      }

      try {
        const res = await fetch(
          HOUSEHOLD_API_URL + `/${countryId}/calculate_demo`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(exampleInputJson),
          },
        );
        const resJson = await res.json();
        setOutputJson(resJson);
      } catch (err) {
        console.error(err);
        setOutputJson("Error while fetching output; please try again later");
      }
    }

    fetchOutput();
  }, [countryId, exampleInputJson]);

  let pythonInputCode = `import requests\n\nurl = "https://household.api.policyengine.org/${countryId}/calculate"\n\nheaders = {\n    "Authorization": "Bearer YOUR_TOKEN_HERE",\n    "Content-Type": "application/json",\n}\n\nresponse = requests.post(url, headers=headers, json=${JSON.stringify(exampleInputJson, null, 2)})\n\nprint(response.json())`;
  pythonInputCode = pythonInputCode.replaceAll("null", "None");

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
        data-testid="APIEndpoint_json_blocks"
        style={{
          display: "flex",
          flexDirection: displayCategory === "mobile" && "column",
          gap: displayCategory === "mobile" ? "2rem" : "50px",
          marginTop: displayCategory === "mobile" ? "2rem" : 40,
        }}
      >
        {hasInput && (
          <CodeBlock language="python" data={pythonInputCode} title="Input" />
        )}
        <CodeBlock
          language="json"
          data={JSON.stringify(outputJson, null, 2)}
          title="Output"
        />
      </div>
      {children}
    </Section>
  );
}
