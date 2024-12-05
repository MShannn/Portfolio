document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        let index = 0;
        const slides = slider.querySelector('.slides');
        const images = slides.querySelectorAll('.slider-image');
        const totalSlides = Math.ceil(images.length / 3); // Calculate total visible groups of 3

        slider.querySelector('.left').addEventListener('click', () => {
            index = (index > 0) ? index - 1 : totalSlides - 1;
            slides.style.transform = `translateX(-${index * 100}%)`;
        });

        slider.querySelector('.right').addEventListener('click', () => {
            index = (index + 1) % totalSlides;
            slides.style.transform = `translateX(-${index * 100}%)`;
        });

        images.forEach(img => {
            img.addEventListener('click', (e) => {
                openModal(e.target.src);
            });
        });
    });

    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeModalBtn = document.querySelector('.close-modal');

    function openModal(src) {
        modal.style.display = 'block';
        modalImg.src = src;
        captionText.textContent = src;
    }

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const leftArrow = document.querySelector(".slider-arrow.left");
    const rightArrow = document.querySelector(".slider-arrow.right");
    const slides = document.querySelector(".review-slides");
    const images = document.querySelectorAll(".review-image");

    let currentIndex = 0; // Keeps track of the current slide
    const totalImages = images.length;
    const slideWidth = images[0].clientWidth + 20; // Width of one image + margin

    // Function to update the position of the slides
    function updateSlidePosition() {
        slides.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    }

    // Function to move to the next slide (right arrow)
    function moveToNextSlide() {
        currentIndex++;
        if (currentIndex >= totalImages) {
            currentIndex = 0; // Loop back to the first image when reaching the last one
        }
        updateSlidePosition();
    }

    // Function to move to the previous slide (left arrow)
    function moveToPrevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalImages - 1; // Loop back to the last image when at the first one
        }
        updateSlidePosition();
    }

    // Right arrow click event
    rightArrow.addEventListener("click", moveToNextSlide);

    // Left arrow click event
    leftArrow.addEventListener("click", moveToPrevSlide);

    // Automatically move to the next slide every 3 seconds
    setInterval(moveToNextSlide, 3000); // Change 3000 to adjust the time interval (in milliseconds)

    // Initialize the slider position
    updateSlidePosition();
});



