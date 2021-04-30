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

        console.log(tagResponse)
    })
}   catch (error) {
        console.error(error);
    }
};

getApi();

// Knapper til tags
// Filtrer tags med rikitg navn til knapper
// Onclick på knapper - filtrer navn.id mot posts
// Lag posts

// finn en måte å la alle vises på som standard og på knapp
// 1. Funksjon: lag HTML. Hvis du trykker på "All" - kjør den funksjonen.
// 2. Trykker på en filterknapp - lag ny html