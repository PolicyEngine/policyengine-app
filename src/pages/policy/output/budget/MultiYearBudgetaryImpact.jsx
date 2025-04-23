import { Table } from "antd";

const dataSourceHeadersAndPaths = [
  {
    header: "Federal tax",
    budgetKey: "budgetary_impact",
  },
  {
    header: "Benefits",
    budgetKey: "benefit_spending_impact",
  },
  {
    header: "Federal budget",
    budgetKey: "tax_revenue_impact",
  },
  {
    header: "State tax",
    budgetKey: "state_tax_revenue_impact",
  },
];

export default function MultiYearBudgetaryImpact(props) {
  const { metadata, impact, singleYearResults, policyLabel, region } = props;

  const years = singleYearResults.map((item) => {
    return item.simulationRequestSetup.year;
  });

  const columns = [
    {
      title: `Net revenue impact (${metadata.currency}bn)`,
      dataIndex: "netRevenueImpact",
      key: "netRevenueImpact",
    },
    ...years.map((year) => {
      return {
        title: year,
        dataIndex: year,
        key: year,
      };
    }),
    {
      title: getYearRangeFromArray(years),
      dataIndex: "yearRange",
      key: "yearRange",
    },
  ];

  const dataSources = dataSourceHeadersAndPaths.map((item) => {
    return {
      netRevenueImpact: item.header,
      ...getYearlyImpacts(singleYearResults, item.budgetKey),
      yearRange: roundToBillions(impact.budget[item.budgetKey]),
    };
  });

  const displayPeriod = getYearRangeFromArray(years);

  const regionObj = metadata.economy_options.region.find(
    (elem) => elem.name === region,
  );

  let regionLabel = "undefined region";
  // This is a workaround for enhanced_us that should be changed
  // if and when it is treated as something other than a "region"
  // by the back end
  if (regionObj?.name === "enhanced_us") {
    regionLabel = "the US";
  } else if (regionObj) {
    regionLabel = regionObj.label;
  }

  const title = `${policyLabel} in ${regionLabel}, ${displayPeriod}`;

  return (
    <div>
      <h2
        style={{
          marginBottom: "30px",
        }}
      >
        {title}
      </h2>
      <Table columns={columns} dataSource={dataSources} />
    </div>
  );
}

export function getYearlyImpacts(singleYearResults, budgetKey) {
  const yearlyImpacts = {};
  singleYearResults.forEach((item) => {
    const year = item.simulationRequestSetup.year;
    const impact = roundToBillions(item.result.budget[budgetKey]);

    yearlyImpacts[year] = impact;
  });
  return yearlyImpacts;
}

export function getYearRangeFromArray(years) {
  const startYear = years[0];
  const endYearLastTwoDigits = years[years.length - 1].toString().slice(-2);

  return `${startYear}-${endYearLastTwoDigits}`;
}

export function roundToBillions(number, decimals = 1) {
  return (number / 1e9).toFixed(decimals);
}
