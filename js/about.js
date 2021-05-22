/*
 Modal on pictures
*/

const modal = document.querySelector(".modal");
const openModal = document.querySelectorAll("#open-modal");
const closeModal = document.querySelector(".close");
const imgModal = document.querySelector(".img-modal");

openModal.forEach(open => {
    open.addEventListener("click", function () {
        modal.style.display = "block";
        imgModal.src = this.firstElementChild.src;
    })
});

closeModal.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

/*
Add loader / spinner
when waiting for images
*/

openModal.forEach(fig => {
    fig.innerHTML = `<div class="container">
                        <div class="spinner"></div>
                    </div>`
})

window.onload = () => {
    let count = 0;

    let loadImg = window.setInterval(function () {
        count++
        const sofie = document.querySelector(".sofie");
        const johan = document.querySelector(".johan");

        sofie.innerHTML = `<img src="/images/blog-girl.jpg"
                        alt="Picture of Sofie Lofiensen. She got long, blond hair and a camera in her hands.">`

        johan.innerHTML = `<img src="/images/blog-guy.jpg"
                        alt="Picture of Johan Lofiensen. He got dark, short hair and are standing in a field.">`

        if (count === 1) {
            clearInterval(loadImg);
        }
    }, 1000)
};