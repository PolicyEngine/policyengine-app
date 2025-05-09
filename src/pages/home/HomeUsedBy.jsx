import style from "../../style";
import Section from "../../layout/Section";
import { orgData } from "data/organizations";
import useCountryId from "../../hooks/useCountryId";
import useDisplayCategory from "../../hooks/useDisplayCategory";

export default function HomeUsedBy() {
  const countryId = useCountryId();
  const displayCategory = useDisplayCategory();
  if (!orgData[countryId]) return null;
  const orgs = Object.values(orgData[countryId]).slice(0, 7);

  const itemsPerRow = {
    mobile: 3,
    tablet: 6,
    desktop: 12,
  }[displayCategory];

  let rows = [];

  for (let i = 0; i < orgs.length; i += itemsPerRow) {
    rows.push(orgs.slice(i, i + itemsPerRow));
  }

  return (
    <Section
      backgroundColor={style.colors.WHITE}
      title={`Trusted across the ${countryId.toUpperCase()}`}
      titleStyle={{
        fontFamily: "Roboto",
        letterSpacing: 2.4,
        fontWeight: 300,
        fontSize: 20,
        textTransform: "uppercase",
      }}
      centeredTitle
    >
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: {
              mobile: "center",
              tablet: "center",
              desktop: "space-around",
            }[displayCategory],
            marginBottom: 30,
            marginTop: 20,
          }}
        >
          {row.map((org) => (
            <IndividualOrg key={org.name} {...org} />
          ))}
        </div>
      ))}
    </Section>
  );
}

function IndividualOrg({ name, logo, link }) {
  const displayCategory = useDisplayCategory();

  const size = {
    mobile: 85,
    tablet: 100,
    desktop: 100,
  }[displayCategory];
  return (
    <a href={link}>
      <div
        style={{
          maxwidth: size,
          display: "flex",
          flexDirection: {
            mobile: "row",
            tablet: "column",
            desktop: "column",
          }[displayCategory],
          marginRight: 20,
          marginLeft: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <img
          src={logo}
          alt={`${name} logo`}
          width={size}
          height={size}
          style={{
            objectFit: "contain",
            marginRight: displayCategory === "mobile" ? 20 : 0,
            marginBottom: displayCategory !== "mobile" ? 20 : 0,
          }}
        />
      </div>
    </a>
  );
}
