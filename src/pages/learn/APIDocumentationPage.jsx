import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import useCountryId from "../../hooks/useCountryId";
import { Card, Tag } from "antd";
import { Helmet } from "react-helmet";
import { defaultYear } from "data/constants";
import APIGeneralContent from "./APIGeneralContent";

// During front-end redesign, this page should be refactored
// to use design system layout components and improved best practices.
import CodeBlock from "../../layout/CodeBlock";
import Section from "../../layout/Section";
import { useEffect, useState } from "react";  
import {wrappedResponseJson}  from "../../data/wrappedJson";
import Meta from "antd/es/card/Meta";

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

// Note: These constants are kept for reference but not currently used

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
          backgroundColor: "white",
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
      <p style={{ wordBreak: "break-all" }}>
        Python name: {metadata.parameter}
      </p>
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
      <p style={{ wordBreak: "break-all" }}>
        Python name: {metadata.name}
      </p>
      <p>Unit: {metadata.unit}</p>
    </>
  );
}

// This component is not currently used but kept for future reference
function VariableParameterExplorer(props) {
  const { metadata } = props;
  const [query, setQuery] = useState("");
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [page, setPage] = useState(0);

  const MAX_ROWS = 3;
  const MAX_COLS = 3;
  const CARDS_PER_PAGE = MAX_ROWS * MAX_COLS;

  if (!metadata) return <></>;

  const filterByQuery = (item) => {
    if (!query) return true;
    return (item.label || "")
      .replaceAll(" ", "")
      .toLowerCase()
      .includes(query.replaceAll(" ", "").toLowerCase());
  };

  const parameterCards = Object.values(metadata.parameters || {})
    .filter((p) => p.type === "parameter")
    .filter(filterByQuery)
    .map((p) => ({ ...p, type: "parameter" }));

  const variableCards = Object.values(metadata.variables || {})
    .filter(filterByQuery)
    .map((v) => ({ ...v, type: "variable" }));

  const allCards = [...parameterCards, ...variableCards].sort((a, b) => {
    const labelA = (a.label || a.name || "").toLowerCase();
    const labelB = (b.label || b.name || "").toLowerCase();
    return labelA.localeCompare(labelB);
  });
  const totalPages = Math.ceil(allCards.length / CARDS_PER_PAGE);
  const currentCards = allCards.slice(
    page * CARDS_PER_PAGE,
    (page + 1) * CARDS_PER_PAGE
  );

  return (
    <div>
      <input
        placeholder="Search parameters or variables"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(0); // reset to first page on new search
        }}
        style={{ marginBottom: 20 }}
      />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {currentCards.map((item) => (
          <APIResultCard
            key={item.name}
            metadata={item}
            type={item.type}
            setSelectedCard={setSelectedCardData}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            style={{ marginRight: 10 }}
          >
            ← Previous
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            style={{ marginLeft: 10 }}
          >
            Next →
          </button>
        </div>
      )}

      <CardDrawer metadata={selectedCardData} />
    </div>
  );
}

// This component is not currently used but kept for future reference
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
  const isUK = countryId === "uk";

  return (
    <>
      <Helmet>
        <title>API Documentation | PolicyEngine</title>
      </Helmet>
      <Header />
      <APIGeneralContent
        countryId={countryId}
        isUK={isUK}
        metadata={metadata}
      />
      <VariableParameterExplorer metadata={metadata}/>
      <Footer />
    </>
  );
}

// These components are not currently used but kept for future reference

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
        const resJson = await wrappedResponseJson(res);
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

function APIEndpointStatic({
  pattern,
  method,
  title,
  description,
  children,
  exampleInput,
  id,
  displayCategory,
  exampleOutput,
}) {
  const hasInput = Boolean(exampleInput);

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
          flexDirection: displayCategory === "mobile" && "column",
          gap: displayCategory === "mobile" ? "2rem" : "50px",
          marginTop: displayCategory === "mobile" ? "2rem" : 40,
        }}
      >
        {hasInput && (
          <CodeBlock language="python" data={exampleInput} title="Input" />
        )}
        <CodeBlock language="json" data={exampleOutput} title="Output" />
      </div>
      {children}
    </Section>
  );
}
