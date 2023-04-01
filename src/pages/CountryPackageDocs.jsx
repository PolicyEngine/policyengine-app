

export default function CountryPackageDocs(props) {
    const { countryId } = props;

    return <>
        <iframe src={`https://policyengine.github.io/policyengine-${countryId}/`} style={{ width: "100%", height: "90vh" }} />
    </>
}