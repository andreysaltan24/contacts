import { getAllContacts, createContact, deleteContact } from './api.js';

const inputFirstName = document.querySelector('.firstName');
const inputLastName = document.querySelector('.lastName');
const inputPhone = document.querySelector('.phone');
//
const contactList = document.querySelector('#contactList');
const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);
contactList.addEventListener('click', onContactListClick);

initializationContacts();

function initializationContacts() {
  getAllContacts().then((contacts) => {
    renderContactList(contacts);
  });
}

function onFormSubmit(e) {
  e.preventDefault();

  const checkContact = checkContactId();

  if (!isContactValid(checkContact)) {
    return alert('Ошибка, пустое поле или неверный формат');
  }

  createNewContact(checkContact);

  clearForm();
}

function onContactListClick(e) {
  const target = e.target;

  const contactItem = getItem(target);

  if (contactItem) {
    if (target.classList.contains('deleteContact')) {
      deleteCurrentContact(contactItem);
    }
  }
}

function getItem(target) {
  return target.closest('.contactItem');
}

function deleteCurrentContact(contactEl) {
  const id = getContactId(contactEl);

  deleteContact(id)
    .then(() => {
      contactEl.remove();
    })
    .catch(errorAlert);
}

function createNewContact(newContact) {
  createContact(newContact)
    .then((newContact) => {
      addContact(newContact);
    })
    .catch(errorAlert);
}

function isContactValid(contact) {
  return (
    !isEmptyInputValue(contact.firstName) &&
    !isEmptyInputValue(contact.lastName) &&
    isPhoneInput(contact.phone)
  );
}

function addContact(contact) {
  const addContact = generateContactHtml(contact);
  contactList.insertAdjacentHTML('beforeend', addContact);
}

function renderContactList(contact) {
  const html = contact.map(generateContactHtml).join('');
  contactList.innerHTML = html;
}

function generateContactHtml(contact) {
  return `
      <tr class='contactItem' data-id=${contact.id}>
          <th>${contact.firstName}</th>
          <th>${contact.lastName}</th>
          <th>${contact.phone}</th>
          <th><button class='deleteContact'>Delete</button><th>
      </tr>
    `;
}

function isEmptyInputValue(str) {
  return typeof str === 'string' && str.trim() === '';
}

function isPhoneInput(phone) {
  return !isEmptyInputValue(phone) && !isNaN(phone);
}

function checkContactId() {
  return {
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    phone: inputPhone.value,
  };
}

function getContactId(el) {
  return el.dataset.id;
}

function clearForm() {
  inputFirstName.value = '';
  inputLastName.value = '';
  inputPhone.value = '';
}

function errorAlert(e) {
  alert(e.message);
}
