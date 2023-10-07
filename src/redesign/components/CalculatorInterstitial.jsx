import style from "style";
import Header from "./Header";
import ActionButton from "./ActionButton";
import useDisplayCategory from "./useDisplayCategory";
import useCountryId from "./useCountryId";

export default function CalculatorInterstitial() {
    const displayCategory = useDisplayCategory();
    const countryId = useCountryId();
    return <>
        <Header />
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
        }}>
        <h3 className="spaced-sans-serif" style={{
            fontWeight: 300,
        }}>
            Choose a calculator
        </h3>
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: displayCategory === "mobile" ? "column" : "row",
        }}>
            <CalculatorOption 
                left
                title="Calculate my taxes and benefits"
                link={`/${countryId}/household`}
                description="Enter your household details and see how tax-benefit policy affects you."
            />
            <CalculatorOption
                title="Calculate policy reform impacts"
                link={`/${countryId}/policy`}
                description="See how different policy reforms affect your household and the economy."
            />
        </div>
    </>
}

style;

function CalculatorOption({
    left,
    title,
    description,
    link,
}) {
    const arrow = left ?
        <span className="material-symbols-outlined" style={{marginRight: 20}}>arrow_back</span> :
        <span className="material-symbols-outlined" style={{marginLeft: 20}}>arrow_forward</span>
    return <div style={{
        margin: 20,
        width: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }}>
        <ActionButton
            direction={left ? "right" : "left"}
            text={<>{left && arrow}{title}{!left && arrow}</>}
            height={300}
            width={300}
            noArrow
            link={link}
        />
        <div style={{
            height: 100,
            paddingTop: 20,
        }}>
        <p>
            {description}
        </p>
        </div>
    </div>
}