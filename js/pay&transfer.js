import {generateSlotMachineNumber, usDollar, parseCurrency} from './spin-for-money.js';
const incomes = JSON.parse(localStorage.getItem('incomes'));
const optionBlocks = document.querySelectorAll('.option-block');
const optionBlocksWindow = document.querySelector('.option-blocks');
const transferChoice = document.querySelector('.transfer-choice')
const exitOptionWindow = document.querySelectorAll('.exit-ZeX');
const sendRecieveWindow = document.querySelector('.send-recieve-div');
const cryptoWindow = document.querySelector('.convert-crypto');

const transferBlock = optionBlocks[0];
const zeXBlock = optionBlocks[1];
const cryptoBlock = optionBlocks[2];

// Click events for clicking the option blocks like:
// transfer, send-recieve, crypto ...
function exitWindow (){
    optionBlocksWindow.classList.remove('hidden');
    transferChoice.classList.add('hidden');
    sendRecieveWindow.classList.add('hidden');
    cryptoWindow.classList.add('hidden');
    hideAccounts()
    
}
function openTransfer(){
    transferChoice.classList.remove('hidden');
    optionBlocksWindow.classList.add('hidden')
}
function openZeX (){
    optionBlocksWindow.classList.add('hidden');
    sendRecieveWindow.classList.remove('hidden');
}
function openCrypto (){
    cryptoWindow.classList.remove('hidden');
    optionBlocksWindow.classList.add('hidden');
}

exitOptionWindow.forEach(exit => {
    exit.addEventListener('click', exitWindow);
});

transferBlock.addEventListener('click', openTransfer);
zeXBlock.addEventListener('click', openZeX);
cryptoBlock.addEventListener('click', openCrypto);
// END of the click event segment




            // T R A N S F E R   W I N D O W
function accountAmount (accountType) {
        if (accountType === 'Checking Account') {
            return usDollar.format(incomes.checking).slice(1);
        } else if (accountType === 'Savings Account') {
            return usDollar.format(incomes.savings).slice(1);
        } else if (accountType === 'Credit Card'){
            return usDollar.format(incomes.creditCard).slice(1);
        }
}

const transferFromInput = document.querySelector('#mySelect-from');
const transferFromOptions = {
    'Checking Account': document.querySelector('.option-checking.choice-transfer'),
    'Savings Account': document.querySelector('.option-savings.choice-transfer'),
    'Credit Card': document.querySelector('.option-credit.choice-transfer'),
}

// transfer from
transferFromInput.addEventListener('change', (e)=>{
    const selectedOption = e.target.value;
    Object.keys(transferFromOptions).forEach(accountType => {
        transferFromOptions[accountType].classList.toggle('hidden', accountType !== selectedOption);
        if (accountType === 'Checking Account' || accountType === 'Savings Account'){
            transferFromOptions[accountType].innerHTML = `
            <div class="title-account">
                <h2>${accountType}</h2>
                <p>Available balance: $${accountAmount(accountType)}</p>
            </div>
            <div class="input-amount">
                <label>Amount: $</label>
                <input type="number" class="input-number">
                <input class="input-submit" type="submit">
            </div>`;
        submitTransfer(accountType);
        } else if (accountType === "Credit Card"){
            transferFromOptions[accountType].innerHTML = `
            <div class="title-account">
                <h2>${accountType}</h2>
                <p>Debt balance: -$${accountAmount(accountType)}</p>
            </div>
            <div class="input-amount">
                <label>Amount: $</label>
                <input type="number" class="input-number">
                <input class="input-submit" type="submit">
            </div>`;
        submitTransfer(accountType);
        }
           
    });
    updateDisabledOptions(transferFromInput, transferToInput);
})
// function that will capture the input number of the choosen account and after submit deduct it from the available balance
function submitTransfer (accountType){
const inputNumber = transferFromOptions[accountType].querySelector('.input-number');
const balance = transferFromOptions[accountType].querySelector('p')
const submit = transferFromOptions[accountType].querySelector('.input-submit');

submit.addEventListener('click', ()=>{
            let amount = inputNumber.value;
            // checking to see if the amount I entered is bigger then my available
            if (amount > parseCurrency(accountAmount(accountType))){
                alert('Insufficient funds');
            }
            
            if (accountType === 'Checking Account' || accountType === 'Savings Account') {
                const currentBalance = Number(parseCurrency(accountAmount(accountType)))- Number(amount);
                const dollarAmount = usDollar.format(currentBalance);
                if (accountType === 'Checking Account'){
                    incomes.checking = currentBalance;
                } else if (accountType === 'Savings Account'){
                    incomes.savings = currentBalance;
                }
                balance.innerText =`Available balance: ${dollarAmount}`;
accountAmount
            } else if (accountType === 'Credit Card'){
                const currentDebt = Number(parseCurrency(accountAmount(accountType)))+ Number(amount);
                const dollarAmountCredit = usDollar.format(currentDebt);
                balance.innerText =`Debt balance: -${dollarAmountCredit}`;
                incomes.creditCard = currentDebt
            }
            // Save updated balances to localStorage
            localStorage.setItem('incomes', JSON.stringify(incomes));
            const newStorage = JSON.parse(localStorage.getItem('incomes'));
            console.log(newStorage)
            inputNumber.value = '';
        } )
}







// transfer to
const transferToInput = document.querySelector('#mySelect-to');
const transferToOptions = {
    'Checking Account': document.querySelector('.transfer-to-checking.choice-transfer'),
    'Savings Account': document.querySelector('.transfer-to-savings.choice-transfer'),
    'Credit Card': document.querySelector('.transfer-to-credit.choice-transfer'),
}
transferToInput.addEventListener('change', (e)=>{
    const selectedOption = e.target.value;
    Object.keys(transferToOptions).forEach(accountType => {
        transferToOptions[accountType].classList.toggle('hidden', accountType !== selectedOption);  
        transferToOptions[accountType].innerHTML = `
            <div class="title-account">
                <h2>${accountType}</h2>
                <p>Available balance: $${accountAmount(accountType)}</p>
            </div>`;    
    });
    updateDisabledOptions(transferToInput, transferFromInput);
})
// to hide opened accounts ( for exit window function )
function hideAccounts(){
    // hide all elements in transferFromOptions
    Object.values(transferFromOptions).forEach(account => account.classList.add('hidden'));
    Object.values(transferToOptions).forEach(account => account.classList.add('hidden'));

    // Reset the dropdown selections to the default option
    transferFromInput.value = 'Choose Account';
    transferToInput.value = 'Choose Account';
}


// Function to disable matching options in the opposite dropdown
function updateDisabledOptions (changeInput, targetInput){
    const selectedOption = changeInput.value;

    // Reset all options to enabled first
    [...targetInput.options].forEach(option => option.disabled = false);

    // Disable the matching option if not default
    if (selectedOption !== 'Choose Account'){
        const matchingOption = [...targetInput.options].find(option => option.value === selectedOption);
        if (matchingOption){
            matchingOption.disabled = true;
        }
    }
}