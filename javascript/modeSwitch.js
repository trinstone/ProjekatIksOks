// modeSwitch.js

import { initPVP } from './pvp.js';
import { initPVC_Lako, initPVC_Tesko } from './ai.js';

const btn1p = document.getElementById("btn1p");
const btn2p = document.getElementById("btn2p");
const btnLako = document.getElementById("btnLako");
const btnTesko = document.getElementById("btnTesko");

btn1p.addEventListener("click", () => {
  localStorage.setItem("gameMode", "1p");
  btn1p.disabled = true;
  btn2p.disabled = false;
  btnLako.disabled = false;
  btnTesko.disabled = false;
  btnLako.style.display = "inline-block";
  btnTesko.style.display = "inline-block";
});

btn2p.addEventListener("click", () => {
  localStorage.setItem("gameMode", "2p");
  btn1p.disabled = false;
  btn2p.disabled = true;
  btnLako.disabled = true;
  btnTesko.disabled = true;
  btnLako.style.display = "none";
  btnTesko.style.display = "none";
  initPVP();
});

btnLako.addEventListener("click", () => {
  initPVC_Lako();
});

btnTesko.addEventListener("click", () => {
  initPVC_Tesko();
});

// On page load, check stored game mode
window.addEventListener("DOMContentLoaded", () => {
  const gameMode = localStorage.getItem("gameMode");
  if (gameMode === "2p") {
    btn1p.disabled = false;
    btn2p.disabled = true;
    btnLako.disabled = true;
    btnTesko.disabled = true;
    btnLako.style.display = "none";
    btnTesko.style.display = "none";
    initPVP();
  } else {
    btn1p.disabled = true;
    btn2p.disabled = false;
    btnLako.disabled = false;
    btnTesko.disabled = false;
    btnLako.style.display = "inline-block";
    btnTesko.style.display = "inline-block";
  }
});