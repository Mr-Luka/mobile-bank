const checkingButton = document.querySelector('.random-checking');
const checking = document.querySelector("#checking");


let incomes ={
    checking: '',
    savings: '',
    creditCard: '',
}

function generateSlotMachineNumber(account, min, max) {
  const usDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
//   const annual = usDollar.format(incomeInput);
  let currentNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  const interval = setInterval(() => {
    account.textContent = `${usDollar.format(Math.floor(Math.random() * (max - min + 1)) + min)}`;
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    account.textContent = `${(usDollar.format(currentNumber))}`;
  }, 1000); // Stop the animation after 1 second
}
function checkingGenerate () {
    const checkingRoll = generateSlotMachineNumber(checking, 1000, 100000);
}
// generateSlotMachineNumber(1000, 100000);


checkingButton.addEventListener('click', checkingGenerate)