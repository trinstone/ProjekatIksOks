import { initPVP } from './pvp.js';
import { initPVC_Lako, initPVC_Tesko } from './ai.js';
import {stanjeIgre, restartujIgru} from './main.js';

const btn1p = document.getElementById("btn1p");
const btn2p = document.getElementById("btn2p");
const btnLako = document.getElementById("btnLako");
const btnTesko = document.getElementById("btnTesko");

btn1p.addEventListener("click", () => {
  if(stanjeIgre.igraUToku){
    restartujIgru;
  }
  btn1p.disabled = true;
  btn2p.disabled = false;
  btnLako.disabled = false;
  btnTesko.disabled = false;
  btn1p.style.display = "none";
});

btn2p.addEventListener("click", () => {
  if(stanjeIgre.igraUToku){
    restartujIgru;
  }
  btn1p.disabled = false;
  btn2p.disabled = true;
  btnLako.disabled = true;
  btnTesko.disabled = true;
  btnLako.style.display = "none";
  btnTesko.style.display = "none";
  btn2p.style.display = "none";
  initPVP();
});

btnLako.addEventListener("click", () => {
  initPVC_Lako();
});

btnTesko.addEventListener("click", () => {
  initPVC_Tesko();
});

