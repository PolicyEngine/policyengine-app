import { useQuery } from "@tanstack/react-query";
import { updateMetadata } from "../api/call";
import { extractCountryId } from "../pages/policy/output/utils";

const useMetadata = () => {
  const countryId = extractCountryId();

  // Update the metadata state when something happens to
  // the countryId (e.g. the user changes the country).

  // If we're accessing the page without a country ID,
  // our router will handle redirecting to a country ID;
  // this process is guaranteed, thus we will just not fetch
  // in this situation
  const queryResult = useQuery({
    queryKey: ["metadata", countryId],
    queryFn: () => updateMetadata(countryId),
    onError: (e) => {
      console.error(e);
    },
    enabled: !!countryId,
  });

  // Create a new object and return it
  return {
    isMetadataLoading: queryResult.isPending,
    metadata: queryResult.data,
    isMetadataError: queryResult.isError,
    metadataError: queryResult.error,
    isMetadataSuccess: queryResult.isSuccess,
  };
};

export default useMetadata;
