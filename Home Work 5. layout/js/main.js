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
