// Auth View Module: Handles rendering of authentication-related screens

// Dependencies from other modules (e.g., uiUtils, screenManager) will be imported if needed.
// For now, these render functions primarily manipulate innerHTML of screen elements.
// screenElements are passed to screenManager, which makes them available to these render functions
// indirectly when showScreen calls them.

// We need access to the `screens` object, which is currently encapsulated in screenManager.
// For now, we assume these functions are called by `showScreen` which has access to `screens`.
// A more robust solution might involve passing the specific screen element to each render function,
// or having a shared DOM elements module.

// Placeholder for a potential init function if this view module needs setup
// export function initAuthView(screenElements) {
//     screens = screenElements; // If screens were to be passed directly
// }

export function renderWelcomeScreen(screenElement) { // Assuming screenElement is screens.welcome
    if (!screenElement) {
        console.error("Welcome screen element not provided to renderWelcomeScreen.");
        return;
    }
    screenElement.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full animate-pulse">
            <svg class="w-24 h-24 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/></svg>
            <h1 class="text-3xl font-bold text-gray-800 mt-4">Vitalis AI</h1>
            <p class="text-gray-500">Su asistente médico inteligente</p>
        </div>
    `;
    // setTimeout logic related to welcome screen transition will be handled by an event handler/controller
    // For now, the original setTimeout is in app.js and calls showScreen('onboarding')
}

export function renderOnboardingScreen(screenElement) {
    if (!screenElement) {
        console.error("Onboarding screen element not provided to renderOnboardingScreen.");
        return;
    }
    screenElement.innerHTML = `
        <div class="w-full max-w-sm text-center">
             <svg class="w-20 h-20 text-blue-600 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/></svg>
            <h1 class="text-2xl font-bold text-slate-800 mt-4">Bienvenida, Dra. Pérez</h1>
            <p class="text-slate-500 mt-1 mb-6">Ingrese a su cuenta para continuar.</p>
            <div class="space-y-4 text-left">
                 <input type="email" placeholder="Correo electrónico" value="ana.perez@vitalis.ai" class="w-full p-3 border border-slate-300 rounded-lg">
                 <input type="password" placeholder="Contraseña" value="************" class="w-full p-3 border border-slate-300 rounded-lg">
            </div>
            <a href="#" id="forgot-password-link" class="text-sm text-slate-600 mt-4 block text-center">Olvidé mi contraseña</a>
            <button id="login-btn" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-4">Iniciar Sesión</button>
            <p class="text-xs text-slate-500 mt-4">¿Nuevo en Vitalis? <a href="#" id="register-link" class="font-semibold text-blue-600">Regístrese aquí</a></p>
        </div>
    `;
}

export function renderRegisterScreen(screenElement) {
    if (!screenElement) {
        console.error("Register screen element not provided to renderRegisterScreen.");
        return;
    }
    screenElement.innerHTML = `
        <div class="flex items-center mb-4">
            <button id="back-to-login-from-register" class="text-2xl text-gray-600 mr-4"><i class="ph-arrow-left"></i></button>
            <h1 class="text-xl font-bold text-gray-800">Registro de Médico</h1>
        </div>
        <div class="space-y-4">
            <input type="text" placeholder="Nombre completo" class="w-full p-3 border border-slate-300 rounded-lg bg-white">
            <input type="tel" placeholder="Número de celular" class="w-full p-3 border border-slate-300 rounded-lg bg-white">
            <input type="text" placeholder="Número de CMP" class="w-full p-3 border border-slate-300 rounded-lg bg-white">
            <div>
                <label for="dni-upload" class="w-full text-center bg-white p-3 border border-slate-300 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                    <i class="ph-upload-simple"></i>
                    <span>Adjuntar DNI (Foto o PDF)</span>
                </label>
                <input type="file" id="dni-upload" class="hidden">
            </div>
            <input type="text" placeholder="Código de referido (opcional)" class="w-full p-3 border border-slate-300 rounded-lg bg-white">
            <div class="flex items-start space-x-3">
                <input type="checkbox" id="terms-checkbox" class="mt-1 h-4 w-4">
                <label for="terms-checkbox" class="text-xs text-gray-600">
                    He leído y acepto los <a href="#" class="text-blue-600 font-semibold">Términos y Condiciones</a> y la <a href="#" class="text-blue-600 font-semibold">Política de Privacidad</a> de Vitalis AI.
                </label>
            </div>
            <button id="register-form-btn" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-4">Registrarse</button>
        </div>
    `;
}

export function renderVerifySignatureScreen(screenElement) {
    if (!screenElement) {
        console.error("Verify signature screen element not provided to renderVerifySignatureScreen.");
        return;
    }
    screenElement.innerHTML = `
        <div class="w-full max-w-sm text-center">
            <i class="ph-fingerprint text-6xl text-blue-600"></i>
            <h1 class="text-2xl font-bold text-slate-800 mt-4">Validación de Doble Firma</h1>
            <p class="text-slate-500 mt-1 mb-6">Hemos enviado un código de 6 dígitos a tu celular para confirmar tu identidad.</p>
            <input type="text" id="signature-code" placeholder="------" maxlength="6" class="w-full text-center tracking-[1em] text-3xl font-bold p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-6">
            <button id="verify-signature-btn" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">Confirmar Firma</button>
            <button class="back-to-login-btn text-sm text-slate-600 mt-4">Volver al Inicio de Sesión</button>
        </div>
    `;
}

export function renderRegisterSuccessScreen(screenElement) {
    if (!screenElement) {
        console.error("Register success screen element not provided to renderRegisterSuccessScreen.");
        return;
    }
    screenElement.innerHTML = `
        <i class="ph-check-circle text-6xl text-green-500"></i>
        <h1 class="text-2xl font-bold text-gray-800 mt-4">¡Registro Enviado!</h1>
        <p class="text-gray-600 mt-2 max-w-sm">Gracias por unirte a Vitalis AI. Nuestro equipo administrativo validará tus credenciales y documentos.</p>
        <p class="text-gray-600 mt-2 max-w-sm">Recibirás una notificación por correo y SMS en un plazo de 24-48 horas una vez que tu perfil sea aprobado y habilitado para atender citas.</p>
        <button class="back-to-login-btn w-full max-w-sm bg-blue-600 text-white py-3 rounded-lg font-semibold mt-8">Volver al Inicio de Sesión</button>
    `;
}

export function renderForgotPasswordScreen(screenElement) {
    if (!screenElement) {
        console.error("Forgot password screen element not provided to renderForgotPasswordScreen.");
        return;
    }
    screenElement.innerHTML = `
         <div class="w-full max-w-sm text-center">
            <i class="ph-key text-6xl text-blue-600"></i>
            <h1 class="text-2xl font-bold text-slate-800 mt-4">Recuperar Contraseña</h1>
            <p class="text-slate-500 mt-1 mb-6">Ingresa tu correo electrónico registrado y te enviaremos las instrucciones.</p>
            <input type="email" placeholder="Correo electrónico" class="w-full p-3 border border-slate-300 rounded-lg bg-white mb-4">
            <button id="recover-password-btn" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">Recuperar Contraseña</button>
            <button class="back-to-login-btn text-sm text-slate-600 mt-4">Volver al Inicio de Sesión</button>
        </div>
    `;
}

export function renderForgotSuccessScreen(screenElement) {
    if (!screenElement) {
        console.error("Forgot success screen element not provided to renderForgotSuccessScreen.");
        return;
    }
     screenElement.innerHTML = `
        <i class="ph-paper-plane-tilt text-6xl text-green-500"></i>
        <h1 class="text-2xl font-bold text-gray-800 mt-4">Correo Enviado</h1>
        <p class="text-gray-600 mt-2 max-w-sm">Se han enviado las instrucciones para recuperar tu contraseña a tu correo electrónico.</p>
        <button class="back-to-login-btn w-full max-w-sm bg-blue-600 text-white py-3 rounded-lg font-semibold mt-8">Volver al Inicio de Sesión</button>
    `;
}

// Note: The `showScreen` calls that were part of the original `renderWelcomeScreen` (via setTimeout)
// are event-driven logic and will be handled by event handlers/controllers later.
// The view functions should focus solely on rendering the UI based on state/data.
// The screenManager's showScreen will now accept the screenElement directly.
// However, the current screenManager calls these functions by name, assuming they are registered.
// The `screenManager.js` needs to be updated to pass the correct `screenElement` to these functions.
// For now, the `screenManager` is calling them like `renderFunctions.renderWelcomeScreen()` without arguments.
// This will be adjusted: `screenManager` will get the screenElement using `screens[screenName]`
// and then call `renderFunctions.renderWelcomeScreen(screens.welcome)`.
// This current authView.js is a step towards that.
// The actual call from screenManager will be:
// if (screenName === 'welcome' && renderFunctions.renderWelcomeScreen) renderFunctions.renderWelcomeScreen(screens.welcome);
// etc. for all screens.
// This change in screenManager will be done in a subsequent step.
// For now, these functions are defined to accept the element, but screenManager isn't passing it yet.
// Let's refine screenManager next to pass the element.
//
// Corrected approach: The render functions in view modules will receive the specific screen DOM element
// as an argument from the screenManager when it calls them.
// The screenManager already has the `screens` object.
// So, when screenManager calls a registered render function, it will do:
// registeredRenderFunction(screens[screenName], data);

// Example:
// In screenManager.js:
// const renderFunc = renderFunctions[`render${screenNameCapitalized}Screen`];
// if (renderFunc) {
//   renderFunc(screens[screenName], data);
// }
// This means `authView.js` functions should expect `screenElement` as the first param.
// The current structure of authView.js is already expecting this.
