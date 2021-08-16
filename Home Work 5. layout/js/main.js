const burger = document.querySelector('.burger');
const nav = document.querySelector('.container__nav');

burger.addEventListener('click', () => {
  if (nav.classList.contains('active')) {
    nav.classList.remove('active');
    burger.classList.remove('active');
    return;
  }
  nav.classList.add('active');
  burger.classList.add('active');
});

window.addEventListener('resize', getWidth);

function getWidth() {
  if (window.innerWidth < 720) {
    nav.classList.remove('container');
    return;
  } else if (window.innerWidth > 720) {
    if (nav.classList.contains('container')) {
      return;
    }
    nav.classList.add('container');
  }
}
