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
  const { impact, singleYearResults } = props;

  const years = singleYearResults.map((item) => {
    return item.simulationRequestSetup.year;
  });

  const columns = [
    {
      title: "Net revenue impact (billions currency)",
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

  return (
    <div>
      <h2>Title for this component</h2>
      <Table columns={columns} dataSource={dataSources} />
    </div>
  );
}

function getYearlyImpacts(singleYearResults, budgetKey) {
  const yearlyImpacts = {};
  singleYearResults.forEach((item) => {
    const year = item.simulationRequestSetup.year;
    const impact = roundToBillions(item.result.budget[budgetKey]);

    yearlyImpacts[year] = impact;
  });
  return yearlyImpacts;
}

function getYearRangeFromArray(years) {
  const startYear = years[0];
  const endYearLastTwoDigits = years[years.length - 1].toString().slice(-2);

  return `${startYear}-${endYearLastTwoDigits}`;
}

function roundToBillions(number, decimals = 1) {
  return (number / 1e9).toFixed(decimals);
}
