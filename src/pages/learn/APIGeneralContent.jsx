import React from "react";
import GeneralContent from "./GeneralContent";
import CodeBlock from "../../layout/CodeBlock";
import style from "../../style";

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

export default APIGeneralContent;
