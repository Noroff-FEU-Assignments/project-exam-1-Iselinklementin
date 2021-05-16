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

const desktopWrap = document.querySelector(".desktop-wrap");
const picture = document.querySelector(".message-picture");
const h2 = document.querySelector(".success-header");
const ingress = document.querySelector(".success-ing");
const homeBtn = document.querySelector(".home");
const confirmed = document.querySelector(".confirmed");

const desktop = document.querySelector(".desktop");

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

    if (checkLength(fullname.value, 4) && validateEmail(email.value) && checkLength(subject.value, 14) && checkLength(message.value, 24)) {
        btn.disabled = false;
        btnError.style.display = "none";
    }
    else {
        btn.disabled = true;
        btnError.style.display = "block";
    }
};

const formElement = document.querySelector(".contact-form");

const formSubmission = (event) => {
    event.preventDefault();

    const formElement = event.target,
        { action, method } = formElement,
        body = new FormData(formElement);

    fetch(action, {
        method,
        body
    })
    .then((response) => response.json())
    .then((response) => {
        formElement.reset();
        success.style.display = "flex";
        btnError.style.display = "none";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        formElement.style.display = "none";
        header.style.display = "none";
        fullnameError.firstChild.classList = "";
        emailError.firstChild.classList = "";
        subjectError.firstChild.classList = "";
        messageError.firstChild.classList = "";

        if(window.screen.width > 699) {
            desktop.style.display = "none";
            confirmed.classList.add("confirmed-success");
            h2.classList.add("success-h2");
            desktopWrap.classList.add("desktop-wrap-success");
            picture.classList.add("message-picture-success");
            success.classList.add("success-success");
            ingress.classList.add("success-ingress");
            homeBtn.classList.add("home-success");
        }
    })
    .catch((error) => {
        console.log(error)
    })
};

formElement.addEventListener("change", defineError);
formElement.addEventListener("submit", formSubmission);

// btn.addEventListener("click", defineError);

// btn.addEventListener("click", submitForm);

newMessage.addEventListener("click", function() {
    reload()   
})


  


/* THIS IS WORKING */

// const form = document.querySelector(".contact-form");
// const fullname = document.querySelector(".fullname");
// const email = document.querySelector(".email");
// const subject = document.querySelector(".subject");
// const message = document.querySelector(".message");
// const success = document.querySelector(".success");
// const btn = document.querySelector(".submit");
// const header = document.querySelector("h1");
// const newMessage = document.querySelector(".again");

// const fullnameError = document.querySelector("#name-error");
// const emailError = document.querySelector("#email-error");
// const subjectError = document.querySelector("#subject-error");
// const messageError = document.querySelector("#message-error");
// const btnError = document.querySelector(".button-error");

// const nameValue = document.querySelector(".name-value");
// const messageValue = document.querySelector(".message-value");
// const subjectValue = document.querySelector(".subject-value");
// const emailValue = document.querySelector(".email-value");

// const desktop = document.querySelector(".desktop");

// function checkLength(value, len) {
//     if (value.trim().length > len) {
//         return true;
//     } else {
//         return false;
//     }
// };

// function validateEmail(email) {
//     const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     const patternMatches = regEx.test(email);
//     return patternMatches
// };

// function defineError() {
//     if (checkLength(fullname.value, 4)) {
//         nameValue.innerText = "";
//         fullnameError.firstChild.classList = "fas fa-check-circle";
//     } else {
//         fullnameError.firstChild.classList = "fas fa-exclamation-triangle";
//         let valueName = 5 - fullname.value.length
//         nameValue.innerText = `You need ${valueName} characters more`
//     }

//     if (validateEmail(email.value)) {
//         emailError.firstChild.classList = "fas fa-check-circle";
//         emailValue.innerText = "";
//     } else {
//         emailError.firstChild.classList = "fas fa-exclamation-triangle";
//         emailValue.innerText = "Please enter a valid email";
//     }

//     if (checkLength(subject.value, 14)) {
//         subjectError.firstChild.classList = "fas fa-check-circle";
//         subjectValue.innerText = "";
//     } else {
//         subjectError.firstChild.classList = "fas fa-exclamation-triangle";
//         let valueSubject = 15 - subject.value.length
//         subjectValue.innerText = `You need ${valueSubject} characters more`
//     }

//     if (checkLength(message.value, 24)) {
//         messageError.firstChild.classList = "fas fa-check-circle";
//         messageValue.innerText = "";
//     } else {
//         messageError.firstChild.classList = "fas fa-exclamation-triangle";
//         let valueMessage = 25 - message.value.length
//         messageValue.innerText = `You need ${valueMessage} characters more`
//     }
// };

