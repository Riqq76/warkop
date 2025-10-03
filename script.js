// script.js

// --- DATA PRODUK WARKOP51 (Ditambahkan Image URL) ---
const PRODUCTS = [
    // Menggunakan dummy URL gambar dari Unsplash
    { id: 1, category: 'Makanan', name: 'Indomie Rendang', price: 15000, image: 'rendang.jpeg' },
    { id: 2, category: 'Makanan', name: 'Indomie Soto', price: 14000, image: 'soto.jpeg' },
    { id: 3, category: 'Makanan', name: 'Roti Bakar Keju', price: 18000, image: 'roti.jpeg' },
    { id: 4, category: 'Minuman', name: 'Kopi Hitam Manual Brew', price: 20000, image: 'kopi.jpeg' },
    { id: 5, category: 'Minuman', name: 'Kopi Susu Gula Aren', price: 22000, image: 'kopi2.jpeg' },
    { id: 6, category: 'Minuman', name: 'Es Teh Jumbo', price: 10000, image: 'teh.jpeg' },
    { id: 7, category: 'Minuman', name: 'Susu Jahe Hangat', price: 16000, image: 'susu.jpeg' },
];

let cart = []; // State untuk keranjang belanja

// --- DOM ELEMENTS (Ditambahkan mobile menu buttons) ---
const loginScreen = document.getElementById('login-screen');
const mainApp = document.getElementById('main-app');
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const navLinks = document.querySelectorAll('.nav-link');
const contentContainer = document.getElementById('content-container');
const cartCountDisplay = document.getElementById('cart-count');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLogoutButton = document.getElementById('mobile-logout-button'); // Dari HTML responsif

// --- HELPER FUNCTIONS ---

