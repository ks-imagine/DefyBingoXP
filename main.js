// api url
const overall_url = "https://api.wiseoldman.net/competitions/10087";
const combat_url = "https://api.wiseoldman.net/competitions/10087?metric=";
const combatStyles = [
  "attack",
  "strength",
  "defense",
  "hitpoints",
  "magic",
  "ranged",
  "prayer",
];

// Calling that async function
getapi(overall_url);

// Async function for competition data
async function getapi(url) {
  // Storing response
  const response = await fetch(url);
  // Storing data in form of JSON
  var data = await response.json();
  window.BINGO_OBJECT = data;
  createPlayerArray(data);
  if (response) {
    hideloader();
  }
}

// Create player array
function createPlayerArray(data) {
  let playerArray = [];
  for (i = 0; i < data.participants.length; i++) {
    playerArray.push({
      name: data.participants[i].displayName,
      teamName: data.participants[i].teamName,
      totalXP: data.participants[i].progress.gained,
      combatXP: 0,
      skillingXP: 0,
    });
  }
  window.PLAYER_ARRAY = playerArray;

  for (var i = 0; i < combatStyles.length; i++) {
    getCombatData(combatStyles[i], combat_url + combatStyles[i]);
  }
}

// Async function for player combat xp data
async function getCombatData(style, url) {
  // Storing response
  const response = await fetch(url);
  var data = await response.json();
  if (response) {
    hideloader();
  }
  for (i = 0; i < data.participants.length; i++) {
    for (j = 0; j < window.PLAYER_ARRAY.length; j++) {
      if (data.participants[i].displayName == window.PLAYER_ARRAY[j].name) {
        window.PLAYER_ARRAY[j].combatXP += data.participants[i].progress.gained;
      }
    }
  }
  getSkillingData();
}

// Array to calculate skilling XP
function getSkillingData() {
  for (var i = 0; i < window.PLAYER_ARRAY.length; i++) {
    window.PLAYER_ARRAY[i].skillingXP =
      window.PLAYER_ARRAY[i].totalXP - window.PLAYER_ARRAY[i].combatXP;
  }
  showData();
}

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
}

// Function to define innerHTML for HTML table
function showData() {
  const table = document.getElementById("players");
  let tab = `<tr>
    <th>Player Name</th>
    <th>Team Name</th>
    <th>Total XP</th>
    <th>Combat XP</th>
    <th>Skilling XP</th>
    </tr>`;

  for (let p of window.PLAYER_ARRAY) {
    tab += `<tr>
        <td>${p.name}</td>
        <td>${p.teamName}</td>
        <td>${p.totalXP} </td>
        <td>${p.combatXP} </td>
        <td>${p.skillingXP} </td>
        </tr>`;
  }
  table.innerHTML = tab;
  sumData();
}

function searchTable() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchField");
  filter = input.value.toUpperCase();
  table = document.getElementById("players");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].classList.add("hide");
    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < 2; j++) {
      cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].classList.remove("hide");
          break;
        }
      }
    }
  }
  sumData();
}

function sumData() {
  const table = document.getElementById("players");

  if (!document.getElementById("totals")) {
    table.innerHTML += `
    <tr id="totals">
    <th>TOTALS</th>
    <th></th>
    <th>0</th>
    <th>0</th>
    <th>0</th>
    </tr>
    `
  }


  let totalXP = 0;
  let combatXP = 0;
  let skillingXP = 0;
  for (var i = 1; i < table.rows.length; i++) {
    if (!table.rows[i].classList.contains("hide")) {
      totalXP += parseFloat(table.rows[i].cells[2].innerHTML);
      combatXP += parseFloat(table.rows[i].cells[3].innerHTML);
      skillingXP += parseFloat(table.rows[i].cells[4].innerHTML);
    }
  }
  let tab = `<tr id="totals">
  <th>TOTALS</th>
  <th></th>
  <th>${totalXP}</th>
  <th>${combatXP}</th>
  <th>${skillingXP}</th>
  </tr>`;
  document.getElementById("totals").innerHTML = tab;
}
