"use strict";

const header = document.querySelector('.header'),
  btnSearch = document.querySelector('#search-btn'),
  btnSearchClose = document.querySelector('#search-btn-close'),
  input = document.querySelector('#search-form').querySelector('input'),
  btnBurger = document.querySelector('#burger'),
  btnBurgerClose = document.querySelector('#burger-close');

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
  btnBurger.addEventListener('click', () => header.classList.add('burger-open'));
};

const closeBurger = () => {
  btnBurgerClose.addEventListener('click', () => header.classList.remove('burger-open'));
};

openSearch();
closeSearch();
openBurger();
closeBurger();