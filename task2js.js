const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const loopBtn = document.getElementById('loop');
const seekBar = document.getElementById('seek-bar');
const volumeControl = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

const songs = [
    { title: 'Song One', artist: 'Artist One', src: 'song1.mp3', cover: 'cover1.jpg' },
    { title: 'Song Two', artist: 'Artist Two', src: 'song2.mp3', cover: 'cover2.jpg' },
    { title: 'Song Three', artist: 'Artist Three', src: 'song3.mp3', cover: 'cover3.jpg' }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
}

function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.textContent = '⏸';
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.textContent = '▶';
}

playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playSong();
});

nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playSong();
});

shuffleBtn.addEventListener('click', () => {
    songIndex = Math.floor(Math.random() * songs.length);
    loadSong(songIndex);
    playSong();
});

loopBtn.addEventListener('click', () => {
    audio.loop = !audio.loop;
    loopBtn.style.background = audio.loop ? '#ffdd57' : 'white';
});

audio.addEventListener('timeupdate', () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    durationDisplay.textContent = formatTime(audio.duration);
});

seekBar.addEventListener('input', () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
});

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

loadSong(songIndex);
