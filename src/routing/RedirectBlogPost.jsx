import { Navigate, useParams } from "react-router-dom";

export default function RedirectBlogPost() {
  const {countryId, postName} = useParams();

  return <Navigate to={`/${countryId}/research/${postName}`} />;
}