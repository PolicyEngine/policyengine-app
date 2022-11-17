import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { countryApiCall } from "./api/call";
import Header from "./Header";
import DesktopView from "./layout/DesktopView";
import HomePage from "./pages/HomePage";
import MobileView from "./layout/MobileView";
import HouseholdPage from "./pages/HouseholdPage";
import { buildVariableTree, getTreeLeavesInOrder } from "./api/variables";
import LoadingCentered from "./layout/LoadingCentered";
import ErrorPage from "./layout/Error";

export default function PolicyEngineCountry(props) {
  // When loaded, fetch the PolicyEngine metadata for the country.
  // Fail gracefully if the country is not supported.
  const { countryId } = props;
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    countryApiCall(countryId, "/metadata")
      .then((res) => res.json())
      .then((data) => {
        const variableTree = buildVariableTree(
          data.variables,
          data.variableModules
        );
        const variablesInOrder = getTreeLeavesInOrder(variableTree);
        setMetadata({
          ...data,
          variableTree: variableTree,
          variablesInOrder: variablesInOrder,
          countryId: countryId,
        });
      })
      .catch((error) => {
        setError(error);
      });
  }, [countryId]);

  const mainPage = (
      <Routes>
        <Route path="/" element={<HomePage countryId={countryId} />} />
        <Route
          path="/household/*"
          element={
            metadata ? (
              <HouseholdPage metadata={metadata} />
            ) : (
              error ?
                <ErrorPage message="We couldn't talk to PolicyEngine's servers. Please try again in a few minutes." /> :
                <LoadingCentered />
            )
          }
        />
      </Routes>
    );

  return (
    <>
      <DesktopView>
        <Header countryId={countryId} />
        {mainPage}
      </DesktopView>
      <MobileView>
        <h3>Currently not supported on mobile.</h3>
      </MobileView>
    </>
  );
}
