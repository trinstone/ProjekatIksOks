import {
    polja, stanjeIgre, ProveraPobednika, restartujIgru, pobedaOpcije, PostaviImenaIgraca
} from './main.js';

export function initPVC_Lako() {
    restartujIgru();
    postaviOsluskivace(false); // Easy mode
    PostaviImenaIgraca("covek", "kompjuter");
}

export function initPVC_Tesko() {
    restartujIgru();
    postaviOsluskivace(true); // Hard mode
    PostaviImenaIgraca("covek", "kompjuter");
}


function postaviOsluskivace(isHard = false) {
    polja.forEach(polje => {
        polje.disabled = false;
        polje.textContent = '';
        polje.style.color = '';
        polje.removeEventListener('click', (e) => obradiPotezIgraca(e, isHard));
        polje.addEventListener('click', (e) => obradiPotezIgraca(e, isHard), { once: true });
    });
}

function obradiPotezIgraca(e, isHard) {
    if (!stanjeIgre.igraUToku || !stanjeIgre.potezX) return;

    const polje = e.target;
    if (polje.textContent !== '') return;

    polje.textContent = 'X';
    polje.style.color = 'green';
    polje.disabled = true;

    if (ProveraPobednika()) return;

    stanjeIgre.potezX = false;

    if (stanjeIgre.igraUToku) {
        setTimeout(() => izvrsiAIPotez(isHard), 300);
    }
}

function izvrsiAIPotez(isHard) {
    if (!stanjeIgre.igraUToku || stanjeIgre.potezX) return;

    const slobodnaPolja = Array.from(polja).filter(polje => polje.textContent === '');

    let izabranoPolje;

    if (isHard) {
        izabranoPolje = nadjiNajboljiPotez();
    } else {
        izabranoPolje = slobodnaPolja[Math.floor(Math.random() * slobodnaPolja.length)];
    }

    if (izabranoPolje) {
        izabranoPolje.textContent = 'O';
        izabranoPolje.style.color = 'black';
        izabranoPolje.disabled = true;

        ProveraPobednika();
        stanjeIgre.potezX = true;
    }
}

function nadjiNajboljiPotez() {
    let najboljiScore = -Infinity;
    let najboljiPotez = null;

    polja.forEach((polje, index) => {
        if (polje.textContent === '') {
            polje.textContent = 'O';
            const score = minimax(polja, 0, false);
            polje.textContent = '';
            if (score > najboljiScore) {
                najboljiScore = score;
                najboljiPotez = polje;
            }
        }
    });

    return najboljiPotez;
}

function minimax(polja, dubina, jeMax) {
    const rezultat = evaluirajStanje();
    if (rezultat !== null) return rezultat;

    if (jeMax) {
        let najbolji = -Infinity;
        polja.forEach(polje => {
            if (polje.textContent === '') {
                polje.textContent = 'O';
                najbolji = Math.max(najbolji, minimax(polja, dubina + 1, false));
                polje.textContent = '';
            }
        });
        return najbolji;
    } else {
        let najgori = Infinity;
        polja.forEach(polje => {
            if (polje.textContent === '') {
                polje.textContent = 'X';
                najgori = Math.min(najgori, minimax(polja, dubina + 1, true));
                polje.textContent = '';
            }
        });
        return najgori;
    }
}

function evaluirajStanje() {
    for (let kombinacija of pobedaOpcije) {
        const [a,b,c] = kombinacija;
        const vrednosti = [polja[a].textContent, polja[b].textContent, polja[c].textContent];
        if (vrednosti.every(v => v === 'O')) return 10;
        if (vrednosti.every(v => v === 'X')) return -10;
    }
    if ([...polja].every(polje => polje.textContent !== '')) return 0;
    return null;
}