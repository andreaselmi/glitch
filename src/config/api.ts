import axios from "axios";

const client_id = process.env.REACT_APP_CLIENT_ID;
const secret_client_id = process.env.REACT_APP_SECRET_ID;

const requestAccessToken = async () => {
  return await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${secret_client_id}&grant_type=client_credentials`
  );
};

export const setAccessToken = async () => {
  const dateInSeconds = Math.floor(new Date().valueOf() / 1000);
  const token = localStorage.getItem("accessToken");
  if (token) {
    const parsedToken = JSON.parse(token);

    if (parsedToken.expiresAt < dateInSeconds) {
      const { data } = await requestAccessToken();
      localStorage.setItem(
        "accessToken",
        JSON.stringify({
          accessToken: data.access_token,
          expiresAt: dateInSeconds + data.expires_in,
        })
      );
    } else return null;
  } else {
    const { data } = await requestAccessToken();
    localStorage.setItem(
      "accessToken",
      JSON.stringify({
        accessToken: data.access_token,
        expiresAt: dateInSeconds + data.expires_in,
      })
    );
  }
};

export const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const parsedToken = JSON.parse(token);
    return parsedToken.accessToken;
  }
  return null;
};

export const helix = axios.create({
  baseURL: "https://api.twitch.tv/helix",
});

helix.interceptors.request.use(
  function (config: any) {
    const token = getAccessToken();
    if (token) {
      config.headers["client-id"] = client_id;
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

helix.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
      setAccessToken();
      window.location.reload();
    }
    return Promise.reject(error.response.data);
  }
);
