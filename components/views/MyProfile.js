
import { Icons } from '../Icons.js';
import { UserRole } from '../../types.js';

export const MyProfile = ({ user }) => `
    <div class="animate-in max-w-3xl mx-auto" style="opacity: 0;">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">My Profile</h1>
        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
            <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                <div class="w-24 h-24 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-center flex-shrink-0">
                    ${Icons.User({ className: "w-12 h-12 text-[var(--text-secondary)]" })}
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-[var(--text-primary)] text-center sm:text-left">${user.firstName} ${user.lastName}</h2>
                    <p class="text-[var(--text-secondary)] text-center sm:text-left">${user.email}</p>
                </div>
            </div>
            <div class="space-y-4">
                <div class="flex justify-between items-center bg-[var(--bg-tertiary)] p-3 rounded-md"><span class="font-medium text-[var(--text-secondary)]">Role:</span><span class="font-semibold text-[var(--text-primary)]">${user.role}</span></div>
                <div class="flex justify-between items-center bg-[var(--bg-tertiary)] p-3 rounded-md"><span class="font-medium text-[var(--text-secondary)]">Rank:</span><span class="font-semibold text-[var(--text-primary)]">${user.rank}</span></div>
                ${user.role !== UserRole.Client ? `
                <div class="flex justify-between items-center bg-[var(--bg-tertiary)] p-3 rounded-md"><span class="font-medium text-[var(--text-secondary)]">Level:</span><span class="px-3 py-1 text-sm font-semibold rounded-full bg-[var(--accent-secondary)] text-[var(--accent-secondary-text)]">${user.level}</span></div>
                <div class="flex justify-between items-center bg-[var(--bg-tertiary)] p-3 rounded-md"><span class="font-medium text-[var(--text-secondary)]">Performance Rating:</span><span class="font-semibold text-green-600">${user.performanceRating.toFixed(2)} / 5.00</span></div>
                <div class="flex justify-between items-center bg-[var(--bg-tertiary)] p-3 rounded-md"><span class="font-medium text-[var(--text-secondary)]">Weekly Hours:</span><span class="font-semibold text-[var(--text-primary)]">${user.weeklyHours.toFixed(1)} / 40</span></div>
                <div class="bg-[var(--bg-tertiary)] p-3 rounded-md">
                    <span class="font-medium text-[var(--text-secondary)]">Certifications:</span>
                    <div class="flex flex-wrap gap-2 mt-2">${user.certifications.length > 0 ? user.certifications.map(cert => `<span class="px-2 py-1 text-xs bg-white text-[var(--text-secondary)] rounded-md border border-[var(--border-primary)]">${cert}</span>`).join('') : 'None'}</div>
                </div>
                `: ''}
            </div>
        </div>
    </div>
`;
