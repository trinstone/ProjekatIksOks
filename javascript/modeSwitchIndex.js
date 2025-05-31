document.addEventListener("DOMContentLoaded", () => {
  const radio1p = document.querySelector('input[name="choice"][value="option1"]');
  const radio2p = document.querySelector('input[name="choice"][value="option2"]');

  const imePrvogInput = document.getElementById("imePrvogID");
  const imeDrugogInput = document.getElementById("imeDrugogID");
  const labelPrvi = document.querySelector('label[for="imePrvogID"]');
  const labelDrugi = document.querySelector('label[for="imeDrugogID"]');

  function updateVisibility(is1p) {
    if (is1p) {
      imePrvogInput.disabled = true;
      imeDrugogInput.disabled = true;
      imePrvogInput.style.display = "none";
      imeDrugogInput.style.display = "none";
      labelPrvi.style.display = "none";
      labelDrugi.style.display = "none";
    } else {
      imePrvogInput.disabled = false;
      imeDrugogInput.disabled = false;
      imePrvogInput.style.display = "inline";
      imeDrugogInput.style.display = "inline";
      labelPrvi.style.display = "inline";
      labelDrugi.style.display = "inline";
    }
  }

  // Add event listeners
  radio1p.addEventListener("change", () => {
    updateVisibility(true);
  });

  radio2p.addEventListener("change", () => {
    updateVisibility(false);
  });

  // Optional: check if already selected when page loads
  if (radio1p.checked) {
    updateVisibility(true);
  } else if (radio2p.checked) {
    updateVisibility(false);
  }
});
