function getApi() {
    let urlPost = fetch("https://grafs.no/wp-json/wp/v2/posts?per_page=20");
    let urlTag = fetch("https://grafs.no/wp-json/wp/v2/tags?per_page=20");
    let urlMedia = fetch("https://grafs.no/wp-json/wp/v2/media?per_page=100");

    Promise.all([urlPost, urlTag, urlMedia])
        .then(values => Promise.all(values.map(value => value.json())))
        .then(finalValue => {
            let place = finalValue[0];
            let tags = finalValue[1];
            let media = finalValue[2];

            createMobilePosts(place, tags, media);
            filterByTag(tags, place, media);
            createDesktopPosts(tags, media, place);

        })
        .catch((error) => {
            displayError();
        })
};

getApi();

/**
 * Mobile containers
 */

const topPost = document.querySelector(".head-post");
const split = document.querySelector(".wrap-two-posts");
const middleSplit = document.querySelector(".wrap-two-posts-middle");
const standardPosts = document.querySelector(".posts-standard");
const showMoreSplit = document.querySelector(".wrap-two-posts-hidden");
const showMorestandardPosts = document.querySelector(".posts-standard-hidden");

/**
 * Desktop containers
 */

const desktopHeadPosts = document.querySelector(".desktop-head-posts");
const desktopTopPosts = document.querySelector(".dekstop-top-posts");
const desktopFourPosts = document.querySelector(".wrap-four-posts");
const desktopBottomPosts = document.querySelector(".desktop-bottom-posts");

/**
 * Filter & Buttons
 */

const btnView = document.querySelector(".viewBtn");
const contain = document.getElementById("container");

/**
 * Mobile layout
 */

function createMobilePosts(place, tags, media) {

    let count = 0;

    for (let i = 0; i < place.length; i++) {

        const placeResult = place[i];
        let list = [];
        count++;

        placeResult.tags.filter(t => {
            tags.forEach(e => {

                let checkID = e.id === t;

                if (checkID && ["Asia", "Adventure", "Landscapes"].includes(e.name)) {
                    list.push(`<li class="tag purple-tag">${e.name}</li>`)
                }

                if (checkID && ["Nature", "Africa"].includes(e.name)) {
                    list.push(`<li class="tag green-tag">${e.name}</li>`)
                }

                if (checkID && ["Culture", "Animals", "America"].includes(e.name)) {
                    list.push(`<li class="tag sand-tag">${e.name}</li>`)
                }

                if (checkID && ["Europe", "Beliefs"].includes(e.name)) {
                    list.push(`<li class="tag blue-tag">${e.name}</li>`)
                }

                if (checkID && ["Oceania", "Traditions"].includes(e.name)) {
                    list.push(`<li class="tag peach-tag">${e.name}</li>`)
                }
            })
        });

        /**
        * Header-post full width
        */

        if (count <= 1) {

            let text = placeResult.title.rendered;
            let textSplit = text.split(1);
            let introText = textSplit[2].replace("; ", "");
            let introPostImg = placeResult.acf.heading_img.url;


            topPost.innerHTML += `<a href="detail.html?id=${placeResult.id}">
                                    <div class="heading-wrap">
                                    <p class="head-post-para">${introText}</p>
                                    <h2 class="h2-overlay">${placeResult.acf.place}</h2>
                                    </div>
                                    <figure class="head-post-fig">
                                    <img src="${introPostImg}" alt="" class="head-post-img img">
                                    <figcaption class="figcap">${placeResult.content.rendered}</figcaption>
                                    <figure>
                                    </a>`

        }

        /**
        * Two posts columns (black background)
        */

        if (count > 1 && count <= 3) {

            split.innerHTML += `<article class="blog-top">
                                <a href="detail.html?id=${placeResult.id}">
                                <figure>
                                <img src="${placeResult.acf.heading_img.url}" alt="" class="img">
                                </figure>
                                <div class="split-content">
                                ${placeResult.content.rendered}
                                <p class="paragraph">Explore</p>
                                <h2>${placeResult.acf.place}</h2>
                                </div>
                                </a>
                                </article>`
        }

        /**
        * Three standard posts
        */

        if (count >= 4 && count <= 6) {
            standardPosts.innerHTML += `<article class="article-wrap">
                                        <a href="detail.html?id=${placeResult.id}">
                                        <img src="${placeResult.acf.heading_img.url}" alt="" class="post-img img">
                                        <div class="post-text">
                                        <h2>${placeResult.title.rendered}</h2>
                                        ${placeResult.content.rendered}
                                        </div>
                                        <ul class="tags" id="explore-tags">${list.join("")}</ul>
                                        </a>
                                        </article>
                                        `
        }

        /**
        * Two posts columns (black background)
        */

        if (count >= 7 && count <= 8) {

            middleSplit.innerHTML += `<article class="blog-top">
                                        <a href="detail.html?id=${placeResult.id}">
                                        <figure>
                                        <img src="${placeResult.acf.heading_img.url}" alt="" class="img">
                                        </figure>
                                        <div class="split-content">
                                        ${placeResult.content.rendered}
                                        <p class="paragraph">Explore</p>
                                        <h2>${placeResult.acf.place}</h2>
                                        </div>
                                        </a>
                                        </article>`
        }

        /**
        * Two posts columns (black background)
        * This is hidden by default
        */

        if (count >= 9 && count <= 10) {

            showMoreSplit.innerHTML += `<article class="blog-top">
                                        <a href="detail.html?id=${placeResult.id}">
                                        <figure>
                                        <img src="${placeResult.acf.heading_img.url}" alt="" class="img">
                                        </figure>
                                        <div class="split-content">
                                        ${placeResult.content.rendered}
                                        <p class="paragraph">Explore</p>
                                        <h2>${placeResult.acf.place}</h2>
                                        </div>
                                        </a>
                                        </article>`
        }

        /**
        * Two posts standard
        * This is hidden by default
        */

        if (count >= 11 && count <= 12) {
            showMorestandardPosts.innerHTML += `<article class="article-wrap">
                                                <a href="detail.html?id=${placeResult.id}">
                                                <img src="${placeResult.acf.heading_img.url}" alt="" class="post-img img">
                                                <div class="post-text">
                                                <h2>${placeResult.title.rendered}</h2>
                                                ${placeResult.content.rendered}
                                                </div>
                                                <ul class="tags" id="explore-tags">${list.join("")}</ul>
                                                </a>
                                                </article>
                                                `
        }

        const images = document.querySelectorAll(".img");

        /**
        * Fetching alt-text
        */

        media.filter(m => {
            images.forEach(img => {
                if (m.source_url === img.src) {
                    img.alt = m.alt_text;
                }
            })
        })
    }
};

