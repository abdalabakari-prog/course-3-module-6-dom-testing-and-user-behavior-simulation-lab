// index.js - DOM Testing Lab

// Step 4: Reusable Utilities
// Create modular utility functions for DOM manipulation

/**
 * Creates an element with specified tag and attributes
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Object containing attribute key-value pairs
 * @returns {HTMLElement} - The created element
 */
function createElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
  });
  return element;
}

/**
 * Creates an element with text content
 * @param {string} tag - HTML tag name
 * @param {string} text - Text content
 * @param {Object} attributes - Optional attributes
 * @returns {HTMLElement} - The created element
 */
function createElementWithText(tag, text, attributes = {}) {
  const element = createElement(tag, attributes);
  element.textContent = text;
  return element;
}

// Step 3: Error Handling
// Display error messages in the DOM

/**
 * Displays an error message
 * @param {string} message - Error message to display
 */
function displayError(message) {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    
    // Auto-hide error after 3 seconds
    setTimeout(() => {
      clearError();
    }, 3000);
  }
}

/**
 * Clears and hides the error message
 */
function clearError() {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  }
}

// Step 2: DOM Manipulation Functions
// Functions to add, update, and remove DOM elements

/**
 * Adds an item to the list
 * @param {string} itemText - Text content for the item
 */
function addItem(itemText) {
  // Validate input
  if (!itemText || itemText.trim() === '') {
    displayError('Please enter a valid item name');
    return;
  }
  
  // Clear any existing errors
  clearError();
  
  // Get the list element
  const itemList = document.getElementById('item-list');
  if (!itemList) {
    displayError('Item list not found');
    return;
  }
  
  // Create list item
  const li = createElement('li');
  
  // Create text span
  const textSpan = createElementWithText('span', itemText);
  
  // Create remove button
  const removeBtn = createElementWithText('button', 'Remove', {
    class: 'remove-btn'
  });
  
  // Add event listener to remove button
  removeBtn.addEventListener('click', () => {
    removeItem(li);
  });
  
  // Append elements
  li.appendChild(textSpan);
  li.appendChild(removeBtn);
  itemList.appendChild(li);
}

/**
 * Removes an item from the list
 * @param {HTMLElement} element - Element to remove
 */
function removeItem(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

/**
 * Updates the display text
 */
function updateDisplay() {
  const display = document.getElementById('display');
  if (display) {
    const timestamp = new Date().toLocaleTimeString();
    display.textContent = `Display updated at ${timestamp}`;
  }
}

// Counter functionality
let counter = 0;

/**
 * Updates the counter display
 */
function updateCounter() {
  const counterElement = document.getElementById('counter');
  if (counterElement) {
    counterElement.textContent = counter;
  }
}

/**
 * Increments the counter
 */
function incrementCounter() {
  counter++;
  updateCounter();
}

/**
 * Decrements the counter
 */
function decrementCounter() {
  counter--;
  updateCounter();
}

/**
 * Resets the counter to zero
 */
function resetCounter() {
  counter = 0;
  updateCounter();
}

// Step 1: Simulate User Behavior
// Add event listeners for user interactions

/**
 * Initializes all event listeners
 */
function initializeEventListeners() {
  // Add item form submission
  const addItemForm = document.getElementById('add-item-form');
  if (addItemForm) {
    addItemForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const itemInput = document.getElementById('item-input');
      if (itemInput) {
        addItem(itemInput.value);
        itemInput.value = ''; // Clear input after adding
      }
    });
  }
  
  // Update display button
  const updateButton = document.getElementById('update-button');
  if (updateButton) {
    updateButton.addEventListener('click', updateDisplay);
  }
  
  // Counter buttons
  const incrementButton = document.getElementById('increment-button');
  if (incrementButton) {
    incrementButton.addEventListener('click', incrementCounter);
  }
  
  const decrementButton = document.getElementById('decrement-button');
  if (decrementButton) {
    decrementButton.addEventListener('click', decrementCounter);
  }
  
  const resetButton = document.getElementById('reset-button');
  if (resetButton) {
    resetButton.addEventListener('click', resetCounter);
  }
}

// Initialize when DOM is loaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
  } else {
    initializeEventListeners();
  }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createElement,
    createElementWithText,
    displayError,
    clearError,
    addItem,
    removeItem,
    updateDisplay,
    incrementCounter,
    decrementCounter,
    resetCounter,
    updateCounter,
    initializeEventListeners
  };
}
