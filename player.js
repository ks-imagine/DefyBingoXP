// Player Page JS
const queryString = window.location.search;
const playerName = new URLSearchParams(queryString).get("player");

window.showPlayerData = () => {
  document.getElementById("player-name").innerHTML = playerName;
  const table = document.getElementById("individual");
  let tab;
  for (let i = 0; i < window.PLAYER_ARRAY.length; i++) {
    if (window.PLAYER_ARRAY[i].name === playerName) {
      const p = window.PLAYER_ARRAY[i];
      tab = `
        <tr><th class="player-skill total-xp">Total XP</th><td>${p.totalXP.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Attack XP<br /><img src='./images/Attack_icon.png' class='skillIcon'><td>${p.skills.attack.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Strength XP<br /><img src='./images/Strength_icon.png' class='skillIcon'></th><td>${p.skills.strength.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Defence XP<br /><img src='./images/Defence_icon.png' class='skillIcon'></th><td>${p.skills.defence.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Ranged XP<br /><img src='./images/Ranged_icon.png' class='skillIcon'></th><td>${p.skills.ranged.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Prayer XP<br /><img src='./images/Prayer_icon.png' class='skillIcon'></th><td>${p.skills.prayer.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Magic XP<br /><img src='./images/Magic_icon.png' class='skillIcon'></th><td>${p.skills.magic.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Runecrafting XP<br /><img src='./images/Runecraft_icon.png' class='skillIcon'></th><td>${p.skills.runecrafting.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Construction XP<br /><img src='./images/Construction_icon.png' class='skillIcon'></th><td>${p.skills.construction.toLocaleString("en-US")} </td></tr>

        <tr><th class="player-skill">Hitpoints XP<br /><img src='./images/Hitpoints_icon.png' class='skillIcon'></th><td>${p.skills.hitpoints.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Agility XP<br /><img src='./images/Agility_icon.png' class='skillIcon'></th><td>${p.skills.agility.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Herblore XP<br /><img src='./images/Herblore_icon.png' class='skillIcon'></th><td>${p.skills.herblore.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Thieving XP<br /><img src='./images/Thieving_icon.png' class='skillIcon'></th><td>${p.skills.thieving.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Crafting XP<br /><img src='./images/Crafting_icon.png' class='skillIcon'></th><td>${p.skills.crafting.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Fletching XP<br /><img src='./images/Fletching_icon.png' class='skillIcon'></th><td>${p.skills.fletching.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Slayer XP<br /><img src='./images/Slayer_icon.png' class='skillIcon'></th><td>${p.skills.slayer.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Hunter XP<br /><img src='./images/Hunter_icon.png' class='skillIcon'></th><td>${p.skills.hunter.toLocaleString("en-US")} </td></tr>

        <tr><th class="player-skill">Mining XP<br /><img src='./images/Mining_icon.png' class='skillIcon'></th><td>${p.skills.mining.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Smithing XP<br /><img src='./images/Smithing_icon.png' class='skillIcon'></th><td>${p.skills.smithing.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Fishing XP<br /><img src='./images/Fishing_icon.png' class='skillIcon'></th><td>${p.skills.fishing.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Cooking XP<br /><img src='./images/Cooking_icon.png' class='skillIcon'></th><td>${p.skills.cooking.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Firemaking XP<br /><img src='./images/Firemaking_icon.png' class='skillIcon'></th><td>${p.skills.firemaking.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Woodcutting XP<br /><img src='./images/Woodcutting_icon.png' class='skillIcon'></th><td>${p.skills.woodcutting.toLocaleString("en-US")} </td></tr>
        <tr><th class="player-skill">Farming XP<br /><img src='./images/Farming_icon.png' class='skillIcon'></th><td>${p.skills.farming.toLocaleString("en-US")} </td></tr>`;
    }
  }
  table.innerHTML = tab;
  window.addPetIconsIndividual(playerName);
};
