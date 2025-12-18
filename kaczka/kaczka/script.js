var settings = {
    "user": "gość",
    "zakres": 100,
    "motyw": "ciemny",
    "interwal": 1000,
};
var przegral = false;
var kaczka = 1;
var wynik = 0;
const playlist = [
    "music/track1.m4a"
];

let currentTrack = 0;
const audio = new Audio();
audio.volume = 0.5;

const game_over_sound = new Audio("music/gameover.mp3");
game_over_sound.preload = "auto";
game_over_sound.volume = 1;
function game_over() {
    game_over_sound.currentTime = 0;
    game_over_sound.play();
}

const hit_sound = new Audio("music/fallbig2.mp3");
hit_sound.preload = "auto";
hit_sound.volume = 1;
function hit_duck() {
    hit_sound.currentTime = 0;
    hit_sound.play();
}
function motyw() {
    if (settings["motyw"] == "ciemny") {
        /*
        div.classList.remove("jasny");
        div.classList.add("ciemny")
        */
    } else {
        /**/
    }
}

function isKaczka() {
    return kaczka % 7 == 0 || String(kaczka).includes("7");
}
/********************************
console.log("testy isKaczka()")
console.log(isKaczka(5))
console.log(isKaczka(7))
console.log(isKaczka(21))
********************************/

function losKaczka() {
    kaczka = Math.floor(Math.random() * settings["zakres"]) + 1;
    console.log(kaczka);
}
/********************************
console.log("testy losKaczka()")
console.log(losKaczka())
console.log(losKaczka())
console.log(losKaczka())
********************************/

function graKaczka() {
    if (!audio.src) {
        audio.src = playlist[currentTrack];
        audio.play();
    }
    document.getElementById("settings").style.display = "none";
    document.getElementById("gra").style.display = "block";
    setInterval(() => {
        if (przegral) {
            document.getElementById("footer").style.display = "block";
            return 0;
        }
        losKaczka();
        wyswietl(kaczka, wynik);
        document.getElementById("result").innerText = "ㅤ";
        document.getElementById("kaczka").src = "gfx/kaczka.png";
    }, settings["interwal"])
}
function setSettings(){
    settings["interwal"] = Number(document.getElementById("interwal_range").value);
    settings["zakres"] = Number(document.getElementById("zakres_range").value);
    const motyw = document.querySelector('input[name="motyw"]:checked');
    if (motyw) {
        settings["motyw"] = motyw.value;
    }
    if (settings["motyw"] == "ciemny") {
        document.body.style.backgroundImage = "url('gfx/tlo2.png')";
        document.body.style.color = "white";
        document.getElementById("result").style.paddingTop = "40px";
        document.getElementById("napis3").style.marginTop = "-140px";

    } else {
        document.body.style.backgroundImage = "url('gfx/tlo.png')";
        document.body.style.color = "black";
        document.getElementById("result").style.paddingTop = "20px";
        document.getElementById("napis3").style.marginTop = "-120px";
    }
    console.log(settings);
}
function resetSettings() {
    const zakres = document.getElementById("zakres_range").value = 100;
    const interwal = document.getElementById("interwal_range").value = 1000;
    const jasny = document.getElementById("jasny_radio").checked = false;
    const ciemny = document.getElementById("ciemny_radio").checked = true;
}

function wyswietl(wynik, rank){
    document.getElementById("aktualna_liczba").innerText = wynik;
    document.getElementById("wynik").innerText = rank;
}

audio.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    audio.src = playlist[currentTrack];
    audio.play();
});
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        if (przegral) {
            return 0;
        } else {
            console.log("SPACJA");
            if (isKaczka()) {
                wynik += 1;
                hit_duck();
                document.getElementById("result").innerText = "Dobrze";
                document.getElementById("kaczka").src = "gfx/kaczka_out.png";
                console.log("dobrze");
                
            } else {
                przegral = true;
                audio.pause();
                game_over();
                document.getElementById("result").innerText = "Przegrałeś";
                document.getElementById("aktualna_liczba").innerText = "GAME OVER!";
                console.log("przegrałeś");
            }
        }
    }
    
})

