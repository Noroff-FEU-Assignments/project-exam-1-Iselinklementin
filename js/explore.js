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
const blogOneTop = document.querySelector(".blog-one-top");
const blogTwoTop = document.querySelector(".blog-two-top");
const standardPosts = document.querySelector(".posts-standard");
const smallOne = document.querySelector(".blog-small-one");
const smallTwo = document.querySelector(".blog-small-two");
const blogOneBottom = document.querySelector(".blog-one-hidden");
const blogTwoBottom = document.querySelector(".blog-two-hidden");
const standardPostsBottom = document.querySelector(".posts-standard-hidden");

const btnView = document.querySelector("button");

function createArticles(urlResponse, tagResponse, media) {

    // for(let i = 0; i < urlResponse.length; i++) {
        console.log(urlResponse)
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


        blogOneTop.innerHTML += `<a href="detail.html?id="${urlResponse[1].id}">
        <figure>
        <img src="${urlResponse[1].acf.heading_img.url}" alt="">
        </figure>
        <div class="split-content">
        ${urlResponse[1].content.rendered}
        <p class="paragraph">Explore</p>
        <h3>${urlResponse[1].acf.place}</h3>
        </div>
        </a>`

        blogTwoTop.innerHTML += `<a href="detail.html?id="${urlResponse[2].id}">
        <figure>
        <img src="${urlResponse[2].acf.heading_img.url}" alt="">
        </figure>
        <div class="split-content">
        ${urlResponse[2].content.rendered}
        <p class="paragraph">Explore</p>
        <h3>${urlResponse[2].acf.place}</h3>
        </div>
        </a>`

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

        const smallContainer = document.querySelector(".wrap-two-small-posts");
        const smallPost = urlResponse.slice(6, 8);
    
        for (let i = 0; i < urlResponse.length; i++) {
            
            let test = smallPost[0];
            let test1 = smallPost[1];
    
            smallOne.innerHTML += `<a href="detail.html?id="${test.id}">
                                    <figure>
                                    <img src="${test.acf.heading_img.url}" alt="" class="post-img">
                                    </figure>
                                    <div class="text-wrap">
                                    <h3>${test.acf.place}</h3>
                                    </div>
                                    </a>`
    
            smallTwo.innerHTML += `<a href="detail.html?id="${test1.id}">
                                    <figure>
                                    <img src="${test1.acf.heading_img.url}" alt="" class="post-img">
                                    </figure>
                                    <div class="text-wrap">
                                    <h3>${test1.acf.place}</h3>
                                    </div>
                                    </a>`
                                    break;
        }

        const firstToggle = urlResponse.slice(8, 10)

        for(let i = 0; i < firstToggle.length; i++) {
    
            let first = firstToggle[0];
            let second = firstToggle[1];
    
            blogOneBottom.innerHTML += `<a href="detail.html?id="${first.id}">
                                        <figure>
                                        <img src="${firstToggle[0].acf.heading_img.url}" alt="">
                                        </figure>
                                        <div class="split-content">
                                        ${firstToggle[0].content.rendered}
                                        <p class="paragraph">Explore</p>
                                        <h3>${firstToggle[0].acf.place}</h3>
                                        </div>
                                        </a>`
        
            blogTwoBottom.innerHTML += `<a href="detail.html?id="${firstToggle[1].id}">
                                        <figure>
                                        <img src="${firstToggle[1].acf.heading_img.url}" alt="">
                                        </figure>
                                        <div class="split-content">
                                        ${firstToggle[1].content.rendered}
                                        <p class="paragraph">Explore</p>
                                        <h3>${firstToggle[1].acf.place}</h3>
                                        </div>
                                        </a>`
                                        break;
        } 
    // }
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

/*     for (let i = 0; i < urlResponse.length; i++) {
        
        console.log(urlResponse[0].id)

        blogOneTop.innerHTML += `<a href="detail.html?id="${urlResponse[0].id}">
                                <figure>
                                <img src="${urlResponse[0].acf.heading_img.url}" alt="">
                                </figure>
                                <div class="split-content">
                                ${urlResponse[0].content.rendered}
                                <p class="paragraph">Explore</p>
                                <h3>${urlResponse[0].acf.place}</h3>
                                </div>
                                </a>`

        blogTwoTop.innerHTML += `<a href="detail.html?id="${urlResponse[1].id}">
                                <figure>
                                <img src="${urlResponse[1].acf.heading_img.url}" alt="">
                                </figure>
                                <div class="split-content">
                                ${urlResponse[1].content.rendered}
                                <p class="paragraph">Explore</p>
                                <h3>${urlResponse[1].acf.place}</h3>
                                </div>
                                </a>`

    }

    const standardBlog = urlResponse.slice(2, 5);

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

    const smallContainer = document.querySelector(".wrap-two-small-posts");
    const smallPost = urlResponse.slice(7, 9);

    for (let i = 0; i < urlResponse.length; i++) {
        
        let test = smallPost[0];
        let test1 = smallPost[1];

        smallOne.innerHTML += `<a href="detail.html?id="${test.id}">
                                <figure>
                                <img src="${test.acf.heading_img.url}" alt="" class="post-img">
                                </figure>
                                <div class="text-wrap">
                                <h3>${test.acf.place}</h3>
                                </div>
                                </a>`

        smallTwo.innerHTML += `<a href="detail.html?id="${test1.id}">
                                <figure>
                                <img src="${test1.acf.heading_img.url}" alt="" class="post-img">
                                </figure>
                                <div class="text-wrap">
                                <h3>${test1.acf.place}</h3>
                                </div>
                                </a>`
                                break;
    }

    const firstToggle = urlResponse.slice(10, 12)

    for(let i = 0; i < firstToggle.length; i++) {

        let first = firstToggle[0];
        let second = firstToggle[1];

        blogOneBottom.innerHTML += `<a href="detail.html?id="${first.id}">
                                    <figure>
                                    <img src="${firstToggle[0].acf.heading_img.url}" alt="">
                                    </figure>
                                    <div class="split-content">
                                    ${firstToggle[0].content.rendered}
                                    <p class="paragraph">Explore</p>
                                    <h3>${firstToggle[0].acf.place}</h3>
                                    </div>
                                    </a>`
    
        blogTwoBottom.innerHTML += `<a href="detail.html?id="${firstToggle[1].id}">
                                    <figure>
                                    <img src="${firstToggle[1].acf.heading_img.url}" alt="">
                                    </figure>
                                    <div class="split-content">
                                    ${firstToggle[1].content.rendered}
                                    <p class="paragraph">Explore</p>
                                    <h3>${firstToggle[1].acf.place}</h3>
                                    </div>
                                    </a>`
                                    break;
    } */






// ${result[0].acf.heading_img.url}

// ${list.join("")}
// ${altTextFunc()}

const tag = document.querySelectorAll(".tag");
const article = document.querySelector(".test");

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
                createArticles(urlResponse, tagResponse, media);
            }
        })
    })
};


// Knapper til tags
// Filtrer tags med rikitg navn til knapper
// Onclick på knapper - filtrer navn.id mot posts
// Lag posts

// finn en måte å la alle vises på som standard og på knapp
// 1. Funksjon: lag HTML. Hvis du trykker på "All" - kjør den funksjonen.
// 2. Trykker på en filterknapp - lag ny html