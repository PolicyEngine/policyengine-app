import Footer from "../layout/Footer";
import Header from "../redesign/components/Header";
import Helmet from "react-helmet";
import Section from "../redesign/components/Section";
import PageHeader from "../redesign/components/PageHeader";
import style from "../redesign/style";
import { Link } from "react-router-dom";
import { countryNames } from "../data/countries";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingOutlined, FileImageOutlined } from "@ant-design/icons";
import { useDisplayCategory } from "../layout/Responsive";

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
    const geography = countryNames?.[row.country_id].singleWord || countryNames?.[row.country_id].standard || "unknown"

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
        >{geography}</td>
        <td
          style={{
            padding: `${vertPad} ${horizPad}`,
            backgroundColor: bgColor
          }}
        >
          <Link to={`https://www.policyengine.org/${row.country_id}/policy/?reform=${row.id}`}>
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
          >View again</th>
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
        <PageHeader
          title="Profile"
          backgroundColor={style.colors.BLUE_98}
        >
          <UserProfileSection />
        </PageHeader>
        <Section
          title="Saved policy simulations"
          backgroundColor={style.colors.BLUE_98}
        >
          {fullTable}
        </Section>
        <Footer />
      </div>
    </>
  )

}

function UserProfileSection() {
  const { isAuthenticated, user } = useAuth0();
  const displayCategory = useDisplayCategory();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        paddingLeft: displayCategory !== "mobile" && "10px",
        gap: "20px"
      }}
    >
      {
        isAuthenticated && user && user.picture ? (
          <img
            src={user.picture}
            alt="Profile"
            style={{
              height: "100px",
              objectFit: "cover"
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              aspectRatio: 1,
              border: `0.5px solid ${style.colors.DARK_GRAY}`,
              color: style.colors.DARK_GRAY
            }}
          >
            {
              isAuthenticated ? (
                <LoadingOutlined 
                  style={{
                    fontSize: "32px"
                  }}
                />
              ) : (
                <FileImageOutlined 
                  style={{
                    fontSize: "32px"
                  }}
                />
              )
            }
          </div>
        )
      }
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
          gridColumnGap: "20px"
        }}
      >
        <p style={{fontWeight: "bold", margin: 0}}>Name</p>
        <p style={{margin: 0}}>{user ? user.name : "Error: No user logged in"}</p>
        <p style={{fontWeight: "bold", margin: 0}}>Email</p>
        <p style={{margin: 0}}>{user ? user.email: "Error: No user logged in"}</p>
      </div>
    </div>
  );
}