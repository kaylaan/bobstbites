let signuptext = document.querySelector('#signuptext')
let logintext = document.querySelector('#logintext')
let signup = document.querySelector('#signup')
let login = document.querySelector('#login')
let form = document.forms[0]

signuptext.addEventListener('click', signupDisplay)
logintext.addEventListener('click', loginDisplay)

function signupDisplay() {
    signup.classList.remove('hide')
    login.classList.add('hide')
    signuptext.style.color = 'black'
    logintext.style.color = 'rgba(0, 0, 0, 0.5)'
}

function loginDisplay() {
    login.classList.remove('hide')
    signup.classList.add('hide')
    logintext.style.color = 'black'
    signuptext.style.color = 'rgba(0, 0, 0, 0.5)'
}

form.addEventListener('submit', function(event) {
    for (let i=0; i<form.elements.length-2; i++) {
        let element = form.elements[i];

        if (element.value == '' || element.value == null) {
            alert("Please enter a value for " + element.name);
            element.focus();
            element.select();
            element.style.backgroundColor = "#ffc6c2";
            return;
        }
    }
})