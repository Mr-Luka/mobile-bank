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
        transferFromOptions[accountType].classList.toggle('hidden', accountType !== selectedOption)
    });
    updateDisabledOptions(transferFromInput, transferToInput);
})

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