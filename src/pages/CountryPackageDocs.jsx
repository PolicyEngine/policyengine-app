export default function CountryPackageDocs(props) {
  const { countryId } = props;
  const title = `Model documentation | PolicyEngine`;
  document.title = title;

  return (
    <>
      <iframe
        title={title}
        src={`https://policyengine.github.io/policyengine-${countryId}/`}
        style={{ width: "100%", height: "90vh" }}
      />
    </>
  );
}
