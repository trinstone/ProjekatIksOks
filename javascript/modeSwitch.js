import { initPVP } from './pvp.js';
import { initPVC_Lako, initPVC_Tesko } from './ai.js';
import {stanjeIgre, restartujIgru} from './main.js';

const btn1p = document.getElementById("btn1p");
const btn2p = document.getElementById("btn2p");
const btnLako = document.getElementById("btnLako");
const btnTesko = document.getElementById("btnTesko");
const btnMeni = document.getElementById("btnMeni");
const params = new URLSearchParams(window.location.search);
export const igrac1 = params.get("imePrvog");
export const igrac2 = params.get("imeDrugog");
export const trenutniIgrac = document.getElementById("trenutniIgrac");

document.addEventListener("DOMContentLoaded", () => {

const params = new URLSearchParams(window.location.search);
const choice = params.get("choice");
if (choice === "option1") {
  console.log(igrac1);
  console.log("uga");
  btnLako.disabled = false;
  btnTesko.disabled = false;
} else {
  console.log("buga");
  btnLako.disabled = true;
  btnTesko.disabled = true;
  btnLako.style.display = "none";
  btnTesko.style.display = "none";
  initPVP(igrac1, igrac2);
}

});/*
btn1p.addEventListener("click", () => {
  if(stanjeIgre.igraUToku){
    restartujIgru();
  }
  btn1p.disabled = true;
  btn2p.disabled = false;
  btnLako.disabled = false;
  btnTesko.disabled = false;
  btn1p.style.display = "none";
});


btn2p.addEventListener("click", () => {
  if(stanjeIgre.igraUToku){
    restartujIgru();
  }
  btn1p.disabled = false;
  btn2p.disabled = true;
  btnLako.disabled = true;
  btnTesko.disabled = true;
  btnLako.style.display = "none";
  btnTesko.style.display = "none";
  btn2p.style.display = "none";
  initPVP();
});*/

btnLako.addEventListener("click", () => {
  initPVC_Lako();
});

btnTesko.addEventListener("click", () => {
  initPVC_Tesko();
});

btnMeni.addEventListener("click", () =>{
  window.location.href = 'index.html';
});