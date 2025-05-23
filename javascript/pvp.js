import {
    polja, potezX, igraUToku, ProveraPobednika, restartujIgru
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
    if (!igraUToku || this.disabled) return;

    if (potezX) {
        this.textContent = 'X';
        this.style.color = 'green';
    } else {
        this.textContent = 'O';
        this.style.color = 'black';
    }

    this.disabled = true;

    if (!ProveraPobednika()) {
        potezX = !potezX;
    }
}