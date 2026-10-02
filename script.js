/**
 * Script Interaktif untuk Website E-Katalog UMKM Desa Paseban Kawis
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLLSPY (Highlight Menu Navigasi Sesuai Posisi Scroll)
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        // Tampilkan/Sembunyikan Tombol Kembali ke Atas
        const backToTopBtn = document.getElementById('backToTopBtn');
        if (backToTopBtn) {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });


    // 2. FITUR PENCARIAN INTERAKTIF
    const searchForm = document.querySelector('.search-form');
    const searchInput = searchForm ? searchForm.querySelector('input') : null;

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;

            let found = false;
            const searchTargets = document.querySelectorAll('section, .fitur-card');

            searchTargets.forEach(target => {
                const contentText = target.textContent.toLowerCase();
                if (contentText.includes(query) && !found) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    target.classList.add('highlight-search');
                    setTimeout(() => target.classList.remove('highlight-search'), 2200);
                    found = true;
                }
            });

            if (!found) {
                showToast('Topik pencarian tidak ditemukan. Silakan gunakan kata kunci lain.', 'warning');
            } else {
                showToast(`Pencarian untuk "<strong>${query}</strong>" ditemukan.`, 'info');
            }
        });
    }


    // 3. VALIDASI FORM & NOTIFIKASI SUKSES
    const umkmForm = document.querySelector('.umkm-form');
    if (umkmForm) {
        umkmForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const namaPemilik = document.getElementById('nama-pemilik')?.value.trim();
            const namaUmkm = document.getElementById('nama-umkm')?.value.trim();

            if (namaPemilik && namaUmkm) {
                showToast(`🎉 Terima kasih <strong>${namaPemilik}</strong>! Pendaftaran untuk <strong>${namaUmkm}</strong> berhasil dikirim.`, 'success');
                umkmForm.reset();
            } else {
                showToast('Mohon lengkapi seluruh bidang formulir yang wajib diisi.', 'danger');
            }
        });
    }


    // 4. SISTEM NOTIFIKASI TOAST FLOATING
    function showToast(message, type = 'success') {
        let toast = document.getElementById('toastNotification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastNotification';
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }

        toast.innerHTML = message;
        toast.className = `toast-notification toast-${type} show`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }


    // 5. HAMBURGER MENU NAVIGASI MOBILE
    const navbarContainer = document.querySelector('.navbar-container');
    const navMenu = document.querySelector('.nav-menu');

    if (navbarContainer && navMenu) {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-nav-toggle';
        mobileToggle.setAttribute('aria-label', 'Buka Menu Navigasi');
        mobileToggle.innerHTML = '☰';

        const logo = navbarContainer.querySelector('.logo');
        if (logo) {
            logo.after(mobileToggle);
        }

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            mobileToggle.innerHTML = navMenu.classList.contains('open') ? '✕' : '☰';
        });

        // Tutup menu otomatis setelah link diklik di mobile
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                if (mobileToggle) mobileToggle.innerHTML = '☰';
            });
        });
    }


    // 6. TOMBOL FLOATING KEMBALI KE ATAS
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('title', 'Kembali ke Atas');
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
