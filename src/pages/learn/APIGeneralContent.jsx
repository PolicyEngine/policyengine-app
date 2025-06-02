import { useState } from "react";
import GeneralContent from "./GeneralContent";
import CodeBlock from "../../layout/CodeBlock";
import style from "../../style";
import { Card, Tag } from "antd";

// During front-end redesign, this page should be refactored
// to use design system layout components and improved best practices.

/**
 * API page content using the new general page structure
 * @param {Object} props
 * @param {string} props.countryId - The country ID (us or uk)
 * @param {boolean} props.isUK - Whether this is the UK version
 * @param {Object} props.metadata - The API metadata
 */
const APIGeneralContent = ({ countryId, isUK = false, metadata }) => {
  // Example code snippets
  const tokenFetchCode = `import requests
import json

CLIENT_ID = "YOUR_CLIENT_ID"
CLIENT_SECRET = "YOUR_CLIENT_SECRET"

payload = {
  "client_id": CLIENT_ID,
  "client_secret": CLIENT_SECRET,
  "audience": "https://household.api.policyengine.org",
  "grant_type": "client_credentials"
}

headers = { "content-type": "application/json" }

auth_response = requests.post("https://policyengine.uk.auth0.com/oauth/token", headers=headers, json=payload)

result = auth_response.json()
print(result["access_token"])`;

  const tokenOutputCode = `{
  "access_token": "YOUR_ACCESS_TOKEN",
  "token_type": "Bearer"
}`;

  const exampleHouseholdInput = {
    household: {
      people: {
        parent: {
          age: {
            2023: 30,
          },
          employment_income: {
            2023: 20000,
          },
        },
        child: {
          age: {
            2023: 5,
          },
        },
      },
      households: {
        household: {
          members: ["parent", "child"],
        },
      },
    },
  };

  const pythonInputCode = `import requests

url = "https://household.api.policyengine.org/${countryId}/calculate"

headers = {
    "Authorization": "Bearer YOUR_TOKEN_HERE",
    "Content-Type": "application/json",
}

response = requests.post(url, headers=headers, json=${JSON.stringify(exampleHouseholdInput, null, 2)})

print(response.json())`;

  // Configure content specific to the API page
  const apiContent = {
    title: "API Documentation",
    subtitle:
      "Access PolicyEngine's powerful tax-benefit microsimulation engine programmatically",
    heroTitle: "PolicyEngine REST API",
    heroSubtitle:
      "Build tax and benefit policy analysis into your applications with our comprehensive API",
    heroImage: require("../../images/home/api_screenshot.png"),
    heroButtonText: "Try API Playground",
    heroButtonLink: `#api-playground`,
    sections: [
      {
        title: "Getting Started",
        id: "getting-started",
        content: (
          <div className="api-getting-started">
            <p>
              PolicyEngine&apos;s REST API (
              <a href="https://household.api.policyengine.org">
                https://household.api.policyengine.org
              </a>
              ) simulates tax-benefit policy outcomes and reform impacts for
              households. Access to the API requires a <b>Client ID</b> and{" "}
              <b>Client Secret</b> given by PolicyEngine. Use these credentials
              to request an authentication token, which expires monthly. This
              token must be passed within the authorization heading of each
              request you make to the API. For more information or to request
              your own Client ID, reach out to PolicyEngine at{" "}
              <a href="mailto: hello@policyengine.org">
                hello@policyengine.org
              </a>
              .
            </p>
            <div className="api-documentation-links">
              <h4>On this page</h4>
              <ul>
                <li>
                  <a href="#fetch-token">Fetch an authentication token</a>
                </li>
                <li>
                  <a href="#calculate">
                    Calculate household-level policy outcomes
                  </a>
                </li>
                <li>
                  <a href="#variables">Variable and parameter metadata</a>
                </li>
                <li>
                  <a href="#api-playground">API playground</a>
                </li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        title: "Fetch an authentication token",
        id: "fetch-token",
        content: (
          <div className="api-section">
            <p>
              Execute a credentials exchange, using your client ID and client
              secret to obtain an authentication token. This token must be
              included within the authorization header of every HTTP request you
              make to the PolicyEngine API in the format &quot;Bearer
              YOUR_TOKEN&quot; (including the space). Tokens expire every month
              for security purposes.
            </p>
            <div className="code-blocks">
              <CodeBlock
                language="python"
                data={tokenFetchCode}
                title="Request"
              />
              <CodeBlock
                language="json"
                data={tokenOutputCode}
                title="Response"
              />
            </div>
          </div>
        ),
      },
      {
        title: "Calculate household-level policy outcomes",
        id: "calculate",
        content: (
          <div className="api-section">
            <p>
              Returns household-level policy outcomes. Pass in a household
              object defining people, groups and any variable values. Then, pass
              in null values for requested variables - these will be filled in
              with computed values.
            </p>
            <h5>
              <code>POST /{countryId}/calculate</code>
            </h5>
            <div className="code-blocks" data-testid="APIEndpoint_json_blocks">
              <CodeBlock
                language="python"
                data={pythonInputCode}
                title="Request"
              />
              <CodeBlock
                language="json"
                data={
                  metadata
                    ? JSON.stringify(metadata.sample_result || {}, null, 2)
                    : "Loading..."
                }
                title="Response"
              />
            </div>
          </div>
        ),
      },
      {
        title: "Variable and parameter metadata",
        id: "variables",
        content: (
          <div className="api-section">
            <p>
              Access information about all available variables and parameters in
              the PolicyEngine API. This endpoint returns metadata about all the
              inputs and outputs that can be used in calculations.
            </p>
            <h5>
              <code>GET /{countryId}/metadata</code>
            </h5>
            <p>
              Variables represent inputs and outputs of the tax-benefit system,
              such as:
            </p>
            <ul>
              <li>Employment income</li>
              <li>Tax credits</li>
              <li>Benefit eligibility</li>
              <li>Net income</li>
            </ul>
            <p>
              Parameters represent policy settings that can be adjusted in
              reforms, such as:
            </p>
            <ul>
              <li>Tax rates</li>
              <li>Tax brackets</li>
              <li>Benefit amounts</li>
              <li>Eligibility thresholds</li>
            </ul>
            <VariableParameterExplorer metadata={metadata} />
          </div>
        ),
      },
    ],
  };

  return (
    <>
      <GeneralContent
        countryId={countryId}
        isUK={isUK}
        pageType="api"
        content={apiContent}
      >
        {/* Additional API-specific content */}
        <section className="section">
          <div className="section-content">
            <h2 id="api-playground">API Playground</h2>
            <p>Try out the API in this interactive demo.</p>
            <div className="api-playground">
              <iframe
                src={`https://policyengine-policyengine-api-demo-app-xy5rgn.streamlit.app/?embed=true&embed_options=light_theme&embed_options=hide_footer&mode=${countryId}`}
                title="PolicyEngine API demo"
                height="600px"
                width={"100%"}
              />
            </div>
          </div>
        </section>
      </GeneralContent>

      <style>{`
        .api-getting-started {
          margin-bottom: 2rem;
        }

        .api-documentation-links {
          background-color: ${style.colors.BLUE_98};
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 2rem;
        }

        .api-documentation-links ul {
          margin-bottom: 0;
        }

        .api-section {
          margin: 2rem 0;
        }

        .code-blocks {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 1.5rem;
        }

        h5 code {
          background-color: ${style.colors.BLUE_98};
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 1rem;
        }

        .api-playground {
          margin: 2rem 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .section {
          padding: 3rem 0;
        }

        .section-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        @media (min-width: 992px) {
          .code-blocks {
            flex-direction: row;
          }
          
          .code-blocks > div {
            flex: 1;
          }
        }
      `}</style>
    </>
  );
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
          width: "100%",
          backgroundColor: "white",
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.2s",
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

  return (
    <>
      <Tag style={{ marginBottom: 10 }} color="green">
        Parameter
      </Tag>
      <h3>{metadata.label || metadata.name || "Unnamed Item"}</h3>
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

  return (
    <>
      <Tag style={{ marginBottom: 10 }} color="red">
        Variable
      </Tag>
      <h3>{metadata.label || metadata.name || "Unnamed Item"}</h3>
      <p>{metadata.description}</p>
      <p>Entity: {metadata.entity}</p>
      <p>Period: {metadata.definitionPeriod || "none"}</p>
      <p style={{ wordBreak: "break-all" }}>Python name: {metadata.name}</p>
      <p>Unit: {metadata.unit}</p>
    </>
  );
}

export function VariableParameterExplorer(props) {
  const { metadata } = props;
  const [query, setQuery] = useState("");
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [filterByAbolition, setFilterByAbolition] = useState(false);

  const [page, setPage] = useState(0);

  const MAX_ROWS = 3;
  const MAX_COLS = 4;
  const CARDS_PER_PAGE = MAX_ROWS * MAX_COLS;

  if (!metadata) return null;

  const filterByQuery = (item) => {
    if (!query && !filterByAbolition) return true;

    const label = item.label || "";
    if (!label.trim() || /^\d+$/.test(label)) return false;

    const pythonName = item.type === "parameter" ? item.parameter : item.name;

    if (filterByAbolition) {
      // When toggle ON, exclude items starting with "gov.abolitions"
      if (pythonName?.startsWith("gov.abolitions")) return false;
    } else {
      // When toggle OFF, include everything (no exclusion)
    }

    // Filter based on the query string
    if (query) {
      return (
        label
          .replaceAll(" ", "")
          .toLowerCase()
          .includes(query.replaceAll(" ", "").toLowerCase()) ||
        pythonName?.toLowerCase().includes(query.toLowerCase())
      );
    }

    return true;
  };

  const parameterCards = Object.values(metadata.parameters || {})
    .filter((p) => p.type === "parameter")
    .filter((p) => p.label && !/^\d+$/.test(p.label)) // Add this filter
    .filter(filterByQuery)
    .map((p) => ({ ...p, type: "parameter" }));

  const variableCards = Object.values(metadata.variables || {})
    .filter((v) => v.label && !/^\d+$/.test(v.label)) // Add this filter
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
    (page + 1) * CARDS_PER_PAGE,
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
        style={{
          marginBottom: 20,
          width: "100%",
          maxWidth: "500px",
          padding: "8px",
        }}
      />
      <div style={{ marginBottom: 10 }}>
        <label style={{ fontSize: "14px" }}>
          <input
            type="checkbox"
            checked={filterByAbolition}
            onChange={() => {
              setFilterByAbolition((prev) => !prev);
              setPage(0); // reset to first page
            }}
            style={{ marginRight: 8 }}
          />
          Filter abolitions
        </label>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          width: "100%",
        }}
      >
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
        <div style={{ marginTop: 20, marginBottom: 20, textAlign: "center" }}>
          <div
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "0",
                backgroundColor: page === 0 ? "#f5f5f5" : "#ffffff",
                color: page === 0 ? "#00000040" : "#000000d9",
                cursor: page === 0 ? "not-allowed" : "pointer",
                padding: "4px 15px",
                fontSize: "14px",
                fontFamily: "inherit",
                lineHeight: "1.5715",
                transition: "all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
                userSelect: "none",
                touchAction: "manipulation",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "32px",
                minWidth: "32px",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                if (page !== 0) {
                  e.target.style.borderColor = "#40a9ff";
                  e.target.style.color = "#40a9ff";
                }
              }}
              onMouseLeave={(e) => {
                if (page !== 0) {
                  e.target.style.borderColor = "#d9d9d9";
                  e.target.style.color = "#000000d9";
                }
              }}
            >
              ← Previous
            </button>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#000000d9" }}>Page</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={page + 1}
                onChange={(e) => {
                  const newPage = parseInt(e.target.value) - 1;
                  if (newPage >= 0 && newPage < totalPages) {
                    setPage(newPage);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    const newPage = parseInt(e.target.value) - 1;
                    if (newPage >= 0 && newPage < totalPages) {
                      setPage(newPage);
                    }
                  }
                }}
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "0",
                  backgroundColor: "#ffffff",
                  padding: "4px 8px",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  lineHeight: "1.5715",
                  height: "32px",
                  width: "50px",
                  textAlign: "center",
                  outline: "none",
                  transition: "all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
                  // Remove arrow controls
                  MozAppearance: "textfield",
                  WebkitAppearance: "none",
                  appearance: "none",
                  // Additional styles to ensure arrows are hidden in all browsers
                  "::-webkit-inner-spin-button, ::-webkit-outer-spin-button": {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#40a9ff";
                  e.target.style.boxShadow =
                    "0 0 0 2px rgba(24, 144, 255, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d9d9d9";
                  e.target.style.boxShadow = "none";
                }}
              />
              <span style={{ fontSize: "14px", color: "#000000d9" }}>
                of {totalPages}
              </span>
            </div>

            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={page === totalPages - 1}
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "0",
                backgroundColor:
                  page === totalPages - 1 ? "#f5f5f5" : "#ffffff",
                color: page === totalPages - 1 ? "#00000040" : "#000000d9",
                cursor: page === totalPages - 1 ? "not-allowed" : "pointer",
                padding: "4px 15px",
                fontSize: "14px",
                fontFamily: "inherit",
                lineHeight: "1.5715",
                transition: "all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
                userSelect: "none",
                touchAction: "manipulation",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "32px",
                minWidth: "32px",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                if (page !== totalPages - 1) {
                  e.target.style.borderColor = "#40a9ff";
                  e.target.style.color = "#40a9ff";
                }
              }}
              onMouseLeave={(e) => {
                if (page !== totalPages - 1) {
                  e.target.style.borderColor = "#d9d9d9";
                  e.target.style.color = "#000000d9";
                }
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
      <CardDrawer metadata={selectedCardData} />
    </div>
  );
}

// This component is not currently used but kept for future reference
function CardDrawer(props) {
  const { metadata } = props;

  if (!metadata) return null;
  const type = metadata.type;
  return (
    <>
      <Card
        bordered={true}
        style={{
          width: "100%",
          backgroundColor: "white",
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
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

export default APIGeneralContent;
