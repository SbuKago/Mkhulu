const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentIndex = 0;
let slideInterval = setInterval(nextSlide, 3000); // auto-slide every 3s

function goToSlide(index) {
    // 1. Update the classes for dots (Visual feedback)
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    // 2. The smooth move
    // This shifts the entire row of slides left by 100% increments
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${index * 100}%)`;
    
    // 3. Update state
    currentIndex = index;
}

// Next slide
function nextSlide() {
    let nextIndex = currentIndex + 1;
    if(nextIndex >= slides.length) nextIndex = 0;
    goToSlide(nextIndex);
}

// Previous slide
function prevSlide() {
    let prevIndex = currentIndex - 1;
    if(prevIndex < 0) prevIndex = slides.length - 1;
    goToSlide(prevIndex);
}

// Event Listeners
next.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

prev.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        goToSlide(index);
        resetInterval();
    });
});

// Reset auto-slide interval when user interacts
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
}

const cards = document.querySelectorAll('.card');
const hoverBox = document.querySelector('.hover-preview');
const preview = hoverBox.querySelector('img');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const imgSrc = card.getAttribute('data-img');
        if (imgSrc) preview.src = imgSrc;

        hoverBox.classList.add('show');

        // Position hover preview smartly
        const rect = card.getBoundingClientRect();
        const hoverWidth = hoverBox.offsetWidth;
        const hoverHeight = hoverBox.offsetHeight;
        const padding = 10;

        // Calculate top
        let top = rect.top + window.scrollY;
        if (top + hoverHeight > window.innerHeight + window.scrollY) {
            top = window.innerHeight + window.scrollY - hoverHeight - padding;
        }

        // Calculate left: show right by default
        let left = rect.right + 20 + window.scrollX;

        // If it goes off right edge, show left
        if (left + hoverWidth > window.innerWidth + window.scrollX) {
            left = rect.left - hoverWidth - 20 + window.scrollX;
        }

        hoverBox.style.top = top + 'px';
        hoverBox.style.left = left + 'px';
    });

    card.addEventListener('mouseleave', () => {
        hoverBox.classList.remove('show');
    });
});

//Button menu views
function showMenu(imagePath) {
    const modal = document.getElementById('menuModal');
    const menuImage = document.getElementById('menuImage');

    menuImage.src = imagePath; // Set the image
    modal.style.display = "block"; // Show modal
}

function closeMenu() {
    const modal = document.getElementById('menuModal');
    modal.style.display = "none"; // Hide modal
}

// Close modal if clicked outside the image
window.onclick = function(event) {
    const modal = document.getElementById('menuModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//mobile
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
            // 1. Prevent the default form submission (stop page refresh)
            e.preventDefault();

            // 2. Hide the form
            document.getElementById('contactForm').style.display = 'none';

            // 3. Show the success message
            const successBox = document.getElementById('successMessage');
            successBox.style.display = 'block';

            // Optional: Log the data (or send to an API later)
            console.log("Form submitted successfully!");
        });


