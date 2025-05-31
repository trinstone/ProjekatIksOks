import { initPVP } from './pvp.js'; 
import { initPVC_Lako, initPVC_Tesko } from './ai.js';
import { stanjeIgre, restartujIgru } from './main.js';

const btnLako = document.getElementById("btnLako");
const btnTesko = document.getElementById("btnTesko");
const btnMeni = document.getElementById("btnMeni");

// Inputs on gameplay page (if present)
const imePrvogInput = document.getElementById("imePrvogID");
const imeDrugogInput = document.getElementById("imeDrugogID");

const params = new URLSearchParams(window.location.search);
export const igrac1 = params.get("imePrvog");
export const igrac2 = params.get("imeDrugog");
export const trenutniIgrac = document.getElementById("trenutniIgrac");

document.addEventListener("DOMContentLoaded", () => {
  const choice = params.get("choice");

  if (choice === "option1") {
    console.log(igrac1);
    console.log("option1 selected");

    // Enable AI buttons
    btnLako.disabled = false;
    btnTesko.disabled = false;
  } else {
    console.log("option2 or no choice");

    btnLako.disabled = true;
    btnTesko.disabled = true;
    btnLako.style.display = "none";
    btnTesko.style.display = "none";

    if (imePrvogInput && imeDrugogInput) {
      imePrvogInput.disabled = false;
      imeDrugogInput.disabled = false;
    }

    initPVP(igrac1, igrac2);
  }
});

// AI buttons event listeners
btnLako.addEventListener("click", () => {
  initPVC_Lako();
});

btnTesko.addEventListener("click", () => {
  initPVC_Tesko();
});

btnMeni.addEventListener("click", () => {
  window.location.href = 'index.html';
});
