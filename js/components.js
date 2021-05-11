const nav = document.querySelector("nav");
const logo = document.querySelector(".logo");
const navUl = document.querySelector("nav > ul");
const searchWrap = document.querySelector(".search-wrap");

function handleScroll() {
    const scrolled = window.scrollY;

    if (scrolled > 1) {
        nav.classList.add("scrolled");
        logo.classList.add("logo-onscroll");
        navUl.classList.add("ul-onscroll");
        searchWrap.classList.add("search-on-scroll");

        let child = navUl.children[2];

        if (child.classList.contains("current")) {
            nav.classList.add("detail-scrolled");
        }

    } else {
        nav.classList.remove("detail-scrolled");
        nav.classList.remove("scrolled");
        logo.classList.remove("logo-onscroll");
        navUl.classList.remove("ul-onscroll");
        searchWrap.classList.remove("search-on-scroll");
    }
}

window.addEventListener("scroll", handleScroll);

function setWidthDesktop() {
    if (document.body.clientWidth > 699) { 
        logo.src = "/images/icons/logofeet_full.svg";

        let child = navUl.children[2];
        if (child.classList.contains("current")) {
            logo.src = "/images/icons/logofeet_full_white.svg";
        }

        logo.classList.add("desktop-logo");
    } 
}

function setWidthMobile() {
    if (document.body.clientWidth < 700) {
        logo.src = "/images/icons/logofeet.svg";

        let child = navUl.children[2];

        if (child.classList.contains("current")) {
            logo.src = "/images/icons/logofeet_white.svg";
        }

        logo.classList.remove("desktop-logo");
    }
}


/**
 * Show correct logo when entering the site
 */

 window.addEventListener("load", setWidthDesktop);
 window.addEventListener("load", setWidthMobile);
 

/**
 * Show correct logo when scaling the site
 */

window.addEventListener("resize", setWidthDesktop);
window.addEventListener("resize", setWidthMobile);

/**
 * OPEN SEARCHBAR
 */

 const searching = document.querySelector(".searching");
 const liSearchItem = document.querySelector(".list-search");
 const searchIcon = document.querySelector(".search-icon");
 
 
 function openSearchBar() {
     searching.classList.toggle("show-toggle");
     searchIcon.classList.toggle("fa-times");
     navUl.children[1].classList.toggle("hide-li");
     navUl.children[2].classList.toggle("hide-li");
     navUl.children[3].classList.toggle("hide-li");
 };
 
 liSearchItem.addEventListener("click", openSearchBar);
 
 window.onclick = function(event) {
 
     if (event.target == searching) {
         searching.classList.toggle("show-toggle");
         searchIcon.classList.toggle("fa-times");
         navUl.children[1].classList.toggle("hide-li");
         navUl.children[2].classList.toggle("hide-li");
         navUl.children[3].classList.toggle("hide-li");
     }
 };