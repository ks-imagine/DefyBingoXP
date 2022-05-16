
// api url
const overall_url = "https://api.wiseoldman.net/competitions/10087";
const metric_url = "https://api.wiseoldman.net/competitions/10087?metric=";
const combatStyles = [
  "attack",
  "strength",
  "defense",
  "hitpoints",
  "magic",
  "ranged",
  "prayer",
];
const bossList = [
  "abyssal_sire",
  "alchemical_hydra",
  "barrows_chests",
  "bryophyta",
  "callisto",
  "cerberus",
  "chambers_of_xeric",
  "chambers_of_xeric_challenge_mode",
  "chaos_elemental",
  "chaos_fanatic",
  "commander_zilyana",
  "corporeal_beast",
  "crazy_archaeologist",
  "dagannoth_prime",
  "dagannoth_rex",
  "dagannoth_supreme",
  "deranged_archaeologist",
  "general_graardor",
  "giant_mole",
  "grotesque_guardians",
  "hespori",
  "kalphite_queen",
  "king_black_dragon",
  "kraken",
  "kreearra",
  "kril_tsutsaroth",
  "mimic",
  "nex",
  "nightmare",
  "phosanis_nightmare",
  "obor",
  "sarachnis",
  "scorpia",
  "skotizo",
  "tempoross",
  "the_gauntlet",
  "the_corrupted_gauntlet",
  "theatre_of_blood",
  "theatre_of_blood_hard_mode",
  "thermonuclear_smoke_devil",
  "tzkal_zuk",
  "tztok_jad",
  "venenatis",
  "vetion",
  "vorkath",
  "wintertodt",
  "zalcano",
  "zulrah",
];
let bossPage = false;

if (window.location.href.includes("boss")) {
  bossPage = true;
}

// Call async function (start)
getapi(overall_url, bossPage);

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
}

