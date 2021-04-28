const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

function getApiDetail () {
    let urlPost = fetch("https://grafs.no/wp-json/wp/v2/posts/" + id);
    let urlTag = fetch("https://grafs.no/wp-json/wp/v2/tags/");

    try {

    Promise.all([urlPost, urlTag])
    .then(values => Promise.all(values.map(value => value.json())))
    .then(finalValue => {
        let place = finalValue[0];
        let tag = finalValue[1];

        createIntro(place, tag);

        // console.log(place)
        console.log(tag)
    })
}   catch (error) {
        console.error(error);
    }
};

getApiDetail();

const intro = document.querySelector(".intro-text");
const heading = document.querySelector("h1");
const subheading = document.querySelector("h2");
const tags = document.querySelector(".tags");
const headImg = document.querySelector(".header-img");
const ingress = document.querySelector(".ingress");
const para = document.querySelector(".ingress-text");
let list = [];

function createIntro(place, tag) {
    tagsStyle(place, tag);

    console.log(place.acf.subtext)

    // INTRO 

    heading.innerHTML += place.acf.sub_heading;
    tags.innerHTML += list;
    tags.insertAdjacentHTML("afterend", place.content.rendered);
    headImg.src = place.acf.heading_img.sizes.large;

    // INGRESS

    subheading.innerHTML += place.acf.sub_heading_1;
    para.innerText += place.acf.subtext;
    // subheading.insertAdjacentElement("afterbegin", place.acf.subtext);


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
}