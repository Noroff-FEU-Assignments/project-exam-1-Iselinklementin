const formElement = document.querySelector(".contact-form");
const btn = document.querySelector(".submit");

/**
 * Inputs
 */

const fullname = document.querySelector(".fullname");
const email = document.querySelector(".email");
const subject = document.querySelector(".subject");
const message = document.querySelector(".message");
const formInputs = document.querySelectorAll(".form-input");

/**
 * Errors
 */

const fullnameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const subjectError = document.querySelector("#subject-error");
const messageError = document.querySelector("#message-error");

/**
 * Give values when missing characters
 */

const nameValue = document.querySelector(".name-value");
const messageValue = document.querySelector(".message-value");
const subjectValue = document.querySelector(".subject-value");
const emailValue = document.querySelector(".email-value");

/**
 * When contact form is submitted
 * Give feedback
 */

const wrapper = document.querySelector(".wrapper");
const success = document.querySelector(".success");
const picture = document.querySelector(".message-picture");
const confirmed = document.querySelector(".confirmed");
const desktop = document.querySelector(".desktop");
const h2 = document.querySelector(".success-header");
const ingress = document.querySelector(".success-ing");
const homeBtn = document.querySelector(".home");
const header = document.querySelector("h1");
const newMessage = document.querySelector(".again");

/**
 * Checking length of input value
 * Validate email
 */

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
    return patternMatches;
};

/**
* Stop it from autofilling inputs
*/

const readOnly = document.querySelectorAll("[readonly]");
readOnly.forEach(input => {
    input.addEventListener("focus", function () {
        this.removeAttribute("readonly");
    });
});

/**
* When submit-button is pressed
* Give feedback
* Send contact-info to Wordpress
*/

formElement.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch("https://grafs.no/wp-json/contact-form-7/v1/contact-forms/92/feedback", {
        method: "post",
        body: new FormData(formElement)
    });

    let result = await response.json();
    console.log(result)

    formElement.reset();
    success.style.display = "flex";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    formElement.style.display = "none";
    header.style.display = "none";
    fullnameError.firstChild.classList = "";
    emailError.firstChild.classList = "";
    subjectError.firstChild.classList = "";
    messageError.firstChild.classList = "";

    if (window.screen.width > 599) {
        desktop.style.display = "none";
        confirmed.classList.add("confirmed-success");
        h2.classList.add("success-h2");
        wrapper.classList.add("wrap-success");
        picture.classList.add("message-picture-success");
        success.classList.add("success-final");
        ingress.classList.add("success-ingress");
        homeBtn.classList.add("home-success");
    }
};

/**
 * Validating inputs
 */

for (let i = 0; i < formInputs.length; i++) {

    formInputs[i].addEventListener("focusin", (event) => {

        if (document.activeElement.classList.contains("fullname")) {
            event.target.addEventListener("blur", function () {
                if (checkLength(fullname.value, 4)) {
                    nameValue.innerText = "";
                    fullnameError.firstChild.classList = "fas fa-check-circle";
                } else {
                    fullnameError.firstChild.classList = "fas fa-exclamation-triangle";
                    let valueName = 5 - fullname.value.length
                    nameValue.innerText = `You need ${valueName} characters more`
                }
            })
        };

        if (document.activeElement.classList.contains("email")) {
            event.target.addEventListener("blur", function () {

                if (validateEmail(email.value)) {
                    emailError.firstChild.classList = "fas fa-check-circle";
                    emailValue.innerText = "";
                } else {
                    emailError.firstChild.classList = "fas fa-exclamation-triangle";
                    emailValue.innerText = "Please enter a valid email";
                }
            })
        };

        if (document.activeElement.classList.contains("subject")) {
            event.target.addEventListener("blur", function () {
                if (checkLength(subject.value, 14)) {
                    subjectError.firstChild.classList = "fas fa-check-circle";
                    subjectValue.innerText = "";
                } else {
                    subjectError.firstChild.classList = "fas fa-exclamation-triangle";
                    let valueSubject = 15 - subject.value.length
                    subjectValue.innerText = `You need ${valueSubject} characters more`
                }
            })
        };

        if (document.activeElement.classList.contains("message")) {
            event.target.addEventListener("blur", function () {
                if (checkLength(message.value, 24)) {
                    messageError.firstChild.classList = "fas fa-check-circle";
                    messageValue.innerText = "";
                } else {
                    messageError.firstChild.classList = "fas fa-exclamation-triangle";
                    let valueMessage = 25 - message.value.length
                    messageValue.innerText = `You need ${valueMessage} characters more`
                }
            })
        };

        formElement.addEventListener("keyup", function () {
            if (checkLength(fullname.value, 4) && validateEmail(email.value) && checkLength(subject.value, 14) && checkLength(message.value, 24)) {
                btn.disabled = false;
            }
        })
    });
};

newMessage.addEventListener("click", function () {
    reload()
});