// Async function for competition data
async function getapi(url, isBossPage) {
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
      bossList: {},
    });
  }
  window.PLAYER_ARRAY = playerArray;

  if (bossPage) {
    for (var i = 0; i < bossList.length; i++) {
      getBossData(metric_url + bossList[i], bossList[i]);
    }
  } else {
    for (var i = 0; i < combatStyles.length; i++) {
      getCombatData(metric_url + combatStyles[i]);
    }
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

// Async function for player combat xp data
async function getBossData(url, bossName) {
  // Storing response
  const response = await fetch(url);
  var data = await response.json();
  if (response) {
    hideloader();
  }
  for (var i = 0; i < data.participants.length; i++) {
    for (var j = 0; j < window.PLAYER_ARRAY.length; j++) {
      if (data.participants[i].displayName == window.PLAYER_ARRAY[j].name) {
        window.PLAYER_ARRAY[j].bossList[bossName] =
          data.participants[i].progress.gained;
      }
    }
  }
  showBossData();
}

// Array to calculate skilling XP
function calcSkillingXP() {
  for (var i = 0; i < window.PLAYER_ARRAY.length; i++) {
    window.PLAYER_ARRAY[i].skillingXP =
      window.PLAYER_ARRAY[i].totalXP - window.PLAYER_ARRAY[i].combatXP;
  }
  showExperienceData();
}

// Function to define innerHTML for HTML table
function showExperienceData() {
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
  sumXP();
}

// Function to define innerHTML for HTML table
function showBossData() {
  const table = document.getElementById("players");
  let tab = `<tr>
    <th class="clickable" onclick="sortTable(0)">Player Name</th>
    <th class="clickable" onclick="sortTable(1)">Team Name</th>
    <th class="clickable" onclick="sortTable(2)">Abyssal Sire</th>
    <th class="clickable" onclick="sortTable(3)">Alchemical Hydra</th>
    <th class="clickable" onclick="sortTable(4)">Barrows</th>
    <th class="clickable" onclick="sortTable(5)">Bryophyta</th>
    <th class="clickable" onclick="sortTable(6)">Callisto</th>
    <th class="clickable" onclick="sortTable(7)">Cerberus</th>
    <th class="clickable" onclick="sortTable(8)">Cox</th>
    <th class="clickable" onclick="sortTable(9)">Cox CM</th>
    <th class="clickable" onclick="sortTable(10)">Chaos Elemental</th>
    <th class="clickable" onclick="sortTable(11)">Chaos Fanatic</th>
    <th class="clickable" onclick="sortTable(12)">Commander Zilyana</th>
    <th class="clickable" onclick="sortTable(13)">Corp</th>
    <th class="clickable" onclick="sortTable(14)">Crazy Archaeologist</th>
    <th class="clickable" onclick="sortTable(15)">DK Prime</th>
    <th class="clickable" onclick="sortTable(16)">DK Rex</th>
    <th class="clickable" onclick="sortTable(17)">DK Supreme</th>
    <th class="clickable" onclick="sortTable(18)">Deranged Archaeologist</th>
    <th class="clickable" onclick="sortTable(19)">General Graardor</th>
    <th class="clickable" onclick="sortTable(20)">Giant Mole</th>
    <th class="clickable" onclick="sortTable(21)">Grotesque Guardians</th>
    <th class="clickable" onclick="sortTable(22)">Hespori</th>
    <th class="clickable" onclick="sortTable(23)">KQ</th>
    <th class="clickable" onclick="sortTable(24)">KBD</th>
    <th class="clickable" onclick="sortTable(25)">Kraken</th>
    <th class="clickable" onclick="sortTable(26)">Kreearra</th>
    <th class="clickable" onclick="sortTable(27)">Kril Tsutsaroth</th>
    <th class="clickable" onclick="sortTable(28)">Mimic</th>
    <th class="clickable" onclick="sortTable(29)">Nex</th>
    <th class="clickable" onclick="sortTable(30)">Nightmare</th>
    <th class="clickable" onclick="sortTable(31)">Phosanis Nightmare</th>
    <th class="clickable" onclick="sortTable(32)">Obor</th>
    <th class="clickable" onclick="sortTable(33)">Sarachnis</th>
    <th class="clickable" onclick="sortTable(34)">Scorpia</th>
    <th class="clickable" onclick="sortTable(35)">Skotizo</th>
    <th class="clickable" onclick="sortTable(36)">Tempoross</th>
    <th class="clickable" onclick="sortTable(37)">Gauntlet</th>
    <th class="clickable" onclick="sortTable(38)">Corrupted Gauntlet</th>
    <th class="clickable" onclick="sortTable(39)">ToB</th>
    <th class="clickable" onclick="sortTable(40)">ToB Hard mode</th>
    <th class="clickable" onclick="sortTable(41)">Thermonuclear Smoke Devil</th>
    <th class="clickable" onclick="sortTable(42)">Zuk</th>
    <th class="clickable" onclick="sortTable(43)">Jad</th>
    <th class="clickable" onclick="sortTable(44)">Venenatis</th>
    <th class="clickable" onclick="sortTable(45)">Vetion</th>
    <th class="clickable" onclick="sortTable(46)">Vorkath</th>
    <th class="clickable" onclick="sortTable(47)">Wintertodt</th>
    <th class="clickable" onclick="sortTable(48)">Zalcano</th>
    <th class="clickable" onclick="sortTable(49)">Zulrah</th>
    </tr>`;

  for (let p of window.PLAYER_ARRAY) {
    tab += `<tr>
        <td>${p.name}</td>
        <td>${p.teamName}</td>
        <td>${p.bossList.abyssal_sire}</td>
        <td>${p.bossList.alchemical_hydra}</td>
        <td>${p.bossList.barrows_chests}</td>
        <td>${p.bossList.bryophyta}</td>
        <td>${p.bossList.callisto}</td>
        <td>${p.bossList.cerberus}</td>
        <td>${p.bossList.chambers_of_xeric}</td>
        <td>${p.bossList.chambers_of_xeric_challenge_mode}</td>
        <td>${p.bossList.chaos_elemental}</td>
        <td>${p.bossList.chaos_fanatic}</td>
        <td>${p.bossList.commander_zilyana}</td>
        <td>${p.bossList.corporeal_beast}</td>
        <td>${p.bossList.crazy_archaeologist}</td>
        <td>${p.bossList.dagannoth_prime}</td>
        <td>${p.bossList.dagannoth_rex}</td>
        <td>${p.bossList.dagannoth_supreme}</td>
        <td>${p.bossList.deranged_archaeologist}</td>
        <td>${p.bossList.general_graardor}</td>
        <td>${p.bossList.giant_mole}</td>
        <td>${p.bossList.grotesque_guardians}</td>
        <td>${p.bossList.hespori}</td>
        <td>${p.bossList.kalphite_queen}</td>
        <td>${p.bossList.king_black_dragon}</td>
        <td>${p.bossList.kraken}</td>
        <td>${p.bossList.kreearra}</td>
        <td>${p.bossList.kril_tsutsaroth}</td>
        <td>${p.bossList.mimic}</td>
        <td>${p.bossList.nex}</td>
        <td>${p.bossList.nightmare}</td>
        <td>${p.bossList.phosanis_nightmare}</td>
        <td>${p.bossList.obor}</td>
        <td>${p.bossList.sarachnis}</td>
        <td>${p.bossList.scorpia}</td>
        <td>${p.bossList.skotizo}</td>
        <td>${p.bossList.tempoross}</td>
        <td>${p.bossList.the_gauntlet}</td>
        <td>${p.bossList.the_corrupted_gauntlet}</td>
        <td>${p.bossList.theatre_of_blood}</td>
        <td>${p.bossList.theatre_of_blood_hard_mode}</td>
        <td>${p.bossList.thermonuclear_smoke_devil}</td>
        <td>${p.bossList.tzkal_zuk}</td>
        <td>${p.bossList.tztok_jad}</td>
        <td>${p.bossList.venenatis}</td>
        <td>${p.bossList.vetion}</td>
        <td>${p.bossList.vorkath}</td>
        <td>${p.bossList.wintertodt}</td>
        <td>${p.bossList.zalcano}</td>
        <td>${p.bossList.zulrah}</td>
        </tr>`;
  }
  table.innerHTML = tab;
  sumKillCount();
}

function sumXP() {
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
      combatXP += parseFloat(table.rows[i].cells[3].innerHTML.replace(/,/g, ""));
      skillingXP += parseFloat(table.rows[i].cells[4].innerHTML.replace(/,/g, ""));
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

function sumKillCount() {
  const table = document.getElementById("players");
  if (!document.getElementById("totals")) {
    table.innerHTML += `
    <tr id="totals">
    </tr>
    `;
  }
  let abyssal_sire=0,
  alchemical_hydra=0,
  barrows_chests=0,
  bryophyta=0,
  callisto=0,
  cerberus=0,
  chambers_of_xeric=0,
  chambers_of_xeric_challenge_mode=0,
  chaos_elemental=0,
  chaos_fanatic=0,
  commander_zilyana=0,
  corporeal_beast=0,
  crazy_archaeologist=0,
  dagannoth_prime=0,
  dagannoth_rex=0,
  dagannoth_supreme=0,
  deranged_archaeologist=0,
  general_graardor=0,
  giant_mole=0,
  grotesque_guardians=0,
  hespori=0,
  kalphite_queen=0,
  king_black_dragon=0,
  kraken=0,
  kreearra=0,
  kril_tsutsaroth=0,
  mimic=0,
  nex=0,
  nightmare=0,
  phosanis_nightmare=0,
  obor=0,
  sarachnis=0,
  scorpia=0,
  skotizo=0,
  tempoross=0,
  the_gauntlet=0,
  the_corrupted_gauntlet=0,
  theatre_of_blood=0,
  theatre_of_blood_hard_mode=0,
  thermonuclear_smoke_devil=0,
  tzkal_zuk=0,
  tztok_jad=0,
  venenatis=0,
  vetion=0,
  vorkath=0,
  wintertodt=0,
  zalcano=0,
  zulrah=0;
  for (var i = 1; i < table.rows.length - 1; i++) {
    if (!table.rows[i].classList.contains("hide")) {
      abyssal_sire += parseFloat(table.rows[i].cells[2].innerHTML);
      alchemical_hydra += parseFloat(table.rows[i].cells[3].innerHTML);
      barrows_chests += parseFloat(table.rows[i].cells[4].innerHTML);
      bryophyta += parseFloat(table.rows[i].cells[5].innerHTML);
      callisto += parseFloat(table.rows[i].cells[6].innerHTML);
      cerberus += parseFloat(table.rows[i].cells[7].innerHTML);
      chambers_of_xeric += parseFloat(table.rows[i].cells[8].innerHTML);
      chambers_of_xeric_challenge_mode += parseFloat(table.rows[i].cells[9].innerHTML);
      chaos_elemental += parseFloat(table.rows[i].cells[10].innerHTML);
      chaos_fanatic += parseFloat(table.rows[i].cells[11].innerHTML);
      commander_zilyana += parseFloat(table.rows[i].cells[12].innerHTML);
      corporeal_beast += parseFloat(table.rows[i].cells[13].innerHTML);
      crazy_archaeologist += parseFloat(table.rows[i].cells[14].innerHTML);
      dagannoth_prime += parseFloat(table.rows[i].cells[15].innerHTML);
      dagannoth_rex += parseFloat(table.rows[i].cells[16].innerHTML);
      dagannoth_supreme += parseFloat(table.rows[i].cells[17].innerHTML);
      deranged_archaeologist += parseFloat(table.rows[i].cells[18].innerHTML);
      general_graardor += parseFloat(table.rows[i].cells[19].innerHTML);
      giant_mole += parseFloat(table.rows[i].cells[20].innerHTML);
      grotesque_guardians += parseFloat(table.rows[i].cells[21].innerHTML);
      hespori += parseFloat(table.rows[i].cells[22].innerHTML);
      kalphite_queen += parseFloat(table.rows[i].cells[23].innerHTML);
      king_black_dragon += parseFloat(table.rows[i].cells[24].innerHTML);
      kraken += parseFloat(table.rows[i].cells[25].innerHTML);
      kreearra += parseFloat(table.rows[i].cells[26].innerHTML);
      kril_tsutsaroth += parseFloat(table.rows[i].cells[27].innerHTML);
      mimic += parseFloat(table.rows[i].cells[28].innerHTML);
      nex += parseFloat(table.rows[i].cells[29].innerHTML);
      nightmare += parseFloat(table.rows[i].cells[30].innerHTML);
      phosanis_nightmare += parseFloat(table.rows[i].cells[31].innerHTML);
      obor += parseFloat(table.rows[i].cells[32].innerHTML);
      sarachnis += parseFloat(table.rows[i].cells[33].innerHTML);
      scorpia += parseFloat(table.rows[i].cells[34].innerHTML);
      skotizo += parseFloat(table.rows[i].cells[35].innerHTML);
      tempoross += parseFloat(table.rows[i].cells[36].innerHTML);
      the_gauntlet += parseFloat(table.rows[i].cells[37].innerHTML);
      the_corrupted_gauntlet += parseFloat(table.rows[i].cells[38].innerHTML);
      theatre_of_blood += parseFloat(table.rows[i].cells[39].innerHTML);
      theatre_of_blood_hard_mode += parseFloat(table.rows[i].cells[40].innerHTML);
      thermonuclear_smoke_devil += parseFloat(table.rows[i].cells[41].innerHTML);
      tzkal_zuk += parseFloat(table.rows[i].cells[42].innerHTML);
      tztok_jad += parseFloat(table.rows[i].cells[43].innerHTML);
      venenatis += parseFloat(table.rows[i].cells[44].innerHTML);
      vetion += parseFloat(table.rows[i].cells[45].innerHTML);
      vorkath += parseFloat(table.rows[i].cells[46].innerHTML);
      wintertodt += parseFloat(table.rows[i].cells[47].innerHTML);
      zalcano += parseFloat(table.rows[i].cells[48].innerHTML);
      zulrah += parseFloat(table.rows[i].cells[49].innerHTML);
    }
  }
  let tab = `<tr id="totals">
    <th>TOTALS</th>
    <th id="bossTotal">All Bosses:<br />0</th>
    <th>Abyssal Sire:<br />${abyssal_sire}</th>
    <th>Alchemical Hydra:<br />${alchemical_hydra}</th>
    <th>Barrows:<br />${barrows_chests}</th>
    <th>Bryophyta:<br />${bryophyta}</th>
    <th>Callisto:<br />${callisto}</th>
    <th>Cerberus:<br />${cerberus}</th>
    <th>Cox:<br />${chambers_of_xeric}</th>
    <th>Cox CM:<br />${chambers_of_xeric_challenge_mode}</th>
    <th>Chaos Elemental:<br />${chaos_elemental}</th>
    <th>Chaos Fanatic:<br />${chaos_fanatic}</th>
    <th>Commander Zilyana:<br />${commander_zilyana}</th>
    <th>Corp:<br />${corporeal_beast}</th>
    <th>Crazy Archaeologist:<br />${crazy_archaeologist}</th>
    <th>DK Prime:<br />${dagannoth_prime}</th>
    <th>DK Rex:<br />${dagannoth_rex}</th>
    <th>DK Supreme:<br />${dagannoth_supreme}</th>
    <th>Deranged Archaeologist:<br />${deranged_archaeologist}</th>
    <th>General Graardor:<br />${general_graardor}</th>
    <th>Giant Mole:<br />${giant_mole}</th>
    <th>Grotesque Guardians:<br />${grotesque_guardians}</th>
    <th>Hespori:<br />${hespori}</th>
    <th>KQ:<br />${kalphite_queen}</th>
    <th>KBD:<br />${king_black_dragon}</th>
    <th>Kraken:<br />${kraken}</th>
    <th>Kreearra:<br />${kreearra}</th>
    <th>Kril Tsutsaroth:<br />${kril_tsutsaroth}</th>
    <th>Mimic:<br />${mimic}</th>
    <th>Nex:<br />${nex}</th>
    <th>Nightmare:<br />${nightmare}</th>
    <th>Phosanis Nightmare:<br />${phosanis_nightmare}</th>
    <th>Obor:<br />${obor}</th>
    <th>Sarachnis:<br />${sarachnis}</th>
    <th>Scorpia:<br />${scorpia}</th>
    <th>Skotizo:<br />${skotizo}</th>
    <th>Tempoross:<br />${tempoross}</th>
    <th>Gauntlet:<br />${the_gauntlet}</th>
    <th>Corrupted Gauntlet:<br />${the_corrupted_gauntlet}</th>
    <th>ToB:<br />${theatre_of_blood}</th>
    <th>ToB Hard mode:<br />${theatre_of_blood_hard_mode}</th>
    <th>Thermonuclear Smoke Devil:<br />${thermonuclear_smoke_devil}</th>
    <th>Zuk:<br />${tzkal_zuk}</th>
    <th>Jad:<br />${tztok_jad}</th>
    <th>Venenatis:<br />${venenatis}</th>
    <th>Vetion:<br />${vetion}</th>
    <th>Vorkath:<br />${vorkath}</th>
    <th>Wintertodt:<br />${wintertodt}</th>
    <th>Zalcano:<br />${zalcano}</th>
    <th>Zulrah:<br />${zulrah}</th>
  </tr>`;
  document.getElementById("totals").innerHTML = tab;
  sumTotalBoss();
}

function sumTotalBoss() {
  const totalsRow = document.getElementById("totals");
  let boss_total = 0;
  for (i = 2; i < totalsRow.cells.length; i++) {
    boss_total += parseInt(totalsRow.cells[i].innerHTML.replace(/\D/g, ''));
  }
  document.getElementById("bossTotal").innerHTML = `All Boss Total:<br>${boss_total}`;
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
  if (bossPage) {
    sortTable(0, false);
  } else {
    sortTable(2, true);
  }
  if (bossPage) {
    sumKillCount();
  } else {
    sumXP();
  }
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
        x = parseInt(x.innerHTML.replace(/\,/g, ""), 10);
        y = parseInt(y.innerHTML.replace(/\,/g, ""), 10);
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