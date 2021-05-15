export const getAccessToken = async () => {};
//     const dateInSeconds = Math.floor(new Date().valueOf() / 1000);
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       const parsedToken = JSON.parse(token);
//       if (parsedToken.expiresAt > dateInSeconds) {
//         const { data } = await axios.post(
//           `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${secret_client_id}&grant_type=client_credentials`
//         );
//         localStorage.setItem(
//           "accessToken",
//           JSON.stringify({
//             accessToken: data.access_token,
//             expiresAt: dateInSeconds + data.expires_in,
//           })
//         );
//       }
//     } else {
//       const { data } = await axios.post(
//         `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${secret_client_id}&grant_type=client_credentials`
//       );
//       localStorage.setItem(
//         "accessToken",
//         JSON.stringify({
//           accessToken: data.access_token,
//           expiresAt: dateInSeconds + data.expires_in,
//         })
//       );
//     }
//   };

//   useEffect(() => {
//     getAccessToken();
//   }, []);
