// ================= SONG LIST =================

const songs = [
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        file: "songs/song1.mp3",
        cover: "images/cover1.jpg"
    },
    {
        title: "Normal",
        artist: "Unknown Artist",
        file: "songs/song2.mp3",
        cover: "images/cover2.jpg"
    },
    {
        title: "Aliens",
        artist: "Unknown Artist",
        file: "songs/song3.mp3",
        cover: "images/cover2.jpg"
    }
];

// ================= SELECT ELEMENTS =================

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

// ================= VARIABLES =================

let currentSong = 0;
let isPlaying = false;

// ================= LOAD SONG =================

function loadSong(index) {

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    cover.src = songs[index].cover;
    audio.src = songs[index].file;

}
function createPlaylist(){

    playlist.innerHTML = "";

    songs.forEach((song, index)=>{

        const li = document.createElement("li");

        li.textContent = song.title;

        li.addEventListener("click", function(){

            currentSong = index;

            loadSong(currentSong);

            playSong();

            updatePlaylist();

        });

        playlist.appendChild(li);

    });

}

function updatePlaylist(){

    const items = playlist.querySelectorAll("li");

    items.forEach((item,index)=>{

        item.classList.remove("active");

        if(index===currentSong){

            item.classList.add("active");

        }

    });

}

loadSong(currentSong);
createPlaylist();
updatePlaylist();
// ================= PLAY SONG =================

function playSong() {

    audio.play();

    isPlaying = true;

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
cover.classList.add("rotate");
}

// ================= PAUSE SONG =================

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
cover.classList.remove("rotate");
}

// ================= PLAY / PAUSE =================

playBtn.addEventListener("click", function () {

    if (isPlaying) {

        pauseSong();

    } else {

        playSong();

    }

});

// ================= NEXT SONG =================

nextBtn.addEventListener("click", function () {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);
updatePlaylist();
    playSong();

});

// ================= PREVIOUS SONG =================

prevBtn.addEventListener("click", function () {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);
updatePlaylist();
    playSong();

});

// ================= FORMAT TIME =================

function formatTime(seconds) {

    if (isNaN(seconds)) return "0:00";

    let minutes = Math.floor(seconds / 60);

    let secs = Math.floor(seconds % 60);

    if (secs < 10) {

        secs = "0" + secs;

    }

    return minutes + ":" + secs;

}

// ================= UPDATE PROGRESS =================

audio.addEventListener("timeupdate", function () {

    progress.max = audio.duration;

    progress.value = audio.currentTime;

    currentTime.textContent = formatTime(audio.currentTime);

    duration.textContent = formatTime(audio.duration);

});

// ================= SEEK SONG =================

progress.addEventListener("input", function () {

    audio.currentTime = progress.value;

});
// ================= VOLUME =================

volume.addEventListener("input", function () {

    audio.volume = volume.value / 100;

});
// ================= AUTO PLAY NEXT SONG =================

audio.addEventListener("ended", function () {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});
