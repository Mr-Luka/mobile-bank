const registration = JSON.parse(localStorage.getItem('registration'));
const myInfo = JSON.parse(localStorage.getItem('myInfo'));
const incomes = JSON.parse(localStorage.getItem('incomes'));
const logInButton = document.querySelector('#logIn-button');
const emailInput = document.querySelector('[type="email"]');

function handleLogIn(){
    const email = document.querySelector('[type="email"]').value.trim();
    const password = document.querySelector('[type="password"]').value.trim();
    
    if (!email) {
        alert('Please enter your email');
        return;
    }

    if (!registration || email !== registration.email) {
        alert('There is no user with that email');
        return;
    }

    if (!password) {
        alert('Please enter your password');
        return;
    }

    if (password !== registration.password) {
        alert('Wrong password');
        return;
    }

        // Fetch user-specific data
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9]/g, '');
    const myInfo = JSON.parse(localStorage.getItem(`myInfo_${sanitizedEmail}`));
    const incomes = JSON.parse(localStorage.getItem(`incomes_${sanitizedEmail}`));


    if (myInfo && incomes) {
        location.replace("./home.html");
    } else {
        location.replace("./myProfile.html");
    }
}



logInButton.addEventListener('click', handleLogIn);

