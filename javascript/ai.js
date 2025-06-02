import {
    polja, stanjeIgre, ProveraPobednika, restartujIgru,
    pobedaOpcije, PostaviImenaIgraca
} from './main.js';

// Laki mod – AI bira nasumično
export function initPVC_Lako(osluskivaci) {
    restartujIgru();
    postaviOsluskivace(osluskivaci);
    PostaviImenaIgraca("covek", "kompjuter");
}

// Teški mod – AI koristi minimax
export function initPVC_Tesko(osluskivaci) {
    restartujIgru();
    postaviOsluskivace(osluskivaci);
    PostaviImenaIgraca("covek", "kompjuter");
}

// Postavlja osluškivače na sva polja, u zavisnosti od moda
export function postaviOsluskivace(isHard = false) {
    polja.forEach(polje => {
        polje.disabled = false;
        polje.textContent = '';
        polje.style.color = '';

        const handler = (e) => obradiPotezIgraca(e, isHard);
        polje.onclick = null;
        polje.addEventListener('click', handler, { once: true });
    });
}

// Potez igrača, zatim AI potez
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

// AI potez – koristi random ili minimax u zavisnosti od moda
function izvrsiAIPotez(isHard) {
    if (!stanjeIgre.igraUToku || stanjeIgre.potezX) return;

    const slobodnaPolja = Array.from(polja).filter(polje => polje.textContent === '');

    let izabranoPolje = isHard
        ? nadjiNajboljiPotez()
        : slobodnaPolja[Math.floor(Math.random() * slobodnaPolja.length)];

    if (izabranoPolje) {
        izabranoPolje.textContent = 'O';
        izabranoPolje.style.color = 'black';
        izabranoPolje.disabled = true;

        ProveraPobednika();
        stanjeIgre.potezX = true;
    }
}

// Pronalazi najbolji potez koristeći minimax
function nadjiNajboljiPotez() {
    let najboljiScore = -Infinity;
    let najboljiPolje = null;

    polja.forEach((polje) => {
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

// Minimax algoritam – vraća ocenu poteza
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

// Vraća 10 ako je AI pobedio, -10 ako je igrač, 0 za nerešeno, null ako nije gotovo
function evaluirajStanje() {
    for (let kombinacija of pobedaOpcije) {
        const [a, b, c] = kombinacija;
        const vrednosti = [polja[a].textContent, polja[b].textContent, polja[c].textContent];
        if (vrednosti.every(v => v === 'O')) return 10;
        if (vrednosti.every(v => v === 'X')) return -10;
    }
    if ([...polja].every(polje => polje.textContent !== '')) return 0;
    return null;
}

// Prikazuje ili sakriva tablu
export const toggleTabelaVidljivost = (vidljivo) => {
    const tabela = document.querySelector('#tabla');
    if (!tabela) return;

    tabela.style.display = vidljivo ? 'grid' : 'none';
};

// Reset dugme – sakriva tablu, resetuje, pa prikazuje
btnReset.addEventListener('click', () => {
    toggleTabelaVidljivost(false);
    restartujIgru();
    setTimeout(() => toggleTabelaVidljivost(true), 50);
});