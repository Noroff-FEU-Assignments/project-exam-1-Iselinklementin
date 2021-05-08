function getApi () {
    let urlPost = fetch("https://grafs.no/wp-json/wp/v2/posts?per_page=20");
    let urlTag = fetch("https://grafs.no/wp-json/wp/v2/tags?per_page=20");
    let urlMedia = fetch("https://grafs.no/wp-json/wp/v2/media?per_page=100");

    try {

    Promise.all([urlPost, urlTag, urlMedia])
    .then(values => Promise.all(values.map(value => value.json())))
    .then(finalValue => {
        let place = finalValue[0];
        let tags = finalValue[1];
        let media = finalValue[2];

        createPosts(place, tags, media);
        filterByTag(tags, place, media);

    })
}   catch (error) {
        console.error(error);
    }
};

getApi();

const topPost = document.querySelector(".head-post");
const split = document.querySelector(".wrap-two-posts");
const middleSplit = document.querySelector(".wrap-two-posts-middle");
const standardPosts = document.querySelector(".posts-standard");
const showMoreSplit = document.querySelector(".wrap-two-posts-hidden");
const showMorestandardPosts = document.querySelector(".posts-standard-hidden");
const btnView = document.querySelector("button");
const contain = document.getElementById("container");

console.log(topPost, split, standardPosts)

