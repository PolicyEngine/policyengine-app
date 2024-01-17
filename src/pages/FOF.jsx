import React from "react";
import { Helmet } from "react-helmet";

/*
 * A 404 page for bad urls.
 */
export default function FOF() {
  return (
    <>
      <Helmet>
        <title>Page not found | PolicyEngine</title>
      </Helmet>
      <div style={{ height: "100%" }}>
        <p
          style={{
            marginTop: 90,
            fontSize: "2em",
            textAlign: "center",
          }}
        >
          Sorry, we can&apos;t find the page you&apos;re looking for.
        </p>
      </div>
    </>
  );
}
