const POLICYENGINE_API = "http://127.0.0.1:5000";

export function apiCall(path, body) {
  return fetch(POLICYENGINE_API + path, {
    method: body ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });
}

export function countryApiCall(country, path, body) {
  return apiCall(`/${country}${path}`, body);
}