function createPosts(place, tags, media) {
    
    const introPost = place[0];
    let text = introPost.title.rendered;
    let textSplit = text.split(1);
    let introText = textSplit[2].replace("; ", "");
    let introPostImg = introPost.acf.heading_img.url;


    topPost.innerHTML += `<a href="detail.html?id=${introPost.id}">
                            <div class="heading-wrap">
                            <p class="head-post-para">${introText}</p>
                            <h3 class="h3-overlay">${introPost.acf.place}</h3>
                            </div>
                            <figure class="head-post-fig">
                            <img src="${introPostImg}" alt="" class="head-post-img img">
                            <figcaption class="figcap">${introPost.content.rendered}</figcaption>
                            <figure>
                            </a>`
    
    const splitPostsTop = place.slice(1, 3);

    for (let i = 0; i < splitPostsTop.length; i++) {
                                
    split.innerHTML += `<article class="blog-top">
                        <a href="detail.html?id=${splitPostsTop[i].id}">
                        <figure>
                        <img src="${splitPostsTop[i].acf.heading_img.url}" alt="" class="img">
                        </figure>
                        <div class="split-content">
                        ${splitPostsTop[i].content.rendered}
                        <p class="paragraph">Explore</p>
                        <h3>${splitPostsTop[i].acf.place}</h3>
                        </div>
                        </a>
                        </article>`
    }                 

    const standardBlogLayout = place.slice(3, 6);

    for(let i = 0; i < standardBlogLayout.length; i++) {

        const post = standardBlogLayout[i];
        let list = [];

        post.tags.filter(t => {
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

        standardPosts.innerHTML += `<a class="article-wrap" href="detail.html?id=${post.id}">
                                    <article>
                                    <img src="${post.acf.heading_img.url}" alt="" class="post-img img">
                                    <div class="post-text">
                                    <h3>${post.title.rendered}</h3>
                                    ${post.content.rendered}
                                    </div>
                                    <ul class="tags" id="explore-tags">${list.join("")}</ul>
                                    </article>
                                    </a>`
    }

    const sliceMiddle = place.slice(6, 8);

    for (let i = 0; i < sliceMiddle.length; i++) {

        let splitPostsMiddle = sliceMiddle[i];

        middleSplit.innerHTML += `<article class="blog-top">
                            <a href="detail.html?id=${splitPostsMiddle.id}">
                            <figure>
                            <img src="${splitPostsMiddle.acf.heading_img.url}" alt="" class="img">
                            </figure>
                            <div class="split-content">
                            ${splitPostsMiddle.content.rendered}
                            <p class="paragraph">Explore</p>
                            <h3>${splitPostsMiddle.acf.place}</h3>
                            </div>
                            </a>
                            </article>`

    }

    const blogSplitBottom = place.slice(8, 10);

    for(let i = 0; i < blogSplitBottom.length; i++) {

        let bottomSplit = blogSplitBottom[i];
        
        showMoreSplit.innerHTML += `<article class="blog-top">
                                <a href="detail.html?id=${bottomSplit.id}">
                                <figure>
                                <img src="${bottomSplit.acf.heading_img.url}" alt="" class="img">
                                </figure>
                                <div class="split-content">
                                ${bottomSplit.content.rendered}
                                <p class="paragraph">Explore</p>
                                <h3>${bottomSplit.acf.place}</h3>
                                </div>
                                </a>
                                </article>`
    }

    const ShowStandardPosts = place.slice(10, 12);

    for(let i = 0; i < ShowStandardPosts.length; i++) {
        
        const showMorePosts = ShowStandardPosts[i];
        let list = [];

        showMorePosts.tags.filter(t => {
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
        

        showMorestandardPosts.innerHTML += `<a class="article-wrap" href="detail.html?id=${showMorePosts.id}">
                                        <article>
                                        <img src="${showMorePosts.acf.heading_img.url}" alt="" class="post-img img">
                                        <div class="post-text">
                                        <h3>${showMorePosts.title.rendered}</h3>
                                        ${showMorePosts.content.rendered}
                                        </div>
                                        <ul class="tags" id="explore-tags">${list.join("")}</ul>
                                        </article>
                                        </a>`

    }

    const images = document.querySelectorAll(".img");

    media.filter(m => {
        images.forEach(img => {
            if (m.source_url === img.src) {
                img.alt = m.alt_text;
            }
        })
    })
};


const tag = document.querySelectorAll(".tag");
const showPostsFiltered = document.querySelector(".post-container");


function filterByTag(tags, place, media) {
    tag.forEach(btn => {
        btn.addEventListener("click", function() {

            const listContainer = document.querySelector(".ul-list");
            const childList = listContainer.children;
            showPostsFiltered.innerHTML = "";

            let count = 0;
            let nameOfTag = this.innerText;

            tags.filter(getTag => {
                if (getTag.name === nameOfTag) {
                    place.forEach(placeResults => {
                        placeResults.tags.forEach(tagID => {
                            if(tagID === getTag.id) {
                                
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

                                for (let i = 0; i < childList.length; i++) {
                                    if (childList[i].classList.contains("black-tag")) {
                                        childList[i].classList.remove("black-tag");
                                    }
                                }

                                const all = document.querySelector(".all-tag");
                                all.classList.remove("black-tag")
                                all.classList.add("ocean-tag")
                                this.classList.add("black-tag");
                                btnView.style.display = "none";
                                contain.style.display = "none";

                                showPostsFiltered.innerHTML += `<a class="article-wrap" href="detail.html?id=${placeResults.id}">
                                                            <article>
                                                            <img src="${resultImg}" alt="" class="post-img img">
                                                            <div class="post-text">
                                                            <h3>${placeResults.title.rendered}</h3>
                                                            ${placeResults.content.rendered}
                                                            </div>
                                                            <ul class="tags" id="explore-tags">${list.join("")}</ul>
                                                            </article>
                                                            </a>`
                                
                                for (let i = 0; i < 5; i++) {
                                    count++

                                    if (count === 15 || count === 20) {
                                        showPostsFiltered.lastElementChild.classList.add("wide-post");
                                    }
                                };

                            };

                            const imagesFilter = document.querySelectorAll(".img");

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

function toggleShowMore() {
    showMoreSplit.classList.toggle("show");
    showMorestandardPosts.classList.toggle("show");

    if (btnView.innerHTML === "View more..") {
        btnView.innerHTML = "View less.."
    } else {
        btnView.innerHTML = "View more.."
    };  
};

btnView.addEventListener("click", toggleShowMore);