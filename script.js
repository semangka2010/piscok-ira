const products = [
    {
        id: 1,
        name: "Melt Roll Matcha",
        desc: "Varian rasa matcha pilihan yang manis dan lembut dengan aroma teh hijau khas.",
        image: "assets/produk1.jpg",
        priceNumber: 10000,
        priceText: "Rp 10.000"
    },
    {
        id: 2,
        name: "Melt Roll Cokelat",
        desc: "Lelehan cokelat kaya rasa berpadu sempurna dengan kelembutan gulungan roll.",
        image: "assets/produk2.jpg",
        priceNumber: 10000,
        priceText: "Rp 10.000"
    },
    {
        id: 3,
        name: "Melt Roll Taro",
        desc: "Sensasi rasa taro yang unik, creamy, dan menggugah selera di setiap gigitan.",
        image: "assets/produk3.jpg",
        priceNumber: 10000,
        priceText: "Rp 10.000"
    }
];

const productGrid = document.getElementById('productGrid');

function renderProducts() {
    if (!productGrid) return;
    
    productGrid.innerHTML = products.map(product => `
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="product-card">
                <div class="product-img-wrapper">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80'">
                    <div class="price-badge">${product.priceText} / pcs</div>
                </div>
                <div class="card-body p-3.5 d-flex flex-column justify-content-between flex-grow-1">
                    <div>
                        <h5 class="fw-bold mb-1 fs-6">${product.name}</h5>
                        <p class="text-muted small mb-3" style="font-size: 0.82rem; line-height: 1.4;">${product.desc}</p>
                    </div>
                    <div>
                        <div class="d-flex align-items-center justify-content-between quantity-box mb-2.5">
                            <label for="qty-${product.id}" class="small fw-bold text-success mb-0" style="font-size: 0.78rem;">Jumlah (Pcs):</label>
                            <input type="number" id="qty-${product.id}" class="form-control form-control-sm text-center fw-bold border-0 bg-white rounded-2" style="width: 55px; height: 28px; padding: 0;" value="1" min="1" max="100">
                        </div>
                        <button class="btn btn-success rounded-pill w-100 fw-bold py-2 shadow-sm small" style="font-size: 0.82rem;" onclick="orderWhatsApp('${product.name}', ${product.priceNumber}, ${product.id})">
                            <i class="bi bi-whatsapp me-1"></i> Pesan Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function orderWhatsApp(productName, price, id) {
    const qtyInput = document.getElementById(`qty-${id}`);
    const quantity = parseInt(qtyInput.value) || 1;
    const total = price * quantity;
    const formattedTotal = total.toLocaleString('id-ID');

    const phone = "6281262895243";
    const message = `Halo Kak, saya ingin memesan:\n\n*${productName}*\nJumlah: ${quantity} pcs\nTotal Harga: Rp ${formattedTotal}\n\nMohon informasi ketersediaan dan cara pembayarannya. Terima kasih!`;
    
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

const commentForm = document.getElementById('commentForm');
const commentsContainer = document.getElementById('commentsContainer');

commentForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('commenterName').value.trim();
    const text = document.getElementById('commentText').value.trim();

    if(name && text) {
        const newComment = document.createElement('div');
        newComment.className = 'card p-3 mb-3 custom-box';
        newComment.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="fw-bold mb-0 text-dark small">${escapeHtml(name)}</h6>
                <span class="text-warning small">★★★★★</span>
            </div>
            <p class="text-muted small mb-0">"${escapeHtml(text)}"</p>
        `;

        commentsContainer.prepend(newComment);
        commentForm.reset();
        alert('Terima kasih! Ulasan Anda berhasil ditambahkan.');
    }
});

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

document.addEventListener('DOMContentLoaded', renderProducts);