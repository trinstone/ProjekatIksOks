import {
    polja, stanjeIgre, ProveraPobednika, restartujIgru, PostaviImenaIgraca
} from './main.js';

const trenutniIgrac = document.getElementById("trenutniIgrac");

let igrac1 = "Igrač 1", igrac2 = "Igrač 2";

export function initPVP(igrac1_, igrac2_) {
    igrac1 = igrac1_ || igrac1;
    igrac2 = igrac2_ || igrac2;
    restartujIgru();
    updateTrenutniIgrac();
    setupEventListeners();
}

PostaviImenaIgraca(igrac1, igrac2);

function setupEventListeners() {
    polja.forEach(polje => {
        polje.removeEventListener('click', klikPolja);
        polje.addEventListener('click', klikPolja);
    });
}

function updateTrenutniIgrac() {
    const playerOnMove = stanjeIgre.potezX ? igrac1 : igrac2;
    trenutniIgrac.innerText = `${playerOnMove} je na potezu`;
}

function klikPolja() {
    if (!stanjeIgre.igraUToku || this.disabled) return;

    // Set mark and style
    if (stanjeIgre.potezX) {
        this.textContent = 'X';
        this.style.color = 'green';
    } else {
        this.textContent = 'O';
        this.style.color = 'black';
    }
    this.disabled = true;

    // Check for winner or switch player
    if (!ProveraPobednika()) {
        stanjeIgre.potezX = !stanjeIgre.potezX;
        updateTrenutniIgrac();
    }
}