/**
 * Desktop layout
 */

function createDesktopPosts(tags, media, place) {

    let count = 0;

    for (let i = 0; i < place.length; i++) {

        const placed = place[i];
        let list = [];
        count++;

        placed.tags.filter(t => {
            tags.forEach(e => {

                let checkID = e.id === t;

                if (checkID && ["Asia", "Adventure", "Landscapes"].includes(e.name)) {
                    list.push(`<li class="tag purple-tag">${e.name}</li>`)
                }

                if (checkID && ["Nature", "Africa"].includes(e.name)) {
                    list.push(`<li class="tag green-tag">${e.name}</li>`)
                }

                if (checkID && ["Culture", "Animals", "America"].includes(e.name)) {
                    list.push(`<li class="tag sand-tag">${e.name}</li>`)
                }

                if (checkID && ["Europe", "Beliefs"].includes(e.name)) {
                    list.push(`<li class="tag blue-tag">${e.name}</li>`)
                }

                if (checkID && ["Oceania", "Traditions"].includes(e.name)) {
                    list.push(`<li class="tag peach-tag">${e.name}</li>`)
                }
            })
        });

        /**
         * 3 top posts (standard layout)
         */

        if (count < 5) {

            desktopTopPosts.innerHTML += `<article class="article-wrap">
                                            <a href="detail.html?id=${placed.id}">
                                            <img src="${placed.acf.heading_img.url}" alt="" class="post-img img">
                                            <div class="post-text">
                                            <h2>${placed.title.rendered}</h2>
                                            ${placed.content.rendered}
                                            </div>
                                            <ul class="tags" id="explore-tags">${list.join("")}</ul>
                                            </a>
                                            </article>`
        }

        /**
         * 1 Flex posts (wide post with black background)
         */

        if (count >= 5 && count < 6) {
            desktopTopPosts.innerHTML += `  <article class="desktop-big-post">
                                            <a class="big-article" href="detail.html?id=${placed.id}">
                                            <figure class="big-post-figure">
                                            <img src="${placed.acf.heading_img.url}" alt="" class="post-img img big-img">
                                            </figure>

                                            <div class="post-text big-post-text">
                                            <h2>${placed.acf.sub_heading}</h2>
                                            <ul class="tags big-tags" id="explore-tags">${list.join("")}</ul>
                                            ${placed.content.rendered}
                                            </div>
                                            </a>
                                            </article>
                                            `
        }

        /**
         * 4 posts small columns (black background)
         */


        if (count >= 6 && count <= 9) {
            desktopFourPosts.innerHTML += `<article>
                                            <a class="blog-top" href="detail.html?id=${placed.id}">
                                            <figure>
                                            <img src="${placed.acf.heading_img.url}" alt="" class="post-img img">
                                            </figure>
                                            <div class="split-content">
                                            ${placed.content.rendered}
                                            <p class="paragraph">Explore</p>
                                            <h2>${placed.acf.place}</h2>
                                            </div>
                                            </a>
                                            </article>
                                            `

        }

        /**
        * 3 bottom posts (same layout as top)
        * Hidden by default
        */

        if (count > 9) {
            desktopBottomPosts.innerHTML += `<article class="article-wrap">
                                            <a href="detail.html?id=${placed.id}">
                                            <img src="${placed.acf.heading_img.url}" alt="" class="post-img img">
                                            <div class="post-text">
                                            <h2>${placed.title.rendered}</h2>
                                            ${placed.content.rendered}
                                            </div>
                                            <ul class="tags" id="explore-tags">${list.join("")}</ul>
                                            </a>
                                            </article>
                                            `
        }

        const images = document.querySelectorAll(".img");

        media.filter(m => {
            images.forEach(img => {
                if (m.source_url === img.src) {
                    img.alt = m.alt_text;
                }
            })
        })
    }
};


