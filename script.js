// 1. Toggle Menu Navigasi Mobile
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// 2. Penghitung Keranjang Belanja Interaktif
let totalItems = 0;
const cartCountEl = document.getElementById('cartCount');
const cartButton = document.getElementById('cartButton');
const addButtons = document.querySelectorAll('.add-to-cart');

addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    totalItems += 1;
    cartCountEl.textContent = totalItems;

    // Umpan balik visual sementara pada tombol
    const originalText = button.textContent;
    button.textContent = 'Ditambahkan ✓';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 800);
  });
});

cartButton.addEventListener('click', () => {
  if (totalItems === 0) {
    alert('Keranjang belanja Anda masih kosong.');
  } else {
    alert(`Saat ini terdapat ${totalItems} produk di keranjang Anda.`);
  }
});

// 3. Filter Kategori Produk
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Perbarui status tombol aktif
    filterButtons.forEach((item) => item.classList.remove('active'));
    btn.classList.add('active');

    const selectedCategory = btn.getAttribute('data-filter');

    productCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');
      if (selectedCategory === 'semua' || cardCategory === selectedCategory) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// 4. Validasi Form Berlangganan (Newsletter)
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const formFeedback = document.getElementById('formFeedback');

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailValue = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValue) {
    formFeedback.textContent = 'Alamat email tidak boleh kosong.';
    formFeedback.className = 'form-feedback error';
    return;
  }

  if (!emailPattern.test(emailValue)) {
    formFeedback.textContent = 'Format email tidak valid (contoh: nama@email.com).';
    formFeedback.className = 'form-feedback error';
    return;
  }

  formFeedback.textContent = `Terima kasih! Promo dikirim ke ${emailValue}.`;
  formFeedback.className = 'form-feedback success';
  emailInput.value = '';
});