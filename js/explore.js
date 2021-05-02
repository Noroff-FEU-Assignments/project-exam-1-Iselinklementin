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
const small = document.querySelector(".wrap-two-small-posts");
const split = document.querySelector(".wrap-two-posts");

const btnView = document.querySelector("button");

function createArticles(urlResponse, tagResponse, media) {

    let result = urlResponse[0];

    let text = result.title.rendered;
    let textSplit = text.split(1);
    let introText = textSplit[2].replace("; ", "");

    let heading = result.acf.place;
    let resultImg = result.acf.heading_img.url;

    headPost.innerHTML += `<a href="detail.html?id=${result.id}">
                            <div class="heading-wrap">
                            <p class="head-post-para">${introText}</p>
                            <h3 class="h3-overlay">${heading}</h3>
                            </div>
                            <figure class="head-post-fig">
                            <img src="${resultImg}" alt="" class="head-post-img">
                            <figcaption class="figcap">${result.content.rendered}</figcaption>
                            <figure>
                            </a>`

    const splitted = urlResponse.slice(1, 3);

    for (let i = 0; i < splitted.length; i++) {
        split.innerHTML += `<article class="blog-top">
                            <a href="detail.html?id=${splitted[i].id}">
                            <figure>
                            <img src="${splitted[i].acf.heading_img.url}" alt="">
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
    
        standardPosts.innerHTML += `<a href="detail.html?id=${post.id}">
                                    <article>
                                    <img src="${post.acf.heading_img.url}" alt="" class="post-img">
                                    <div class="post-text">
                                    <h3>${post.title.rendered}</h3>
                                    ${post.content.rendered}
                                    </div>
                                    <ul class="tags"></ul>
                                    </article>
                                    </a>`
    }

    const smallPosts = urlResponse.slice(6, 8);

    for (let i = 0; i < smallPosts.length; i++) {

        let smallpost = smallPosts[i];

        small.innerHTML += `<article class="blog-small">
                <a href="detail.html?id=${smallpost.id}">
                <figure>
                <img src="${smallpost.acf.heading_img.url}" alt="" class="post-img">
                </figure>
                <div class="text-wrap">
                <h3>${smallpost.acf.place}</h3>
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
                                <img src="${blog.acf.heading_img.url}" alt="">
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

        standardPostsBottom.innerHTML += `<a href="detail.html?id=${post.id}">
                                    <article>
                                    <img src="${post.acf.heading_img.url}" alt="" class="post-img">
                                    <div class="post-text">
                                    <h3>${post.title.rendered}</h3>
                                    ${post.content.rendered}
                                    </div>
                                    <ul class="tags"></ul>
                                    </article>
                                    </a>`
    }
}

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

                                btnView.style.display = "none";
                                contain.style.display = "none";

                                postExplore.innerHTML += `<a href="detail.html?id=${result.id}">
                                                        <article>
                                                        <img src="${resultImg}" alt="" class="post-img">
                                                        <div class="post-text">
                                                        <h3>${result.title.rendered}</h3>
                                                        ${result.content.rendered}
                                                        </div>
                                                        <ul class="tags"></ul>
                                                        </article>
                                                        </a>`
                            }
                        })
                    })
                }
            })
            
            if(this.innerText === "All") {
                contain.style.display = "block";
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



// finn en måte å la alle vises på som standard og på knapp
// 1. Funksjon: lag HTML. Hvis du trykker på "All" - kjør den funksjonen.
// 2. Trykker på en filterknapp - lag ny html