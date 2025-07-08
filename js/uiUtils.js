// UI Utility Functions

// DOM Elements (assuming these are relatively constant and can be fetched once or passed as params)
// It's often better to pass these as parameters to functions if they can change or are numerous.
// For simplicity in this refactor, we'll assume they are accessible as in the original app.js.
// Consider a more robust DOM element management strategy in a larger application.

let toastElement;
let modalContainerElement;

// Call this function once in app.js after DOMContentLoaded
export function initUIUtils(toastId = 'toast-notification', modalContainerId = 'modal-container') {
    toastElement = document.getElementById(toastId);
    modalContainerElement = document.getElementById(modalContainerId);
    if (!toastElement) console.error('Toast notification element not found with ID:', toastId);
    if (!modalContainerElement) console.error('Modal container element not found with ID:', modalContainerId);
}

export function showToast(message, isPoints = false) {
    if (!toastElement) {
        console.error("Toast element not initialized. Call initUIUtils first.");
        return;
    }
    if (isPoints) {
        toastElement.innerHTML = `${message} <i class="ph-star-fill text-yellow-400 ml-1"></i>`;
    } else {
        toastElement.textContent = message;
    }
    toastElement.classList.add('show');
    setTimeout(() => { toastElement.classList.remove('show'); }, 3000);
}

export function showModal(content) {
    if (!modalContainerElement) {
        console.error("Modal container element not initialized. Call initUIUtils first.");
        return;
    }
    modalContainerElement.innerHTML = content;
    const overlay = modalContainerElement.querySelector('.modal-overlay');
    if (overlay) {
        // Ensure it's visible for the transition to work
        modalContainerElement.style.display = 'block'; // Or whatever its default display is
        requestAnimationFrame(() => { // Allow the browser to paint the element
            requestAnimationFrame(() => { // Then apply the class that triggers the transition
                 overlay.classList.add('visible');
            });
        });
    }
}

export function hideModal() {
    if (!modalContainerElement) {
        console.error("Modal container element not initialized. Call initUIUtils first.");
        return;
    }
    const overlay = modalContainerElement.querySelector('.modal-overlay');
    if (overlay) {
        overlay.classList.remove('visible');
        // Listen for transition end to hide the container, or use a timeout
        const transitionDuration = 300; // Must match CSS transition duration
        setTimeout(() => {
            modalContainerElement.innerHTML = '';
            // modalContainerElement.style.display = 'none'; // If needed
        }, transitionDuration);
    }
}

export function animateValue(element, start, end, duration, isCurrency = false, prefix = '') {
    if (!element) {
        console.error("animateValue: Provided element is null or undefined.");
        return;
    }
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = start + (end - start) * progress;
        if (isCurrency) {
            element.textContent = `${prefix} ${currentValue.toLocaleString('es-PE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        } else {
            element.textContent = Math.floor(currentValue);
        }
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
             if (isCurrency) {
                element.textContent = `${prefix} ${end.toLocaleString('es-PE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
             } else {
                element.textContent = end.toLocaleString();
             }
        }
    };
    window.requestAnimationFrame(step);
}

export function animateSlotMachine(element, start, end, duration) {
    if (!element) {
        console.error("animateSlotMachine: Provided element is null or undefined.");
        return;
    }
    let current = start;
    const diff = end - start; // Difference to target
    if (diff === 0) {
        element.textContent = `${end.toLocaleString()} Puntos Vitalis`;
        return;
    }

    const increment = diff > 0 ? 1 : -1; // Determine if counting up or down
    const totalSteps = Math.abs(diff);
    const stepTime = Math.max(1, Math.floor(duration / totalSteps)); // Ensure stepTime is at least 1ms

    // Clear any existing interval on this element to prevent multiple animations
    if (element.slotMachineTimer) {
        clearInterval(element.slotMachineTimer);
    }

    const updateText = () => {
        element.textContent = `${current.toLocaleString()} Puntos Vitalis`;
    };

    updateText(); // Initial display

    element.slotMachineTimer = setInterval(() => {
        current += increment;
        updateText();

        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end; // Ensure it lands exactly on `end`
            updateText();
            clearInterval(element.slotMachineTimer);
            element.slotMachineTimer = null;
        }
    }, stepTime);
}

// Add other UI utility functions here as needed, for example:
// - Element creation helpers
// - Class manipulation utilities (addClass, removeClass, toggleClass)
// - etc.
// Example:
// export function getElement(selector) {
//   return document.querySelector(selector);
// }

// export function getElements(selector) {
//   return document.querySelectorAll(selector);
// }
// Make sure to initialize toastElement and modalContainerElement by calling initUIUtils
// from app.js after the DOM is loaded. Example:
//
// import { initUIUtils } from './uiUtils.js';
// document.addEventListener('DOMContentLoaded', () => {
//   initUIUtils(); // Uses default IDs 'toast-notification', 'modal-container'
//   // ... rest of your app initialization
// });
