import spotify from 'spotify-node-applescript';

const songs: any = {
  ssh_lucky: '0nQABya2sbJNd6wgQZIZKN',
  ssh_yablonev: '7cS3YBMzNm4OX6NQT8YvF6'
};

// eslint-disable
export function play(command: any) {
  spotify.setVolume(100);
  spotify.pause();
  setTimeout(() => {
    spotify.playTrack(`spotify:track:${songs[command]}`);
  }, 1000);
}
