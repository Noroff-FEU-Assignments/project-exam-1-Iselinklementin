const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id)

function getApiDetail () {
    let urlPost = fetch("https://grafs.no/wp-json/wp/v2/posts/" + id);
    let urlTag = fetch("https://grafs.no/wp-json/wp/v2/tags?per_page=20");
    let urlMedia = fetch("https://grafs.no/wp-json/wp/v2/media?per_page=100");

    try {

    Promise.all([urlPost, urlTag, urlMedia])
    .then(values => Promise.all(values.map(value => value.json())))
    .then(finalValue => {
        let place = finalValue[0];
        let tag = finalValue[1];
        let media = finalValue[2];

        createIntro(place, tag, media);
    })
}   catch (error) {
        console.error(error);
    }
};

getApiDetail();

let list = [];

function createIntro(place, tag, media) {
    tagsStyle(place, tag);

    // INTRO 
    const title = document.querySelector("title");
    const breadcrumbs = document.querySelectorAll(".location");
    const heading = document.querySelector("h1");
    const subheading = document.querySelector("h2");
    const tags = document.querySelector(".tags");
    const headImg = document.querySelector(".header-img");

    title.innerText = place.acf.place;
    heading.innerHTML += place.acf.sub_heading;
    tags.innerHTML += list;
    tags.insertAdjacentHTML("afterend", place.content.rendered);
    headImg.src = place.acf.heading_img.url;

    breadcrumbs.forEach(location => {
        location.innerText = place.acf.place;
    })

    // INGRESS

    const para = document.querySelector(".ingress-text");
    const map = document.querySelector(".map-img");
    const budget = document.querySelector(".budget");
    const budgetDesktop = document.querySelector(".desktop-budget");

    subheading.innerHTML += place.acf.sub_heading_1;
    para.innerText += place.acf.subtext;
    map.src = place.acf.country_mapmap.url;
    budget.innerHTML += place.acf.budget;
    budgetDesktop.innerHTML += place.acf.detailed_text_2;

    // BODYTEXT

    const bodytext = document.querySelector(".bodytext");

    const figOne = document.querySelector(".fig-one");
    const figTwo = document.querySelector(".fig-two");
    const figThree = document.querySelector(".fig-three");
    const figFour = document.querySelector(".fig-four");

    const captionOne = document.querySelector(".fig-one-caption");
    const captionTwo = document.querySelector(".fig-two-caption");
    const topFigure = document.querySelector(".top-figure");
    const textContainer = document.querySelector(".text-container");

    const captionOneDesktop = document.querySelector(".fig-one-desktop-caption");
    const figOneDesktop = document.querySelector(".fig-one-desktop");
    const figWideDesktop = document.querySelector(".fig-wide-desktop");
    const desktopTextBottom = document.querySelector(".desktop-text");
 

    figOneDesktop.src = place.acf.detail_img.url
    captionOneDesktop.innerHTML += place.acf.imagetext;
    figWideDesktop.src = place.acf.detail_img_wide.url;
    desktopTextBottom.innerHTML = place.acf.detailed_text_3;

    figOne.src = place.acf.detail_img.url
    captionOne.innerHTML += place.acf.imagetext;

    figTwo.src = place.acf.detail_img_2.url;
    captionTwo.innerHTML += place.acf.imagetext;

    figThree.src = place.acf.detail_img_wide.url;
    figFour.src = place.acf.detail_img_small.url;

    textContainer.innerHTML = place.acf.detailed_text_3;
    bodytext.insertAdjacentHTML("afterbegin", place.acf.detailed_text);

    // function setWidthDesktop() {
    //     if (window.innerWidth > 650) { 
    //     } 
    // }
    
    // function setWidthMobile() {
    //     if (window.innerWidth < 649) {
    //     }
    // }
    
    // window.addEventListener("resize", setWidthDesktop)
    // window.addEventListener("resize", setWidthMobile)


    // ADD ALT-TEXT TO IMAGES

    const imgAlt = document.querySelectorAll(".img");

    media.filter(mediaAlt => {
        imgAlt.forEach(img => {
            if(mediaAlt.source_url === img.src) {
                 img.alt = mediaAlt.alt_text;
            }
        })
    })
};

const modal = document.querySelector(".modal");
const openModal = document.querySelectorAll("#open-modal");
const closeModal = document.querySelector(".close");
const imgModal = document.querySelector(".img-modal");
const modalCaption = document.querySelector(".caption");

openModal.forEach(open => {
    open.addEventListener("click", function() {
        modal.style.display = "block";
        imgModal.src = this.firstElementChild.src;
        modalCaption.innerText = this.firstElementChild.alt;
    })
});

closeModal.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function tagsStyle(place, tag) {
    place.tags.filter(t => {
        tag.forEach(e => {
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
};