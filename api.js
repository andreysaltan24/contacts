const URL = 'https://62054479161670001741b708.mockapi.io/api/contacts/';

export const getAllContacts = () => {
  return fetch(URL).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Getting contacts error');
  });
};

export const createContact = (contact) => {
  return fetch(URL, {
    method: 'POST',
    body: JSON.stringify(contact),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Sorry problem with creating contact');
  });
};

export const deleteContact = (id) => {
  return fetch(URL + id, {
    method: 'DELETE',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Sorry problem with deleting contact ${id}`);
  });
};
