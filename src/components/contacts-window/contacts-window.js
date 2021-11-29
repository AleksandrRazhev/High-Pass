"use strict";
const closeContactsWindow = () => {
  const contactsWindow = document.querySelector('.contacts__contacts-window');
  const btnClose = contactsWindow.querySelector('.btn-close');

  btnClose.addEventListener('click', ()=> {
    contactsWindow.classList.add('close');
    setTimeout(() => {
      contactsWindow.style.display = "none";
    }, 600);
  });
};

closeContactsWindow();