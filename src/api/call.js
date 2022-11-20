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

export function asyncApiCall(path, body, interval = 1000) {
  // Call an API endpoint which may respond with a {status: computing} response.
  // If so, poll until the response is ready.
  return new Promise((resolve, reject) => {
    const poll = () => {
      apiCall(path, body)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "computing") {
            setTimeout(poll, interval);
          } else {
            resolve(data);
          }
        })
        .catch((error) => reject(error));
    };
    poll();
  });
}

export function countryApiCall(country, path, body) {
  return apiCall(`/${country}${path}`, body);
}
