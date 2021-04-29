function getApi () {
    let urlPost = fetch("https://grafs.no/wp-json/wp/v2/posts?per_page=20");
    let urlTag = fetch("https://grafs.no/wp-json/wp/v2/tags?per_page=20");

    try {

    Promise.all([urlPost, urlTag])
    .then(values => Promise.all(values.map(value => value.json())))
    .then(finalValue => {
        let urlResponse = finalValue[0];
        let tagResponse = finalValue[1];

        latestPosts(urlResponse);
        createPost(urlResponse, tagResponse);
        console.log(urlResponse)
    })
}   catch (error) {
        console.error(error);
    }
};

getApi();

// function getTag(urlResponse, tagResponse) {

//     for (let i = 0; i < urlResponse.length; i++) {
//         let tagged = urlResponse[i].tags;

//         tagged.filter(t => {
//             tagResponse.forEach(e => {
//                 if(e.id === t) {
//                     return `<p>${e.name}</p>`
//                 }
//         })
//     })
// }};

// CAROUSEL SLIDE

const sliderOne = document.querySelector("#slider-1");
const sliderTwo = document.querySelector("#slider-2");
const sliderThree = document.querySelector("#slider-3");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
let slideIndex = 1;


function latestPosts(urlResponse) {

    // Fetch new posts, 1 - 3 //

    const galleryPosts = urlResponse.slice(0, 3);

    sliderOne.innerHTML += `<img src="${galleryPosts[2].acf.heading_img.url}" alt="slider" class="slider-img">
                            <p class="gallery-text">${galleryPosts[2].acf.sub_heading}</p>`
    sliderTwo.innerHTML += `<img src="${galleryPosts[1].acf.heading_img.url}" alt="slider" class="slider-img">
                            <p class="gallery-text">${galleryPosts[1].acf.sub_heading}</p>`
    sliderThree.innerHTML += `<img src="${galleryPosts[0].acf.detail_img_wide}" alt="slider" class="slider-img">
                            <p class="gallery-text">${galleryPosts[0].acf.sub_heading}</p>`

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
        sliderOne.className = "";
        sliderTwo.className = "";
        sliderThree.className = "";

        sliderOne.classList.add("card-front")
        sliderTwo.classList.add("cards-back-right");
        sliderThree.classList.add("cards-back-left");
    }

    if (slideIndex === 0) {
        sliderTwo.className = "";
        sliderOne.className = "";
        sliderThree.className = "";
       
        sliderOne.classList.add("cards-back-right");
        sliderTwo.classList.add("cards-back-left");
        sliderThree.classList.add("card-front")
    }

    if (slideIndex === 2) {
        sliderOne.className = "";
        sliderTwo.className = "";
        sliderThree.className = "";

        sliderOne.classList.add("cards-back-left");
        sliderTwo.classList.add("card-front")
        sliderThree.classList.add("cards-back-right");
    }
};

function slideShowNext() {

    if (slideIndex === 1) {
        sliderOne.className = "";
        sliderTwo.className = "";
        sliderThree.className = "";

        sliderOne.classList.add("card-front")
        sliderTwo.classList.add("cards-back-right");
        sliderThree.classList.add("cards-back-left");
    }

    if (slideIndex === 0) {
        sliderTwo.className = "";
        sliderOne.className = "";
        sliderThree.className = "";
       
        sliderOne.classList.add("cards-back-right");
        sliderTwo.classList.add("cards-back-left");
        sliderThree.classList.add("card-front")
    }

    if (slideIndex === 2) {
        sliderOne.className = "";
        sliderTwo.className = "";
        sliderThree.className = "";

        sliderOne.classList.add("cards-back-left");
        sliderTwo.classList.add("card-front")
        sliderThree.classList.add("cards-back-right");
    }

    console.log(slideIndex)
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
    
    for (let i = 0; i < blogposts.length; i++) {
        // console.log(blogposts[i]);
        let tagged = blogposts[i].tags;
        let blog = blogposts[i];
        let list = [];

        console.log(blog.id)

        // Filter post-tags & get name //

        tagged.filter(t => {
            tagResponse.forEach(e => {
                if (e.id === t && e.name === "Asia" || e.id === t && e.name === "Adventure" || e.id === t && e.name === "Landscapes") {
                    list.push(`<li class="tag tag:before tag:after purple-tag purple-tag:before purple-tag:after purple-tag:hover:after purple-tag:hover:before purple-tag:hover">${e.name}</li>`)
                }
                
                if (e.id === t && e.name === "Culture" || e.id === t && e.name === "Animals" || e.id === t && e.name === "America") {
                    list.push(`<li class="tag tag:before tag:after sand-tag sand-tag:before sand-tag:after sand-tag:hover:after sand-tag:hover:before sand-tag:hover">${e.name}</li>`)
                }

                if (e.id === t && e.name === "Nature" || e.id === t && e.name === "Wildlife") {
                    list.push(`<li class="tag tag:before tag:after green-tag green-tag:before green-tag:after green-tag:hover:after green-tag:hover:before green-tag:hover">${e.name}</li>`)
                }

                if (e.id === t && e.name === "Europe" || e.id === t && e.name === "Beliefs" ) {
                    list.push(`<li class="tag tag:before tag:after blue-tag blue-tag:before blue-tag:after blue-tag:hover:after blue-tag:hover:before blue-tag:hover">${e.name}</li>`)
                }

                if (e.id === t && e.name === "Oceania" || e.id === t && e.name === "Traditions" || e.id === t && e.name === "Africa") {
                    list.push(`<li class="tag tag:before tag:after peach-tag peach-tag:before peach-tag:after peach-tag:hover:after peach-tag:hover:before peach-tag:hover">${e.name}</li>`)
                }
            })
        });


        posts.innerHTML += `<a href="detail.html?id=${blog.id}">
                            <article>
                            <img src="${blog.acf.heading_img.url}" alt="" class="post-img">
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
