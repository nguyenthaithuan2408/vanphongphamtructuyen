
// main.js - Logic chung: Navbar, Search, Render Products

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  initSearch();
  initNavbarScroll();

  // Render sản phẩm nổi bật nếu đang ở trang chủ
  if (document.getElementById("featured-products")) {
    renderFeaturedProducts();
    renderCategoryCards();
  }

  // Render trang danh sách sản phẩm
  if (document.getElementById("all-products-grid")) {
    renderAllProducts();
    initFilters();
  }

  // Render trang chi tiết sản phẩm
  if (document.getElementById("product-detail-container")) {
    renderProductDetail();
  }

  // Render giỏ hàng
  if (document.getElementById("cart-table-body")) {
    renderCartPage();
    initCheckoutForm();
  }
});

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector(".main-navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

//Search
function initSearch() {
  const searchForm = document.getElementById("search-form");
  if (!searchForm) return;
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    if (query) {
      window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
  });
}

//Trang chủ: Render sản phẩm nổi bật
function renderFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;
  const featured = PRODUCTS.filter((p) => p.featured);
  container.innerHTML = featured.map(createProductCard).join("");
}

//Trang chủ: Render danh mục
function renderCategoryCards() {
  const container = document.getElementById("category-cards");
  if (!container) return;
  container.innerHTML = CATEGORIES.filter((c) => c.id !== "all")
    .map(
      (cat) => `
    <div class="col-6 col-md-3">
      <a href="products.html?category=${cat.id}" class="category-card">
        <div class="category-icon">
          <i class="fas ${cat.icon}"></i>
        </div>
        <span>${cat.label}</span>
      </a>
    </div>
  `
    )
    .join("");
}

//Trang danh sách: Render tất cả sản phẩm
let currentProducts = [...PRODUCTS];

function renderAllProducts(products = PRODUCTS) {
  const container = document.getElementById("all-products-grid");
  if (!container) return;
  currentProducts = products;

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fas fa-search fa-3x text-muted mb-3"></i>
        <h5 class="text-muted">Không tìm thấy sản phẩm phù hợp.</h5>
        <a href="products.html" class="btn btn-primary mt-2">Xem tất cả</a>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(createProductCard).join("");
  document.getElementById("product-count").textContent = `${products.length} sản phẩm`;
}

