// DOM const
const form = document.querySelector('.form');
const btnReset = form.querySelector('.btn-reset');
let bill = form.bill;
let numberOfPeople = form.people;
const tips = document.querySelectorAll('div.select-tip-input > fieldset > div.tips > div.tip');
const customTip = document.querySelector("div.select-tip-input > fieldset > div > div.tip.custom > input#val-custom");
const inputCustomNumber = document.querySelector('#val-custom-number');
const outputTipAmount = form.querySelector('#tip-amount span.value');
const outputTotal = form.querySelector('#total span.value');
const warn = form.querySelector('.warn');

let tip = 15;

// reset values
const resetValues = (input) => {
    input.value = '';
};

bill.addEventListener('click', () => {
    resetValues(bill);
});
numberOfPeople.addEventListener('click', () => {
    resetValues(numberOfPeople);
});

// reset form by clicking button 'Reset'
btnReset.addEventListener('click', e => { 
    form.reset();
    outputTipAmount.textContent = `$0.00`;
    outputTotal.textContent = `$0.00`;
});

// math operations

const getTipAmountPerPerson = (bill, tip, numberOfPeople) => {
    const sumTipAllAmount = (bill*tip) / 100;
    return sumTipAllAmount / numberOfPeople;
};
const getTotalSumPerPerson = (bill, tip, numberOfPeople) => {
    const sumTipAllAmount = (bill*tip) / 100;
    const sumTotal = bill + sumTipAllAmount;
    return sumTotal / numberOfPeople;
};

// update UI 
const updateUI = () => {
    const sumTipAmountPerPerson = getTipAmountPerPerson(bill, tip, numberOfPeople).toFixed(2);
    const sumTotalPerPerson = getTotalSumPerPerson(bill, tip, numberOfPeople).toFixed(2);

    outputTipAmount.textContent = `$${sumTipAmountPerPerson}`;
    outputTotal.textContent = `$${sumTotalPerPerson}`;

};

// get values from form && update UI
form.addEventListener('submit', e => {
    e.preventDefault();
    
    bill = Number(form.bill.value.trim());
    numberOfPeople = Number(form.people.value.trim());
    updateUI();

    
});

// change custom input 'radio' to 'number'

function hide() {
    if(customTip.checked) {
        customTip.classList.add('hidden');
        customTip.nextElementSibling.setAttribute('class', 'hidden');
        inputCustomNumber.classList.remove('hidden');
        inputCustomNumber.classList.add('input-tip-custom');
    } else {
        customTip.nextElementSibling.setAttribute('class', '');
    }
};


