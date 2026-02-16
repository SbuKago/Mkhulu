const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentIndex = 0;
let slideInterval = setInterval(nextSlide, 3000); // auto-slide every 3s

function goToSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    document.querySelector('.slider').style.transform = `translateX(-${index * 100}%)`;
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
