const modal = document.querySelector(".modal");
const openModal = document.querySelectorAll("#open-modal");
const closeModal = document.querySelector(".close");
const imgModal = document.querySelector(".img-modal");
// const modalCaption = document.querySelector(".caption");

openModal.forEach(open => {
    open.addEventListener("click", function() {
        modal.style.display = "block";
        imgModal.src = this.firstElementChild.src;
        // modalCaption.innerText = this.firstElementChild.alt;
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