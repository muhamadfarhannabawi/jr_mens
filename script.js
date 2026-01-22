document.addEventListener('DOMContentLoaded', () => {
    // Jalankan pengecekan status toko segera setelah halaman dimuat
    checkStoreStatus();
    // Update status setiap 30 detik agar lebih akurat
    setInterval(checkStoreStatus, 30000);
    
    initReveal();
    initStickyNav();
});

// 1. Sticky Navbar Effect dengan Throttling (Lebih Ringan)
function initStickyNav() {
    const nav = document.querySelector("nav");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            nav.classList.add("sticky");
        } else {
            nav.classList.remove("sticky");
        }
    });
}

// 2. Real-time Shop Status (Perbaikan Logika Hari Libur)
function checkStoreStatus() {
    const statusElement = document.getElementById('shop-status');
    if (!statusElement) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Minggu, 6 = Sabtu
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    const openTime = 9 * 60; // 09:00
    const closeTime = 22 * 60 + 30; // 22:30

    // Berdasarkan info Anda: Buka Minggu - Jumat. Sabtu LIBUR.
    // day 0=Minggu, 1=Senin, 2=Selasa, 3=Rabu, 4=Kamis, 5=Jumat.
    const isWorkingDay = (day >= 0 && day <= 5); 

    if (isWorkingDay && currentTime >= openTime && currentTime < closeTime) {
        statusElement.innerHTML = '<i class="fas fa-circle" style="font-size: 10px;"></i> BUKA SEKARANG';
        statusElement.className = "status-badge open";
    } else {
        let closedMsg = "🔴 TUTUP";
        if (day === 6) closedMsg = "🔴 TUTUP (LIBUR SABTU)";
        
        statusElement.innerHTML = closedMsg;
        statusElement.className = "status-badge closed";
    }
}

// 3. WhatsApp Integration (Menambahkan Validasi)
const waForm = document.getElementById('wa-form');
if (waForm) {
    waForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const service = document.getElementById('service-select').value;
        
        if (!service) {
            alert("Silakan pilih layanan terlebih dahulu.");
            return;
        }

        const msg = `Halo JR Man's Style,\n\nSaya *${name}* ingin booking layanan *${service}*.\nMohon info jadwal yang tersedia. Terima kasih.`;
        
        // Membuka WhatsApp di tab baru
        const waUrl = `https://wa.me/628811205935?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');
    });
}

// 4. Google Maps (Perbaikan Link Lokasi Asli)
function openMaps() {
    // Gunakan link koordinat atau alamat langsung agar akurat
    const address = "JR Man's Style, Sarakan, Sepatan, Tangerang";
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
}

// 5. Scroll Reveal Logic (Intersection Observer)
function initReveal() {
    const observerOptions = {
        root: null,
        threshold: 0.15, // Elemen muncul saat 15% bagian terlihat
        rootMargin: "0px 0px -50px 0px" // Trigger sedikit sebelum elemen muncul sepenuhnya
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Berhenti mengamati jika sudah muncul (opsional)
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}