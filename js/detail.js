const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

function getApiDetail () {
    let urlPost = fetch("https://grafs.no/wp-json/wp/v2/posts/" + id);
    let urlTag = fetch("https://grafs.no/wp-json/wp/v2/tags/");
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
    imageAlt(place, media);

    // INTRO 

    const heading = document.querySelector("h1");
    const subheading = document.querySelector("h2");
    const tags = document.querySelector(".tags");
    const headImg = document.querySelector(".header-img");

    heading.innerHTML += place.acf.sub_heading;
    tags.innerHTML += list;
    tags.insertAdjacentHTML("afterend", place.content.rendered);
    headImg.src = place.acf.heading_img.sizes.large;
    headImg.alt = sourceUrl[5].text;

    // INGRESS

    const para = document.querySelector(".ingress-text");
    const map = document.querySelector(".map-img");
    const budget = document.querySelector(".budget");

    subheading.innerHTML += place.acf.sub_heading_1;
    para.innerText += place.acf.subtext;
    map.src = place.acf.country_mapmap.sizes.large;
    map.alt = sourceUrl[4].text;
    budget.innerHTML += place.acf.budget;

    // BODYTEXT

    const bodytext = document.querySelector(".bodytext");
    const figOne = document.querySelector(".fig-one");
    const figTwo = document.querySelector(".fig-two");
    const figThree = document.querySelector(".fig-three");
    const figFour = document.querySelector(".fig-four");
    const captionOne = document.querySelector(".fig-one-caption");
    const captionTwo = document.querySelector(".fig-two-caption");
    const topFigure = document.querySelector(".top-figure")

    bodytext.insertAdjacentHTML("afterbegin", place.acf.detailed_text);
    topFigure.insertAdjacentHTML("afterend", place.acf.detailed_text_3);
    figOne.src = place.acf.detail_img.url
    figOne.alt = sourceUrl[3].text;
    figTwo.src = place.acf.detail_img_2.url;
    figTwo.alt = sourceUrl[2].text;
    figThree.src = place.acf.detail_img_wide.url;
    figThree.alt = sourceUrl[1].text;
    figFour.src = place.acf.detail_img_small.url;
    figFour.alt = sourceUrl[0].text;

    captionOne.innerHTML += place.acf.imagetext;
    captionTwo.innerHTML+= place.acf.imagetext;
};

const modal = document.querySelector(".modal");
const openModal = document.querySelectorAll("#open-modal");
const closeModal = document.querySelector(".close");
const imgModal = document.querySelector(".img-modal");
const modalCaption = document.querySelector(".caption");


let sourceUrl = [];

function imageAlt(place, media) {
    media.filter(med => {

        if(place.acf.country_mapmap.id === med.id) {
            let makeAlt = {
                "url" : place.acf.country_mapmap.url,
                "text" : med.alt_text
            }
            sourceUrl.push(makeAlt)
        }

        if(place.acf.detail_img.id === med.id) {

            let makeAlt = {
                "url" : place.acf.detail_img.url,
                "text" : med.alt_text
            }
            sourceUrl.push(makeAlt)
        }

        if (place.acf.detail_img_2.id === med.id) {

            let makeAlt = {
                "url" : place.acf.detail_img_2.url,
                "text" : med.alt_text
            }
            sourceUrl.push(makeAlt)
        }

        if (place.acf.detail_img_small.id === med.id) {

            let makeAlt = {
                "url" : place.acf.detail_img_small.url,
                "text" : med.alt_text
            }
            sourceUrl.push(makeAlt)
        }

        if (place.acf.detail_img_wide.id === med.id) {

            let makeAlt = {
                "url" : place.acf.detail_img_wide.url,
                "text" : med.alt_text
            }
            sourceUrl.push(makeAlt)
        }

        if (place.acf.heading_img.id === med.id) {

            let makeAlt = {
                "url" : place.acf.heading_img.url,
                "text" : med.alt_text
            }
            sourceUrl.push(makeAlt)
        }
    })
};

console.log(sourceUrl)

openModal.forEach(open => {
    open.addEventListener("click", function() {
        modal.style.display = "block";
        imgModal.src = this.firstElementChild.src;

        sourceUrl.forEach(item => {
            if (item.url === this.firstElementChild.src) {
                modalCaption.innerText = item.text;
                // console.log(sourceUrl)
        }
        })
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
};