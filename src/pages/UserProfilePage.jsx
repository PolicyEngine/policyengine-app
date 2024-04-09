import Footer from "../redesign/components/Footer";
import Header from "../redesign/components/Header";
import Helmet from "react-helmet";
import Section from "../redesign/components/Section";
import PageHeader from "../redesign/components/PageHeader";
import style from "../redesign/style";
import { Link } from "react-router-dom";
import { countryNames } from "../data/countries";

export default function UserProfilePage() {

  const vertPad = "10px";
  const horizPad = "10px";

  // Fetch data here; below is examlpe data for the time being
  const EXAMPLE_DATA = [
    {
      id: 44151,
      label: "Test Policy",
      country_id: "us"
    },
    {
      id: 14,
      label: "Making the CTC fully refundable",
      country_id: "us",
    },
    {
      id: 3349,
      label: "Repealing Oregon's exemption credit",
      country_id: "us",
    },
    {
      id: 3752,
      label: "Raising the basic rate to 25%",
      country_id: "uk",
    },
  ];

  const savedSimulations = EXAMPLE_DATA.map((row, index) => {
    const bgColor = index % 2 === 0 ? style.colors.LIGHT_GRAY : style.colors.WHITE;

    return (
      <tr
        key={`${index}-${row.id}`}
      >
        <td
          style={{
            padding: `${vertPad} ${horizPad}`,
            backgroundColor: bgColor,
          }}
        >{row.label}</td>
        <td
          style={{
            padding: `${vertPad} ${horizPad}`,
            backgroundColor: bgColor
          }}
        >{row.country_id}</td>
        <td
          style={{
            padding: `${vertPad} ${horizPad}`,
            backgroundColor: bgColor
          }}
        >
          <Link to={`https://wwww.policyengine.org/${row.country_id}/policy/?reform=${row.id}`}>
            <span
              style={{
                color: style.colors.BLUE_PRIMARY
              }}
            >
              #{row.id}
            </span>
          </Link>
        </td>
      </tr>
    );
  });

  const fullTable = (
    <table
      style={{
        width: "100%",
        fontSize: 16,
        fontFamily: style.fonts.BODY_FONT,
      }}
    >
      <thead>
        <tr
          style={{
            fontFamily: style.fonts.HEADER_FONT,
            backgroundColor: style.colors.BLUE_PRIMARY,
            color: style.colors.WHITE
          }}
        >
          <th
            style={{
              padding: `${vertPad} ${horizPad}`
            }}
          >Reform</th>
          <th
            style={{
              padding: `${vertPad} ${horizPad}`
            }}
          >Geography</th>
          <th
            style={{
              padding: `${vertPad} ${horizPad}`
            }}
          >View Again</th>
        </tr>
      </thead>
      <tbody>
        {savedSimulations}
      </tbody>
    </table>
  );

  return (
    <>
      <Helmet>
        <title>My Profile | PolicyEngine</title>
      </Helmet>
      <div>
        <Header />
        {/*<PageHeader
          title="My profile"
          backgroundColor={style.colors.BLUE_98}
        >
          <p style={{ margin: 0 }}>
            Use this page to revisit policy simulations you
            saved previously.
          </p>
        {/*</PageHeader>*/}
        {/*<div style={{ paddingTop: 20, paddingBottom: 20 }}>*/}
        <Section
          title="Saved Policy Simulations"
          backgroundColor={style.colors.BLUE_98}
        >
          {fullTable}
        </Section>
        <Footer />
      </div>
    </>
  )

}