import { initPVP } from './pvp.js'; 
import { initPVC_Lako, initPVC_Tesko, toggleTabelaVidljivost } from './ai.js';

// Dugmad za izbor težine i povratak u meni
const btnLako = document.getElementById("btnLako");
const btnTesko = document.getElementById("btnTesko");
const btnMeni = document.getElementById("btnMeni");
export const btnReset = document.querySelector('#btnReset');

// Input polja na stranici sa igrom (ako postoje)
const imePrvogInput = document.getElementById("imePrvogID");
const imeDrugogInput = document.getElementById("imeDrugogID");

// Dohvata vrednosti iz URL-a (npr. ?imePrvog=Ana&imeDrugog=Marko&choice=option2)
const params = new URLSearchParams(window.location.search);
export const igrac1 = params.get("imePrvog");
export const igrac2 = params.get("imeDrugog");

// Element koji prikazuje trenutno aktivnog igrača
export const trenutniIgrac = document.getElementById("trenutniIgrac");

// Čeka da se cela stranica učita pre nego što pokrene logiku
document.addEventListener("DOMContentLoaded", () => {
  const choice = params.get("choice"); // Da li je korisnik izabrao igranje protiv računara (option1) ili PVP (option2)

  if (choice === "option1") {
    console.log(igrac1);
    console.log("option1 selected");

    // Ako je izabran AI mod, dugmad za AI mod se uključuju
    btnLako.disabled = false;
    btnTesko.disabled = false;
  } else {
    console.log("option2 or no choice");

    // Sakriva dugmad za AI kada se igra PVP
    btnLako.disabled = true;
    btnTesko.disabled = true;
    btnLako.style.display = "none";
    btnTesko.style.display = "none";

    // Ako postoje input polja za imena, omogućava unos korisniku
    if (imePrvogInput && imeDrugogInput) {
      imePrvogInput.disabled = false;
      imeDrugogInput.disabled = false;
    }

    // Pokreće PVP mod igre
    initPVP(igrac1, igrac2);
  }
});

// Dugme za pokretanje igre protiv lakog AI-ja
btnLako.addEventListener("click", () => {
  toggleTabelaVidljivost(false); // Sakriva tablu na kratko radi efekta
  initPVC_Lako(false); // Pokreće igru protiv lakog AI
  setTimeout(() => toggleTabelaVidljivost(true), 50); // Prikazuje tablu nakon kratkog vremena
});

// Dugme za pokretanje igre protiv teškog AI-ja
btnTesko.addEventListener("click", () => {
  toggleTabelaVidljivost(false); // Sakriva tablu
  initPVC_Tesko(true); // Pokreće igru protiv teškog AI
  setTimeout(() => toggleTabelaVidljivost(true), 50); // Prikazuje tablu nazad
});

// Dugme za povratak u glavni meni
btnMeni.addEventListener("click", () => {
  window.location.href = 'index.html'; // Preusmerava na početnu stranicu
});