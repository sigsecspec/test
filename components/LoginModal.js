
import { Icons } from './Icons.js';
import { UserRole } from '../types.js';

export const LoginModal = ({ users }) => {
    const sortedUsers = [...users].sort((a, b) => {
        const order = Object.values(UserRole);
        return order.indexOf(a.role) - order.indexOf(b.role);
    });
    return `
        <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
            <div class="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg shadow-2xl w-full max-w-sm" data-modal-content>
                <div class="p-6">
                    <div class="text-center mb-6">
                        ${Icons.Shield({ className: 'w-12 h-12 mx-auto text-[var(--accent-primary)] mb-2' })}
                        <h1 class="text-2xl font-bold text-[var(--text-primary)]">SSS Portal</h1>
                        <p class="text-[var(--text-secondary)] mt-1">Select a profile to log in</p>
                    </div>
                    <div class="space-y-2 max-h-80 overflow-y-auto pr-2">
                        ${sortedUsers.map(user => `
                            <button data-action="login" data-id="${user.email}" class="w-full flex items-center text-left bg-[var(--bg-tertiary)] hover:bg-[var(--border-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] p-3 rounded-lg transition-all duration-150 transform hover:border-[var(--accent-primary)] hover:scale-[1.02]">
                                <div class="w-10 h-10 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center mr-3 flex-shrink-0">
                                    ${Icons.User({ className: 'w-5 h-5 text-[var(--accent-primary)]' })}
                                </div>
                                <div class="flex-grow">
                                    <p class="font-semibold">${user.firstName} ${user.lastName}</p>
                                    <p class="text-xs text-[var(--text-secondary)]">${user.role}</p>
                                </div>
                                <div class="ml-auto text-right flex-shrink-0">
                                    ${user.role !== UserRole.Client ? `<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-[var(--accent-secondary)] text-[var(--accent-secondary-text)]">Lvl ${user.level}</span>` : ''}
                                </div>
                            </button>
                        `).join('')}
                    </div>
                </div>
                <button data-action="close-modal" class="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    ${Icons.X({ className: 'w-6 h-6' })}
                </button>
            </div>
        </div>
    `;
};
