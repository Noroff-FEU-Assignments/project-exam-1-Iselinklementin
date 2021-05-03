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

        latestPosts(urlResponse, media);
        createPost(urlResponse, tagResponse);
    })
}   catch (error) {
        console.error(error);
    }
};

getApi();

let sourceUrl = [];

function imageAlt(urlResponse, media) {
    media.filter(med => {
    
        urlResponse.forEach(img => {
            if(img.acf.heading_img.id === med.id) {
                let makeAlt = {
                    "url" : img.acf.heading_img.url,
                    "text" : med.alt_text
                }
                sourceUrl.push(makeAlt)
            }
        })
    })
};

// console.log(sourceUrl)

// CAROUSEL SLIDE

const sliderOne = document.querySelector("#slider-1");
const sliderTwo = document.querySelector("#slider-2");
const sliderThree = document.querySelector("#slider-3");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
let slideIndex = 1;


function latestPosts(urlResponse, media) {

    // Fetch new posts, 1 - 3 //

    imageAlt(urlResponse, media);
    // console.log(sliderOne.childNodes[0])

    const galleryPosts = urlResponse.slice(0, 3);

    sliderOne.innerHTML += `<img src="${galleryPosts[2].acf.heading_img.url}" alt="${sourceUrl[2].text}" class="slider-img">
                            <p class="gallery-text">${galleryPosts[2].acf.sub_heading}</p>`
    sliderOne.href = `detail.html?id=${galleryPosts[2].id}`;

    sliderTwo.innerHTML += `<img src="${galleryPosts[1].acf.heading_img.url}" alt="${sourceUrl[1].text}" class="slider-img">
                            <p class="gallery-text">${galleryPosts[1].acf.sub_heading}</p>`

    sliderTwo.href = `detail.html?id=${galleryPosts[1].id}`;


    sliderThree.innerHTML += `<img src="${galleryPosts[0].acf.heading_img.url}" alt="${sourceUrl[0].text}" class="slider-img">
                            <p class="gallery-text">${galleryPosts[0].acf.sub_heading}</p>`

    sliderThree.href = `detail.html?id=${galleryPosts[0].id}`;

    function previous() {
        if (slideIndex <= 0) slideIndex = galleryPosts.length;
        slideIndex--;
        slideShowPrev();
    }
    
    function nextSlide() {
        if (slideIndex >= galleryPosts.length - 1) slideIndex = -1;
        slideIndex++;
        slideShowNext();
    }
    
    next.addEventListener("click", nextSlide);
    prev.addEventListener("click", previous);
};

function slideShowPrev() {

    if (slideIndex === 1) {
        sliderOne.className = "card-front";
        sliderTwo.className = "cards-back-right";
        sliderThree.className = "cards-back-left";
    }

    if (slideIndex === 0) {
        sliderOne.className = "cards-back-right";
        sliderTwo.className = "cards-back-left";
        sliderThree.className = "card-front";
    }

    if (slideIndex === 2) {
        sliderOne.className = "cards-back-left";
        sliderTwo.className = "card-front";
        sliderThree.className = "cards-back-right";
    }
};

function slideShowNext() {

    if (slideIndex === 1) {
        sliderOne.className = "card-front";
        sliderTwo.className = "cards-back-right";
        sliderThree.className = "cards-back-left";
    }

    if (slideIndex === 0) {
        sliderOne.className = "cards-back-right";
        sliderTwo.className = "cards-back-left";
        sliderThree.className = "card-front";
    }

    if (slideIndex === 2) {
        sliderOne.className = "cards-back-left";
        sliderTwo.className = "card-front";
        sliderThree.className = "cards-back-right";
    }
};

// CLOCK COUNTDOWN

const time = document.querySelector("#time");
const trip = document.querySelector(".trip");
const line = document.querySelector(".first-line");

const deadline = 'August 1 2021';

function getTimeRemaining(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
  
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
  getTimeRemaining(deadline);

  function initializeTime(id, endtime) {

    const timeinterval = setInterval(() => {
      const t = getTimeRemaining(endtime);
      time.innerHTML =  t.days + ` : ` +
                        t.hours + ` : ` +
                        t.minutes + ` : `+ t.seconds;
      if (t.total <= 0) {
        clearInterval(timeinterval);
        line.innerText = `We are out traveling`
        time.innerText = `update is coming soon!`
      }
    },1000);
  }
  
initializeTime('clockdiv', deadline);

// POSTS

const posts = document.querySelector(".post-container");

function createPost(urlResponse, tagResponse) {

     // Fetch posts: index 3 - 6 //
    const blogposts = urlResponse.slice(3, 6);
    let altText = sourceUrl.slice(3, 6);

    for (let i = 0; i < blogposts.length; i++) {
        let tagged = blogposts[i].tags;
        let blog = blogposts[i];
        let list = [];
        let blogImg = blog.acf.heading_img.url;

        function altTextFunc() {
            for (let i = 0; i < altText.length; i++) {
                if(altText[i].url === blogImg) {
                    return altText[i].text;
                }
            }
        };

        // Filter post-tags & get name //

        tagged.filter(t => {
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

        posts.innerHTML += `<a href="detail.html?id=${blog.id}">
                            <article>
                            <img src="${blogImg}" alt="${altTextFunc()}" class="post-img">
                            <div class="post-text">
                            <h3>${blog.title.rendered}</h3>
                            ${blog.content.rendered}
                            </div>
                            <ul class="tags">${list.join("")}</ul>
                            </article>
                            </a>`
        }
};


// const formatDate = new Date(data.date).toLocaleString("en-GB", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
// });


// function styleTags(tagResponse, blog) {

//     const li = document.createElement("li");

//     for (let i = 0; i < blog.length; i++) {
//     let tag = blog[i].tags;

//     tag.filter(t => {
//         tagResponse.forEach(e => {
//             if((e.id === t) && (e.name === "Asia")) {
//                 li.classList.add("tag", "tag:before", "tag:after", "purple-tag", "purple-tag:before", "purple-tag:after","purple-tag:hover:after", "purple-tag:hover:before", "purple-tag:hover");
//                 li.innerHTML = e.name;
//                 list.push(li);
//             }
//         })
//     });
// }};
