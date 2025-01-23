/****************************************************
 * DOM ELEMENTS
 ****************************************************/
const navMenu       = document.getElementById('nav-menu'), 
      navToggle     = document.getElementById('nav-toggle'),
      navClose      = document.getElementById('nav-close'),
      navLink       = document.querySelectorAll('.nav__link'),
      header        = document.getElementById('header'),
      scrollUpBtn   = document.getElementById('scroll-up'),
      themeButton   = document.getElementById('theme-button');

/*==================== MENU SHOW & HIDE ====================*/

// Show menu
if(navToggle){
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

// Hide menu
if(navClose){
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/** 
 * Close menu if clicking outside of it 
 * (only if it's open)
 */
document.addEventListener('click', (e) => {
  if(navMenu.classList.contains('show-menu')) {
    // Check if the click is NOT on the menu or toggle
    const withinMenu = navMenu.contains(e.target);
    const isToggle   = navToggle.contains(e.target);
    if(!withinMenu && !isToggle){
      navMenu.classList.remove('show-menu');
    }
  }
});

/**
 * Close the menu on pressing the Esc key (accessibility)
 */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && navMenu.classList.contains('show-menu')){
    navMenu.classList.remove('show-menu');
  }
});

/*==================== REMOVE MENU MOBILE ON LINK CLICK ====================*/
navLink.forEach(n => n.addEventListener('click', () => {
  navMenu.classList.remove('show-menu');
}));


/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader  = document.querySelectorAll('.skills__header');

/**
 * Load stored accordion states from localStorage
 */
(function loadAccordionState(){
  const storedStates = JSON.parse(localStorage.getItem('accordionStates') || '[]');
  [...skillsContent].forEach((content, idx) => {
    if(storedStates[idx] === 'open'){
      content.className = 'skills__content skills__open';
    } else {
      content.className = 'skills__content skills__close';
    }
  });
})();

/**
 * Toggle the accordion, and store states in localStorage
 */
function toggleSkills(){
  let itemClass = this.parentNode.className;
  // Close all
  for(let i = 0; i < skillsContent.length; i++){
    skillsContent[i].className = 'skills__content skills__close';
  }
  // Open the one clicked if it was closed
  if(itemClass === 'skills__content skills__close'){
    this.parentNode.className = 'skills__content skills__open';
  }
  
  // Store the new state
  saveAccordionStates();
}

/**
 * Save accordion states to localStorage
 */
function saveAccordionStates(){
  let states = [];
  [...skillsContent].forEach(content => {
    if(content.classList.contains('skills__open')){
      states.push('open');
    } else {
      states.push('close');
    }
  });
  localStorage.setItem('accordionStates', JSON.stringify(states));
}

skillsHeader.forEach(el => {
  el.addEventListener('click', toggleSkills);
});


/*==================== QUALIFICATION TABS ====================*/
const tabs        = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab =>{
  tab.addEventListener('click', () =>{
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach(tc =>{
      tc.classList.remove('qualification__active');
      tc.style.display = 'none';
    });
    target.classList.add('qualification__active');
    target.style.display = 'block';

    tabs.forEach(t =>{
      t.classList.remove('qualification__active');
    });
    tab.classList.add('qualification__active');
  });
});


/*==================== QUALIFICATION MODAL ====================*/
const qmodalViews   = document.querySelectorAll('.qualification__modal'),
      qmodalBtns    = document.querySelectorAll('.qualification__button-modal'),
      qmodalCloses  = document.querySelectorAll('.qualification__modal-close');

/**
 * Show the specified modal
 */
let qmodal = function(modalClick){
  qmodalViews[modalClick].classList.add('active-modal');
};

qmodalBtns.forEach((btn,i) =>{
  btn.addEventListener('click', () =>{
    qmodal(i);
  });
});

/**
 * Close all modals
 */
function closeAllQmodals() {
  qmodalViews.forEach(view => {
    view.classList.remove('active-modal');
  });
}

qmodalCloses.forEach(close =>{
  close.addEventListener('click', closeAllQmodals);
});

/** 
 * Close modals on pressing Esc
 */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    closeAllQmodals();
  }
});

/**
 * Close if user clicks outside any modal
 */
document.addEventListener('click', (e) => {
  qmodalViews.forEach(view => {
    if(view.classList.contains('active-modal')) {
      const insideModal = view.querySelector('.qualification__modal-content').contains(e.target);
      if(!insideModal){
        view.classList.remove('active-modal');
      }
    }
  });
});


/*==================== PORTFOLIO / BLOG SWIPER  ====================*/
// If you're using the Swiper library, you can configure more advanced options below:
let swiper = new Swiper('.swiper-container', {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // Additional advanced features:
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
});


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
  const scrollY = window.pageYOffset;
  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
          sectionTop    = current.offsetTop - 50,
          sectionId     = current.getAttribute('id');

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.add('active-link');
    }else{
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);


/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
  if(window.scrollY >= 80){
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
}
window.addEventListener('scroll', scrollHeader);


/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
  if(window.scrollY >= 560){
    scrollUpBtn.classList.add('show-scroll');
  } else {
    scrollUpBtn.classList.remove('show-scroll');
  }
}
window.addEventListener('scroll', scrollUp);


/*==================== DARK/LIGHT THEME ====================*/ 
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Previously selected theme (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon  = localStorage.getItem('selected-icon');

// Detect user’s system preference if no preference was saved
if(!selectedTheme){
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(userPrefersDark) {
    document.body.classList.add(darkTheme);
    themeButton.classList.add(iconTheme);
    localStorage.setItem('selected-theme', 'dark');
    localStorage.setItem('selected-icon', 'uil-moon');
  }
} else {
  // We have a saved preference
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

/**
 * Get current theme and icon
 */
const getCurrentTheme = () => 
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => 
  themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// Activate / deactivate the theme manually
themeButton.addEventListener('click', () => {
  // Add smooth transition
  document.body.classList.add('theme-transition');
  window.setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 300);

  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // Save the current theme and icon in localStorage
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});


/*==================== INTERSECTION OBSERVER FOR FADE-IN SECTIONS ====================*/
/**
 * This will observe elements with `.fade-in-section` class 
 * and add a `visible` class once they’re in view.
 */
const fadeInSections = document.querySelectorAll('.fade-in-section');
const options = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      obs.unobserve(entry.target); // Stop observing once visible
    }
  });
}, options);

// Attach observer to each targeted section
fadeInSections.forEach(sec => observer.observe(sec));


/*==================== OPTIONAL: SIMPLE TYPING ANIMATION EXAMPLE ====================*/
/**
 * This is just a fun extra: a little typing effect in an element 
 * with the class .typed-text, cycling through an array of strings.
 */
const typedTextElement = document.querySelector('.typed-text');
const textArray = ['Front-End Developer', 'UX/UI Enthusiast', 'Open to Collaborations'];
let arrayIndex = 0;
let charIndex = 0;
let typingDelay = 150;
let erasingDelay = 80;
let newTextDelay = 1000; // Delay between current and next text

function type() {
  if(typedTextElement){
    if (charIndex < textArray[arrayIndex].length) {
      typedTextElement.textContent += textArray[arrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }
}

function erase() {
  if(typedTextElement){
    if (charIndex > 0) {
      typedTextElement.textContent = textArray[arrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      arrayIndex++;
      if(arrayIndex >= textArray.length) arrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }
}

// Start the typing effect on DOM load (or wherever you want)
window.addEventListener('DOMContentLoaded', () => {
  if(typedTextElement){
    setTimeout(type, newTextDelay + 250);
  }
});
