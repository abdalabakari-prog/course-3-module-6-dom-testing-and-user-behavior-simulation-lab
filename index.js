// ==============================
// Utility
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

// ==============================
// DOM Manipulation (REQUIRED API)
// ==============================
function addElementToDOM(id, content) {
  let element = document.getElementById(id);

  if (!element) {
    element = createElementWithAttributes('div', { id });
    document.body.appendChild(element);
  }

  element.textContent = content;
}

function removeElementFromDOM(id) {
  const element = document.getElementById(id);
  if (element) {
    element.remove();
  }
}

function simulateClick(id, content) {
  let element = document.getElementById(id);

  if (!element) {
    element = createElementWithAttributes('button', { id });
    document.body.appendChild(element);
  }

  element.addEventListener('click', () => {
    element.textContent = content;
  });

  element.click();
}

// ==============================
// Form Handling
// ==============================
function handleFormSubmit(event = {}) {
  if (event.preventDefault) {
    event.preventDefault();
  }

  const input = document.getElementById('item-input');
  if (!input || input.value.trim() === '') {
    displayError('Input cannot be empty.');
    return;
  }

  addElementToDOM('dynamic-content', input.value);
  input.value = '';
}

// ==============================
// Exports for Jest
// ==============================
module.exports = {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
  createElementWithAttributes,
  displayError
};
