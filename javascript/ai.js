import {
    polja, stanjeIgre, ProveraPobednika, restartujIgru
} from './main.js';

export function initPVC() {
    restartujIgru();
    postaviOsluskivace();
}

function postaviOsluskivace() {
    polja.forEach(polje => {
        polje.disabled = false; // enable all
        polje.textContent = ''; // clear board
        polje.style.color = ''; // reset color
        polje.removeEventListener('click', obradiPotezIgraca);
        polje.addEventListener('click', obradiPotezIgraca, { once: true }); // Allow only one click per game
    });
}

function obradiPotezIgraca(e) {
    if (!stanjeIgre.igraUToku || !stanjeIgre.potezX) return;

    const polje = e.target;
    if (polje.textContent !== '') return;

    polje.textContent = 'X';
    polje.style.color = 'green';
    polje.disabled = true;

    if (ProveraPobednika()) return;

    stanjeIgre.potezX = false;

    if (stanjeIgre.igraUToku) {
        setTimeout(izvrsiAIPotez, 500);
    }
}

function izvrsiAIPotez() {
    if (!stanjeIgre.igraUToku || stanjeIgre.potezX) return;

    const slobodnaPolja = Array.from(polja).filter(polje => polje.textContent === '');

    if (slobodnaPolja.length > 0) {
        const nasumicnoPolje = slobodnaPolja[Math.floor(Math.random() * slobodnaPolja.length)];

        nasumicnoPolje.textContent = 'O';
        nasumicnoPolje.style.color = 'black';
        nasumicnoPolje.disabled = true;

        ProveraPobednika();
        stanjeIgre.potezX = true;
    }
}
