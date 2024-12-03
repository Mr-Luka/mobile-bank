const homeAddress = document.querySelector('#home-address');
const zipCode = document.querySelector('#zip-code');
const state = document.querySelector('#state');
const aptSuite = document.querySelector('#apt');
const dob = document.querySelector('#dob');
const income = document.querySelector('#income');
const homeAdresses = document.querySelector('.home-address-offer');



async function geoLocationApi (address) {
    const accessKey = '615062e81c90c97efc8e246aa157e9e1'
    const url = `https://api.positionstack.com/v1/forward?access_key=${accessKey}&query=${address}`;
    const response = await fetch(url)
    const data = await response.json();
    console.log(data);
}
geoLocationApi('909 Westbourne Drive');