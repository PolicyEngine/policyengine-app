import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { asyncApiCall, copySearchParams } from "../../../api/call";
import ErrorPage from "../../../layout/Error";
import LoadingCentered from "../../../layout/LoadingCentered";
import ResultsPanel from "../../../layout/ResultsPanel";
import Screenshottable from "../../../layout/Screenshottable";
import { ArrowDownOutlined, ArrowUpOutlined, MinusOutlined } from "@ant-design/icons";
import MathJax from "react-mathjax";
import { capitalize } from "../../../api/language";

export default function MacroImpact(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get("region");
  const timePeriod = searchParams.get("timePeriod");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");
  const [impact, setImpact] = useState(null);
  const [error, setError] = useState(null);
  const { metadata, policyLabel } = props;
  useEffect(() => {
    if (!!region && !!timePeriod && !!reformPolicyId && !!baselinePolicyId) {
      const url = `/${metadata.countryId}/economy/${reformPolicyId}/over/${baselinePolicyId}?region=${region}&time_period=${timePeriod}&target=macro`;
      setImpact(null);
      setError(null);
      asyncApiCall(url, null, 5_000)
        .then((data) => {
          if (data.status === "erro") {
            setError(data.message);
          } else {
            setImpact(data.result);
          }
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      const defaults = {
        region: metadata.economy_options.region[0].name,
        timePeriod: metadata.economy_options.time_period[0].name,
        baseline: metadata.current_law_id,
      };
      let newSearch = copySearchParams(searchParams);
      // Set missing query parameters to their defaults.
      newSearch.set("region", searchParams.get("region") || defaults.region);
      newSearch.set(
        "timePeriod",
        searchParams.get("timePeriod") || defaults.timePeriod
      );
      newSearch.set(
        "baseline",
        searchParams.get("baseline") || defaults.baseline
      );
      setSearchParams(newSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, timePeriod, reformPolicyId, baselinePolicyId]);

  if (error) {
    return (
      <ErrorPage
        message={`We ran into an issue when trying to simulate your policy. Please try again later. The full message is ${JSON.stringify(
          error
        )}`}
      />
    );
  }

  if (!reformPolicyId) {
    return <ErrorPage message="No policy selected." />;
  }

  if (!impact) {
    return <LoadingCentered message="Computing the macroeconomic impact..." />;
  }

  const baselineGDP = impact.baseline.steady_state.Yss;
  const reformGDP = impact.reform.steady_state.Yss;
  const percentChange = Math.round((reformGDP - baselineGDP) / baselineGDP * 1000) / 10;

  return (
    <ResultsPanel
      title={`${policyLabel} would ${
        percentChange > 0 ?
          `raise GDP by ${percentChange}%` :
          percentChange < 0 ?
            `lower GDP by ${-percentChange}%` :
            `have no effect on GDP`
      }`}
    >
        <Screenshottable>
        <MathJax.Provider>
        <div style={{paddingTop: 20}} />
        {
          Object.keys(impact.baseline.steady_state)
            .map(variable => <MacroVariable variable={variable} impact={impact} />)
        }
        <div style={{paddingTop: 60}} />
        </MathJax.Provider>
      </Screenshottable>
    </ResultsPanel>
  );
}

function MacroVariable(props) {
  const { variable, impact } = props;
  let label = variableLabels[variable] || variable;
  if (!variableLabels[variable]) {
    return null;
  }
  // Check if nan
  if (!Number(impact.baseline.steady_state[variable])) {
    return null;
  }
  let description = variableLabels[variable] || "";
  if (label.includes("$")) {
    description = label.split("$")[0].slice(0, -2);
    try {
      label = <h3 style={{display: "flex", alignItems: "center", textAlign: "center"}}><MathJax.Node inline formula={label.split("$")[1]} /></h3>
    } catch (e) {
    }
  } else {
    label = capitalize(label.toLowerCase());
    label = <h6 style={{display: "flex", alignItems: "center"}}>{label}</h6>
  }
  description = capitalize(description.toLowerCase());
  const baselineValue = Number(impact.baseline.steady_state[variable])
  const reformValue = Number(impact.reform.steady_state[variable])
  const percentChange = Math.round((reformValue - baselineValue) / Math.abs(baselineValue) * 1000) / 1000;
  const percentChangeString = Math.round(percentChange * 1000) / 10;
  return <div style={{paddingRight: 30, paddingBottom: 20, display: "flex"}}>
    <div style={{width: 200, display: "flex", alignItems: "center", paddingRight: 10, alignItems: "center", justifyContent: "left"}}>
      <div style={{width: 100}}>{label}</div>
      <div style={{width: 150, display: "flex", alignItems: "center", paddingRight: 10, alignItems: "center", justifyContent: "center"}}>
      {percentChange > 0 ? 
        <ArrowUpOutlined style={{color: "green", fontSize: 20, paddingBottom: 20, marginRight: 15}} /> : 
        percentChange < 0 ?
          <ArrowDownOutlined style={{color: "red", fontSize: 20, paddingBottom: 20, marginRight: 15}} />  :
          <MinusOutlined style={{color: "grey", fontSize: 20, paddingBottom: 20, marginRight: 15}} />
      }
      <h6 style={{
        color: percentChange > 0 ? "darkgreen" : percentChange < 0 ? "darkred" : "grey",
        paddingBottom: 20,
      }}>{Math.abs(percentChangeString)}%</h6>
    </div>
    </div>
    {description}{" "}
    {
      percentChange === 0 ?
        `remains at ${Math.round(baselineValue * 1000) / 1000}` :
        percentChange > 0 ?
          `rises by ${percentChangeString}% from ${Math.round(baselineValue * 1000) / 1000} to ${Math.round(reformValue * 1000) / 1000}` :
          `falls by ${-percentChangeString}% from ${Math.round(baselineValue * 1000) / 1000} to ${Math.round(reformValue * 1000) / 1000}`
    }
  </div>
}


let variableLabels = {
  "Y": "GDP ($Y_t$)",
  "C": "Consumption ($C_t$)",
  "L": "Labor ($L_t$)",
  "G": "Government Expenditures ($G_t$)",
  "TR": "Lump sum transfers ($TR_t$)",
  "B": "Wealth ($B_t$)",
  "I_total": "Investment ($I_t$)",
  "K": "Capital Stock ($K_t$)",
  "Y_vec": "GDP ($Y_t$)",
  "C_vec": "Consumption ($C_t$)",
  "L_vec": "Labor ($L_t$)",
  "K_vec": "Capital Stock ($K_t$)",
  "K_d": "Domestically-owned Capital Stock ($K^d_t$)",
  "K_f": "Foreign-owned Capital Stock ($K^f_t$)",
  "D": "Government Debt ($D_t$)",
  "D_d": "Domestically-owned government Debt ($D^d_t$)",
  "D_f": "Foreign-owned government Debt ($D^f_t$)",
  "r": "Real interest rate ($r_t$)",
  "r_gov": "Real interest rate on government debt ($r_{gov,t}$)",
  "r_p": "Real interest rate on household portfolio ($r_{p,t}$)",
  "w": "Wage rate",
  "BQ": "Aggregate bequests ($BQ_{j,t}$)",
  "total_tax_revenue": "Total tax revenue ($REV_t$)",
  "business_tax_revenue": "Business tax revenue",
  "iit_revenue": "Income tax revenue",
  "payroll_tax_revenue": "Payroll tax revenue",
  "iit_payroll_tax_revenue": "Income and payroll tax revenue",
  "n_mat": "Labor Supply ($n_{j,s,t}$)",
  "c_path": "Consumption ($c_{j,s,t}$)",
  "bmat_splus1": "Savings ($b_{j,s+1,t+1}$)",
  "bq_path": "Bequests ($bq_{j,s,t}$)",
  "bmat_s": "Savings ($b_{j,s,t}$)",
  "y_before_tax_mat": "Before tax income",
  "etr_path": "Effective Tax Rate ($ETR_{j,s,t}$)",
  "mtrx_path": "Marginal Tax Rate, Labor Income ($MTRx_{j,s,t}$)",
  "mtry_path": "Marginal Tax Rate, Capital Income ($MTRy_{j,s,t}$)",
  "tax_path": "Total Taxes",
  "nssmat": "Labor Supply ($\\bar{n}_{j,s}$)",
  "bssmat_s": "Savings ($\\bar{b}_{j,s}$)",
  "bssmat_splus1": "Savings ($\\bar{b}_{j,s+1}$)",
  "cssmat": "Consumption ($\\bar{c}_{j,s}$)",
  "yss_before_tax_mat": "Before-tax Income",
  "etr_ss": "Effective Tax Rate ($\\bar{ETR}_{j,s}$)",
  "mtrx_ss": "Marginal Tax Rate, Labor Income ($\\bar{MTRx}_{j,s}$)",
  "mtry_ss": "Marginal Tax Rate, Capital Income ($\\bar{MTRy}_{j,s}$)",
  "ETR": "Effective Tax Rates",
  "MTRx": "Marginal Tax Rates on Labor Income",
  "MTRy": "Marginal Tax Rates on Capital Income",
  "etr": "Effective Tax Rates",
  "mtrx": "Marginal Tax Rates on Labor Income",
  "mtry": "Marginal Tax Rates on Capital Income",
  "Yss": "Gross domestic product ($\\bar{Y}$)",
  "Css": "Consumption ($\\bar{C}$)",
  "Lss": "Labor ($\\bar{L}$)",
  "Gss": "Government Expenditures ($\\bar{G}$)",
  "TR_ss": "Lump sum transfers ($\\bar{TR}$)",
  "Bss": "Wealth ($\\bar{B}$)",
  "Iss_total": "Investment ($\\bar{I}$)",
  "Kss": "Capital Stock ($\\bar{K}$)",
  "K_d_ss": "Domestically-owned Capital Stock ($\\bar{K}^d$)",
  "K_f_ss": "Foreign-owned Capital Stock ($\\bar{K}^f$)",
  "Dss": "Government Debt ($\\bar{D}$)",
  "D_d_ss": "Domestically-owned government Debt ($\\bar{D}^d$)",
  "D_f_ss": "Foreign-owned government Debt ($\\bar{D}^f$)",
  "rss": "Real interest rate ($\\bar{r}$)",
  "r_gov_ss": "Real interest rate on government debt ($\\bar{r}_{gov}$)",
  "r_p_ss": "Real interest rate on household portfolio ($\\bar{r}_{hh}$)",
  "wss": "Wage rate ($\\bar{w}$)",
  "BQss": "Aggregate bequests ($\\bar{BQ}_{j}$)",
  "debt_service_ss": "Debt service cost ($\\bar{r}_{gov}\\bar{D}$)",
  "D/Y": "Debt to GDP ratio",
  "T_Pss": "Government Pensions",
};