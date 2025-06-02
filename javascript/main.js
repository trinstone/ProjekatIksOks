// DOM elementi
export const polja = document.querySelectorAll('.poljeTable');
export const btnReset = document.querySelector('#btnReset');
export const krajIgreOkvir = document.querySelector('#krajIgreOkvir');
export const krajIgrePoruka = document.querySelector('#krajIgrePoruka');

// Deljena promenljiva stanja
export const stanjeIgre = {
    potezX: true,        
    igraUToku: true,      
    trenutniFokus: 0      // Trenutno fokusirano polje za tastaturu
};

export const pobedaOpcije = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],  
    [1, 4, 7], [2, 5, 8], [2, 4, 6],  
    [3, 4, 5], [6, 7, 8]
];

let igrac1 = "čovek", igrac2 = "kompjuter";

export function PostaviImenaIgraca(igrac1_, igrac2_) {
    igrac1 = igrac1_;
    igrac2 = igrac2_;
}

document.addEventListener('keydown', (e) => {
    if (!stanjeIgre.igraUToku) return;

    switch(e.key) {
        case 'ArrowUp':    
            e.preventDefault();
            if (stanjeIgre.trenutniFokus >= 3) stanjeIgre.trenutniFokus -= 3;
            break;
        case 'ArrowDown': 
            e.preventDefault();
            if (stanjeIgre.trenutniFokus <= 5) stanjeIgre.trenutniFokus += 3;
            break;
        case 'ArrowLeft':  
            e.preventDefault();
            if (stanjeIgre.trenutniFokus % 3 !== 0) stanjeIgre.trenutniFokus--;
            break;
        case 'ArrowRight': 
            e.preventDefault();
            if (stanjeIgre.trenutniFokus % 3 !== 2) stanjeIgre.trenutniFokus++;
            break;
        case 'Enter':      
            e.preventDefault();
            if (polja[stanjeIgre.trenutniFokus].disabled) return;
            polja[stanjeIgre.trenutniFokus].click();
            break;
    }

    polja[stanjeIgre.trenutniFokus].focus();
});

export const PoljaAktivna = () => {
    polja.forEach((polje, index) => {
        polje.disabled = false;
        polje.textContent = '';
        if (index === 0) polje.focus();  
    });
    stanjeIgre.trenutniFokus = 0;
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
    stanjeIgre.igraUToku = false;
};

export const ProveraPobednika = () => {
    for (let opcije of pobedaOpcije) {
        const stanjePolja = opcije.map(index => polja[index].textContent);
        const prvi = stanjePolja[0];
        if (prvi && stanjePolja.every(vrednost => vrednost === prvi)) {
            const pobednik = prvi === 'X' ? igrac1 : igrac2;  // Određuje pobednika
            PrikazPobednika(pobednik);
            return true;
        }
    }

    // Provera za nerešeno
    if ([...polja].every(polje => polje.textContent)) {
        krajIgrePoruka.textContent = 'Izjednačeno je, nema pobednika.';
        krajIgreOkvir.style.display = 'block';
        stanjeIgre.igraUToku = false;
        return true;
    }

    return false;
};

export const restartujIgru = () => {
    stanjeIgre.potezX = true;
    stanjeIgre.igraUToku = true;
    PoljaAktivna();
    krajIgreOkvir.style.display = 'none';
};

btnReset.addEventListener('click', restartujIgru);
