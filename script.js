const audio = document.getElementById("audio");

const playPauseBtn = document.getElementById("play-pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const repeatBtn = document.getElementById("repeat");
const progress = document.getElementById("progress");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");
const playerImg = document.getElementById("player-img");

const volume = document.getElementById("volume");

const cards = document.querySelectorAll(".card");


let currentSong = 0;
let repeatMode = 0;


const songs = [];

for (let i = 1; i <= 42; i++) {

    songs.push({
        name: "Singer " + i,
        artist: "Artist " + i,
        image: "images/" + i + ".jpg",
        music: "music/" + i + ".mp3"
    });

}


// LOAD SONG

function loadSong(index) {

    const song = songs[index];

    playerTitle.innerText = song.name;
    playerArtist.innerText = song.artist;
    playerImg.src = song.image;

    audio.src = song.music;

    console.log("Trying to play:", audio.src);

    audio.load();

    progress.value = 0;
}


// PLAY SONG

function playSong() {

    audio.play();

    playPauseBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';
}


// PAUSE SONG

function pauseSong() {

    audio.pause();

    playPauseBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';
}


// PLAY / PAUSE BUTTON

playPauseBtn.addEventListener("click", function () {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// CLICK CARD

cards.forEach((card, index) => {

    card.addEventListener("click", function () {

        if (index < songs.length) {

            currentSong = index;

            loadSong(currentSong);

            playSong();

        }

    });

});


// UPDATE PROGRESS

audio.addEventListener("timeupdate", function () {

    if (audio.duration) {

        const percentage =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percentage;

        currentTime.innerText =
            formatTime(audio.currentTime);

        duration.innerText =
            formatTime(audio.duration);
    }

});


// CLICK PROGRESS BAR

progress.addEventListener("input", function () {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


// VOLUME

volume.addEventListener("input", function () {

    audio.volume = volume.value;

});


// WHEN SONG FINISHES

audio.addEventListener("ended", function () {


    if (repeatMode === 2) {
        audio.currentTime = 0;
        playSong();
        return;
    }

    if (repeatMode === 1) {
        currentSong++;

        if (currentSong >= songs.length) {
            currentSong = 0;
        }

        loadSong(currentSong);
        playSong();
        return;
    }

    // Repeat is off
    if (currentSong < songs.length - 1) {
        currentSong++;
        loadSong(currentSong);
        playSong();
    }

});


// FORMAT TIME

function formatTime(time) {

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}


// LOAD FIRST SONG

loadSong(currentSong);
audio.addEventListener("error", function () {
    console.log("❌ Music could not be loaded");
    console.log(audio.error);
});
// NEXT SONG
nextBtn.addEventListener("click", function () {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

});
// PREVIOUS SONG
prevBtn.addEventListener("click", function () {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();

});


repeatBtn.addEventListener("click", function () {

    repeatMode++;

    if (repeatMode > 2) {
        repeatMode = 0;
    }

    console.log("Repeat mode:", repeatMode);

    if (repeatMode === 0) {
        repeatBtn.style.color = "white";
        repeatBtn.innerHTML = '<i class="fa-solid fa-repeat"></i>';
        repeatBtn.title = "Repeat off";
    }
    else if (repeatMode === 1) {
        repeatBtn.style.color = "#1DB954";
        repeatBtn.innerHTML = '<i class="fa-solid fa-repeat"></i>';
        repeatBtn.title = "Repeat all";
    }
    else {
        repeatBtn.style.color = "#1DB954";
        repeatBtn.innerHTML = '<i class="fa-solid fa-repeat"></i><sup>1</sup>';
        repeatBtn.title = "Repeat one";
    }

});
