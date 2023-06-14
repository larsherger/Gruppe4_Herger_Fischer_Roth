function nextSlide(slideshowId) {
  var slides = document.querySelectorAll('#' + slideshowId + ' .slide');
  var activeSlide = document.querySelector('#' + slideshowId + ' .slide.active');
  
  var currentIndex = Array.prototype.indexOf.call(slides, activeSlide);
  var nextIndex = (currentIndex + 1) % slides.length;
  
  activeSlide.classList.remove('active');
  slides[nextIndex].classList.add('active');
}