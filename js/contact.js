const form = document.querySelector("form");
const fullname = document.querySelector(".fullname");
const email = document.querySelector(".email");
const subject = document.querySelector(".subject");
const message = document.querySelector(".message");
const success = document.querySelector(".success");
const btn = document.querySelector(".submit");
const header = document.querySelector("h1");
const newMessage = document.querySelector(".again");

const fullnameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const subjectError = document.querySelector("#subject-error");
const messageError = document.querySelector("#message-error");
const btnError = document.querySelector(".button-error");

const nameValue = document.querySelector(".name-value");
const messageValue = document.querySelector(".message-value");
const subjectValue = document.querySelector(".subject-value");
const emailValue = document.querySelector(".email-value");

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
};

function validateEmail(email) {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const patternMatches = regEx.test(email);
    return patternMatches
};

function defineError() {
    if (checkLength(fullname.value, 4)) {
        nameValue.innerText = "";
        fullnameError.firstChild.classList = "fas fa-check-circle";
    } else {
        fullnameError.firstChild.classList = "fas fa-exclamation-triangle";
        let valueName = 5 - fullname.value.length
        console.log(fullname.value.length)
        nameValue.innerText = `You need ${valueName} characters more`
    }

    if (validateEmail(email.value)) {
        emailError.firstChild.classList = "fas fa-check-circle";
        emailValue.innerText = "";
    } else {
        emailError.firstChild.classList = "fas fa-exclamation-triangle";
        emailValue.innerText = "Please enter a valid email";
    }

    if (checkLength(subject.value, 14)) {
        subjectError.firstChild.classList = "fas fa-check-circle";
        subjectValue.innerText = "";
    } else {
        subjectError.firstChild.classList = "fas fa-exclamation-triangle";
        let valueSubject = 15 - subject.value.length
        subjectValue.innerText = `You need ${valueSubject} characters more`
    }

    if (checkLength(message.value, 24)) {
        messageError.firstChild.classList = "fas fa-check-circle";
        messageValue.innerText = "";
    } else {
        messageError.firstChild.classList = "fas fa-exclamation-triangle";
        let valueMessage = 25 - message.value.length
        messageValue.innerText = `You need ${valueMessage} characters more`
    }
};

function submitForm(event) {
    event.preventDefault();

    if (checkLength(fullname.value, 4) && validateEmail(email.value) && checkLength(subject.value, 14) && checkLength(message.value, 24)) {
        success.style.display = "flex";
        btn.disabled = false;
        btnError.style.display = "none";
        form.reset();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        form.style.display = "none";
        header.style.display = "none";
        fullnameError.firstChild.classList = "";
        emailError.firstChild.classList = "";
        subjectError.firstChild.classList = "";
        messageError.firstChild.classList = "";
    } else {
        btn.disabled = true;
        btnError.style.display = "block";
    }
};

btn.addEventListener("click", defineError);
btn.addEventListener("click", submitForm);

newMessage.addEventListener("click", function(event) {
    event.preventDefault();
    success.style.display = "none";
    form.style.display = "flex";
    header.style.display = "block";
})