// TypeWriter effect
class TypeWriter {
  constructor(txtElement, words, wait) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into Element
    this.txtElement.innerHTML = `<span>${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed = 80;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // make pause at end
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init TypeWriter
const txtElement = document.querySelector('#typewriter-inner');
const words = JSON.parse(txtElement.getAttribute('data-words'));
const wait = txtElement.getAttribute('data-wait');
new TypeWriter(txtElement, words, wait);

// Init Smooth scroll
let scroll = new SmoothScroll('a[href*="#"]', {
  offset: 50,
});

// Set Goto top button
const gotoTopBtn = document.querySelector('#btn-goto-top');
window.onscroll = () => scrollFunction();

// Set Modal DOM
const modalFrame = document.querySelector('.modal');
const modal1 = document.querySelector('#modal-1');
const modal2 = document.querySelector('#modal-2');
const modal3 = document.querySelector('#modal-3');

// Add eventListener to window to call call close modal function
window.addEventListener('click', (e) => clickOutside(e));

// Prevent image drag
const imgs = document.getElementsByTagName('img');
for (let img of imgs) {
  img.ondragstart = () => {
    return false;
  };
}

// Check if scrollTop is greater than 20 and display gotoTopBtn
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    gotoTopBtn.style.display = 'block';
  } else {
    gotoTopBtn.style.display = 'none';
  }
}

// @param {num} modal number
// Remove css utility class 'hidden' from modal
function showModal(num) {
  modalFrame.classList.remove('hidden');
  switch (num) {
    case 1:
      modal1.classList.remove('hidden');
      break;
    case 2:
      modal2.classList.remove('hidden');
      break;
    case 3:
      modal3.classList.remove('hidden');
      break;
    default:
      break;
  }

  slideIndex = 1;
  showSlide(1, 1);
  showSlide(2, 1);
  showSlide(3, 1);
}

// Add css utility class 'hidden' to modal
function closeModal() {
  modalFrame.classList.add('hidden');
  modal1.classList.add('hidden');
  modal2.classList.add('hidden');
  modal3.classList.add('hidden');
}

// Check user clicked on modal frame
function clickOutside(e) {
  if (e.target === modalFrame) {
    closeModal();
  }
}

// slide show
let slideIndex = 1;

function prevSlide(slideshowNum) {
  showSlide(slideshowNum, --slideIndex);
}

function nextSlide(slideshowNum) {
  showSlide(slideshowNum, ++slideIndex);
}

function showSlide(slideshowNum, slideNum) {
  const slides = document.querySelectorAll(`#slideshow-${slideshowNum} .slide`);

  if (slideNum <= 0) {
    slideNum = slides.length;
    slideIndex = slideNum;
  }
  if (slideNum > slides.length) {
    slideNum = 1;
    slideIndex = slideNum;
  }

  for (let slide of slides) {
    slide.classList.add('hidden');
  }
  slides[slideNum - 1].classList.remove('hidden');

  const indicators = document.querySelectorAll(
    `#slideshow-${slideshowNum} .circle`
  );
  for (let indicator of indicators) {
    indicator.classList.remove('fa-circle');
    indicator.classList.add('fa-circle-o');
  }
  indicators[slideNum - 1].classList.add('fa-circle');
}
