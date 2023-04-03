import { useState } from "react";
import { Container } from "react-bootstrap";
import { Input, Card, Divider, Tag, Drawer } from "antd";
import style from "../../style";

function APIResultCard(props) {
    const { metadata, type, setSelectedCard } = props;
    // type can be: parameter, variable
    // parameters look like this: "gov.dcms.bbc.tv_licence.discount.aged.discount":{"description":"Percentage discount for qualifying aged households.","economy":true,"household":true,"label":"Aged TV Licence discount","parameter":"gov.dcms.bbc.tv_licence.discount.aged.discount","period":null,"type":"parameter","unit":"/1","values":{"2003-01-01":1}}
    // variables look like this: "income_tax":{"adds":["earned_income_tax","savings_income_tax","dividend_income_tax","CB_HITC"],"category":"tax","defaultValue":0,"definitionPeriod":"year","documentation":"Total Income Tax liability","entity":"person","hidden_input":false,"indexInModule":22,"isInputVariable":false,"label":"Income Tax","moduleName":"gov.hmrc.income_tax.liability","name":"income_tax","subtracts":["capped_mcad"],"unit":"currency-GBP","valueType":"float"}
    // use antd card component
    // rounded edges, display all metadata and distinguish between parameters and variables

    return <Card bordered={true} style={{ 
        width: 250, 
        backgroundColor: style.colors.WHITE,
        margin: 15,
    }}
    onClick={() => setSelectedCard({...metadata, "type": type})}
    >
        {
            type === "parameter" ?
                <APIParameterCard metadata={metadata} /> :
                <APIVariableCard metadata={metadata} />
        }
    </Card>
}

function APIParameterCard(props) {
    const { metadata } = props;
    // use antd card component
    // rounded edges, display all metadata and distinguish between parameters and variables
    // "gov.dcms.bbc.tv_licence.discount.aged.discount":{"description":"Percentage discount for qualifying aged households.","economy":true,"household":true,"label":"Aged TV Licence discount","parameter":"gov.dcms.bbc.tv_licence.discount.aged.discount","period":null,"type":"parameter","unit":"/1","values":{"2003-01-01":1}}

    return <>
    <Tag style={{marginBottom: 10}} color="green">Parameter</Tag>
        <h3>{metadata.label}</h3>
        <p>{metadata.description}</p>
        <p>Period: {metadata.period || "None"}</p>
        <p>Unit: {metadata.unit}</p>
    </>
}

function APIVariableCard(props) {
    const { metadata } = props;
    metadata;
    // use antd card component
    // rounded edges, display all metadata and distinguish between parameters and variables

    return <>
        <Tag style={{marginBottom: 10}} color="red">Variable</Tag>
        <h3>{metadata.label}</h3>
        <p>{metadata.description}</p>
        <p>Entity: {metadata.entity}</p>
        <p>Period: {metadata.period || "none"}</p>
        <p>Unit: {metadata.unit}</p>
    </>
}


export default function ModelDocumentation(props) {
    const { countryId, metadata } = props;
    const [query, setQuery] = useState("");
    const [selectedCardData, setSelectedCardData] = useState(null);

    if (!metadata) {
        return <></>;
    }

    const parameterCards = Object.values(metadata.parameters)
        .filter(parameter => parameter.type == "parameter")
        .filter(parameter => {
            if (query === "") {
                return true;
            }
            return (parameter.label || "").replaceAll(" ", "").toLowerCase().includes(query.replaceAll(" ", "").toLowerCase())
        })
        .slice(0, 50)
        .map((parameter) => {
        return <APIResultCard key={parameter.name} metadata={parameter} type="parameter" setSelectedCard={setSelectedCardData} />
    })

    const variableCards = Object.values(metadata.variables)
        .filter(variable => {
            if (query === "") {
                return true;
            }
            return (variable.label || "").replaceAll(" ", "").toLowerCase().includes(query.replaceAll(" ", "").toLowerCase())
        })
        .slice(0, 50)
        .map((variable) => {
        return <APIResultCard key={variable.name} metadata={variable} type="variable" setSelectedCard={setSelectedCardData} />
    })

    return <>
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
            <div style={{
                marginTop: 50,
                marginBottom: 50,
                marginLeft: 8,
            }}>
            <h1>PolicyEngine {countryId.toUpperCase()} API reference</h1>
            </div>
            <Input value={query} onChange={e => setQuery(e.target.value)} bordered={false} placeholder="Search for a variable or parameter" style={{
                fontSize: 20,
                // Show cursor
                caretColor: style.colors.BLACK,
                marginLeft: 0
            }} 
            // Auto-focus
            autoFocus={true}
            />
            <Divider />

            <div // make cards display in a grid
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "left",
            }}>
            {parameterCards}
            {variableCards}
            </div>


        </Container>

    </>
}

function CardDrawer(props) {
    const { metadata } = props;

    if (!metadata) {
        return <></>;
    }
    const type = metadata.type;
    return <>
        {
            type === "parameter" ?
                <APIParameterCard metadata={metadata} /> :
                <APIVariableCard metadata={metadata} />
        }
    </>
}