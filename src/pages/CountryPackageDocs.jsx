import { Helmet } from "react-helmet";

export default function CountryPackageDocs(props) {
  const { countryId } = props;
  const title = `Model documentation | PolicyEngine`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <iframe
        title={title}
        src={`https://policyengine.github.io/policyengine-${countryId}/`}
        style={{ width: "100%", height: "90vh" }}
      />
    </>
  );
}
