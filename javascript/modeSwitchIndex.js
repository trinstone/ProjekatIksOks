// Čeka da se cela stranica (DOM) učita pre nego što se izvrši ostatak koda
document.addEventListener("DOMContentLoaded", () => {
  // Radio dugmad za izbor moda: 1 igrač protiv računara (option1) i 2 igrača (option2)
  const radio1p = document.querySelector('input[name="choice"][value="option1"]');
  const radio2p = document.querySelector('input[name="choice"][value="option2"]');

  // Polja za unos imena i njihove labele
  const imePrvogInput = document.getElementById("imePrvogID");
  const imeDrugogInput = document.getElementById("imeDrugogID");
  const labelPrvi = document.querySelector('label[for="imePrvogID"]');
  const labelDrugi = document.querySelector('label[for="imeDrugogID"]');

  // Funkcija koja upravlja vidljivošću i omogućenošću polja za unos imena
  function updateVisibility(is1p) {
    if (is1p) {
      // Ako je izabran mod za jednog igrača, sakrij i onemogući polja za unos imena
      imePrvogInput.disabled = true;
      imeDrugogInput.disabled = true;
      imePrvogInput.style.display = "none";
      imeDrugogInput.style.display = "none";
      labelPrvi.style.display = "none";
      labelDrugi.style.display = "none";
    } else {
      // Ako je izabran mod za dva igrača, prikaži i omogući polja za unos imena
      imePrvogInput.disabled = false;
      imeDrugogInput.disabled = false;
      imePrvogInput.style.display = "inline";
      imeDrugogInput.style.display = "inline";
      labelPrvi.style.display = "inline";
      labelDrugi.style.display = "inline";
    }
  }

  // Dodaje reakciju na promenu izbora radio dugmeta — kada se izabere mod za jednog igrača
  radio1p.addEventListener("change", () => {
    updateVisibility(true);
  });

  // Kada se izabere mod za dva igrača
  radio2p.addEventListener("change", () => {
    updateVisibility(false);
  });

  // Ako je već unapred izabrano neko radio dugme prilikom učitavanja stranice, odmah ažurira prikaz
  if (radio1p.checked) {
    updateVisibility(true);
  } else if (radio2p.checked) {
    updateVisibility(false);
  }
});