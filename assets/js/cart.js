
//cart.js - Quản lý giỏ hàng với LocalStorage

const CART_KEY = "stationery_cart";

//CRUD Operations

//Lấy giỏ hàng từ LocalStorage
function getCart() {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

//Lưu giỏ hàng vào LocalStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

//Thêm sản phẩm vào giỏ hàng (Create)
function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex((item) => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, "success");
}

//Cập nhật số lượng sản phẩm (Update)
function updateCartQuantity(productId, newQty) {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === productId);
  if (index === -1) return;

  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }
  cart[index].quantity = newQty;
  saveCart(cart);
  updateCartBadge();
}

//Xóa sản phẩm khỏi giỏ hàng (Delete)
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartBadge();
}

//Xóa toàn bộ giỏ hàng
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

//Tính tổng tiền
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

//Tổng số sản phẩm trong giỏ
function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

//UI Updates

//Cập nhật badge số lượng trên icon giỏ hàng trong navbar
function updateCartBadge() {
  const count = getCartItemCount();
  const badges = document.querySelectorAll(".cart-badge");
  badges.forEach((badge) => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}

//Toast notification
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `custom-toast toast-${type}`;

  const iconMap = {
    success: "fa-check-circle",
    error: "fa-times-circle",
    info: "fa-info-circle",
    warning: "fa-exclamation-circle",
  };

  toast.innerHTML = `
    <i class="fas ${iconMap[type] || "fa-info-circle"} toast-icon"></i>
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

//Render Trang Giỏ Hàng
function renderCartPage() {
  const cart = getCart();
  const cartTableBody = document.getElementById("cart-table-body");
  const cartEmpty = document.getElementById("cart-empty");
  const cartContent = document.getElementById("cart-content");

  if (!cartTableBody) return;

  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.style.display = "block";
    if (cartContent) cartContent.style.display = "none";
    return;
  }

  if (cartEmpty) cartEmpty.style.display = "none";
  if (cartContent) cartContent.style.display = "flex";

  cartTableBody.innerHTML = cart
    .map(
      (item) => `
    <tr class="cart-row" data-id="${item.id}">
      <td>
        <div class="cart-product-info">
          <img src="${item.image}" alt="${item.name}" class="cart-product-img">
          <div>
            <div class="cart-product-name">${item.name}</div>
          </div>
        </div>
      </td>
      <td class="text-center fw-bold text-primary">${formatPrice(item.price)}</td>
      <td class="text-center">
        <div class="quantity-control">
          <button class="qty-btn qty-minus" onclick="changeQty(${item.id}, -1)">
            <i class="fas fa-minus"></i>
          </button>
          <input type="number" class="qty-input" value="${item.quantity}"
            min="1" onchange="setQty(${item.id}, this.value)" id="qty-${item.id}">
          <button class="qty-btn qty-plus" onclick="changeQty(${item.id}, 1)">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </td>
      <td class="text-center fw-bold text-danger">${formatPrice(item.price * item.quantity)}</td>
      <td class="text-center">
        <button class="btn btn-outline-danger btn-sm remove-btn" onclick="removeItem(${item.id})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  `
    )
    .join("");

  updateCartSummary();
}

function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  const newQty = item.quantity + delta;
  updateCartQuantity(productId, newQty);
  renderCartPage();
}

function setQty(productId, value) {
  const newQty = parseInt(value);
  if (isNaN(newQty) || newQty < 1) {
    renderCartPage();
    return;
  }
  updateCartQuantity(productId, newQty);
  renderCartPage();
}

function removeItem(productId) {
  removeFromCart(productId);
  renderCartPage();
  showToast("Đã xóa sản phẩm khỏi giỏ hàng.", "info");
}

function updateCartSummary() {
  const cart = getCart();
  const subtotal = getCartTotal();
  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const el = (id) => document.getElementById(id);
  if (el("cart-subtotal")) el("cart-subtotal").textContent = formatPrice(subtotal);
  if (el("cart-shipping")) el("cart-shipping").textContent = shipping === 0 ? "Miễn phí" : formatPrice(shipping);
  if (el("cart-total")) el("cart-total").textContent = formatPrice(total);
  if (el("cart-count")) el("cart-count").textContent = `${getCartItemCount()} sản phẩm`;
}
