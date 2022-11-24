import Button from "../../../controls/Button";
import style from "../../../style";
import { getReformDefinitionCode } from "../../policy/output/PolicyReproducibility";


function PythonCodeBlock({ lines }) {
    // Turn 4-space indents into padding-left
    const lineIndents = lines.map(line => {
        let numIndents = 0;
        if (!line) {
            return 0;
        }
        let lineCopy = line.toString();
        while (Array.from(lineCopy.slice(0, 4)).filter(char => char === " ").length === 4) {
            lineCopy = lineCopy.slice(4);
            if (lineCopy.length < 4) {
                break;
            }
            numIndents++;
        }
        return numIndents;
    })
   return <div style={{display: "flex", justifyContent: "center"}}><div
    style={{
        backgroundColor: style.colors.DARK_GRAY,
        borderRadius: 20,
        padding: 20,
        width: 600,
        overflowX: "scroll",
    }}
   >
   {
    lines.map((line, i) => {
        if (line === "") {
            return <div style={{paddingTop: 15}} />
        } else {
            return <p style={{
                color: style.colors.WHITE,
                fontFamily: "monospace",
                paddingLeft: lineIndents[i] * 30,
                margin: 0,
                whiteSpace: "nowrap",
                paddingTop: 5,
            }}>{line}</p>;
        }
    })
   }
    </div></div>
}

export default function HouseholdReproducibility(props) {
    const { policy, metadata, household } = props;

    let initialLines = [
        "from policyengine_" + metadata.countryId + " import Simulation",
    ];

    if (policy.reform.data) {
        initialLines = initialLines.concat(getReformDefinitionCode(metadata, policy));
    }

    let householdInput = JSON.parse(JSON.stringify(household.input));

    for (const entityPlural of Object.keys(householdInput)) {
        for (const entity of Object.keys(householdInput[entityPlural])) {
            for (const variable of Object.keys(householdInput[entityPlural][entity])) {
                if (variable !== "members") {
                    if (householdInput[entityPlural][entity][variable][2022] === null) {
                        delete householdInput[entityPlural][entity][variable];
                    }
                }
            }
        }
    }

    let householdJson = JSON.stringify(householdInput);
    // It's Python-safe, so we need to make true -> True and false -> False and null -> None
    householdJson = householdJson.replace(/true/g, "True").replace(/false/g, "False").replace(/null/g, "None");

    initialLines = initialLines.concat([
        "situation = " + householdJson,
        "",
        "simulation = Simulation(",
        policy.reform.data ? "    reform=reform," : "",
        "    situation=situation,",
        ")",
        "",
        "simulation.trace = True",
        "simulation.calculate(\"household_net_income\", 2022)",
        "simulation.tracer.print_computation_log()",
    ]);

    // This component shows the Python code necessary to run a microsimulation to reproduce
    // results on PolicyEngine.
    return <>
        <PythonCodeBlock lines={initialLines} />
        <div style={{display: "flex", justifyContent: "center", paddingTop: 30, marginBottom: 30 }}><Button 
            text="Copy"  style={{width: 100}} 
            onClick={() => {
                navigator.clipboard.writeText(initialLines.join("\n"))
            }}
        /></div>
    </>;
}