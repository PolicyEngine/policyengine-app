import { useQuery } from "@tanstack/react-query";
import { apiCall } from "../api/call";
import { useAuth0 } from "@auth0/auth0-react";
import { extractCountryId } from "../pages/policy/output/utils";

const fetchUserProfile = async (countryId, isAuthenticated, userSub) => {
  const USER_PROFILE_PATH = `/${countryId}/user_profile`;

  try {
    const resGet = await apiCall(USER_PROFILE_PATH + `?auth0_id=${userSub}`);
    const resGetJson = await resGet.json();

    if (resGet.status === 200) {
      return resGetJson.result;
    } else if (resGet.status === 404 && resGetJson.status === "ok") {
      // If not, create user first, then fetch user
      const body = {
        auth0_id: userSub,
        primary_country: countryId,
        user_since: Date.now(),
      };
      const resPost = await apiCall(USER_PROFILE_PATH, body, "POST");
      const resPostJson = await resPost.json();
      if (resPost.status !== 201) {
        throw new Error(
          `Error while trying to create new user with auth0_id ${userSub} : ${resPostJson}`,
        );
      } else {
        return resPostJson.result;
      }
    } else {
      throw new Error(
        `Error while attempting to fetch user profile for user ${userSub} : ${resGetJson}`,
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error(
      `Connection error while attempting to fetch user profile for user ${userSub}: ${error}`,
    );
  }
};

const useUserProfile = () => {
  const { isAuthenticated, user } = useAuth0();
  const countryId = extractCountryId();

  const { data, isPending, isError, refetch, error } = useQuery({
    queryKey: ["userProfile", countryId, user?.sub, isAuthenticated],
    queryFn: () => fetchUserProfile(countryId, isAuthenticated, user?.sub),
    enabled: isAuthenticated && !!user?.sub,
    onError: (error) => {
      console.error("Error fetching user profile:", error);
    },
  });

  return {
    userProfile: data,
    isUserProfileLoading: isPending,
    isUserProfileError: isError,
    userProfileError: error,
    userProfileRefetch: refetch,
  };
};

export default useUserProfile;
