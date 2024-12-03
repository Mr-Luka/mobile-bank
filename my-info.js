const homeAddressInput = document.querySelector('#home-address');
const zipCode = document.querySelector('#zip-code');
const state = document.querySelector('#state');
const aptSuite = document.querySelector('#apt');
const dob = document.querySelector('#dob');
const income = document.querySelector('#income');
const homeAddressesContainer = document.querySelector('.home-address-offer');
const saveInfo = document.querySelector('#save-info');

let myInfo = {
    homeAddress: '',
    zipCode: '',
    state: '',
    aptSuite: '',
    dob: '',
    income: '',
}


// Debounce function to limit API calls
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

async function geoLocationApi(query) {
    const accessKey = '615062e81c90c97efc8e246aa157e9e1';
    const url = `https://api.positionstack.com/v1/forward?access_key=${accessKey}&query=${encodeURIComponent(query)}&limit=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.error) {
            console.error("API Error:", data.error);
            return [];
        }

        return data.data || [];
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

function displayAddresses(addresses) {
    homeAddressesContainer.innerHTML = '';

    if (!addresses || addresses.length === 0) {
        homeAddressesContainer.classList.add('hidden');
        return;
    }

    homeAddressesContainer.classList.remove('hidden');

    addresses.forEach((address) => {
        const div = document.createElement('div');
        div.classList.add('address-option');
        div.innerHTML = `
            <h3>${address.label || "Unnamed Location"}</h3>
            <p>${address.locality || ""} ${address.region_code || ""}, ${address.postal_code || ""}, ${address.country || ""}</p>
            <hr>
        `;

        div.addEventListener('click', () => {
            homeAddressInput.value = address.label || address.name;
            zipCode.value = address.postal_code || "";
            state.value = address.region_code || "";

            myInfo.homeAddress = address.label || address.name;
            myInfo.zipCode = address.postal_code || "";
            myInfo.state = address.region_code || "";

            homeAddressesContainer.classList.add('hidden');
        });

        homeAddressesContainer.appendChild(div);
    });
}

const handleInput = debounce(async (e) => {
    const query = e.target.value.trim();
    if (query.length > 2) { // Start fetching suggestions after typing 3 characters
        const addresses = await geoLocationApi(query);
        displayAddresses(addresses);
    } else {
        homeAddressesContainer.classList.add('hidden');
    }
}, 300); // 300ms debounce delay

homeAddressInput.addEventListener('input', handleInput);




function handleSave() {
    const address = homeAddressInput.value.trim();
    const zip = zipCode.value.trim()
    const stateInput = state.value.trim();
    const apt = aptSuite.value.trim();
    const dobInput = dob.value.trim()
    const incomeInput = income.value.trim()
    // converting the income into proper format
    const usDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const annual = usDollar.format(incomeInput);

    myInfo.homeAddress = address;
    myInfo.zipCode = zip;
    myInfo.state = stateInput;
    myInfo.aptSuite = apt;
    myInfo.dob = dobInput;
    myInfo.income = annual;
    localStorage.setItem('myInfo', JSON.stringify(registration))
}

saveInfo.addEventListener('click', handleSave);