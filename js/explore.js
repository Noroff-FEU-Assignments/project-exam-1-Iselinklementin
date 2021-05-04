function getApi () {
    let urlPost = fetch("https://grafs.no/wp-json/wp/v2/posts?per_page=20");
    let urlTag = fetch("https://grafs.no/wp-json/wp/v2/tags?per_page=20");
    let urlMedia = fetch("https://grafs.no/wp-json/wp/v2/media?per_page=100");

    try {

    Promise.all([urlPost, urlTag, urlMedia])
    .then(values => Promise.all(values.map(value => value.json())))
    .then(finalValue => {
        let urlResponse = finalValue[0];
        let tagResponse = finalValue[1];
        let media = finalValue[2];

        createArticles(urlResponse, tagResponse, media);
        sort(tagResponse, urlResponse, media);
        // createTags(urlResponse, tagResponse);
    })
}   catch (error) {
        console.error(error);
    }
};

getApi();

const contain = document.getElementById("container");
const postExplore = document.querySelector(".post-container");
const headPost = document.querySelector(".head-post");
const standardPosts = document.querySelector(".posts-standard");
const standardPostsBottom = document.querySelector(".posts-standard-hidden");
const bottomSplit = document.querySelector(".wrap-two-posts-hidden");
const middleSplit = document.querySelector(".wrap-two-posts-middle");
const split = document.querySelector(".wrap-two-posts");
const btnView = document.querySelector("button");

