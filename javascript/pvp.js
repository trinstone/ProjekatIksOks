import {
    polja, stanjeIgre, ProveraPobednika, restartujIgru
} from './main.js';

export function initPVP() {
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
    } else {
        this.textContent = 'O';
        this.style.color = 'black';
    }

    this.disabled = true;

    if (!ProveraPobednika()) {
        stanjeIgre.potezX = !stanjeIgre.potezX;
    }
}
