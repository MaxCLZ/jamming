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
  search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artist[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
  savePlaylist(playlistName, tracksUriList) {
    if (!playlistName || !tracksUriList.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    let userId;

    fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({
            name: playlistName,
          }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistID = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/playlists/${playlistID}/track`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({
                  uris: tracksUriList,
                }),
              }
            );
          });
      });
  },
};

export default Spotify;
