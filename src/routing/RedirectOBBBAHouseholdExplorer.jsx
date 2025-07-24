import { Navigate, useParams } from "react-router-dom";

export default function RedirectOBBBAHouseholdExplorer() {
  const { countryId } = useParams();

  return <Navigate to={`/${countryId}/obbba-household-by-household`} replace />;
}
