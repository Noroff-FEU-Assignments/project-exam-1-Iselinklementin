const nav = document.querySelector("nav");
const logo = document.querySelector(".logo");
const navUl = document.querySelector("nav > ul");

function handleScroll() {
    const scrolled = window.scrollY;

    if (scrolled > 76) {
        nav.classList.add("scrolled");
        logo.classList.add("logo-onscroll");
        navUl.classList.add("ul-onscroll");

        let child = navUl.children[2];

        if (child.firstChild.classList.contains("details")) {
            nav.classList.add("detail-scrolled");
        }

    } else {
        nav.classList.remove("scrolled");
        logo.classList.remove("logo-onscroll")
        navUl.classList.remove("ul-onscroll");
    }
}

window.addEventListener("scroll", handleScroll);

function setWidthDesktop() {
    if (window.innerWidth > 699) { 
        logo.src = "/images/icons/logofeet_full.svg";
        logo.classList.add("desktop-logo");
    } 
}

function setWidthMobile() {
    if (window.innerWidth < 700) {
        logo.src = "/images/icons/logofeet.svg";
        logo.classList.remove("desktop-logo");
    }
}

window.addEventListener("resize", setWidthDesktop)
window.addEventListener("resize", setWidthMobile)