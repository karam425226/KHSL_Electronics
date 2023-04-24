let productsArr = JSON.parse(localStorage.getItem("products")) || [];

function addItem(name, price, image) {
  let p = {
    name: name,
    price: price,
    id: productsArr.length,
    image: image,
    quantity: 1,
  };
  productsArr.push(p);
}

const buyBtns = document.querySelectorAll("#buy-btn");

buyBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let name = btn.parentElement.parentElement.getAttribute("data-name");
    let price = btn.parentElement.parentElement.getAttribute("data-price");
    let image = btn.parentElement.parentElement.getAttribute("data-image");
    for (let i = 0; i < productsArr.length; i++) {
      if (name === productsArr[i].name) {
        alert("product is already in the cart");
        return;
      }
    }
    addItem(name, price, image);
    localStorage.setItem("products", JSON.stringify(productsArr));
    console.log(productsArr);
  });
});
