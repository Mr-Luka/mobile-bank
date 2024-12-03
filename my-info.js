const homeAddressInput = document.querySelector('#home-address');
const zipCode = document.querySelector('#zip-code');
const state = document.querySelector('#state');
const aptSuite = document.querySelector('#apt');
const dob = document.querySelector('#dob');
const income = document.querySelector('#income');
const homeAddressesContainer = document.querySelector('.home-address-offer');


let myInfo = {
    homeAddress: '',
    zipCode: '',
    state: '',
    aptSuite: '',
    dob: '',
    income: '',
}


async function geoLocationApi(query) {
    const accessKey = '615062e81c90c97efc8e246aa157e9e1';
    const url = `https://api.positionstack.com/v1/forward?access_key=${accessKey}&query=${encodeURIComponent(query)}&limit=5`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data.data; // Array of address objects
    } catch (error) {
        console.error("Error fetching addresses:", error);
        return [];
    }
}
geoLocationApi('909 westbourne drive')

function displayAdresses (addresses) {
    homeAddressesContainer.innerHTML = '';

    if (addresses.length === 0) {
        homeAddressesContainer.classList.add('hidden');
        return;
    }
    homeAddressesContainer.classList.remove('hidden');

    addresses.forEach(address => {
        const div = document.createElement('div');
        div.classList.add('address-option');
        div.innerHTML = `
            <h3>${address.name}</h3>
            <p>${address.locality}${address.region_code}, ${address.postal_code}, ${address.country}</p>
            <hr>
        `;

        div.addEventListener('click', ()=> {
            homeAddressInput.value = address.name;
            zipCode.value = address.postal_code;
            state.value = address.region_code;

            myInfo.homeAddress = address.name;
            myInfo.zipCode = address.postal_code;
            myInfo.state = address.region_code;

            homeAddressesContainer.classList.add('hidden');
        })

        homeAddressesContainer.appendChild(div);
    })
}