function createArticles(urlResponse, tagResponse, media) {

    let result = urlResponse[0];
    let text = result.title.rendered;
    let textSplit = text.split(1);
    let introText = textSplit[2].replace("; ", "");

    let heading = result.acf.place;
    let resultImg = result.acf.heading_img.url;

    // btnView.display = "block";

    headPost.innerHTML += `<a href="detail.html?id=${result.id}">
                            <div class="heading-wrap">
                            <p class="head-post-para">${introText}</p>
                            <h3 class="h3-overlay">${heading}</h3>
                            </div>
                            <figure class="head-post-fig">
                            <img src="${resultImg}" alt="" class="head-post-img img">
                            <figcaption class="figcap">${result.content.rendered}</figcaption>
                            <figure>
                            </a>`

    const splitted = urlResponse.slice(1, 3);

    for (let i = 0; i < splitted.length; i++) {
        
        split.innerHTML += `<article class="blog-top">
                            <a href="detail.html?id=${splitted[i].id}">
                            <figure>
                            <img src="${splitted[i].acf.heading_img.url}" alt="" class="img">
                            </figure>
                            <div class="split-content">
                            ${splitted[i].content.rendered}
                            <p class="paragraph">Explore</p>
                            <h3>${splitted[i].acf.place}</h3>
                            </div>
                            </a>
                            </article>`
    }

    const standardBlog = urlResponse.slice(3, 6);

        for(let i = 0; i < standardBlog.length; i++) {
    
            let post = standardBlog[i];
            let list = [];

            post.tags.filter(t => {
                tagResponse.forEach(e => {
        
                    if (e.id === t && e.name === "Asia" || e.id === t && e.name === "Adventure" || e.id === t && e.name === "Landscapes") {
                        list.push(`<li class="tag purple-tag">${e.name}</li>`)
                    }
                    
                    if (e.id === t && e.name === "Culture" || e.id === t && e.name === "Animals" || e.id === t && e.name === "America") {
                        list.push(`<li class="tag sand-tag">${e.name}</li>`)
                    }
            
                    if (e.id === t && e.name === "Nature" || e.id === t && e.name === "Wildlife") {
                        list.push(`<li class="tag green-tag">${e.name}</li>`)
                    }
            
                    if (e.id === t && e.name === "Europe" || e.id === t && e.name === "Beliefs" ) {
                        list.push(`<li class="tag blue-tag">${e.name}</li>`)
                    }
            
                    if (e.id === t && e.name === "Oceania" || e.id === t && e.name === "Traditions" || e.id === t && e.name === "Africa") {
                        list.push(`<li class="tag peach-tag">${e.name}</li>`)
                    }
                })
            });

            standardPosts.innerHTML += `<a href="detail.html?id=${post.id}">
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

    const sliceMiddle = urlResponse.slice(6, 8);

    for (let i = 0; i < sliceMiddle.length; i++) {

        let middlepost = sliceMiddle[i];

        middleSplit.innerHTML += `<article class="blog-top">
                            <a href="detail.html?id=${middlepost.id}">
                            <figure>
                            <img src="${middlepost.acf.heading_img.url}" alt="" class="img">
                            </figure>
                            <div class="split-content">
                            ${middlepost.content.rendered}
                            <p class="paragraph">Explore</p>
                            <h3>${middlepost.acf.place}</h3>
                            </div>
                            </a>
                            </article>`

    }

    const blogBottom = urlResponse.slice(8, 10);

    for(let i = 0; i < blogBottom.length; i++) {

        let blog = blogBottom[i];
        
        bottomSplit.innerHTML += `<article class="blog-top">
                                <a href="detail.html?id=${blog.id}">
                                <figure>
                                <img src="${blog.acf.heading_img.url}" alt="" class="img">
                                </figure>
                                <div class="split-content">
                                ${blog.content.rendered}
                                <p class="paragraph">Explore</p>
                                <h3>${blog.acf.place}</h3>
                                </div>
                                </a>
                                </article>`
    }

    const standBlog = urlResponse.slice(10, 12);

    for(let i = 0; i < standBlog.length; i++) {
        
        let post = standBlog[i];
        let list = [];

        post.tags.filter(t => {
            tagResponse.forEach(e => {
    
                if (e.id === t && e.name === "Asia" || e.id === t && e.name === "Adventure" || e.id === t && e.name === "Landscapes") {
                    list.push(`<li class="tag purple-tag">${e.name}</li>`)
                }
                
                if (e.id === t && e.name === "Culture" || e.id === t && e.name === "Animals" || e.id === t && e.name === "America") {
                    list.push(`<li class="tag sand-tag">${e.name}</li>`)
                }
        
                if (e.id === t && e.name === "Nature" || e.id === t && e.name === "Wildlife") {
                    list.push(`<li class="tag green-tag">${e.name}</li>`)
                }
        
                if (e.id === t && e.name === "Europe" || e.id === t && e.name === "Beliefs" ) {
                    list.push(`<li class="tag blue-tag">${e.name}</li>`)
                }
        
                if (e.id === t && e.name === "Oceania" || e.id === t && e.name === "Traditions" || e.id === t && e.name === "Africa") {
                    list.push(`<li class="tag peach-tag">${e.name}</li>`)
                }
            })
        });
        

        standardPostsBottom.innerHTML += `<a href="detail.html?id=${post.id}">
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

    let imgAlt = document.querySelectorAll(".img");

    media.filter(mediaAlt => {
        imgAlt.forEach(img => {
            if(mediaAlt.source_url === img.src) {
                 img.alt = mediaAlt.alt_text;
            }
        })
    })
};


// ${result[0].acf.heading_img.url}

// ${list.join("")}
// ${altTextFunc()}

const tag = document.querySelectorAll(".tag");

function sort(tagResponse, urlResponse, media) {
    tag.forEach(btn => {
        btn.addEventListener("click", function() {

            postExplore.innerHTML = "";

            let inner = this.innerText;
            tagResponse.filter(n => {
                if (n.name === inner) {
                    urlResponse.forEach(result => {
                        result.tags.forEach(t => {
                            if(t === n.id) {
                                let resultImg = result.acf.heading_img.url;

                                let list = [];

                                result.tags.filter(t => {
                                    tagResponse.forEach(e => {
                            
                                        if (e.id === t && e.name === "Asia" || e.id === t && e.name === "Adventure" || e.id === t && e.name === "Landscapes") {
                                            list.push(`<li class="tag purple-tag">${e.name}</li>`)
                                        }
                                        
                                        if (e.id === t && e.name === "Culture" || e.id === t && e.name === "Animals" || e.id === t && e.name === "America") {
                                            list.push(`<li class="tag sand-tag">${e.name}</li>`)
                                        }
                                
                                        if (e.id === t && e.name === "Nature" || e.id === t && e.name === "Wildlife") {
                                            list.push(`<li class="tag green-tag">${e.name}</li>`)
                                        }
                                
                                        if (e.id === t && e.name === "Europe" || e.id === t && e.name === "Beliefs" ) {
                                            list.push(`<li class="tag blue-tag">${e.name}</li>`)
                                        }
                                
                                        if (e.id === t && e.name === "Oceania" || e.id === t && e.name === "Traditions" || e.id === t && e.name === "Africa") {
                                            list.push(`<li class="tag peach-tag">${e.name}</li>`)
                                        }
                                    })
                                });

                                btnView.style.display = "none";
                                contain.style.display = "none";

                                postExplore.innerHTML += `<a href="detail.html?id=${result.id}">
                                                        <article>
                                                        <img src="${resultImg}" alt="" class="post-img img">
                                                        <div class="post-text">
                                                        <h3>${result.title.rendered}</h3>
                                                        ${result.content.rendered}
                                                        </div>
                                                        <ul class="tags" id="explore-tags">${list.join("")}</ul>
                                                        </article>
                                                        </a>`
                            }

                            let imgAlt = document.querySelectorAll(".img");

                            media.filter(mediaAlt => {
                                imgAlt.forEach(img => {
                                    if(mediaAlt.source_url === img.src) {
                                         img.alt = mediaAlt.alt_text;
                                    }
                                })
                            })
                        })
                    })
                }
            })
            
            if(this.innerText === "All") {
                contain.style.display = "block";
                btnView.style.display = "block";
            }
            
        })
    })
};

function toggleContent() {
    bottomSplit.classList.toggle("show");
    standardPostsBottom.classList.toggle("show");
    btnView.innerText = "View less"
}

btnView.addEventListener("click", toggleContent);

// function tagsStyle(place, tagResponse) {
//     // let list = [];

//     place.tags.filter(t => {
//         tagResponse.forEach(e => {

//             if (e.id === t && e.name === "Asia" || e.id === t && e.name === "Adventure" || e.id === t && e.name === "Landscapes") {
//                 list.push(`<li class="tag purple-tag">${e.name}</li>`)
//             }
            
//             if (e.id === t && e.name === "Culture" || e.id === t && e.name === "Animals" || e.id === t && e.name === "America") {
//                 list.push(`<li class="tag sand-tag">${e.name}</li>`)
//             }
    
//             if (e.id === t && e.name === "Nature" || e.id === t && e.name === "Wildlife") {
//                 list.push(`<li class="tag green-tag">${e.name}</li>`)
//             }
    
//             if (e.id === t && e.name === "Europe" || e.id === t && e.name === "Beliefs" ) {
//                 list.push(`<li class="tag blue-tag">${e.name}</li>`)
//             }
    
//             if (e.id === t && e.name === "Oceania" || e.id === t && e.name === "Traditions" || e.id === t && e.name === "Africa") {
//                 list.push(`<li class="tag peach-tag">${e.name}</li>`)
//             }
//         })
//     });
// };

// function createTags(urlResponse, tagResponse) {
//     const ul = document.querySelectorAll(".tagged");

//     urlResponse.forEach(result => {
//         let tagged = result.tags;

//         tagResponse.filter(e => {
//             tagged.filter(t => {
//                 console.log(t)
//                 if (e.id === t && e.name === "Asia" || e.id === t && e.name === "Adventure" || e.id === t && e.name === "Landscapes") {
//                     list.push(`<li class="tag purple-tag">${e.name}</li>`)
//                 }
            
//                 if (e.id === t && e.name === "Culture" || e.id === t && e.name === "Animals" || e.id === t && e.name === "America") {
//                     list.push(`<li class="tag sand-tag">${e.name}</li>`)
//                 }
        
//                 if (e.id === t && e.name === "Nature" || e.id === t && e.name === "Wildlife") {
//                     list.push(`<li class="tag green-tag">${e.name}</li>`)
//                 }
        
//                 if (e.id === t && e.name === "Europe" || e.id === t && e.name === "Beliefs" ) {
//                     list.push(`<li class="tag blue-tag">${e.name}</li>`)
//                 }
        
//                 if (e.id === t && e.name === "Oceania" || e.id === t && e.name === "Traditions" || e.id === t && e.name === "Africa") {
//                     list.push(`<li class="tag peach-tag">${e.name}</li>`)
//                 }
//             })
//         })

//     })

//     ul.forEach(listItem => {
//         listItem.innerHTML = list.join("");
//     })
// }