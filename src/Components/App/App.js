import React from "react";

import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: "name1", artist: "artist1", album: "album1", id: 1 },
        { name: "name2", artist: "artist2", album: "album2", id: 2 },
        { name: "name3", artist: "artist3", album: "album3", id: 3 },
        { name: "name4", artist: "artist4", album: "album4", id: 4 },
      ],
      playlistName: "My very first playslist",
      playlistTracks: [
        {
          name: "playList-name1",
          artist: "playList-artist1",
          album: "playList-album1",
          id: 5,
        },
        {
          name: "playList-name2",
          artist: "playList-artist2",
          album: "playList-album2",
          id: 6,
        },
        {
          name: "playList-name3",
          artist: "playList-artist3",
          album: "playList-album3",
          id: 7,
        },
        {
          name: "playList-name4",
          artist: "playList-artist4",
          album: "playList-album4",
          id: 8,
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    } else {
      tracks.push(track);
    }
    this.setState({ playlistTracks: tracks });
  }
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    this.setState({
      playlistTracks: tracks,
    });
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
