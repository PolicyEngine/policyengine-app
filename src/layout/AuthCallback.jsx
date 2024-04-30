import { Helmet } from "react-helmet";
import Header from "../redesign/components/Header";

// Empty component for smoothing post-login redirects visually
export default function AuthCallback() {
  return (
    <>
      <Helmet>
        <title>PolicyEngine</title>
      </Helmet>
      <Header />
    </>
  );
}
