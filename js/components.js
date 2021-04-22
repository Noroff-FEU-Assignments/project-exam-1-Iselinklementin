const modal = document.querySelector(".modal");
const openModal = document.querySelectorAll("[data-open]");
const closeModal = document.querySelectorAll("[data-close]");
const buyBtn = document.querySelectorAll("#buy");

// CLOSE MODAL AND CHANGE ADD-BUTTON //
 
for(let i = 0; i < openModal.length; i++) {
  openModal[i].addEventListener("click", function() {
    modal.style.display = "flex";
  });
};

let counter = 0;

for (let i = 0; i < closeModal.length; i++) {
    closeModal[i].addEventListener("click", function() {
      modal.style.display = "none";
      
      setInterval(function() {
        counter++;

        if(counter === 2) {
          clearInterval();

          buyBtn.forEach(btn => {
            btn.innerText = "Add to cart";
            btn.style.backgroundColor = "orange";
            btn.style.color = "black";
            btn.style.border = "var(--primary-color-btn-border)";
          })
        }
      },1000);
    });
  };

  window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";

        setInterval(function() {
        counter++;

        if(counter === 2) {
          clearInterval();

          buyBtn.forEach(btn => {
            btn.innerText = "Add to cart";
            btn.style.backgroundColor = "orange";
            btn.style.color = "black";
            btn.style.border = "var(--primary-color-btn-border)";
          })
        }
      },1000);
    }
  }

   // ADDED TO CART BUTTONS //

  buyBtn.forEach(btn => {
    btn.addEventListener("click", e => {
      btn.innerText = "Added";
      btn.style.border = "var(--secondary-border-purple)";
      btn.style.backgroundColor = "var(--secondary-color-purple)";
      btn.style.color = "white";
    })
  });

  // ERROR //

  function displayError (message = "Ops! Something went wrong.") {
    return `<div class="error">${message}</div>`;
};