const formatRupiah = (number) => {
    return 'Rp' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const updateCartCount = () => {
    cartCountDisplay.textContent = cart.length;
};

// --- FUNGSI RENDERING TENTANG KAMI ---

function renderAboutUs() {
    return `
        <div class="bg-white p-8 rounded-xl shadow-lg mt-12 border-t-4 border-coffee-accent">
            <h3 class="text-3xl font-bold text-coffee-dark mb-4">Tentang Warkop51</h3>
            <div class="md:flex md:space-x-8 items-center">
                <div class="md:w-2/3">
                    <p class="text-gray-600 mb-4 leading-relaxed">
                        Warkop51 bukan sekadar warung kopi biasa. Kami adalah rumah kedua bagi para pecinta kopi, *gamer* ringan, dan siapa pun yang mencari tempat nyaman untuk bertukar cerita. Didirikan pada tahun 2020 dengan filosofi "Kopi Enak, Harga Bersahabat," kami berkomitmen menyajikan **kopi manual brew** terbaik bersama **Indomie** dan makanan ringan andalan.
                    </p>
                    <p class="text-gray-600 leading-relaxed font-semibold">
                        Filosofi kami: Kopi, Komunitas, dan Koneksi. Mari ngopi!
                    </p>
                </div>
                <div class="md:w-1/3 mt-6 md:mt-0">
                    <img src="warkop.jpeg" alt="Foto suasana warkop" class="rounded-lg shadow-md w-full h-40 object-cover">
                </div>
            </div>
        </div>
    `;
}

// --- FUNGSI RENDERING HALAMAN ---

function renderHome() {
    return `
        <div class="text-center py-16 bg-cover bg-center rounded-lg shadow-lg" 
            style="background-image: url('https://source.unsplash.com/1200x600/?coffee,shop');"> 
            <h2 class="text-5xl font-extrabold text-white drop-shadow-lg">Selamat Datang di Warkop51</h2>
            <p class="mt-4 text-xl text-coffee-accent drop-shadow-lg">Tempat ngopi, ngobrol, dan nge-game terbaik di kota.</p>
            <button onclick="goToPage('product')" class="inline-block mt-8 bg-coffee-accent hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition duration-300">Lihat Menu Kami</button>
        </div>

        ${renderAboutUs()} 
        <section class="mt-12">
            <h3 class="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Menu Pilihan</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${PRODUCTS.slice(0, 3).map(p => `
                    <div class="bg-white p-0 rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition duration-300">
                        <img src="${p.image}" alt="${p.name}" class="w-full h-40 object-cover">
                        <div class="p-4">
                            <h4 class="font-bold text-xl mb-1 text-coffee-dark">${p.name}</h4>
                            <p class="text-gray-600 text-sm">${p.category}</p>
                            <p class="text-lg font-bold text-coffee-accent mt-2">${formatRupiah(p.price)}</p>
                            <button onclick="addToCart(${p.id})" class="mt-3 bg-coffee-accent text-white py-1 px-3 rounded-full text-sm hover:bg-orange-700 w-full">Pesan</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

function renderProduct() {
    const groupedProducts = PRODUCTS.reduce((acc, product) => {
        acc[product.category] = acc[product.category] || [];
        acc[product.category].push(product);
        return acc;
    }, {});

    let html = `<h2 class="text-4xl font-bold text-gray-800 mb-8">Daftar Menu Kami</h2>`;
    
    for (const category in groupedProducts) {
        html += `<h3 class="text-3xl font-bold text-gray-700 mt-8 mb-4 border-b pb-1">${category}</h3>`;
        // Grid responsif: 1 kolom di HP, 2 di tablet/kecil, 4 di desktop
        html += `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">`; 
        
        html += groupedProducts[category].map(p => `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:shadow-xl hover:scale-[1.02] transition duration-300">
                <img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h4 class="font-bold text-xl text-coffee-dark">${p.name}</h4>
                    <p class="text-gray-600 text-sm">${p.category}</p>
                    <p class="text-lg font-bold text-coffee-accent mt-2">${formatRupiah(p.price)}</p>
                    <button onclick="addToCart(${p.id})" class="mt-3 bg-coffee-accent text-white py-2 px-4 rounded-lg w-full hover:bg-orange-700 transition duration-150">Pesan Sekarang</button>
                </div>
            </div>
        `).join('');

        html += `</div>`;
    }

    return html;
}

function renderComplaint() {
    return `
        <div class="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg border-t-4 border-red-500">
            <h2 class="text-4xl font-bold text-gray-800 mb-6">Sampaikan Komplain Anda</h2>
            <p class="mb-6 text-gray-600">Kami menghargai masukan Anda. Silakan sampaikan kritik atau saran Anda di bawah ini.</p>
            <form id="complaint-form">
                <div class="mb-6">
                    <label class="block text-gray-700 font-bold mb-2">Detail Komplain</label>
                    <textarea rows="4" placeholder="Jelaskan masalah Anda secara rinci..." class="shadow border rounded w-full py-3 px-4 text-gray-700 focus:border-red-500 focus:ring-red-500 transition duration-150"></textarea>
                </div>
                <button type="button" onclick="alert('Komplain dummy berhasil dikirim! Kami akan segera menindaklanjuti.')" class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg w-full transition duration-150 shadow-md">
                    Kirim Komplain
                </button>
            </form>
        </div>
    `;
}

function renderContact() {
    return `
        <h2 class="text-4xl font-bold text-gray-800 mb-8">Hubungi Kami</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-lg border-t-4 border-coffee-light">
                <h3 class="text-2xl font-semibold mb-4 text-coffee-dark">Informasi Lokasi Dummy</h3>
                <p class="mb-2"><strong class="font-bold">Alamat:</strong> Jl. Dummy No. 51, Jakarta Selatan</p>
                <p class="mb-2"><strong class="font-bold">Jam Buka:</strong> 10.00 - 02.00 WIB</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-lg border-t-4 border-coffee-accent">
                <h3 class="text-2xl font-semibold mb-4 text-coffee-dark">Sosial Media</h3>
                <ul class="space-y-3">
                    <li><a href="#" class="text-blue-600 hover:underline">Facebook: @WarkopLimaSatu</a></li>
                    <li><a href="#" class="text-pink-600 hover:underline">Instagram: @warkop51_id</a></li>
                </ul>
            </div>
        </div>
    `;
}

function renderCheckout() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    let cartListHtml = cart.map((item, index) => `
        <div class="flex justify-between py-2 border-b border-gray-100 items-center">
            <span class="text-gray-700">${item.name}</span>
            <div class="flex items-center space-x-3">
                <span class="font-medium">${formatRupiah(item.price)}</span>
                <button onclick="removeItemFromCart(${index})" class="text-red-500 hover:text-red-700 text-sm">Hapus</button>
            </div>
        </div>
    `).join('');

    return `
        <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl border-t-4 border-green-600">
            <h2 class="text-4xl font-bold text-gray-800 mb-6 border-b pb-3 text-coffee-dark">Checkout Pesanan</h2>
            
            <div class="mb-6 h-64 overflow-y-auto">${cartListHtml || '<p class="text-center text-gray-500 py-10">Keranjang Anda kosong. Mari pilih menu!</p>'}</div>

            <div class="flex justify-between py-3 border-t-2 border-gray-300 text-xl font-extrabold">
                <span>TOTAL BAYAR</span>
                <span class="text-green-600">${formatRupiah(total)}</span>
            </div>

            <p class="text-sm text-gray-600 mt-4">Pesanan Anda akan segera diproses di meja kasir setelah konfirmasi.</p>
            
            <button onclick="processOrder()" ${cart.length === 0 ? 'disabled' : ''} class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-lg transition duration-150 mt-6 disabled:bg-gray-400 shadow-md">
                Konfirmasi dan Bayar
            </button>
            <button onclick="goToPage('product')" class="w-full bg-coffee-light hover:bg-coffee-dark text-white font-bold py-2 rounded-lg text-sm transition duration-150 mt-3">
                Tambah Pesanan Lain
            </button>
        </div>
    `;
}

// --- FUNGSI NAVIGASI & LOGIKA KERANJANG ---

function goToPage(pageId) {
    let contentHtml = '';
    
    switch (pageId) {
        case 'home': contentHtml = renderHome(); break;
        case 'product': contentHtml = renderProduct(); break;
        case 'complaint': contentHtml = renderComplaint(); break;
        case 'contact': contentHtml = renderContact(); break;
        case 'checkout': contentHtml = renderCheckout(); break;
        default: contentHtml = renderHome();
    }
    
    contentContainer.innerHTML = contentHtml;

    // Sembunyikan menu HP setelah navigasi
    mobileMenu.classList.add('hidden');

    // Update kelas aktif di navbar (gunakan coffee-accent)
    navLinks.forEach(link => link.classList.remove('text-coffee-accent', 'font-bold'));
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('text-coffee-accent', 'font-bold');
    }
}

