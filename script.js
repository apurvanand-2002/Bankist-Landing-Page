'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const tabs = document.querySelectorAll('.operations__tab')
// console.log(tabs);
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav');

btnsOpenModal.forEach(function (btn) {
  return btn.addEventListener('click', openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// console.log(document.documentElement)
// console.log(document.head)
// console.log(document.body)
const allSections = document.querySelectorAll('.section');
// console.log(allSections)
//querySelector, getElementById, getElementsByClassName, gelElementsByTagName, createElement
const message = document.createElement('div');
message.classList.add('cookie-message')
message.innerHTML =
  'We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>'
// header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true))
// header.before(message);
// header.after(message);

// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//   // message.remove();
//   message.parentElement.removeChild(message)
// })
// message.style.backgroundColor = '#37383d';
// message.style.width = '104%';
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
// message.style.height = parseFloat(getComputedStyle(message).height) + 40 + 'px';

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect())
  // console.log(window.pageXOffset, pageYOffset);

  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({ behavior: 'smooth' })
})

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
// const id = this.getAttribute('href');
// console.log(id);
// document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// })

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    // console.log('LINK');
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})

const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)
// console.log(h1.children)
// h1.firstElementChild.style.color = 'white'
// h1.lastElementChild.style.color = 'white'
// console.log(h1.parentNode)
// console.log(h1.parentElement)
// h1.closest('.header').style.background = 'var(--gradient-secondary)'
// h1.closest('h1').style.background = 'var(--gradient-primary)'
// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)
// console.log(h1.parentElement.children)



// tabs.forEach(function (t) {
//   t.addEventListener('click', function (e) {
//     console.log('Tab');
//   })
// })
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')
  // console.log(clicked);
  if (!clicked) {
    return;
  }
  tabs.forEach(function (t) {
    t.classList.remove('operations__tab--active');
  })
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(function (t) {
    t.classList.remove('operations__content--active');
  })
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    // console.log(this);
    const link = e.target;
    // console.log(link)
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    })
  }
}
nav.addEventListener('mouseover', (e) => handleHover(e, 0.5))
nav.addEventListener('mouseout', (e) => handleHover(e, 1));


// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);
//   if (this.window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   }
//   else {
//     nav.classList.remove('sticky');
//   }
// })

// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   })
// }
// const obsOption = {
//   root: null,
//   threshold: [0, 0.2],
// }
// const observer = new IntersectionObserver(obsCallback, obsOption);
// observer.observe(section1);

// const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect();
// console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting)
    nav.classList.add('sticky');
  else
    nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight.height}px`,
});
headerObserver.observe(header);


const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets)
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  // observer.unobserve(entry.target);
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');

  });
}
const imgObservers = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(function (img) {
  imgObservers.observe(img);
});


const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;
const dotContainer = document.querySelector('.dots');
const maxSlide = slides.length;

// const slider = document.querySelector('.slider')
// slider.style.transform = 'scale(0.5) translateX(-800px)';
// slider.style.overflow = 'visible';

// slides.forEach(function (s, i) {
//   s.style.transform = `translateX(${i * 100}%)`;
// })
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML('beforeend',
      `<div class="dots__dot" data-slide="${i}"></div>`
    );
  });
}

const goToSlide = function (curSlide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${(i - curSlide) * 100}%)`;
  })
}

const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(function (dot) {
    dot.classList.remove('dots__dot--active')
  })
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
})

const init = function () {
  createDots();
  activateDot(0);
  goToSlide(0);
}
init();

const nextSlide = function () {
  if (curSlide === (maxSlide - 1)) {
    curSlide = 0;
  }
  else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = slides.length - 1;
  }
  else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  // console.log(e);
  if (e.key === 'ArrowRight') {
    nextSlide();
  }
  else if (e.key === 'ArrowLeft') {
    prevSlide();
  }
})
