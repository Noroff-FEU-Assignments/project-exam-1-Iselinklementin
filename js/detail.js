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
        let urlResponse = finalValue[0];
        let tagResponse = finalValue[1];

        console.log(urlResponse)
        console.log(tagResponse)
    })
}   catch (error) {
        console.error(error);
    }
};

getApiDetail();