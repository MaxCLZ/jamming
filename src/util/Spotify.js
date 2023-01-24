let accessToken;
let redirectURI = "http://localhost:3000/";
const clientId = "bb0eaf6f80024d51a799d9f66f569f7c";

// import clientId from "./private/clientInfo"; no need to to this in an only front-end app cause accessible with devtools ofc

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    //check access token match
    const accesTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accesTokenMatch && expireInMatch) {
      accessToken = accesTokenMatch[1];
      const expiresIn = Number(expireInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  },
};

export default Spotify;
