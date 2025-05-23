// DOM elementi
export const polja = document.querySelectorAll('.poljeTable');
export const btnReset = document.querySelector('#btnReset');
export const btnNovaIgra = document.querySelector('#btnNovaIgra');
export const krajIgreOkvir = document.querySelector('#krajIgreOkvir');
export const krajIgrePoruka = document.querySelector('#krajIgrePoruka');

// promenjive u igri
export let potezX = true;
export let igraUToku = true;
export let trenutniFokus = 0; // Za kontrolu tastaturom

export const pobedaOpcije = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

// Dodajemo osluškivač za tastaturu
document.addEventListener('keydown', (e) => {
    if (!igraUToku) return;
    
    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            if (trenutniFokus >= 3) trenutniFokus -= 3;
            break;
        case 'ArrowDown':
            e.preventDefault();
            if (trenutniFokus <= 5) trenutniFokus += 3;
            break;
        case 'ArrowLeft':
            e.preventDefault();
            if (trenutniFokus % 3 !== 0) trenutniFokus--;
            break;
        case 'ArrowRight':
            e.preventDefault();
            if (trenutniFokus % 3 !== 2) trenutniFokus++;
            break;
        case 'Enter':
            e.preventDefault();
            if (polja[trenutniFokus].disabled) return;
            polja[trenutniFokus].click();
            break;
    }
    
    polja[trenutniFokus].focus();
});

export const PoljaAktivna = () => {
    polja.forEach((polje, index) => {
        polje.disabled = false;
        polje.textContent = '';
        if (index === 0) polje.focus(); // Postavi fokus na prvo polje
    });
    trenutniFokus = 0;
};

export const PoljaNeAktivna = () => {
    polja.forEach(polje => {
        polje.disabled = true;
    });
};

export const PrikazPobednika = (pobednik) => {
    krajIgrePoruka.textContent = `Čestitamo, pobednik je ${pobednik}`;
    krajIgreOkvir.style.display = 'block';
    PoljaNeAktivna();
    igraUToku = false;
};

export const ProveraPobednika = () => {
    // Provera pobednika
    for (let opcije of pobedaOpcije) {
        const stanjePolja = opcije.map(index => polja[index].textContent);
        const prvi = stanjePolja[0];

        if(prvi && stanjePolja.every(vrednost => vrednost === prvi)) {
            PrikazPobednika(prvi);
            return true;
        }
    }

    // Provera izjednačenja
    if([...polja].every(polje => polje.textContent)) {
        krajIgrePoruka.textContent = 'Izjednačeno je, nema pobednika.';
        krajIgreOkvir.style.display = 'block';
        igraUToku = false;
        return true;
    }

    return false;
};

export const restartujIgru = () => {
    potezX = true;
    igraUToku = true;
    PoljaAktivna();
    krajIgreOkvir.style.display = 'none';
};

btnNovaIgra.addEventListener('click', restartujIgru);
btnReset.addEventListener('click', restartujIgru);