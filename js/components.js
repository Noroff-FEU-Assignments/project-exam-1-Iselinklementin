const nav = document.querySelector("nav");
const logo = document.querySelector(".logo");
const navUl = document.querySelector("nav > ul");
const searchWrap = document.querySelector(".search-wrap");

/**
 * Navbar get sticky
 * Add & remove classes if scrolled
 */

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

/**
 * Show correct logo based on screensize
 */

function setWidthDesktop() {
    if (document.body.clientWidth > 681) {
        logo.src = "/images/icons/logofeet_full.svg";

        let child = navUl.children[2];
        if (child.classList.contains("current")) {
            logo.src = "/images/icons/logofeet_full_white.svg";
        }
        logo.classList.add("desktop-logo");
    }
};

function setWidthMobile() {
    if (document.body.clientWidth < 680) {
        logo.src = "/images/icons/logofeet.svg";

        let child = navUl.children[2];

        if (child.classList.contains("current")) {
            logo.src = "/images/icons/logofeet_white.svg";
        }

        logo.classList.remove("desktop-logo");
    }
};

/**
 * Show correct logo when loading site
 */

window.addEventListener("load", setWidthDesktop);
window.addEventListener("load", setWidthMobile);


/**
 * Show correct logo when scaling the site
 */

window.addEventListener("resize", setWidthDesktop);
window.addEventListener("resize", setWidthMobile);

/**
 * Open searchbar in nav:
 */

const searching = document.querySelector(".searching");
const liSearchItem = document.querySelector(".list-search");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector("#search");
const searchDropdown = document.querySelector(".search-dropdown");
const searchBtn = document.querySelector(".search-btn");

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

window.onclick = function (event) {

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

let travels = []

/**
 * Fetch destination list
 */

const loadTravels = async () => {
    try {
        const res = await fetch("https://grafs.no/wp-json/wp/v2/posts?per_page=20");
        travels = await res.json();
    } catch (error) {
        console.log(error)
    }
}

loadTravels();

/**
 * Show search suggestions in dropdown
 */

function showSuggestions(list) {
    let listData;

    if (!list.length) {
        userValue = searchInput.value;
        listData = `<li class="search-li">${userValue}</li>
                    <li class="search-li not-found">Sorry, maybe try something else..</li>`
    } else {
        listData = list.join("");
    }

    searchDropdown.innerHTML = listData;
};

/**
 * Filter names vs searchstring (input.value)
 */

searchInput.addEventListener("keyup", (event) => {
    const searchString = event.target.value.toLowerCase();
    let filteredTravels = [];

    if (!searchBtn.disabled) {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                return false;
            }
        });
    };

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

        /**
         * Loop list-items and add eventlistener
         * This controls search-field text and if the button is disabled or not
         **/

        for (let i = 0; i < allList.length; i++) {
            allList[i].addEventListener("click", (event) => {

                if (allList[i].classList.contains("not-found")) {
                    event.target.onclick = () => {
                        event.preventDefault()
                        searchInput.value = "";
                    }
                } else {
                    let selectedText = event.target.textContent;
                    searchInput.value = selectedText;
                    searchInput.focus();

                    if (filteredTravels == 0) {
                        searchBtn.disabled = true;
                    } else {
                        searchBtn.disabled = false;
                    }
                }
            })
        };

        /**
         * Check if input-value is valid
         * if not - disable button & enter-key
         **/

        searchInput.addEventListener("keyup", () => {

            if (searchInput.value.length < 3) {
                searchBtn.disabled = true;

                window.addEventListener("keydown", (e) => {
                    if (searchBtn.disabled && e.keyCode === 13) {
                        e.preventDefault();
                        return false;
                    }
                });
            };

            if (searchInput.value.length > 3) {
                if (!filteredTravels) {
                    searchBtn.disabled = false;
                }
            }
        });

        /**
         * If suggestion list is clicked
         * give ID to button and enter-key
         **/

        searchDropdown.addEventListener("click", () => {
            travels.filter(site => {

                if (site.acf.place.toLowerCase() === searchInput.value.toLowerCase()) {
                    searchBtn.onclick = () => {
                        location.href = `detail.html?id=${site.id}`
                    }

                    window.addEventListener("keydown", (e) => {
                        if (!searchBtn.disabled && e.keyCode === 13) {
                            e.preventDefault();
                            location.href = `detail.html?id=${site.id}`
                        }
                    });
                }
            })
        });

        /**
         * If suggestion is written in manually
         * give ID to button and enter-key
         **/

        if (searchDropdown.firstChild.innerText.toLowerCase() === searchInput.value.toLowerCase()) {
            travels.filter(site => {

                if (site.acf.place.toLowerCase() === searchInput.value.toLowerCase()) {
                    searchBtn.disabled = false;
                    searchBtn.onclick = () => {
                        location.href = `detail.html?id=${site.id}`
                    }

                    window.addEventListener("keydown", (e) => {
                        if (!searchBtn.disabled && e.keyCode === 13) {
                            e.preventDefault();
                            location.href = `detail.html?id=${site.id}`
                        }
                    });
                }
            })
        }
    } else {
        searchDropdown.classList.remove("active-search");
    }
});

/**
 * Errormessage used on detail and travels page
 **/

function displayError() {
    const main = document.querySelector("main");
    main.innerHTML = `<div class="error-message">
                    <figure class="lost-site">
                        <img class="lost" src="/images/airplane-lost.jpg" alt="Airplane illustration - getting lost">
                    </figure>
                    <p class="sorry">So sorry!</p>
                    <p>Looks like we got lost!</p>
                </div>`
};