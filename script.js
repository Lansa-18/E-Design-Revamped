"use strict";

const amtAdd = document.querySelector(".amount-plus");
const amtSub = document.querySelector(".amount-minus");
const amtVal = document.querySelector(".amount-value");
const amtSubmit = document.querySelector(".amount__submit");
const cartAmt = document.querySelector(".cart-amount");

const mImg = document.querySelectorAll(".m-img");
const mImg2 = document.querySelectorAll(".m-img2");
const renderedImg = document.querySelector(".render-img");
const renderedImg2 = document.querySelector(".render-img2");

const cartIcon = document.querySelector(".img-cart");
const cartDrop = document.querySelector(".cart__dropdown");
const cartDropCont = document.querySelector(".cart__dropdown--contents");
const cartConth3 = document.querySelector(".cart__content--h3");
const cartButton = document.querySelector(".cart__content--button");

const renderedImg3 = document.querySelector(".mobile__gallery");
const mobilePrevs = document.querySelector("#prevs-div2");
const mobileNext = document.querySelector("#next-div2");

// Defining img file path of the images
const thumb1 = "/images/image-product-1-thumbnail.jpg";

const popup = document.querySelector(".popup");
const closeIcon = document.querySelector(".svg-close");
const prevsIcon = document.querySelector(".prevs-div");
const nextIcon = document.querySelector(".next-div");
const hamMenu = document.querySelector("#hamburger-menu");

const overlay = document.querySelector(".overlay");
const overlayClose = document.querySelector(".overlay__content--close");

// Implemwnting the plus sign
amtAdd.addEventListener("click", (e) => {
  e.preventDefault();
  amtVal.textContent >= 0 ? amtVal.textContent++ : 0;
});

// Implemwnting the minus sign
amtSub.addEventListener("click", (e) => {
  e.preventDefault();
  amtVal.textContent > 0 ? amtVal.textContent-- : 0;
});

// Implementing the add to cart functionality
let cartAmtHolder = [];
amtSubmit.addEventListener("click", () => {
  // setting the cart amount to be visible
  cartAmt.style.display = "block";
  cartAmtHolder.push(amtVal.textContent);
  amtVal.textContent = 0;

  // adding up all the numbers in the holders array and then storing it into a variable
  const amtTotal = cartAmtHolder.reduce((acc, amt) => acc + parseFloat(amt), 0);

  // Updating the UI based on the condition true or false of the amtTotal variable.
  amtTotal > 0
    ? ((cartAmt.textContent = amtTotal),
      cartConth3.classList.add("hidden"),
      (cartItem.style.display = "flex"),
      (cartButton.style.display = "block"))
    : ((cartAmt.style.display = "none"),
      (cartItem.style.display = "none"),
      (cartButton.style.display = "none"));

  // calling the function addToCart to display the UI in the cart.
  addToCart(cartAmt.textContent);
  cartButton.classList.remove("hidden");
});

let cartItem;
cartItem = document.createElement("div");
cartItem.classList.add("cart__content--flex");
//  Function responsibe for adding items into the cart
const addToCart = (cartamt) => {
  // calculation of the price of shoe
  const priceShoe = 125 * cartamt;

  cartItem.innerHTML = `
    <img class="img-thumb" src = ${thumb1} alt="shoe1-thumb">
    <div class="content-texts">
      <p class="p1">Fall Limited Edition Sneakers</p>
      <p class="p2">$125 x ${cartamt} = <span>$${priceShoe}.00</span></p>
    </div>
    <img class="img-delete" src="/images/icon-delete.svg" alt="icon-delete">
    `;

  cartDropCont.appendChild(cartItem);

  // Event delegation for the functionality
  cartDropCont.addEventListener("click", (e) => {
    // checking if the clicked element contains the 'img-delete' class.
    if (e.target.classList.contains("img-delete")) {
      cartItem = e.target.closest(".cart__content--flex");
      if (cartItem) {
        cartItem.remove();
        cartAmt.style.display = "none";
        cartConth3.classList.remove("hidden");
        cartButton.style.display = "none";
        cartAmtHolder = [];
      }
    }
  });
};

const changeImg = (imgNodeList, imgRender) => {
  // Implementing the img-thumbnail functionality

  imgNodeList.forEach((cur, i, arr) => {
    cur.addEventListener("click", () => {
      if (i === 0) {
        imgRender.setAttribute("src", img1);
      } else if (i === 1) {
        imgRender.setAttribute("src", img2);
      } else if (i === 2) {
        imgRender.setAttribute("src", img3);
      } else if (i === 3) {
        imgRender.setAttribute("src", img4);
      }

      // Removing the active-img class from other images
      imgNodeList.forEach((img, index) => {
        if (index !== i) {
          img.classList.remove("active-img");
        }
      });

      // Adding the active-img class to the currently clicked image
      cur.classList.add("active-img");
    });
  });
};

changeImg(mImg, renderedImg);
changeImg(mImg2, renderedImg2);

// Implementing the cart dropdown functionality
cartIcon.addEventListener("click", () => {
  cartDrop.classList.toggle("hidden");
});

// Implementing img-popup
renderedImg.addEventListener("click", () => {
  popup.classList.remove("hidden");
});

closeIcon.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// Implementing the NEXT nd PREVS icon functionality.

// creating an array containing the images that would be changing.
const img1 = "/images/image-product-1.jpg";
const img2 = "/images/image-product-2.jpg";
const img3 = "/images/image-product-3.jpg";
const img4 = "/images/image-product-4.jpg";
const newMimg2 = [img1, img2, img3, img4];

// setting a new count to keep track of the current index.
let currentImageIndex = 0;

const slideImg = (offset, arrowImg) => {
  currentImageIndex += offset;

  // Handle wrapping around the gallery.
  if (currentImageIndex < 0) {
    currentImageIndex = newMimg2.length - 1;
  } else if (currentImageIndex >= newMimg2.length) {
    currentImageIndex = 0;
  }

  // setting the source of the rendered image.
  if (arrowImg === renderedImg2) {
    renderedImg2.src = newMimg2[currentImageIndex];
  } else {
    renderedImg3.style.backgroundImage = `url(${newMimg2[currentImageIndex]})`;
  }
};

const updateThumbImgBorder = () => {
  mImg2.forEach((img, index) => {
    if (index === currentImageIndex) {
      img.classList.add("active-img");
    } else {
      img.classList.remove("active-img");
    }
  });
};

prevsIcon.addEventListener("click", () => {
  slideImg(-1, renderedImg2);
  updateThumbImgBorder();
});

nextIcon.addEventListener("click", () => {
  slideImg(1, renderedImg2);
  updateThumbImgBorder();
});

mobilePrevs.addEventListener("click", () => {
  console.log("was cliked");
  slideImg(-1, renderedImg3);
});

mobileNext.addEventListener("click", () => {
  console.log("was cliked yeah");
  slideImg(1, renderedImg3);
});

hamMenu.addEventListener("click", () => {
  overlay.style.display = "block";
});

overlayClose.addEventListener("click", function () {
  overlay.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (
    !cartDrop.classList.contains("hidden") &&
    e.target !== cartIcon &&
    !cartDrop.contains(e.target) &&
    !e.target.classList.contains("img-delete")
  ) {
    cartDrop.classList.add("hidden");
  }
});
