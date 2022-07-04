const DELETE_BTN_CLASS = 'deleteContact';
const CONTACT_ITEM_SELECTOR = '.contactItem';

const contactList = document.querySelector('#contactList');
const form = document.querySelector('.list-form');
const inputs = document.querySelectorAll('.form_input');

form.addEventListener('submit', onFormSubmit);
contactList.addEventListener('click', onContactListClick);

function onFormSubmit(e) {
    e.preventDefault();
    const contact = getContact();
    if (!isContactValid(contact)) {
        return alert('Ошибка, пустое поле или неверный формат');
    }
    addContact(contact);
    clearForm();
}

function onContactListClick(e) {
    const target = e.target;
    if (target.classList.contains(DELETE_BTN_CLASS)) {
        const contactItem = getItem(target);
        contactItem.remove();
    }
}

function getContact() {
    const contact = {};

    inputs.forEach((input) => {
        contact[input.name] = input.value;
        console.log(input);
    });
    return contact;
}

function getItem(target) {
    return target.closest(CONTACT_ITEM_SELECTOR);
}

function addContact(contact) {
    const addContact = `
      <tr class='contactItem'>
          <th class='table_contact'>${contact.firstName}</th>
          <th class='table_contact'>${contact.lastName}</th>
          <th class='table_contact'>${contact.phone}</th>
          <th><button class='deleteContact'>Delete</button><th>
      </tr>
    `;
    contactList.insertAdjacentHTML('beforeend', addContact);
}

function isContactValid(contact) {
    return (
      !isEmpty(contact.firstName) &&
      !isEmpty(contact.lastName) &&
      isPhone(contact.phone)
    );
  }

function isEmpty(str) {
    return typeof str === 'string' && str.trim() === '';
}

function isPhone(phone) {
    return !isEmpty(phone) && !isNaN(phone);
}

function clearForm() {
    form.reset();
}