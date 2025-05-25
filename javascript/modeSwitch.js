import { initPVP } from './pvp.js';
import { initPVC_Lako, initPVC_Tesko } from './ai.js';

const btn1p = document.getElementById("btn1p");
const btn2p = document.getElementById("btn2p");
const btnLako = document.getElementById("btnLako");
const btnTesko = document.getElementById("btnTesko");

// Initialize game with no mode selected
let currentMode = null;

btn1p.addEventListener("click", () => {
  if (currentMode === "1p") return;
  
  currentMode = "1p";
  localStorage.setItem("gameMode", "1p");
  
  // Update button states
  btn1p.disabled = true;
  btn2p.disabled = false;
  btnLako.disabled = false;
  btnTesko.disabled = false;
  btnLako.style.display = "inline-block";
  btnTesko.style.display = "inline-block";
  
  // Reset any previous game
  document.querySelectorAll('.poljeTable').forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
  });
});

btn2p.addEventListener("click", () => {
  if (currentMode === "2p") return;
  
  currentMode = "2p";
  localStorage.setItem("gameMode", "2p");
  
  // Update button states
  btn1p.disabled = false;
  btn2p.disabled = true;
  btnLako.disabled = true;
  btnTesko.disabled = true;
  btnLako.style.display = "none";
  btnTesko.style.display = "none";
  
  // Start 2P game
  initPVP();
});

btnLako.addEventListener("click", () => {
  if (currentMode !== "1p") return;
  initPVC_Lako();
});

btnTesko.addEventListener("click", () => {
  if (currentMode !== "1p") return;
  initPVC_Tesko();
});

// On page load
window.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("gameMode");
  
  if (savedMode === "2p") {
    btn2p.click(); // Trigger 2P mode
  } else {
    btn1p.click(); // Default to 1P mode
  }
});