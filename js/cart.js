let productsArr = JSON.parse(localStorage.getItem("products")) || [];
let ordersArr = JSON.parse(localStorage.getItem("orders")) || [];

if (productsArr.length > 0) {
  productsArr.forEach((e) => {
    let div = document.createElement("div");
    div.classList.add("card");
    div.setAttribute("data-name", e.name);
    div.innerHTML = `
    <div>
        <div class="image"><img src="${e.image}" /></div>
        <div class="name">${e.name}</div>
        <div class="price">$${e.price}</div >
    </div>
    <div class="input">
        <button id="minus"><i class="fa-solid fa-minus"></i></button>
        <input type="number" min="0">
        <button id="plus"><i class="fa-solid fa-plus"></i></button>
    </div>
    <div><button id="delete-product" class="btn btn-danger">Delete Prodcut</button></div>
    `;
    document.querySelector(".cart .container").append(div);
    div.querySelector(".input input").value = 1;
  });
  updateTotal();
} else {
  document.querySelector(
    ".cart .container"
  ).innerHTML = `Cart is empty, <a href="../pages/products.html">Buy some products</a>`;
  document.querySelector(".cart .container").style.fontSize = "30px";
  document.querySelector(".cart .total").style.display = "none";
}

function updateTotal() {
  const pricesDivs = document.querySelectorAll(".price");
  const numberOfItemsDivs = document.querySelectorAll(".input input");
  let total = 0;
  for (let i = 0; i < pricesDivs.length; i++) {
    total +=
      parseFloat(pricesDivs[i].textContent.slice(1)) *
      parseFloat(numberOfItemsDivs[i].value);
  }
  document.querySelector(".total-price").innerHTML = `total price: $${total}`;
  return total;
}

const plusBtns = document.querySelectorAll("#plus");
const minusBtns = document.querySelectorAll("#minus");

plusBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.previousElementSibling.value++;
    for (let i = 0; i < productsArr.length; i++) {
      if (
        btn.parentElement.parentElement.getAttribute("data-name") ===
        productsArr[i].name
      ) {
        productsArr[i].quantity++;
      }
    }
    updateTotal();
  });
});

minusBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (parseInt(btn.nextElementSibling.value) === 0) return;
    btn.nextElementSibling.value--;
    for (let i = 0; i < productsArr.length; i++) {
      if (
        btn.parentElement.parentElement.getAttribute("data-name") ===
        productsArr[i].name
      ) {
        productsArr[i].quantity--;
      }
    }
    updateTotal();
  });
});

const checkOutBtn = document.getElementById("check-out");
console.log(checkOutBtn);
checkOutBtn.addEventListener("click", () => {
  let ordersCount = 0;
  if (ordersArr.length > 0) {
    ordersCount = ordersArr[ordersArr.length - 1].id;
  }
  let order = {
    total: updateTotal(),
    items: productsArr.filter((p) => p.quantity > 0),
    id: ordersCount + 1,
  };
  if (order.total === 0) {
    return;
  }
  ordersArr.push(order);
  localStorage.setItem("orders", JSON.stringify(ordersArr));
  document.querySelector(".cart").innerHTML = `
      <div class="container">
        <div class="toast-container position-static ms-auto me-auto mt-4">
          <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
            <i class="fa-solid fa-circle-check"></i>
              <strong class="me-auto">order ID: ${ordersCount + 1}</strong>
              <small class="text-body-secondary">just now</small>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
              Your order has been saved
            </div>
          </div>
        </div>
      </div>`;
  localStorage.removeItem("products");
});


const deleteProductsBtns = document.querySelectorAll("#delete-product")

deleteProductsBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const productName = btn.parentElement.parentElement.getAttribute("data-name");
    productsArr = productsArr.filter(product => productName !== product.name);
    setLocalStorage();
    updateTotal();
    btn.parentElement.parentElement.remove();
  })
})

function setLocalStorage() {
  localStorage.setItem("products", JSON.stringify(productsArr));
}