/**
 * Creating filter results
 * Filter tags, id`s & name
 * Create html based on results
 */

const tag = document.querySelectorAll(".tag");
const showPostsFiltered = document.querySelector(".post-container");

function filterByTag(tags, place, media) {
    tag.forEach(btn => {
        btn.addEventListener("click", function () {

            const listContainer = document.querySelector(".ul-list");
            const childList = listContainer.children;
            showPostsFiltered.innerHTML = "";

            let count = 0;
            let nameOfTag = this.innerText;

            tags.filter(getTag => {
                if (getTag.name === nameOfTag) {
                    place.forEach(placeResults => {
                        placeResults.tags.forEach(tagID => {
                            if (tagID === getTag.id) {

                                let resultImg = placeResults.acf.heading_img.url;
                                let list = [];

                                placeResults.tags.filter(placeTagID => {
                                    tags.forEach(tagsID => {

                                        let checkID = tagsID.id === placeTagID;

                                        if (checkID && ["Asia", "Adventure", "Landscapes"].includes(tagsID.name)) {
                                            list.push(`<li class="tag purple-tag">${tagsID.name}</li>`)
                                        }

                                        if (checkID && ["Nature", "Africa"].includes(tagsID.name)) {
                                            list.push(`<li class="tag green-tag">${tagsID.name}</li>`)
                                        }

                                        if (checkID && ["Culture", "Animals", "America"].includes(tagsID.name)) {
                                            list.push(`<li class="tag sand-tag">${tagsID.name}</li>`)
                                        }

                                        if (checkID && ["Europe", "Beliefs"].includes(tagsID.name)) {
                                            list.push(`<li class="tag blue-tag">${tagsID.name}</li>`)
                                        }

                                        if (checkID && ["Oceania", "Traditions"].includes(tagsID.name)) {
                                            list.push(`<li class="tag peach-tag">${tagsID.name}</li>`)
                                        }
                                    })
                                });

                                /**
                                * Give filterbutton feedback
                                * Black button on selected filter
                                */

                                for (let i = 0; i < childList.length; i++) {
                                    if (childList[i].classList.contains("black-tag")) {
                                        childList[i].classList.remove("black-tag");
                                    }
                                }

                                /**
                                * Create html
                                */

                                const all = document.querySelector(".all-tag");
                                all.classList.remove("black-tag")
                                all.classList.add("ocean-tag")
                                this.classList.add("black-tag");
                                btnView.style.display = "none";
                                contain.style.display = "none";

                                showPostsFiltered.innerHTML += `<article class="article-wrap filter-desktop-article">
                                                             <a href="detail.html?id=${placeResults.id}">
                                                             <img src="${resultImg}" alt="" class="post-img img filter-desktop-img">
                                                             <div class="post-text">
                                                             <h2>${placeResults.title.rendered}</h2>
                                                             ${placeResults.content.rendered}
                                                             </div>
                                                             <ul class="tags" id="explore-tags">${list.join("")}</ul>
                                                             </a>
                                                             </article>
                                                             `

                                /*
                                Give the 3/4 item a bigger picture in filter-results
                                */

                                for (let i = 0; i < 5; i++) {
                                    count++
                                    if (count === 15 || count === 20) {
                                        showPostsFiltered.lastElementChild.classList.add("wide-post");
                                    }
                                };

                            };

                            const imagesFilter = document.querySelectorAll(".img");

                            /**
                            * Fetching alt-text
                            */

                            media.filter(m => {
                                imagesFilter.forEach(img => {
                                    if (m.source_url === img.src) {
                                        img.alt = m.alt_text;
                                    }
                                })
                            });

                        });
                    });
                };
            });

            /**
            * Show all posts if all-button is clicked
            */

            if (this.innerText === "All") {
                contain.style.display = "block";
                btnView.style.display = "block";

                const childClasses = Array.from(childList);

                childClasses.forEach(child => {
                    child.classList.remove("black-tag");
                    this.classList.add("black-tag");
                });
            };
        })
    })
};

/**
* View more / view less - button
* Toggle show / hide
*/

function toggleShowMore() {
    showMoreSplit.classList.toggle("show");
    showMorestandardPosts.classList.toggle("show");
    desktopBottomPosts.classList.toggle("show");
    console.log(desktopBottomPosts)

    if (btnView.innerHTML === "View more..") {
        btnView.innerHTML = "View less.."
    } else {
        btnView.innerHTML = "View more.."
    };
};

btnView.addEventListener("click", toggleShowMore);

/**
* Loadingscreen
*/

const loader = document.querySelector(".loader");
main.style.display = "none";

window.onload = () => {
    window.setInterval(function () {
        loader.style.display = "none";
        main.style.display = "block";
    }, 2000)
};