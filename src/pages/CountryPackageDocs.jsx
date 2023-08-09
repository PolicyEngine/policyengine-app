export default function CountryPackageDocs(props) {
  const { countryId } = props;
  document.title = `Model documentation | PolicyEngine`;

  return (
    <>
      <iframe
        src={`https://policyengine.github.io/policyengine-${countryId}/`}
        style={{ width: "100%", height: "90vh" }}
      />
    </>
  );
}
