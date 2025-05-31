import {
    polja, stanjeIgre, ProveraPobednika, restartujIgru,
    pobedaOpcije, PostaviImenaIgraca
} from './main.js';

export function initPVC_Lako(osluskivaci) {
    restartujIgru();
    postaviOsluskivace(osluskivaci); // Easy mode
    PostaviImenaIgraca("covek", "kompjuter");
}

export function initPVC_Tesko(osluskivaci) {
    restartujIgru();
    postaviOsluskivace(osluskivaci); // Hard mode
    PostaviImenaIgraca("covek", "kompjuter");
}

export function postaviOsluskivace(isHard = false) {
    polja.forEach(polje => {
        polje.disabled = false;
        polje.textContent = '';
        polje.style.color = '';

        const handler = (e) => obradiPotezIgraca(e, isHard);
        polje.onclick = null; // clear old listener
        polje.addEventListener('click', handler, { once: true });
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
    let najboljiPolje = null;

    polja.forEach((polje, index) => {
        if (polje.textContent === '') {
            polje.textContent = 'O';
            const score = minimax(polja, 0, false);
            polje.textContent = '';
            if (score > najboljiScore) {
                najboljiScore = score;
                najboljiPolje = polje;
            }
        }
    });

    return najboljiPolje;
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

export const toggleTabelaVidljivost = (vidljivo) => {
    const tabela = document.querySelector('#tabla'); // Make sure this is the container of all .poljeTable
    if (!tabela) return;

    tabela.style.display = vidljivo ? 'grid' : 'none';
};

btnReset.addEventListener('click', () => {
    toggleTabelaVidljivost(false);
    restartujIgru();
    setTimeout(() => toggleTabelaVidljivost(true), 50);
});