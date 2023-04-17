import useMobile from "./Responsive";

export default function Footer(props) {
  const { countryId } = props;
  const mobile = useMobile();
  let footer;
  const links = [
    "https://policyengine.org",
    `/${countryId}/about`,
    "mailto:hello@policyengine.org",
    `/${countryId}/donate`,
    "/api-status",
    `/${countryId}/privacy`,
  ];
  const labels = [
    "PolicyEngine © 2023",
    "About",
    "Contact",
    "Donate",
    "Status",
    "Privacy",
  ];
  if (mobile) {
    footer = <div>
      <SpacedLinks links={links.slice(0, 3)} labels={labels.slice(0, 3)} />
      <SpacedLinks links={links.slice(3)} labels={labels.slice(3)} />
    </div>
  } else {
    footer = <SpacedLinks links={links} labels={labels} />;
  }
  return <div style={{ paddingBottom: 20 }}>{footer}</div>;
}

function SpacedLinks(props) {
  const { links, labels } = props;
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      {links.map((link, i) => (
        <a key={i} href={link} style={{ marginRight: 10, marginLeft: 10 }}>
          {labels[i]}
        </a>
      ))}
    </div>
  );
}
