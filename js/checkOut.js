let orders = JSON.parse(localStorage.getItem("orders")) || [];

console.log(orders);

if (orders.length > 0) {
  orders.forEach((e) => {
    let div = document.createElement("div");
    div.classList.add("order");
    div.setAttribute("data-id", e.id);
    div.setAttribute("data-order", JSON.stringify(e));
    div.innerHTML = `
    <div class="border border-primary-subtle d-flex justify-content-between p-4 mb-2 shadow">
        <div class="left">
            <h3>Order ID: <strong>${e.id}</strong></h3>
            <p>Total price: <strong>$${e.total}</strong></p>
        </div>
        <div>
          <button class="btn btn-info" id="order-info">Order Info</button>
          <button class="btn btn-danger" id="cancel">Cancel Order</button>
        </div>
    </div>
        `;
    document.querySelector("section.check-out .container").append(div);
  });
} else {
  document.querySelector(
    "section.check-out"
  ).innerHTML = `You have no orders, <a href="../pages/products.html">Buy some products</a>`;
  document.querySelector("section.check-out").style.fontSize = "30px";
}

const cancelOrderBtns = document.querySelectorAll("#cancel");

cancelOrderBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = parseInt(
      btn.parentElement.parentElement.parentElement.getAttribute("data-id")
    );
    orders = orders.filter((order) => order.id !== id);
    localStorage.setItem("orders", JSON.stringify(orders));
    btn.parentElement.parentElement.parentElement.remove();
    if (orders.length === 0) {
      document.querySelector(
        "section.check-out"
      ).innerHTML = `You have no orders, <a href="../pages/products.html">Buy some products</a>`;
      document.querySelector("section.check-out").style.fontSize = "30px";
    }
  });
});

const orderInfoBtns = document.querySelectorAll("order-info");

orderInfoBtns.forEach((btn) => {
  btn.addEventListener("click", () => {});
});

const infoBtns = document.querySelectorAll("#order-info");

infoBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const order = JSON.parse(
      btn.parentElement.parentElement.parentElement.getAttribute("data-order")
    );
    console.log(order);
    const toast = document.querySelector(".toast");
    toast.classList.add("show");
    toast.classList.add("order");
    toast.innerHTML = `
    <div class="toast-header">
      <strong class="me-auto">order ID: ${order.id}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
    </div>
    `;
    order.items.forEach((item) => {
      let div = document.createElement("div");
      div.classList.add("card-product");
      div.innerHTML = `
      <img src="${item.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <span>Price:</span>
        <p class="pr">${item.price}$</p>
        <p class="pr">Quantity: ${item.quantity}</p>
      </div>`;
      toast.querySelector(".toast-body").append(div);
    });
  });
});
