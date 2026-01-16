document.addEventListener('DOMContentLoaded', () => {
    checkStoreStatus();
    setInterval(checkStoreStatus, 60000);
    initReveal();
});

// 1. Sticky Navbar Effect
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 100);
});

// 2. Real-time Shop Status
function checkStoreStatus() {
    const statusElement = document.getElementById('shop-status');
    const now = new Date();
    const day = now.getDay(); 
    const time = now.getHours() * 60 + now.getMinutes();

    const openTime = 9 * 60; // 09:00
    const closeTime = 22 * 60 + 30; // 22:30

    const isWorkingDay = (day >= 0 && day <= 5); // Sun-Fri

    if (isWorkingDay && time >= openTime && time < closeTime) {
        statusElement.innerHTML = "🟢 BUKA";
        statusElement.className = "status-badge open";
    } else {
        statusElement.innerHTML = "🔴 TUTUP";
        statusElement.className = "status-badge closed";
    }
}

// 3. WhatsApp Integration
document.getElementById('wa-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const service = document.getElementById('service-select').value;
    const msg = `Halo JR Man's Style, saya ${name} ingin booking untuk ${service}.`;
    window.open(`https://wa.me/628811205935?text=${encodeURIComponent(msg)}`, '_blank');
});

// 4. Google Maps
function openMaps() {
    window.open("https://www.google.com/maps/search/JR+Man's+Style+You+Sarakan+Sepatan", '_blank');
}

// 5. Scroll Reveal Logic
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}