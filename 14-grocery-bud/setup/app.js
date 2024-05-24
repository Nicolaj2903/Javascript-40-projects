// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitButton = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearButton = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// Submit form
form.addEventListener("submit", addItem);

// Remove all items
clearButton.addEventListener('click', clearItems);

// Load items
window.addEventListener('DOMContentLoaded', setupItems);

const deleteButton = document.querySelector('.delete-btn');

// ****** FUNCTIONS **********
function addItem(event) {
  event.preventDefault();

  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    createListItem(id, value);

    displayAlert("item added to the list", "success");
    container.classList.add('show-container');

    addToLocalStorage(id, value);
    setBackToDefault();
  }
  else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert('value changed', 'success');
    editLocalStorage(editID, value);
    setBackToDefault();
  }
  else {
    displayAlert("please enter a value", "danger");
  }
};

// Display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // Remove alert
  setTimeout(function () {
    alert.textContent = text;
    alert.classList.remove(`alert-${action}`);
  }, 1000);
};

function clearItems() {
  const items = document.querySelectorAll('.grocery-item');

  let listHasItems = items.length > 0;

  if (listHasItems) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove('show-container');
  displayAlert("empty list", "danger");
  localStorage.removeItem('list');
  setBackToDefault();
};

function deleteItem(event) {
  const element = event.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);

  const isEmptyList = list.children.length === 0;

  if (isEmptyList) {
    container.classList.remove('show-container');
  }

  displayAlert("item removed", "success");
  setBackToDefault();
  removeFromLocalStorage(id);
};

function editItem(event) {
  const element = event.currentTarget.parentElement.parentElement;

  editElement = event.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitButton.textContent = "edit";
};

// SET BACK TO DEFAULT
function setBackToDefault() {
  grocery.value = "";
  editFLag = false;
  editID = "";
  submitButton.textContent = "submit";
};

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  // const grocery = { id: id, value: value };
  const grocery = { id, value }; // Shorthand notation, because the property and parameter is identical
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem('list', JSON.stringify(items));
};

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem('list', JSON.stringify(items));
};

function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item
  });
  localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [];
};

// setItem
// getItem
// removeItem

// localStorage.setItem('orange', JSON.stringify(["item", "item2"]));
// const oranges = JSON.parse(localStorage.getItem('orange'));
// localStorage.removeItem('orange');

// ****** SETUP ITEMS **********
function setupItems() {
  let items = getLocalStorage();

  let listHasItems = items.length > 0;

  if (listHasItems) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add('show-container');
  };
};

function createListItem(id, value) {
  const element = document.createElement('article');
  element.classList.add('grocery-item');

  const attribute = document.createAttribute("data-id");
  attribute.value = id;
  element.setAttributeNode(attribute);
  element.innerHTML =
    `<p class="title">${value}</p>
          <div class="btn-container">
            <button type="button" class="edit-btn">
              <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
              <i class="fas fa-trash"></i>
            </button>
          </div>`;

  const deleteButton = element.querySelector('.delete-btn');
  const editButton = element.querySelector('.edit-btn');

  deleteButton.addEventListener('click', deleteItem);
  editButton.addEventListener('click', editItem);

  list.appendChild(element);
};