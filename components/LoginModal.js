
import { UserRole } from '../types.js';
import * as Icons from './Icons.js';

export const LoginModal = ({ users }) => {
    const sortedUsers = [...users].sort((a, b) => {
        const order = Object.values(UserRole);
        return order.indexOf(a.role) - order.indexOf(b.role);
    });

    return `
        <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" data-action="close-modal">
            <div class="relative" onclick="event.stopPropagation()">
                <div class="w-full max-w-sm bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg shadow-2xl p-6">
                    <div class="text-center mb-6">
                        ${Icons.Shield({ className: 'w-12 h-12 mx-auto text-[var(--accent-primary)] mb-2' })}
                        <h1 class="text-2xl font-bold text-[var(--text-primary)]">SSS Portal</h1>
                        <p class="text-[var(--text-secondary)] mt-1">Select a profile to log in</p>
                    </div>
                    <div class="space-y-2 max-h-80 overflow-y-auto pr-2">
                        ${sortedUsers.map(user => `
                            <button data-action="login" data-id="${user.email}" class="w-full flex items-center text-left bg-[var(--bg-primary)] hover:bg-[var(--border-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] p-3 rounded-md transition-all duration-150 transform hover:border-[var(--border-primary-hover)]">
                                <div class="w-8 h-8 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center mr-3 flex-shrink-0">
                                    ${Icons.User({ className: 'w-5 h-5 text-[var(--accent-primary)]' })}
                                </div>
                                <div class="flex-grow">
                                    <p class="font-bold text-sm">${user.firstName} ${user.lastName}</p>
                                    <p class="text-xs text-[var(--text-secondary)]">${user.role}</p>
                                </div>
                                <div class="ml-auto text-right flex-shrink-0">
                                    <span class="px-2 py-0.5 text-xs rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">Lvl ${user.level}</span>
                                </div>
                            </button>
                        `).join('')}
                    </div>
                </div>
                <button data-action="close-modal" class="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    ${Icons.X({ className: 'w-8 h-8' })}
                </button>
            </div>
        </div>
    `;
};
