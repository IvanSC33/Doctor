// Home View Module: Handles rendering of the home screen components

// Import data if necessary (e.g., nextConsultation, tasks might be passed or imported)
// For now, assuming the functions will receive data they need or access it via imports
// from data.js if that pattern is established.
// However, it's cleaner if data is passed to render functions.

// Let's assume `nextConsultation` and `tasks` will be passed or obtained from a data module.
// For this refactor step, we'll keep them using the globally available (imported in app.js) data variables.
// This will be refined when we work on data flow.
import { nextConsultation, tasks } from '../data.js'; // Temporary direct import, ideally pass data

export function renderNextConsultation(containerElement) {
    if (!containerElement) {
        // console.error("Next consultation container element not provided for rendering.");
        // Fallback to a default ID if not provided, but warn
        containerElement = document.getElementById('next-consultation-container');
        if (!containerElement) {
            console.error("Default next consultation container (#next-consultation-container) not found.");
            return;
        }
    }

    if (!nextConsultation.visible) {
        containerElement.innerHTML = `<div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center text-gray-500">No hay consultas próximas.</div>`;
        return;
    }

    let buttonHtml = '';
    if (nextConsultation.status === 'scheduled') {
        buttonHtml = `<button id="join-consultation-btn" class="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Unirse</button>`;
    } else if (nextConsultation.status === 'pending_review') {
        buttonHtml = `<button class="bg-amber-500 text-white px-5 py-2 rounded-lg font-semibold cursor-not-allowed">Revisión Pendiente</button>`;
    }

    containerElement.innerHTML = `
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Próxima Consulta</p>
            <div class="flex items-center justify-between mt-3">
                <div>
                    <p class="font-bold text-lg text-gray-800">${nextConsultation.patient}</p>
                    <p class="text-sm text-gray-600">${nextConsultation.time} - ${nextConsultation.reason}</p>
                </div>
                ${buttonHtml}
            </div>
        </div>
    `;
}

export function renderTasks(containerElement) {
    if (!containerElement) {
        // console.error("Tasks container element not provided for rendering.");
        containerElement = document.getElementById('tasks-container');
        if (!containerElement) {
            console.error("Default tasks container (#tasks-container) not found.");
            return;
        }
    }

    // Ensure tasks is an array before mapping
    const tasksToRender = Array.isArray(tasks) ? tasks : [];

    containerElement.innerHTML = tasksToRender.map(task => {
        if (task.status === 'pending') {
            return `
                <div class="bg-white p-4 rounded-lg border-l-4 border-amber-500 shadow-sm flex items-center justify-between cursor-pointer review-task-btn" data-task-id="${task.id}">
                    <div>
                        <p class="font-bold text-gray-800">${task.text}</p>
                        <p class="text-sm text-gray-600">Paciente: ${task.patient}</p>
                    </div>
                    <i class="ph-caret-right text-gray-400 text-xl"></i>
                </div>
            `;
        } else {
            return `
                <div class="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm flex items-center justify-between opacity-70">
                    <div>
                        <p class="font-semibold text-gray-700 line-through">${task.text}</p>
                        <p class="text-sm text-gray-500">Completado: ${task.completedAt}</p>
                    </div>
                    <i class="ph-check-circle text-green-500 text-2xl"></i>
                </div>
            `;
        }
    }).join('');
}

// The main home screen structure is in index.html.
// If we needed a function to render the overall home screen (e.g., if it was fully dynamic):
// export function renderHomeScreen(screenElement) {
//   if (!screenElement) return;
//   screenElement.innerHTML = `
//     <!-- Próxima Consulta -->
//     <div id="next-consultation-container">
//         <!-- renderNextConsultation will populate this -->
//     </div>
//     <!-- Bandeja de Tareas -->
//     <div>
//         <h2 class="font-bold text-gray-800 text-xl mb-3">Bandeja de Tareas</h2>
//         <div id="tasks-container" class="space-y-3">
//             <!-- renderTasks will populate this -->
//         </div>
//     </div>
//     <!-- Resumen de Actividad -->
//     <div>
//         <h2 class="font-bold text-gray-800 text-xl mb-3">Resumen de Actividad</h2>
//         <div class="grid grid-cols-2 gap-4">
//             <div class="bg-white p-4 rounded-lg border border-gray-200">
//                 <p class="text-sm font-semibold text-gray-500">Consultas (Hoy)</p>
//                 <p id="consultation-count" class="text-3xl font-bold text-gray-800 mt-1">3</p>
//             </div>
//             <div class="bg-white p-4 rounded-lg border border-gray-200">
//                 <p class="text-sm font-semibold text-gray-500">Ingresos (Mes)</p>
//                 <p id="income-count" class="text-3xl font-bold text-gray-800 mt-1">S/ 9,300</p>
//             </div>
//         </div>
//     </div>
//   `;
//   // After setting innerHTML, call the sub-renderers
//   renderNextConsultation(screenElement.querySelector('#next-consultation-container'));
//   renderTasks(screenElement.querySelector('#tasks-container'));
// }
// And then this renderHomeScreen would be registered with screenManager.
// For now, since the structure is static and sub-parts are updated, we only move sub-renderers.
// The direct calls to renderNextConsultation() and renderTasks() in app.js will be updated
// to use these imported versions.
