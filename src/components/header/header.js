"use strict";

const header = document.querySelector('.header'),
  headerSearch = document.querySelector('.header__search'),
  btnSearch = headerSearch.querySelector('.btn-search'),
  btnSearchClose = headerSearch.querySelector('.btn-close'),
  input = headerSearch.querySelector('.form-search').querySelector('input'),
  headerBurger = document.querySelector('.header__burger'),
  btnBurger = headerBurger.querySelector('.burger'),
  btnBurgerClose = headerBurger.querySelector('.btn-close');

const openSearch = () => {
  btnSearch.addEventListener('click', () => {
    header.classList.add('search-open');
    input.focus();
  });
};

const closeSearch = () => {
  btnSearchClose.addEventListener('click', () => header.classList.remove('search-open'));
};

const openBurger = () => {
  btnBurger.addEventListener('click', () => {
    header.classList.add('burger-open');
    header.classList.add('burger-visible');
  });
};

const closeBurger = () => {
  btnBurgerClose.addEventListener('click', () => {
    header.classList.remove('burger-open');
    setTimeout (( () => {
      header.classList.remove('burger-visible');
    }), 600);
  });
};

openSearch();
closeSearch();
openBurger();
closeBurger();