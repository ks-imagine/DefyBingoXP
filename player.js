// Player Page JS
const queryString = window.location.search;
const playerName = new URLSearchParams(queryString).get('player');
let initialCall = true;

showPlayerData = () => {
    if (initialCall) {
        document.getElementById('player-name').innerHTML = playerName;
        initialCall = false;
    }
}