// ==============================
// Reusable Utility Functions
// ==============================
function createElementWithAttributes(tag, attributes = {}) {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
  });
  return element;
}

// ==============================
// Error Handling
// ==============================
function displayError(message) {
  const errorElement = document.getElementById('error-message');
  if (!errorElement) return;

  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
}

function clearError() {
  const errorElement = document.getElementById('error-message');
  if (!errorElement) return;

  errorElement.textContent = '';
  errorElement.classList.add('hidden');
}

// ==============================
// DOM Manipulation Functions
// ==============================
function addItemToList(text) {
  const list = document.getElementById('item-list');
  if (!list) {
    displayError('Item list not found.');
    return;
  }

  const listItem = createElementWithAttributes('li', {
    'data-testid': 'list-item'
  });

  listItem.textContent = text;
  list.appendChild(listItem);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const input = document.getElementById('item-input');
  if (!input) {
    displayError('Input field not found.');
    return;
  }

  const value = input.value.trim();

  if (value === '') {
    displayError('Input cannot be empty.');
    return;
  }

  clearError();
  addItemToList(value);
  input.value = '';
}

// ==============================
// Simulate User Behavior
// ==============================
function initEventListeners() {
  const form = document.getElementById('item-form');
  if (!form) {
    displayError('Form not found.');
    return;
  }

  form.addEventListener('submit', handleFormSubmit);
}

// Initialize listeners when DOM loads
document.addEventListener('DOMContentLoaded', initEventListeners);

// Export for Jest testing
module.exports = {
  createElementWithAttributes,
  displayError,
  clearError,
  addItemToList,
  handleFormSubmit,
  initEventListeners
};
