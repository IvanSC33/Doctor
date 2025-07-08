// Screen Management Module

// DOM Element References
let screens = {};
let navItems = {};
let headerElement, bottomNavElement, fabElement;
let renderFunctions = {}; // To store registered render functions

export function initScreenManager(screenElements, navItemElements, headerId = 'header', bottomNavId = 'bottom-nav', fabId = 'fab-ai') {
    screens = screenElements;
    navItems = navItemElements;
    headerElement = document.getElementById(headerId);
    bottomNavElement = document.getElementById(bottomNavId);
    fabElement = document.getElementById(fabId);

    if (!headerElement) console.error('Header element not found with ID:', headerId);
    if (!bottomNavElement) console.error('Bottom nav element not found with ID:', bottomNavId);
    if (!fabElement) console.error('FAB element not found with ID:', fabId);

    for (const key in screens) {
        if (!screens[key]) console.error(`Screen element '${key}' not found.`);
    }
    for (const key in navItems) {
        if (!navItems[key]) console.error(`Nav item element '${key}' not found.`);
    }
}

export function registerRenderFunctions(functions) {
    renderFunctions = { ...renderFunctions, ...functions };
}

export function showScreen(screenName, data = null) {
    if (Object.keys(screens).length === 0) {
        console.error("Screens not initialized in screenManager. Call initScreenManager first.");
        return;
    }

    Object.values(screens).forEach(s => {
        if (s) s.classList.add('hidden');
    });

    const screenToShow = screens[screenName];
    if (screenToShow) {
        screenToShow.classList.remove('hidden');
    } else {
        console.warn(`Screen '${screenName}' not found.`);
        // Fallback or error handling can be added here
        return; // Exit if screen not found
    }

    const isFullScreen = ['welcome', 'onboarding', 'register', 'verifySignature', 'registerSuccess', 'forgotPassword', 'forgotSuccess', 'waitingRoom', 'consultation'].includes(screenName);
    const hasNav = ['home', 'agenda', 'patients', 'profile'].includes(screenName);

    if (headerElement) headerElement.style.display = hasNav ? 'flex' : 'none';
    if (bottomNavElement) bottomNavElement.style.display = hasNav ? 'flex' : 'none';
    if (fabElement) fabElement.style.display = screenName === 'home' ? 'flex' : 'none';

    if (isFullScreen) {
        if (headerElement) headerElement.style.display = 'none';
        if (bottomNavElement) bottomNavElement.style.display = 'none';
        if (fabElement) fabElement.style.display = 'none';
    }

    Object.values(navItems).forEach(item => {
        if (item) item.classList.remove('active');
    });

    if (navItems[screenName]) {
        navItems[screenName].classList.add('active');
    } else if (['financial', 'development', 'security', 'support', 'referrals', 'rewards', 'communityForum', 'forumTopic'].includes(screenName)) {
        if (navItems.profile) navItems.profile.classList.add('active');
    }

    // Dynamically call the registered render function for the screen
    const screenElement = screens[screenName]; // Get the actual DOM element for the current screen

    if (!screenElement) {
        console.warn(`Screen element for '${screenName}' is not defined in screenManager's screens object.`);
        // Optionally, navigate to a default/error screen or handle appropriately
        return;
    }

    // Attempt to find a matching render function
    // Prioritize functions that match common naming patterns like renderScreenNameScreen or renderScreenName
    const capitalizedScreenName = screenName.charAt(0).toUpperCase() + screenName.slice(1);
    const renderFuncKeySpecific = `render${capitalizedScreenName}Screen`; // e.g., renderWelcomeScreen
    const renderFuncKeyGeneric = `render${capitalizedScreenName}`;       // e.g., renderHome (if we rename renderHomeScreen to renderHome)
    const renderFuncKeyDirect = screenName; // e.g., patientHistory (if render function is named 'patientHistory')

    let renderFunc;

    if (typeof renderFunctions[renderFuncKeySpecific] === 'function') {
        renderFunc = renderFunctions[renderFuncKeySpecific];
    } else if (typeof renderFunctions[renderFuncKeyGeneric] === 'function') {
        renderFunc = renderFunctions[renderFuncKeyGeneric];
    } else if (typeof renderFunctions[renderFuncKeyDirect] === 'function') {
        // This handles cases like renderPatientHistory, renderForumTopicDetail
        // where the key in renderFunctions might be the screenName itself.
        renderFunc = renderFunctions[renderFuncKeyDirect];
    }

    if (renderFunc) {
        renderFunc(screenElement, data); // Pass the screenElement and any data
    } else {
        // console.log(`No specific render function registered for ${screenName}, or it's static.`);
    }
}
