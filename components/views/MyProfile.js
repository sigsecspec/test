
import * as Icons from '../Icons.js';

export const MyProfile = ({ user }) => {
    return `
        <div class="animate-in max-w-2xl mx-auto" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">My Profile</h1>
            <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
                <div class="flex items-center space-x-4 mb-6">
                    <div class="w-16 h-16 rounded-full bg-[var(--bg-primary)] border border-[var(--border-tertiary)] flex items-center justify-center">
                        ${Icons.User({ className: "w-10 h-10 text-[var(--text-secondary)]" })}
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-[var(--text-primary)]">${user.firstName} ${user.lastName}</h2>
                        <p class="text-[var(--text-secondary)]">${user.email}</p>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="font-medium text-[var(--text-secondary)]">Role:</span>
                        <span class="font-semibold text-[var(--text-primary)]">${user.role}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-medium text-[var(--text-secondary)]">Rank:</span>
                        <span class="font-semibold text-[var(--text-primary)]">${user.rank}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-medium text-[var(--text-secondary)]">Level:</span>
                        <span class="px-3 py-1 text-sm font-semibold rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">${user.level}</span>
                    </div>
                     <div class="flex justify-between items-center">
                        <span class="font-medium text-[var(--text-secondary)]">Performance Rating:</span>
                        <span class="font-semibold text-green-600">${user.performanceRating.toFixed(2)} / 5.00</span>
                    </div>
                     <div class="flex justify-between items-center">
                        <span class="font-medium text-[var(--text-secondary)]">Weekly Hours:</span>
                        <span class="font-semibold text-[var(--text-primary)]">${user.weeklyHours.toFixed(1)} / 40</span>
                    </div>
                     <div>
                        <span class="font-medium text-[var(--text-secondary)]">Certifications:</span>
                        <div class="flex flex-wrap gap-2 mt-2">
                           ${user.certifications.map(cert => `
                               <span class="px-2 py-1 text-xs bg-[var(--border-tertiary)] text-[var(--text-secondary)] rounded-md">${cert}</span>
                           `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};