function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        alert(`"${product.name}" berhasil ditambahkan ke keranjang!`);
        goToPage('checkout'); 
    }
}

function removeItemFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    goToPage('checkout'); 
}

function processOrder() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Pesanan ${cart.length} item berhasil dikonfirmasi! Total ${formatRupiah(total)}. Silakan lakukan pembayaran. (Simulasi Selesai)`);
    
    cart = []; 
    updateCartCount();
    goToPage('home'); 
}

// --- EVENT LISTENERS (Login, Logout, & Mobile Menu) ---

// Mobile Menu Toggle
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'pengguna' && password === '123') {
        loginScreen.classList.add('hidden');
        mainApp.classList.remove('hidden');
        document.getElementById('login-error').classList.add('hidden');
        goToPage('home'); 
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
});

function handleLogout() {
    mainApp.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    document.getElementById('password').value = '';
    cart = [];
    updateCartCount();
}

logoutButton.addEventListener('click', handleLogout);
mobileLogoutButton.addEventListener('click', handleLogout); // Logout dari menu HP

// Setup Navigasi
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(e.target.dataset.page);
    });
});

// Inisialisasi: Render halaman Home saat pertama kali aplikasi dimuat
document.addEventListener('DOMContentLoaded', () => {
    if (!mainApp.classList.contains('hidden')) {
         goToPage('home');
    }
});