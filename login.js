const registration = JSON.parse(localStorage.getItem('registration'));
const logInButton = document.querySelector('#logIn-button');
const emailInput = document.querySelector('[type="email"]');

function handleLogIn(){
    const email = document.querySelector('[type="email"]').value;
    const password = document.querySelector('[type="password"]').value;
    
    if (!email){
        alert('please enter your email')
    } else if (email !== registration.email){
        alert('There is no user with that email')
    } else if (!password){
        alert('please enter your password')
    } else if (password !== registration.password){
        alert('wrong password')
    } else {
        location.replace("./myProfile.html")
    }
}

logInButton.addEventListener('click', handleLogIn);

console.log(registration)
