import { Navigate, Outlet, useParams } from "react-router-dom";
import { COUNTRY_CODES } from "../data/countries";

export default function CountryIdLayout() {

  const {countryId} = useParams();

  if (COUNTRY_CODES.includes(countryId)) {
    return <Outlet />;
  } else {
    return <Navigate to="/us" replace />;
  }

}