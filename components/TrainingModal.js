
import * as db from '../../database.js';
import * as Icons from './Icons.js';

export const TrainingModal = ({ moduleId }) => {
    const module = db.getTrainingModules().find(m => m.id === moduleId);
    if (!module) return '';

    return `
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" data-action="close-modal">
        <div class="bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-2xl p-6 border border-[var(--border-primary)]" onclick="event.stopPropagation()">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-[var(--text-primary)]">${module.title}</h2>
                <button data-action="close-modal" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    ${Icons.X({ className: 'w-6 h-6' })}
                </button>
            </div>
            <div class="max-h-[70vh] overflow-y-auto pr-4">
                <p class="text-[var(--text-secondary)] mb-6">${module.content}</p>
                <h3 class="text-xl font-bold text-[var(--text-primary)] mb-4">Quiz</h3>
                <form id="training-form" class="space-y-4">
                    ${module.quiz.map((q, index) => `
                        <div>
                            <p class="font-semibold">${index + 1}. ${q.q}</p>
                            <input name="q-${index}" placeholder="Your Answer" required class="mt-2 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 bg-[var(--bg-primary)]" />
                        </div>
                    `).join('')}
                    <div class="flex justify-end pt-4">
                         <button type="submit" class="px-6 py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-md hover:bg-[var(--accent-secondary-hover)] transition">Submit Quiz</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
};