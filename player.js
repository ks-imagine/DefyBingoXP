// Player Page JS
const queryString = window.location.search;
const playerName = new URLSearchParams(queryString).get('player');
let initial = true;

showPlayerData = () => {
    if (firstPageLoad) {
        document.getElementById('player-name').innerHTML = playerName;
        firstPageLoad = false;
    }
}