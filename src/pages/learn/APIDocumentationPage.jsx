import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import useCountryId from "../../hooks/useCountryId";

import { Helmet } from "react-helmet";
import { defaultYear } from "data/constants";
import APIGeneralContent from "./APIGeneralContent";

// During front-end redesign, this page should be refactored
// to use design system layout components and improved best practices.
// import CodeBlock from "../../layout/CodeBlock";
// import Section from "../../layout/Section";
// import { useEffect, useState } from "react";
// import {wrappedResponseJson}  from "../../data/wrappedJson";

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
      <Footer />
    </>
  );
}

// These components are not currently used but kept for future reference

// function APIEndpoint({
//   pattern,
//   method,
//   title,
//   description,
//   children,
//   exampleInputJson,
//   id,
//   countryId,
//   displayCategory,
// }) {
//   const [outputJson, setOutputJson] = useState("");

//   const hasInput = Boolean(exampleInputJson);

//   useEffect(() => {
//     const HOUSEHOLD_API_URL = "https://household.api.policyengine.org";

//     // This has to be written as a standalone function because
//     // useEffect can't handle anonymous async/await
//     async function fetchOutput() {
//       if (!countryId || !exampleInputJson) {
//         setOutputJson(null);
//         return;
//       }

//       try {
//         const res = await fetch(
//           HOUSEHOLD_API_URL + `/${countryId}/calculate_demo`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(exampleInputJson),
//           },
//         );
//         const resJson = await wrappedResponseJson(res);
//         setOutputJson(resJson);
//       } catch (err) {
//         console.error(err);
//         setOutputJson("Error while fetching output; please try again later");
//       }
//     }

//     fetchOutput();
//   }, [countryId, exampleInputJson]);

//   let pythonInputCode = `import requests\n\nurl = "https://household.api.policyengine.org/${countryId}/calculate"\n\nheaders = {\n    "Authorization": "Bearer YOUR_TOKEN_HERE",\n    "Content-Type": "application/json",\n}\n\nresponse = requests.post(url, headers=headers, json=${JSON.stringify(exampleInputJson, null, 2)})\n\nprint(response.json())`;
//   pythonInputCode = pythonInputCode.replaceAll("null", "None");

//   return (
//     <Section>
//       <h3 id={id}>{title}</h3>
//       <h5>
//         <code>
//           {method} {pattern}
//         </code>
//       </h5>
//       <p>{description}</p>

//       <div
//         data-testid="APIEndpoint_json_blocks"
//         style={{
//           display: "flex",
//           flexDirection: displayCategory === "mobile" && "column",
//           gap: displayCategory === "mobile" ? "2rem" : "50px",
//           marginTop: displayCategory === "mobile" ? "2rem" : 40,
//         }}
//       >
//         {hasInput && (
//           <CodeBlock language="python" data={pythonInputCode} title="Input" />
//         )}
//         <CodeBlock
//           language="json"
//           data={JSON.stringify(outputJson, null, 2)}
//           title="Output"
//         />
//       </div>
//       {children}
//     </Section>
//   );
// }

// function APIEndpointStatic({
//   pattern,
//   method,
//   title,
//   description,
//   children,
//   exampleInput,
//   id,
//   displayCategory,
//   exampleOutput,
// }) {
//   const hasInput = Boolean(exampleInput);

//   return (
//     <Section>
//       <h3 id={id}>{title}</h3>
//       <h5>
//         <code>
//           {method} {pattern}
//         </code>
//       </h5>
//       <p>{description}</p>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: displayCategory === "mobile" && "column",
//           gap: displayCategory === "mobile" ? "2rem" : "50px",
//           marginTop: displayCategory === "mobile" ? "2rem" : 40,
//         }}
//       >
//         {hasInput && (
//           <CodeBlock language="python" data={exampleInput} title="Input" />
//         )}
//         <CodeBlock language="json" data={exampleOutput} title="Output" />
//       </div>
//       {children}
//     </Section>
//   );
// }
