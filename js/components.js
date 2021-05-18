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
    if (document.body.clientWidth > 681) { 
        logo.src = "/images/icons/logofeet_full.svg";

        let child = navUl.children[2];
        if (child.classList.contains("current")) {
            logo.src = "/images/icons/logofeet_full_white.svg";
        }

        logo.classList.add("desktop-logo");
    } 
}

function setWidthMobile() {
    if (document.body.clientWidth < 680) {
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
 const searchInput = document.querySelector("#search");
//  const searchContainer = document.querySelector(".search-container");
 
 function openSearchBar() {
     searching.classList.toggle("show-toggle");
     searchIcon.classList.toggle("fa-times");
     navUl.children[1].classList.toggle("hide-li");
     navUl.children[2].classList.toggle("hide-li");
     navUl.children[3].classList.toggle("hide-li");
     searchInput.value = "";
     searchDropdown.classList.remove("active-search");
 };
 
 liSearchItem.addEventListener("click", openSearchBar);
 
 window.onclick = function(event) {
 
     if (event.target == searching) {
         searching.classList.toggle("show-toggle");
         searchIcon.classList.toggle("fa-times");
         navUl.children[1].classList.toggle("hide-li");
         navUl.children[2].classList.toggle("hide-li");
         navUl.children[3].classList.toggle("hide-li");
         searchInput.value = "";
         searchDropdown.classList.remove("active-search");
     }
 };

const searchDropdown = document.querySelector(".search-dropdown");
let travels = []

const loadTravels = async () => {
    try {
        const res = await fetch("https://grafs.no/wp-json/wp/v2/posts?per_page=20");
        travels = await res.json();
    } catch (error) {
        console.log(error)
    }
}

loadTravels();

function showSuggestions(list) {
    let listData;

    if (!list.length) {
        userValue = searchInput.value;
        listData = `<li class="search-li"> ${userValue} </li>`
    } else {
        listData = list.join("");
    }
    
    searchDropdown.innerHTML = listData;
}

searchInput.addEventListener("keyup", (event) => {
    const searchString = event.target.value.toLowerCase();
    let filteredTravels = [];
    let id = [];

    if (searchString) {
        filteredTravels = travels.filter(travel => {
            return travel.acf.place.toLowerCase().startsWith(searchString);
        });

        filteredTravels = filteredTravels.map((destination) => {
            return `<li class="search-li">${destination.acf.place}</li>`;
        });

        searchDropdown.classList.add("active-search");

        showSuggestions(filteredTravels);

        let allList = document.querySelectorAll(".search-li");
        const searchBtn = document.querySelector(".search-btn");
        // const searchForm = document.querySelector(".search-wrap");
        
        for (let i = 0; i < allList.length; i++) {
            allList[i].addEventListener("click", (event) => {

                let selectedText = event.target.textContent;
                searchInput.value = selectedText;
                searchDropdown.classList.remove("active-search");
                searchInput.focus();

                id = travels.filter((place) => {
                    if(searchInput.value === place.acf.place) {
                        return place.id;
                }

                searchInput.addEventListener("keypress", (event) => {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                        location.href = `detail.html?id=${id[0].id}`
                    }
                })
            })
            })
        };

    searchBtn.onclick = () => {
        location.href = `detail.html?id=${id[0].id}`
    }
    } else {
        searchDropdown.classList.remove("active-search");
    }}
);




// function select(element) {
//     let selectedText = element.textContent;
//     console.log(selectedText)
// }

// function showSuggestions(list) {
//     let listData;

//     if (!list.length) {

//     } else {
//         listData = list.join("");
//     }
// }


/* USIKKER PÅ OM JEG KAN BRUKE DENNE: */

// const readOnly = document.querySelector("[readonly]");
// readOnly.addEventListener("focus", function() {
//     this.removeAttribute("readonly")
// })