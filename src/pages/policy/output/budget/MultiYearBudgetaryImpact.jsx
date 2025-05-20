import { Table } from "antd";

const usDataSources = [
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
    style: {
      fontWeight: "bold",
    },
  },
  {
    header: "State tax",
    budgetKey: "state_tax_revenue_impact",
    style: {
      fontStyle: "italic",
    },
  },
];

const ukDataSources = [
  {
    header: "Tax",
    budgetKey: "budgetary_impact",
  },
  {
    header: "Benefits",
    budgetKey: "benefit_spending_impact",
  },
  {
    header: "Total",
    budgetKey: "tax_revenue_impact",
    style: {
      fontWeight: "bold",
    },
  },
];

const dataSourcesByCountry = {
  us: usDataSources,
  uk: ukDataSources,
};

const financialYearTypeByCountry = {
  us: "calendar",
  uk: "mixed",
  default: "calendar",
};

/**
 * Maps a year to an Ant Design column title Object
 * @param {number} year - The year to map
 * @param {string} country - The country to map the year for
 * @returns {Object} - The Ant Design column title Object
 */
export function mapFinancialYearToColumn(year, country) {
  const yearType =
    financialYearTypeByCountry[country] || financialYearTypeByCountry.default;

  let displayYear = year;
  if (yearType === "mixed") {
    displayYear = `${year}-${(year % 100) + 1}`;
  }

  return {
    title: displayYear,
    dataIndex: year,
    key: year,
  };
}

export default function MultiYearBudgetaryImpact(props) {
  const { metadata, impact, singleYearResults, policyLabel, region } = props;

  const years = singleYearResults.map((item) => {
    return item.simulationRequestSetup.year;
  });

  const columns = [
    {
      title: `Net revenue impact (billions)`,
      dataIndex: "netRevenueImpact",
      key: "netRevenueImpact",
    },
    ...years.map((year) => mapFinancialYearToColumn(year, metadata.countryId)),
    {
      title: getYearRangeFromArray(years, metadata.countryId),
      dataIndex: "yearRange",
      key: "yearRange",
    },
  ];

  const countryDataSource = dataSourcesByCountry[region];

  const dataSources = countryDataSource.map((item) => {
    return {
      netRevenueImpact: item.header,
      ...getYearlyImpacts(singleYearResults, item.budgetKey),
      yearRange: roundToBillions(impact.budget[item.budgetKey]),
    };
  });

  const displayPeriod = getYearRangeFromArray(years, metadata.countryId);

  const regionObj = metadata.economy_options.region.find(
    (elem) => elem.name === region,
  );

  let regionLabel = "undefined region";
  if (regionObj) {
    regionLabel = regionObj.label;
  }

  const recordStylingOverrides = (record, index) => {
    let styles = {};

    if (
      record.netRevenueImpact === "Federal budget" ||
      record.netRevenueImpact === "Total"
    ) {
      styles.fontWeight = "bold";
    }

    if (record.netRevenueImpact === "State tax") {
      styles.fontStyle = "italic";
    }

    return {
      style: styles,
    };
  };

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
      <Table
        columns={columns}
        dataSource={dataSources}
        onRow={recordStylingOverrides}
      />
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

export function getYearRangeFromArray(years, country) {
  const financialYearType =
    financialYearTypeByCountry[country] || financialYearTypeByCountry.default;

  const startYear = years[0];
  let endYear = years[years.length - 1];

  // If the financial year type is mixed, we need to add one to the end year
  if (financialYearType === "mixed") {
    endYear++;
  }

  const endYearLastTwoDigits = endYear.toString().slice(-2);

  return `${startYear}-${endYearLastTwoDigits}`;
}

export function roundToBillions(number, decimals = 0) {
  return (number / 1e9).toFixed(decimals);
}
