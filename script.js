// --- 1. Slider Logic ---
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentIndex = 0;
let slideInterval = setInterval(nextSlide, 3000);

function goToSlide(index) {
    if (!dots.length) return;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    const slider = document.querySelector('.slider');
    if (slider) {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }
    currentIndex = index;
}

function nextSlide() {
    if (!slides.length) return;
    let nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
}

function prevSlide() {
    if (!slides.length) return;
    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
}

// Add listeners only if buttons exist
next?.addEventListener('click', () => { nextSlide(); resetInterval(); });
prev?.addEventListener('click', () => { prevSlide(); resetInterval(); });

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        if (!isNaN(index)) {
            goToSlide(index);
            resetInterval();
        }
    });
});

// --- 2. Hover Preview Logic ---
const cards = document.querySelectorAll('.card');
const hoverBox = document.querySelector('.hover-preview');
const preview = hoverBox?.querySelector('img');

if (hoverBox && preview) {
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const imgSrc = card.getAttribute('data-img');
            if (imgSrc) preview.src = imgSrc;
            hoverBox.classList.add('show');

            const rect = card.getBoundingClientRect();
            let top = rect.top + window.scrollY;
            let left = rect.right + 20 + window.scrollX;

            if (left + hoverBox.offsetWidth > window.innerWidth + window.scrollX) {
                left = rect.left - hoverBox.offsetWidth - 20 + window.scrollX;
            }

            hoverBox.style.top = top + 'px';
            hoverBox.style.left = left + 'px';
        });

        card.addEventListener('mouseleave', () => {
            hoverBox.classList.remove('show');
        });
    });
}

// --- 3. Menu Modal Logic ---
function showMenu(imagePath) {
    const modal = document.getElementById('menuModal');
    const menuImage = document.getElementById('menuImage');
    if (modal && menuImage) {
        menuImage.src = imagePath;
        modal.style.display = "block";
    }
}

function closeMenu() {
    const modal = document.getElementById('menuModal');
    if (modal) modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('menuModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// --- 4. Form Logic ---
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    this.style.display = 'none';
    const successBox = document.getElementById('successMessage');
    if (successBox) successBox.style.display = 'block';
});

// --- 5. Social Links (Fixed from React to Vanilla JS) ---
const socialData = [
    { name: 'facebook', icon: 'fa-facebook-f', url: '#' },
    { name: 'tiktok', icon: 'fa-tiktok', url: '#' },
    { name: 'instagram', icon: 'fa-instagram', url: '#' },
];

function renderSocialLinks() {
    const container = document.querySelector('.social-container'); // Make sure this div exists in HTML
    if (!container) return;

    const html = socialData.map(social => `
        <a href="${social.url}" class="social-btn ${social.name}">
            <i class="fab ${social.icon}"></i>
        </a>
    `).join('');

    container.innerHTML = `<div class="social-icons">${html}</div>`;
}
renderSocialLinks();

// --- 6. Mobile Nav Logic ---
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger?.addEventListener("click", () => {
    navLinks?.classList.toggle("active");
});

document.querySelectorAll(".nav-links li a").forEach(n => 
    n.addEventListener("click", () => navLinks?.classList.remove("active"))
);

const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Check if the element is entering the screen
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const infoSections = document.querySelectorAll('.info');
    infoSections.forEach(section => observer.observe(section));

//----operarional hours
function updateAllStores() {
    const now = new Date();
    const dayIndex = now.getDay(); 
    const currentTotalMin = (now.getHours() * 60) + now.getMinutes();

    document.querySelectorAll('.store-container').forEach(store => {
      const statusLabel = store.querySelector('.status-label');
      const headerTime = store.querySelector('.header-time');
      const todayRow = store.querySelector(`.day-row[data-day="${dayIndex}"]`);
      
      if (!todayRow) return;

      const timeText = todayRow.querySelector('.hours').textContent;
      const [openPart, closePart] = timeText.split(' - ');
      const [openH, openM] = openPart.split(':').map(Number);
      const [closeH, closeM] = closePart.split(':').map(Number);
      
      const openMin = (openH * 60) + openM;
      const closeMin = (closeH * 60) + (closeM || 0);

      if (currentTotalMin >= openMin && currentTotalMin < closeMin) {
        statusLabel.textContent = "Open now";
        statusLabel.style.color = "#188038";
        headerTime.textContent = timeText;
      } else {
        statusLabel.textContent = "Closed now";
        statusLabel.style.color = "#d93025";
        headerTime.textContent = `Opens at ${openPart}`;
      }

      todayRow.classList.add('current-day-highlight');
    });
  }

  updateAllStores();
  // Optional: Refresh every minute to keep the status live
  setInterval(updateAllStores, 60000);
  updateStatus();
