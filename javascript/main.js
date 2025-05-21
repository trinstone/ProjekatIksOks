//DOM elementi
export const polja = document.querySelectorAll('.poljeTable');
export const btnReset = document.querySelector('#btnReset');
export const btnNovaIgra = document.querySelector('#btnNovaIgra');
export const krajIgreOkvir = document.querySelector('#krajIgreOkvir');
export const krajIgrePoruka = document.querySelector('#krajIgrePoruka');

//promenjive u igri
export let potezX = true;
export let igraUToku = true;

export const pobedaOpcije = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

export const PoljaAktivna = () => {
    polja.forEach(polje => {
        polje.ariaDisabled = false;
        polje.innerHTML = '';
    })
}

export const PoljaNeAktivna = () => {
    polja.forEach(polje => {
        polje.ariaDisabled = true;
    })
}

export const PrikazPobednika = (pobednik) => {
    krajIgrePoruka.innerHTML = 'Cestitamo, pobednik je ${pobednik}';
    krajIgreOkvir.classList.remove('hide');
    PoljaNeAktivna();
    igraUToku = false;
}

export const proveraPobednika = () => {
    //ima pobednik
    for (let opcije of pobedaOpcije) {
        const stanjePolja = pobedaOpcije.map(index => polja[index].innerHTML);
        const prvi = stanjePolja[0];

        if(prvi && stanjePolja.every(vrednost => vrednost === prvi)) {
            PrikazPobednika(prvi);
            return true;
        }
    }

    //izjednaceno
    if([...polja].every(polje => polje.innerHTML)) {
        krajIgrePoruka.innerHTML = 'Izjednaceno je, nema pobednika.';
        krajIgreOkvir.classList.remove('hide');
        return true;
    }

    //nema pobednika
    return false;
}