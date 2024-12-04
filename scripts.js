document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slider-image');
    const totalSlides = images.length;
    let currentIndex = 0;

    // Function to change slide
    function showSlide(index) {
        const imageWidth = images[0].offsetWidth + 10; // width of an image + gap
        slides.style.transform = `translateX(-${index * imageWidth}px)`;  // Adjust based on image width and gap
    }

    // Left arrow click handler
    document.querySelector('.left').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;  // Wrap around when reaching first image
        showSlide(currentIndex);
    });

    // Right arrow click handler
    document.querySelector('.right').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;  // Wrap around when reaching last image
        showSlide(currentIndex);
    });

    // Automatically cycle through the images every 3 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }, 3000);
});
