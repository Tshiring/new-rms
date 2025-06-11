const BASE_URL = import.meta.env.VITE_APP_API_URL;

let isRefreshing = false;
let refreshQueue = [];

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  const newAccessToken = data.accessToken;
  localStorage.setItem("accessToken", newAccessToken);
  return newAccessToken;
}

// async function handle401Retry(originalRequest) {
//   if (!isRefreshing) {
//     isRefreshing = true;
//     try {
//       const newToken = await refreshAccessToken();
//       console.log(newToken);

//       refreshQueue.forEach((cb) => cb());
//       localStorage.setItem("accessToken", newToken);
//       return originalRequest(); // Retry after refresh
//     } catch (error) {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       window.location.href = "/signin";
//       throw error;
//     } finally {
//       isRefreshing = false;
//       refreshQueue = [];
//     }
//   }

//   return new Promise((resolve, reject) => {
//     refreshQueue.push(() => {
//       originalRequest().then(resolve).catch(reject);
//     });
//   });
// }

export async function fetchData(url, customHeaders) {
  const token = localStorage.getItem("accessToken");

  const headers = new Headers({
    "Content-Type": "application/json",
    ...customHeaders,
  });
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const makeRequest = async () => {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "GET",
      headers,
    });

    // if (response.status === 401) {
    //   return handle401Retry(() => fetchData(url, customHeaders));
    // }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong.");
    }

    return response.json();
  };

  return makeRequest();
}

export async function postData(url, data, customHeaders) {
  const token = localStorage.getItem("accessToken");

  const headers = {
    ...customHeaders,
  };

  let body;

  if (data instanceof FormData) {
    body = data;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(data);
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const makeRequest = async () => {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers,
      body,
    });

    // if (response.status === 401) {
    //   return handle401Retry(() => postData(url, data, customHeaders));
    // }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong.");
    }

    return response.json();
  };

  return makeRequest();
}
