import useMobile from "./Responsive";
import SocialLinks from "./SocialLinks";

export default function Footer(props) {
  const { countryId } = props;
  const mobile = useMobile();
  let footer;
  const links = [
    "https://policyengine.org",
    `/${countryId}/about`,
    "https://zej8fnylwn9.typeform.com/to/XFFu15Xq",
    "https://opencollective.com/psl",
  ];
  const labels = ["PolicyEngine © 2022", "About", "Feedback", "Donate"];
  if (mobile) {
    footer = (
      <div>
        <SpacedLinks links={links} labels={labels} />
        <div
          className="justify-content-center"
          style={{ paddingBottom: 5, paddingTop: 15 }}
        >
          <SocialLinks color="black" />
        </div>
      </div>
    );
  } else {
    footer = <SpacedLinks links={links} labels={labels} />;
  }
  return <div style={{ paddingBottom: mobile ? 5 : 20 }}>{footer}</div>;
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
