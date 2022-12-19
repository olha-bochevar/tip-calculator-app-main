// DOM

// main
const form = document.querySelector(".form");
const btnReset = form.querySelector(".btn-reset");
// inputs
const inputBill = form.querySelector("input#bill");
const inputNumOfPeople = form.querySelector("input#people");
const tips = document.querySelectorAll(".tip input");
const customTip = document.querySelector("input#val-custom");
const inputCustomTip = document.querySelector("#val-custom-number");
// output fields
const outputTipAmount = form.querySelector("#tip-amount span.value");
const outputTotal = form.querySelector("#total span.value");
const warn = form.querySelector(".warn");

// FUNCTIONS

// reset values for inputs
const resetValues = (input) => {
  input.value = "";
};
inputBill.addEventListener("click", () => {
  resetValues(inputBill);
});
inputNumOfPeople.addEventListener("click", () => {
  resetValues(inputNumOfPeople);
});
inputCustomTip.addEventListener("click", () => {
  resetValues(inputCustomTip);
});

// show warning about number of people
function showWarn() {
  warn.textContent = `Can't be zero`;
  inputNumOfPeople.classList.add("warn-focused");
}
// hide warning about number of people
function hideWarn() {
  warn.textContent = "";
  inputNumOfPeople.classList.remove("warn-focused");
}

// reset form by clicking button 'Reset'
btnReset.addEventListener("click", (e) => {
  form.reset();
  showCustomRadio();
  hideWarn();
  outputTipAmount.textContent = `$0.00`;
  outputTotal.textContent = `$0.00`;
});

// math operations
const getTipAmountPerPerson = (bill, tip, numOfPeople) => {
  const sumTipAllAmount = (bill * tip) / 100;
  return sumTipAllAmount / numOfPeople;
};
const getTotalSumPerPerson = (bill, tip, numOfPeople) => {
  const sumTipAllAmount = (bill * tip) / 100;
  const sumTotal = bill + sumTipAllAmount;
  return sumTotal / numOfPeople;
};

// update UI
const updateUI = () => {
  // get values bill & number of person
  let bill = Number(form.bill.value.trim());
  let numberOfPeople = Number(form.people.value.trim());

  // get tip
  let tip;
  tips.forEach((el) => {
    if (el.checked) {
      tip = el.value;
      showCustomRadio();
    } else if (customTip.checked) {
      hideCustomRadio();
      tip = inputCustomTip.value;
    }
  });

  // check number of people & output message about mistake
  if (numberOfPeople < 1) {
    showWarn();
  } else {
    hideWarn();
  }

  // get & output results
  const sumTipAmountPerPerson = getTipAmountPerPerson(
    bill,
    tip,
    numberOfPeople
  ).toFixed(2);
  const sumTotalPerPerson = getTotalSumPerPerson(
    bill,
    tip,
    numberOfPeople
  ).toFixed(2);
  // check for type results (do not show 'Nan' and 'Infinity', if any input hasn`t filled yet)
  if (bill > 0 && numberOfPeople > 0 && tip > 0) {
    outputTipAmount.textContent = `$${sumTipAmountPerPerson}`;
    outputTotal.textContent = `$${sumTotalPerPerson}`;
  } else {
    outputTipAmount.textContent = `$0.00`;
    outputTotal.textContent = `$0.00`;
  }
};

// change custom input 'radio' to 'number'
function hideCustomRadio() {
  if (customTip.checked) {
    customTip.classList.add("hidden");
    customTip.nextElementSibling.setAttribute("class", "hidden");
    inputCustomTip.classList.remove("hidden");
    inputCustomTip.classList.add("input-tip-custom");
  }
}
function showCustomRadio() {
  if (!customTip.checked) {
    customTip.classList.remove("hidden");
    customTip.nextElementSibling.setAttribute("class", "");
    inputCustomTip.classList.remove("input-tip-custom");
    inputCustomTip.classList.add("hidden");
  }
}
