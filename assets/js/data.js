
// data.js - Mock Data sản phẩm văn phòng phẩm


const PRODUCTS = [
  {
    id: 1,
    name: "Bộ Bút Bi Cao Cấp 12 Màu",
    category: "but",
    categoryLabel: "Bút",
    price: 85000,
    originalPrice: 120000,
    image: "assets/images/products/pen-set.png",
    rating: 4.8,
    reviews: 124,
    badge: "Bán Chạy",
    badgeClass: "badge-bestseller",
    description: "Bộ bút bi cao cấp 12 màu với mực viết mượt mà, không lem, phù hợp cho học sinh và nhân viên văn phòng. Vỏ nhựa cao cấp, bền chắc, cầm thoải mái. Thích hợp cho ghi chú, tô màu sơ đồ, và phân loại tài liệu.",
    stock: 50,
    brand: "Thiên Long",
    featured: true
  },
  {
    id: 2,
    name: "Sổ Tay Bìa Cứng A5 Dotted",
    category: "so-tay",
    categoryLabel: "Sổ Tay",
    price: 95000,
    originalPrice: 130000,
    image: "assets/images/products/notebook.png",
    rating: 4.9,
    reviews: 89,
    badge: "Mới",
    badgeClass: "badge-new",
    description: "Sổ tay bìa cứng A5 với trang chấm (dotted) lý tưởng cho bullet journaling, sketching, và ghi chú sáng tạo. Giấy 120gsm không thấm mực, 200 trang, bìa da PU cao cấp màu xanh teal hiện đại.",
    stock: 35,
    brand: "Moleskine Style",
    featured: true
  },
  {
    id: 3,
    name: "Bộ Marker 24 Màu Chuyên Nghiệp",
    category: "but",
    categoryLabel: "Bút",
    price: 220000,
    originalPrice: 280000,
    image: "assets/images/products/marker-set.png",
    rating: 4.7,
    reviews: 56,
    badge: "Giảm 21%",
    badgeClass: "badge-sale",
    description: "Bộ marker 24 màu với đầu bút đôi (fine & brush), mực gốc nước không phai mờ, màu sắc rực rỡ. Lý tưởng cho vẽ tranh, thiết kế, calligraphy và trang trí sổ. Hộp đựng trong suốt tiện lợi.",
    stock: 20,
    brand: "Stabilo Style",
    featured: true
  },
  {
    id: 4,
    name: "Hộp Bút Mèo Dễ Thương",
    category: "dung-cu",
    categoryLabel: "Dụng Cụ",
    price: 55000,
    originalPrice: 75000,
    image: "assets/images/products/pencil-case.png",
    rating: 4.6,
    reviews: 203,
    badge: "Yêu Thích",
    badgeClass: "badge-favorite",
    description: "Hộp bút dây kéo họa tiết mèo siêu dễ thương trong tông màu pastel hồng. Làm từ chất liệu vải canvas bền chắc, dễ vệ sinh. Kích thước vừa phải chứa được 20-30 cây bút/chì.",
    stock: 80,
    brand: "Cute Design",
    featured: true
  },
  {
    id: 5,
    name: "Bộ Compa & Thước Kẻ Hình Học",
    category: "dung-cu",
    categoryLabel: "Dụng Cụ",
    price: 45000,
    originalPrice: 60000,
    image: "assets/images/products/ruler-set.png",
    rating: 4.5,
    reviews: 147,
    badge: "Phổ Biến",
    badgeClass: "badge-popular",
    description: "Bộ dụng cụ hình học đầy đủ bao gồm: eke 30cm, 2 thước tam giác, thước đo độ 180°, và compa kim loại chính xác cao. Hộp nhựa trong suốt bảo vệ dụng cụ. Chuẩn cho học sinh THCS, THPT.",
    stock: 60,
    brand: "Maped",
    featured: false
  },
  {
    id: 6,
    name: "Giấy Ghi Chú Nhiều Màu Sắc",
    category: "van-phong",
    categoryLabel: "Văn Phòng",
    price: 35000,
    originalPrice: 45000,
    image: "assets/images/products/sticky-notes.png",
    rating: 4.4,
    reviews: 312,
    badge: "Tiết Kiệm",
    badgeClass: "badge-economy",
    description: "Bộ giấy ghi chú dính (sticky notes) 6 màu sắc rực rỡ, bộ 600 tờ (6 tập x 100 tờ). Kích thước 76x76mm tiêu chuẩn, keo dán chất lượng cao - dính tốt nhưng bóc dễ dàng không để lại dấu vết.",
    stock: 150,
    brand: "Post-it Style",
    featured: false
  },
  {
    id: 7,
    name: "Bút Chì 2B Hộp 12 Cây",
    category: "but",
    categoryLabel: "Bút",
    price: 28000,
    originalPrice: 35000,
    image: "assets/images/products/pen-set.png",
    rating: 4.3,
    reviews: 98,
    badge: null,
    badgeClass: null,
    description: "Bút chì 2B chất lượng cao, ruột chì mềm cho nét vẽ đậm mượt, lý tưởng cho phác thảo và tô bóng. Vỏ gỗ tự nhiên, có thể gọt dễ dàng. Hộp 12 cây tiết kiệm.",
    stock: 100,
    brand: "Thiên Long",
    featured: false
  },
  {
    id: 8,
    name: "Sổ Tay Bìa Da A6 Mini",
    category: "so-tay",
    categoryLabel: "Sổ Tay",
    price: 65000,
    originalPrice: 85000,
    image: "assets/images/products/notebook.png",
    rating: 4.7,
    reviews: 67,
    badge: "Hot",
    badgeClass: "badge-hot",
    description: "Sổ tay A6 nhỏ gọn bìa da tổng hợp cao cấp, dễ dàng bỏ túi quần hoặc túi xách. 160 trang giấy trắng 80gsm, có bookmark vải. Hoàn hảo để ghi chú nhanh, ý tưởng, hoặc làm journal nhỏ.",
    stock: 45,
    brand: "Field Notes Style",
    featured: false
  },
  {
    id: 9,
    name: "Băng Dính Washi Tape Họa Tiết",
    category: "van-phong",
    categoryLabel: "Văn Phòng",
    price: 42000,
    originalPrice: 55000,
    image: "assets/images/products/sticky-notes.png",
    rating: 4.8,
    reviews: 175,
    badge: "Trendy",
    badgeClass: "badge-new",
    description: "Set 6 cuộn washi tape họa tiết độc đáo, màu sắc tươi sáng. Chất liệu giấy Nhật, dễ xé, không gây bong tróc khi bóc. Dùng để trang trí sổ tay, bao bì quà, bookmark, và scrapbook.",
    stock: 70,
    brand: "MT Style",
    featured: false
  },
  {
    id: 10,
    name: "Tẩy Kỹ Thuật Cao Cấp 5 Cái",
    category: "dung-cu",
    categoryLabel: "Dụng Cụ",
    price: 22000,
    originalPrice: 30000,
    image: "assets/images/products/ruler-set.png",
    rating: 4.2,
    reviews: 234,
    badge: null,
    badgeClass: null,
    description: "Tẩy kỹ thuật cao cấp tẩy sạch không ố vàng giấy, không để lại dấu vết bụi tẩy. Chất liệu PVC cao cấp, mềm mịn. Bộ 5 cái đa kích thước: 2 cái lớn, 2 cái vừa, 1 cái nhỏ chính xác.",
    stock: 200,
    brand: "Milan",
    featured: false
  },
  {
    id: 11,
    name: "Bút Highlight Pastel 6 Màu",
    category: "but",
    categoryLabel: "Bút",
    price: 48000,
    originalPrice: 65000,
    image: "assets/images/products/marker-set.png",
    rating: 4.6,
    reviews: 88,
    badge: "Mới",
    badgeClass: "badge-new",
    description: "Bộ bút highlight (bộc màu) 6 màu pastel nhẹ nhàng không chói mắt. Mực gốc nước không nhòe khi viết đè lên bút lông. Đầu bút đôi: đầu sweeper rộng và đầu fineliner 0.6mm. Lý tưởng cho sinh viên và dân văn phòng.",
    stock: 55,
    brand: "Stabilo Boss",
    featured: true
  },
  {
    id: 12,
    name: "Kẹp Bảng Và Kẹp Giấy Set",
    category: "van-phong",
    categoryLabel: "Văn Phòng",
    price: 38000,
    originalPrice: 50000,
    image: "assets/images/products/ruler-set.png",
    rating: 4.1,
    reviews: 45,
    badge: null,
    badgeClass: null,
    description: "Bộ kẹp văn phòng đa năng gồm 1 kẹp bảng A4 (clipboard) màu đen + 24 cái kẹp giấy các cỡ (bướm và gấu). Kẹp bảng lò xo kim loại chắc, mặt nhựa ABS chịu lực cao. Cần thiết cho mọi văn phòng.",
    stock: 40,
    brand: "Office Basic",
    featured: false
  }
];

//Danh mục sản phẩm
const CATEGORIES = [
  { id: "all", label: "Tất Cả", icon: "fa-th-large" },
  { id: "but", label: "Bút Viết", icon: "fa-pen" },
  { id: "so-tay", label: "Sổ Tay", icon: "fa-book" },
  { id: "dung-cu", label: "Dụng Cụ HT", icon: "fa-ruler" },
  { id: "van-phong", label: "Văn Phòng", icon: "fa-briefcase" }
];

//Helper: Định dạng giá tiền VNĐ
function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

//Helper: Render sao đánh giá
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    '<i class="fas fa-star"></i>'.repeat(full) +
    (half ? '<i class="fas fa-star-half-alt"></i>' : "") +
    '<i class="far fa-star"></i>'.repeat(empty)
  );
}

//Helper: Tính phần trăm giảm giá
function calcDiscount(price, originalPrice) {
  return Math.round((1 - price / originalPrice) * 100);
}
