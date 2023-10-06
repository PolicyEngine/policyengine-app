import style from "../style";
import Section from "./Section";
import { orgData } from "redesign/data/Organisations";
import useCountryId from "./useCountryId";
import useDisplayCategory from "./useDisplayCategory";

export default function HomeUsedBy() {
  const countryId = useCountryId();
  const displayCategory = useDisplayCategory();
  if (!orgData[countryId]) return null;
  const orgs = Object.values(orgData[countryId]);

  const itemsPerRow = {
    mobile: 3,
    tablet: 6,
    desktop: 7,
  }[displayCategory];

  let rows = [];

  for (let i = 0; i < orgs.length; i += itemsPerRow) {
    rows.push(orgs.slice(i, i + itemsPerRow));
  }

  return (
    <Section
      backgroundColor={style.colors.WHITE}
      title={`Trusted by organisations across the ${countryId.toUpperCase()}`}
    >
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: {
              mobile: "center",
              tablet: "center",
              desktop: "center",
            }[displayCategory],
            marginBottom: 30,
            marginTop: 50,
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
    mobile: 80,
    tablet: 100,
    desktop: 120,
  }[displayCategory];
  return (
    <a href={link}>
      <div
        style={{
          width: size,
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
        }}
      >
        <img
          src={logo}
          alt={name}
          width={size}
          height={size}
          style={{
            objectFit: "contain",
            marginRight: displayCategory === "mobile" ? 30 : 0,
            marginBottom: displayCategory !== "mobile" ? 20 : 0,
          }}
        />
      </div>
    </a>
  );
}
