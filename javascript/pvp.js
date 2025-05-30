import {
    polja, stanjeIgre, ProveraPobednika, restartujIgru
} from './main.js';

let igrac1, igrac2;
export function initPVP(igrac1_, igrac2_) {
    igrac1 = igrac1_;
    igrac2 = igrac2_;
    restartujIgru();
    setupEventListeners();
}

function setupEventListeners() {
    polja.forEach(polje => {
        polje.removeEventListener('click', KlikPolja);
        polje.addEventListener('click', KlikPolja);
    });
}

function KlikPolja() {
    if (!stanjeIgre.igraUToku || this.disabled) return;
    if (stanjeIgre.potezX) {
        this.textContent = 'X';
        this.style.color = 'green';
        trenutniIgrac.innerText = `${igrac1} je na potezu`;
        console.log(igrac1);
    } else {
        this.textContent = 'O';
        this.style.color = 'black';
        trenutniIgrac.innerText = `${igrac2} je na potezu`;
    }

    this.disabled = true;

    if (!ProveraPobednika()) {
        stanjeIgre.potezX = !stanjeIgre.potezX;
    }
}