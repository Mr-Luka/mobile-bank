

// Register / SIGNUP
const registerInputs = document.querySelector('.register-form-inputs')
const firstNameRegister = document.querySelector('#first-name-register');
const lastNameRegister = document.querySelector('#last-name-register');
const emailRegister = document.querySelector('#email-register');
const passwordRegister = document.querySelector('#password-register');
const confirmPasswordRegister = document.querySelector('#password-register-confirm');
const submitRegisterButton = document.querySelector('#submit-register');

//created an object that will save the information when we sign-up, so the user can use the info in their account
let registration = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

// Validate if the entered input is equal to the given input character rules
function validRegisterInput (name, lastName, email, password, passwordMatch){
  const validNameInput = /^[a-zA-Z\s'-]+$/;
  const validLastNameInput = /^[a-zA-Z\s'-]+$/;
  const validEmailInput =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validPasswordInput = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if(!validNameInput.test(name) || !validLastNameInput.test(lastName)){
    alert('Please enter correct letters for your full name')
  } else if (!validEmailInput.test(email)){
    alert('Please enter a valid email')
  } else if (!validPasswordInput.test(password)){
    alert("Please enter a valid password, at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)")
  } else if (password !== passwordMatch){
    alert('Passwords do not match')
  } else {
    registration.firstName = name;
    registration.lastName = lastName;
    registration.email = email;
    registration.password = password;
  
    localStorage.setItem('registration', JSON.stringify(registration))
  
    location.replace("../login.html")
  }

}

function validateRegisterInputs () {

  const firstName = firstNameRegister.value.trim();
  const lastName = lastNameRegister.value.trim();
  const email = (emailRegister.value.trim()).toLowerCase();
  const password = passwordRegister.value.trim();
  const confirmPassword = confirmPasswordRegister.value.trim();

// Confirm if any of the fields are empty and prompt the message according to the empty field
  if (registerInputs.value.trim() === ''){
    alert('please fill out the register form')
  } else if (!firstName) {
    alert('Please enter your first name')
  } else if(!lastName){
    alert('Please enter your last name')
  } else if(!email) {
    alert('Please enter your email')
  } else if (!password){
    alert('Please enter your password')
  } else if (!confirmPassword) {
      alert('Please confirm your password')
  }
// calling a function that checks if the inputs entered are correct based on the set regex rules i set.
  validRegisterInput(firstName, lastName, email, password, confirmPassword);
}
submitRegisterButton.addEventListener('click', validateRegisterInputs)