// const desktopWrap = document.querySelector(".desktop-wrap");
// const picture = document.querySelector(".message-picture");
// const h2 = document.querySelector(".success-header");
// const ingress = document.querySelector(".success-ing");
// const homeBtn = document.querySelector(".home");
// const confirmed = document.querySelector(".confirmed");

// function submitForm(event) {
//     event.preventDefault();

//     if (checkLength(fullname.value, 4) && validateEmail(email.value) && checkLength(subject.value, 14) && checkLength(message.value, 24)) {
//         form.reset();
//         success.style.display = "flex";
//         btn.disabled = false;
//         btnError.style.display = "none";
//         document.body.scrollTop = 0;
//         document.documentElement.scrollTop = 0;
//         form.style.display = "none";
//         header.style.display = "none";
//         fullnameError.firstChild.classList = "";
//         emailError.firstChild.classList = "";
//         subjectError.firstChild.classList = "";
//         messageError.firstChild.classList = "";
        
//         if(window.screen.width > 699) {
//             desktop.style.display = "none";
//             confirmed.classList.add("confirmed-success");
//             h2.classList.add("success-h2");
//             desktopWrap.classList.add("desktop-wrap-success");
//             picture.classList.add("message-picture-success");
//             success.classList.add("success-success");
//             ingress.classList.add("success-ingress");
//             homeBtn.classList.add("home-success");
//             // form.reset();
//         }

//     } else {
//         btn.disabled = true;
//         btnError.style.display = "block";
//     }
// };

// btn.addEventListener("click", defineError);
// btn.addEventListener("click", submitForm);

// newMessage.addEventListener("click", function() {
//     reload()   
// })

























/* TESTING */

/*

const fullname = document.querySelector(".fullname");
const email = document.querySelector(".email");
const subject = document.querySelector(".subject");
const messages = document.querySelector(".message");
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

const desktop = document.querySelector(".desktop");
const form = document.querySelector("form");

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

    if (checkLength(messages.value, 24)) {
        messageError.firstChild.classList = "fas fa-check-circle";
        messageValue.innerText = "";
    } else {
        messageError.firstChild.classList = "fas fa-exclamation-triangle";
        let valueMessage = 25 - messages.value.length
        messageValue.innerText = `You need ${valueMessage} characters more`
    }
};

const desktopWrap = document.querySelector(".desktop-wrap");
const picture = document.querySelector(".message-picture");
const h2 = document.querySelector(".success-header");
const ingress = document.querySelector(".success-ing");
const homeBtn = document.querySelector(".home");
const confirmed = document.querySelector(".confirmed");

function submitForm(event) {
    event.preventDefault();

    const emailBody = {
        "your-name": this.form.fullname,
        "your-email": this.form.email,
        "your-subject": this.form.subject,
        "your-message": this.form.messages,
    };

    console.log(emailBody)
    // const form = event.target, 
    // { action, method } = form,
    // body = new FormData(form);

    // fetch(action, {
    //     method,
    //     body
    // })

    // .then((response) => response.json())
    // .then ((response) => {
    //     if (isFormSubmissionError(response)) {
    //         btn.disabled = true;
    //         btnError.style.display = "block";
    //     }

    if (checkLength(fullname.value, 4) && validateEmail(email.value) && checkLength(subject.value, 14) && checkLength(messages.value, 24)) {
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
        
        if(window.screen.width > 699) {
            desktop.style.display = "none";
            confirmed.classList.add("confirmed-success");
            h2.classList.add("success-h2");
            desktopWrap.classList.add("desktop-wrap-success");
            picture.classList.add("message-picture-success");
            success.classList.add("success-success");
            ingress.classList.add("success-ingress");
            homeBtn.classList.add("home-success");
        }

    } 
// })

// .catch((error) => {
//     console.log(error)
// })
    else {
        btn.disabled = true;
        btnError.style.display = "block";
    }
};


btn.addEventListener("click", defineError);
btn.addEventListener("click", submitForm);

newMessage.addEventListener("click", function() {
    reload()   
})

/* TRYING TO GET FORM */

// const normalizeContactFormResponse = (response) => {
//     const isSuccess = response.status === "mail_sent";
//     const message = response.message;
//     const validationError = isSuccess ? {}
//     : Object.fromEntries(
//         response.invalid_fields.map((error) => {
//             const key = /cf7[-a-z]*.(.*)/.exec(error.into)[1];
//             return [key, error.message]
//         })
//     );

//     return {
//         isSuccess,
//         message,
//         validationError,
//     };
// };