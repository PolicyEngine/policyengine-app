import Footer from "../layout/Footer";
import { apiCall } from "../api/call";
import { Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import Section from "../layout/Section";
import moment from "moment";
import { Tag } from "antd";
import Spinner from "../layout/Spinner";
import { Button, Drawer } from "antd";
import CodeBlock from "../layout/CodeBlock";
import PageHeader from "../layout/PageHeader";
import style from "../style";
import { Link } from "react-router-dom";
import Header from "../layout/Header";

export default function SimulationsPage() {
  // call /simulations endpoint, which returns

  /*"result": [
    {
      "api_version": "1.89.0", 
      "baseline_policy_id": 2, 
      "country_id": "us", 
      "message": null, 
      "options_hash": "{}", 
      "options_json": "{}", 
      "reform_impact_id": 1,
      "reform_impact_json": "{json object}",
      "reform_policy_id": 6, 
      "region": "enhanced_us", 
      "start_time": "2024-09-25 09:58:14.133369", 
      "end_time": "2024-09-25 09:58:14.133369",
      "status": "ok", 
      "time_period": "2024"
      ...
    
    Then put the results in a table with all columns. Refresh the table every 10 seconds.
    */

  const [data, setData] = useState([]);
  const fetchSimulations = async () => {
    apiCall("/simulations").then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          // remove duplicates, identified by (reform_policy_id, baseline_policy_id, region, time_period, options_json)
          // identify duplicates than pick in the following order: ok, error, computing

          const uniqueSimulations = new Map();

          data.result.forEach((simulation) => {
            const key = `${simulation.reform_policy_id}-${simulation.baseline_policy_id}-${simulation.region}-${simulation.time_period}-${simulation.options_json}`;
            if (!uniqueSimulations.has(key)) {
              uniqueSimulations.set(key, simulation);
            } else {
              const existingSimulation = uniqueSimulations.get(key);
              const statusPriority = { ok: 3, error: 2, computing: 1 };
              if (
                statusPriority[simulation.status] >
                statusPriority[existingSimulation.status]
              ) {
                uniqueSimulations.set(key, simulation);
              }
            }
          });

          data.result = Array.from(uniqueSimulations.values());
          data.result.forEach(formatRow);
          setData(data.result);
        });
      }
    });
  };

  useEffect(() => {
    fetchSimulations();
    const interval = setInterval(fetchSimulations, 15000);
    return () => clearInterval(interval);
  }, []);

  const columns = [
    //{ title: 'API Version', dataIndex: 'api_version', key: 'api_version' },
    { title: "Country", dataIndex: "country_id", key: "country_id" },
    {
      title: "Baseline policy",
      dataIndex: "baseline_policy_id",
      key: "baseline_policy_id",
    },
    {
      title: "Reform policy",
      dataIndex: "reform_policy_id",
      key: "reform_policy_id",
    },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Comment", dataIndex: "message", key: "message" },
    //{ title: 'Options Hash', dataIndex: 'options_hash', key: 'options_hash' },
    { title: "Options", dataIndex: "options_json", key: "options_json" },
    {
      title: "Reform Impact ID",
      dataIndex: "reform_impact_id",
      key: "reform_impact_id",
    },
    // { title: 'Reform Impact JSON', dataIndex: 'reform_impact_json', key: 'reform_impact_json' },
    { title: "Region", dataIndex: "region", key: "region" },
    { title: "Time period", dataIndex: "time_period", key: "time_period" },
    { title: "Start time", dataIndex: "start_time", key: "start_time" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Link", dataIndex: "link", key: "link" },
  ];

  return (
    <>
      <Header />
      <PageHeader title="Simulations" backgroundColor={style.colors.BLUE_98}>
        <p style={{ margin: 0 }}>
          This page shows the simulations that are currently running or have run
          in the past for the current version of the API. The table below is
          updated every 15 seconds.
        </p>
      </PageHeader>
      <Section>
        <Table dataSource={data} columns={columns} rowKey="start_time" />
      </Section>
      <Footer />
    </>
  );
}

moment.relativeTimeThreshold("ss", 60);
moment.updateLocale("en", {
  relativeTime: {
    s: function (number, withoutSuffix, key, isFuture) {
      return number + " seconds";
    },
  },
});

function formatRow(row) {
  // Times are in GMT
  const moment_start_time = moment.utc(row.start_time);
  const moment_end_time = moment.utc(row.end_time);
  row.start_time = moment_start_time.fromNow();
  row.duration = row.end_time
    ? moment.duration(moment_end_time.diff(moment_start_time)).humanize()
    : moment.duration(moment().diff(moment_start_time)).humanize();
  if (row.status === "error" && row.message !== null) {
    row.message = <ErrorMessage message={row.message} />;
  }
  const row_options_json = JSON.parse(row.options_json);
  // add tags for each key: value pair
  row.options_json = Object.keys(row_options_json).map((key) => (
    <div key={key} style={{ display: "flex" }}>
      <Tag key={key} style={{ margin: 0 }}>
        {key}
      </Tag>
      <Tag key={key + "_value"} style={{ margin: 0 }} color="blue">
        {row_options_json[key]}
      </Tag>
    </div>
  ));
  row.status =
    {
      ok: <Tag color="green">OK</Tag>,
      computing: (
        <Tag color="blue">
          <Spinner style={{ marginRight: 10 }} />
          COMPUTING
        </Tag>
      ),
      error: <Tag color="red">ERROR</Tag>,
    }[row.status] || row.status;
  const CODE_FIELDS = [
    "country_id",
    "baseline_policy_id",
    "reform_policy_id",
    "reform_impact_id",
    "options_json",
    "region",
    "time_period",
  ];
  row.link = (
    <Link
      style={{ color: style.colors.BLUE, textDecoration: "underline" }}
      to={`/${row.country_id}/policy?focus=policyOutput.policyBreakdown&reform=${row.reform_policy_id}&region=${row.region}&timePeriod=${row.time_period}&baseline=${row.baseline_policy_id}`}
    >
      #{row.reform_policy_id}
    </Link>
  );
  for (let field of CODE_FIELDS) {
    row[field] = <code>{row[field]}</code>;
  }
}

function ErrorMessage(props) {
  const message = props.message;
  const [open, setIsOpen] = useState(false);
  return (
    <>
      <Drawer
        title="Error message"
        placement="right"
        closable={true}
        visible={open}
        width={"70%"}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <CodeBlock language="python" data={message} maxHeight="100%" />
      </Drawer>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Show error message
      </Button>
    </>
  );
}
