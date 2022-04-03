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

// Call async function (start)
getapi(overall_url);

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
}

// Async function for competition data
async function getapi(url) {
  // Storing response
  const response = await fetch(url);
  // Storing data in form of JSON
  var data = await response.json();
  if (response) {
    hideloader();
  }
  createPlayerArray(data);
}

// Create player array
function createPlayerArray(data) {
  let playerArray = [];
  for (var i = 0; i < data.participants.length; i++) {
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
    getCombatData(combat_url + combatStyles[i]);
  }
}

// Async function for player combat xp data
async function getCombatData(url) {
  // Storing response
  const response = await fetch(url);
  var data = await response.json();
  if (response) {
    hideloader();
  }
  for (var i = 0; i < data.participants.length; i++) {
    for (var j = 0; j < window.PLAYER_ARRAY.length; j++) {
      if (data.participants[i].displayName == window.PLAYER_ARRAY[j].name) {
        window.PLAYER_ARRAY[j].combatXP += data.participants[i].progress.gained;
      }
    }
  }
  calcSkillingXP();
}

// Array to calculate skilling XP
function calcSkillingXP() {
  for (var i = 0; i < window.PLAYER_ARRAY.length; i++) {
    window.PLAYER_ARRAY[i].skillingXP =
      window.PLAYER_ARRAY[i].totalXP - window.PLAYER_ARRAY[i].combatXP;
  }
  showData();
}

// Function to define innerHTML for HTML table
function showData() {
  const table = document.getElementById("players");
  let tab = `<tr>
    <th class="clickable" onclick="sortTable(0)">Player Name</th>
    <th class="clickable" onclick="sortTable(1)">Team Name</th>
    <th class="clickable" onclick="sortTable(2)">Total XP</th>
    <th class="clickable" onclick="sortTable(3)">Combat XP</th>
    <th class="clickable" onclick="sortTable(4)">Skilling XP</th>
    </tr>`;

  for (let p of window.PLAYER_ARRAY) {
    tab += `<tr>
        <td>${p.name}</td>
        <td>${p.teamName}</td>
        <td>${p.totalXP.toLocaleString("en-US")} </td>
        <td>${p.combatXP.toLocaleString("en-US")} </td>
        <td>${p.skillingXP.toLocaleString("en-US")} </td>
        </tr>`;
  }
  table.innerHTML = tab;
  sumData();
}

function sumData() {
  const table = document.getElementById("players");

  if (!document.getElementById("totals")) {
    table.innerHTML += `
    <tr id="totals">
    <th>TOTALS</th>
    <th></th>
    <th>Total XP: <br />0</th>
    <th>Combat XP: <br />0</th>
    <th>Skilling XP: <br />0</th>
    </tr>
    `;
  }

  let totalXP = 0;
  let combatXP = 0;
  let skillingXP = 0;
  for (var i = 1; i < table.rows.length - 1; i++) {
    if (!table.rows[i].classList.contains("hide")) {
      totalXP += parseFloat(table.rows[i].cells[2].innerHTML.replace(/,/g, ""));
      combatXP += parseFloat(
        table.rows[i].cells[3].innerHTML.replace(/,/g, "")
      );
      skillingXP += parseFloat(
        table.rows[i].cells[4].innerHTML.replace(/,/g, "")
      );
    }
  }
  totalXP = totalXP.toLocaleString("en-US");
  combatXP = combatXP.toLocaleString("en-US");
  skillingXP = skillingXP.toLocaleString("en-US");

  let tab = `<tr id="totals">
  <th>TOTALS</th>
  <th></th>
  <th>Total XP: <br />${totalXP}</th>
  <th>Combat XP: <br />${combatXP}</th>
  <th>Skilling XP: <br />${skillingXP}</th>
  </tr>`;
  document.getElementById("totals").innerHTML = tab;
}

function searchTable(team, column) {
  // Declare variables
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchField");
  if (team) {
    filter = team.toUpperCase();
  } else {
    column = "c1";
    filter = input.value.toUpperCase();
  }
  table = document.getElementById("players");
  tr = table.getElementsByTagName("tr");

  removeActiveTeamFilter();
  addActiveTeamFilter(column);

  // Loop through all table rows, and hide those who don't match the search query
  for (var i = 1; i < tr.length; i++) {
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
  sortTable(2, true);
  sumData();
}

function removeActiveTeamFilter() {
  for (
    var i = 0;
    i < document.getElementsByClassName("teamSelect").length;
    i++
  ) {
    document
      .getElementsByClassName("teamSelect")
      [i].classList.remove("currentTeam");
  }
}

function addActiveTeamFilter(column) {
  document.getElementsByClassName(column)[0].classList.add("currentTeam");
}

function sortTable(column, resetSort) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("players");
  switching = true;
  if (resetSort) {
    dir = "desc";
  } else {
    dir = "asc";
  }
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 2; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[column];
      y = rows[i + 1].getElementsByTagName("TD")[column];
      if (column > 1) {
        x = parseInt(x.innerHTML.replace(/\,/g, ''), 10);
        y = parseInt(y.innerHTML.replace(/\,/g, ''), 10);
      }
      if (dir == "asc" && column <= 1) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "asc" && column > 1) {
        if (x > y) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc" && column <= 1) {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc" && column > 1) {
        if (x < y) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
