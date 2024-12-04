const checking = document.querySelector("#checking");
const checkingButton = document.querySelector('.random-checking');
const savings = document.querySelector('#savings');
const savingsButton = document.querySelector('.random-savings')
const creditMoney = document.querySelector('#credit-money');
const creditButton = document.querySelector('.random-credit');
const finishButton = document.querySelector('.button-finish');

let checkingClicked = false;
let savingsClicked = false;
let creditClicked = false;

let incomes ={
    checking: '',
    savings: '',
    creditCard: '',
}

function generateSlotMachineNumber(account, min, max) {
  const usDollar = new Intl.NumberFormat('en-US', { // makes numbers into us currency
    style: 'currency',
    currency: 'USD',
  });
  let currentNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  const interval = setInterval(() => {
    account.textContent = `${usDollar.format(Math.floor(Math.random() * (max - min + 1)) + min)}`;
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    account.textContent = `${(usDollar.format(currentNumber))}`;
  }, 1000); // Stop the animation after 1 second
}

checkingButton.addEventListener('click', ()=> {
    generateSlotMachineNumber(checking, 1000, 100000);
    checkingClicked = true;
})

savingsButton.addEventListener('click', ()=>{
    generateSlotMachineNumber(savings, 1000, 100000);
    savingsClicked = true;
})

creditButton.addEventListener('click', ()=> {
    generateSlotMachineNumber(creditMoney, 1000, 50000)
    creditClicked = true;
})

// Helper function to convert formatted currency string to a number.
function parseCurrency(amount) {
    return parseFloat(amount.replace(/[^0-9.-]+/g, ''));
}

function handleClick() {
    if (checkingButton && savingsButton && creditButton){
        // Parse the text content to numbers, removing currency symbols and commas.
        const checkingAmount = parseCurrency(checking.textContent);
        const savingsAmount = parseCurrency(savings.textContent);
        const creditAmount = parseCurrency(credit.textContent);

        // Update the incomes object.
        incomes.checking = checkingAmount;
        incomes.savings = savingsAmount;
        incomes.creditCard = creditAmount;
        localStorage.setItem('incomes', JSON.stringify(incomes));
        location.replace("./home.html");
    } else {
        alert('Please click random to generate money!')
    }
}

finishButton.addEventListener('click', handleClick);