//Filters và Sort
function initFilters() {
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get("category") || "all";
  const searchParam = params.get("search") || "";

  if (searchParam) {
    document.getElementById("search-input").value = searchParam;
    const searchInfo = document.getElementById("search-info");
    if (searchInfo)
      searchInfo.textContent = `Kết quả tìm kiếm cho: "${searchParam}"`;
  }

  const catBtns = document.querySelectorAll(".category-filter-btn");
  catBtns.forEach((btn) => {
    if (btn.dataset.category === categoryParam) btn.classList.add("active");
    btn.addEventListener("click", () => {
      catBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });

  //Điều chỉnh giá
  const priceRange = document.getElementById("price-range");
  const priceDisplay = document.getElementById("price-display");
  if (priceRange) {
    priceRange.addEventListener("input", () => {
      priceDisplay.textContent = formatPrice(parseInt(priceRange.value));
      applyFilters();
    });
  }

  // Sort
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", applyFilters);
  }

  applyFilters();
}

function applyFilters() {
  const activeBtn = document.querySelector(".category-filter-btn.active");
  const selectedCat = activeBtn ? activeBtn.dataset.category : "all";
  const priceRange = document.getElementById("price-range");
  const maxPrice = priceRange ? parseInt(priceRange.value) : Infinity;
  const sortSelect = document.getElementById("sort-select");
  const sortVal = sortSelect ? sortSelect.value : "default";
  const searchInput = document.getElementById("search-input");
  const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : "";

  let filtered = PRODUCTS.filter((p) => {
    const matchCat = selectedCat === "all" || p.category === selectedCat;
    const matchPrice = p.price <= maxPrice;
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery) ||
      p.categoryLabel.toLowerCase().includes(searchQuery);
    return matchCat && matchPrice && matchSearch;
  });

  // Sort
  if (sortVal === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sortVal === "price-desc") filtered.sort((a, b) => b.price - a.price);
  else if (sortVal === "rating") filtered.sort((a, b) => b.rating - a.rating);
  else if (sortVal === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

  renderAllProducts(filtered);
}

//Trang chi tiết sản phẩm
function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const product = PRODUCTS.find((p) => p.id === id);
  const container = document.getElementById("product-detail-container");
  if (!container) return;

  if (!product) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
        <h4>Không tìm thấy sản phẩm!</h4>
        <a href="products.html" class="btn btn-primary mt-3">Quay lại cửa hàng</a>
      </div>
    `;
    return;
  }

  document.title = `${product.name} - StatioMart`;

  container.innerHTML = `
    <div class="col-md-5 mb-4">
      <div class="product-detail-img-wrap">
        ${product.badge ? `<span class="product-badge ${product.badgeClass}">${product.badge}</span>` : ""}
        <img src="${product.image}" alt="${product.name}" class="product-detail-img" id="main-img">
      </div>
    </div>
    <div class="col-md-7">
      <nav aria-label="breadcrumb" class="mb-2">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
          <li class="breadcrumb-item"><a href="products.html">Sản phẩm</a></li>
          <li class="breadcrumb-item active">${product.name}</li>
        </ol>
      </nav>
      <span class="category-tag mb-2 d-inline-block">${product.categoryLabel}</span>
      <h1 class="product-detail-name">${product.name}</h1>
      <div class="product-rating mb-2">
        <span class="stars">${renderStars(product.rating)}</span>
        <span class="rating-num">${product.rating}</span>
        <span class="reviews-count">(${product.reviews} đánh giá)</span>
      </div>
      <div class="product-detail-price mb-3">
        <span class="current-price">${formatPrice(product.price)}</span>
        ${product.originalPrice ? `
          <span class="original-price">${formatPrice(product.originalPrice)}</span>
          <span class="discount-badge">-${calcDiscount(product.price, product.originalPrice)}%</span>
        ` : ""}
      </div>
      <p class="product-description">${product.description}</p>
      <div class="product-meta mb-4">
        <div class="meta-item"><i class="fas fa-tag"></i><strong>Thương hiệu:</strong> ${product.brand}</div>
        <div class="meta-item"><i class="fas fa-warehouse"></i><strong>Còn hàng:</strong> ${product.stock} sản phẩm</div>
      </div>
      <div class="add-to-cart-section">
        <div class="quantity-control me-3">
          <button class="qty-btn qty-minus" onclick="decrementDetail()"><i class="fas fa-minus"></i></button>
          <input type="number" id="detail-qty" class="qty-input" value="1" min="1" max="${product.stock}">
          <button class="qty-btn qty-plus" onclick="incrementDetail(${product.stock})"><i class="fas fa-plus"></i></button>
        </div>
        <button class="btn btn-primary btn-add-to-cart" onclick="addToCartDetail(${product.id})">
          <i class="fas fa-shopping-cart me-2"></i>Thêm vào Giỏ
        </button>
        <a href="cart.html" class="btn btn-outline-primary btn-buy-now">
          <i class="fas fa-bolt me-2"></i>Mua Ngay
        </a>
      </div>
      <div class="policy-badges mt-4">
        <div class="policy-item"><i class="fas fa-shield-alt"></i> Bảo hành 12 tháng</div>
        <div class="policy-item"><i class="fas fa-undo"></i> Đổi trả 7 ngày</div>
        <div class="policy-item"><i class="fas fa-truck"></i> Ship toàn quốc</div>
      </div>
    </div>
  `;


  const relatedContainer = document.getElementById("related-products");
  if (relatedContainer) {
    const related = PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);
    relatedContainer.innerHTML = related.map(createProductCard).join("");
  }
}

function decrementDetail() {
  const input = document.getElementById("detail-qty");
  if (!input) return;
  const val = parseInt(input.value);
  if (val > 1) input.value = val - 1;
}

function incrementDetail(max) {
  const input = document.getElementById("detail-qty");
  if (!input) return;
  const val = parseInt(input.value);
  if (val < max) input.value = val + 1;
}

function addToCartDetail(productId) {
  const input = document.getElementById("detail-qty");
  const qty = input ? parseInt(input.value) : 1;
  if (qty < 1) return;
  addToCart(productId, qty);
}


function createProductCard(product) {
  const discount = product.originalPrice ? calcDiscount(product.price, product.originalPrice) : 0;
  return `
    <div class="col-6 col-md-4 col-lg-3 mb-4">
      <div class="product-card h-100">
        ${product.badge ? `<span class="product-badge ${product.badgeClass}">${product.badge}</span>` : ""}
        <a href="product-detail.html?id=${product.id}" class="product-img-link">
          <img src="${product.image}" alt="${product.name}" class="product-card-img" loading="lazy">
        </a>
        <div class="product-card-body">
          <span class="product-category-tag">${product.categoryLabel}</span>
          <a href="product-detail.html?id=${product.id}" class="product-title">${product.name}</a>
          <div class="product-stars">${renderStars(product.rating)}
            <small class="text-muted ms-1">(${product.reviews})</small>
          </div>
          <div class="product-price-row">
            <span class="card-price">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `
              <span class="card-original-price">${formatPrice(product.originalPrice)}</span>
              <span class="card-discount">-${discount}%</span>
            ` : ""}
          </div>
        </div>
        <div class="product-card-footer">
          <button class="btn btn-add-cart w-100" onclick="addToCart(${product.id})">
            <i class="fas fa-shopping-cart me-2"></i>Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  `;
}


function initCheckoutForm() {
  const form = document.getElementById("checkout-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    const cart = getCart();
    if (cart.length === 0) {
      showToast("Giỏ hàng của bạn đang trống!", "warning");
      return;
    }
    
    clearCart();
    renderCartPage();
    showOrderSuccess();
  });
}

function showOrderSuccess() {
  const modal = document.getElementById("order-success-modal");
  if (modal) {
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
  }
}
