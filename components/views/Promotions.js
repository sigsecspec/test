
import { UserRole } from '../../types.js';
import * as db from '../../database.js';
import * as ROLES from '../../constants.js';
import * as Icons from '../Icons.js';

const GuardPromotionView = (user, promotions) => {
    const existingApplication = promotions.find(p => p.userId === user.id && p.status === 'Pending');

    return `
        <div>
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Apply for Promotion</h1>
            ${existingApplication ? `
                <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm text-center">
                    ${Icons.CheckCircle({ className: "w-12 h-12 mx-auto text-green-500 mb-4" })}
                    <h2 class="text-xl font-bold text-[var(--text-primary)]">Application Submitted</h2>
                    <p class="text-[var(--text-secondary)]">Your application for the role of <span class="font-semibold">${existingApplication.toRole}</span> is currently <span class="font-semibold">${existingApplication.status}</span>.</p>
                </div>
            ` : `
                <form id="promotion-form" class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-[var(--text-secondary)]">Promote to Role</label>
                        <select name="role" required class="mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 bg-white focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]">
                            <option value="" disabled selected>Select a role</option>
                            <option value="${UserRole.TrainingOfficer}">Training Officer</option>
                            <option value="${UserRole.Supervisor}">Supervisor</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-[var(--text-secondary)]">Reason for Application</label>
                        <textarea name="reason" required rows="5" class="mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]" placeholder="Explain why you are a good fit for this role..."></textarea>
                    </div>
                    <div class="text-right">
                        <button type="submit" class="bg-[var(--accent-secondary)] text-white font-bold py-2 px-6 rounded-md hover:bg-[var(--accent-secondary-hover)] transition-colors">Submit</button>
                    </div>
                </form>
            `}
        </div>
    `;
};

const AdminPromotionView = (users, promotions) => {
    const getUserName = (id) => {
        const u = users.find(u => u.id === id);
        return u ? `${u.firstName} ${u.lastName}` : 'Unknown';
    }
    const pendingPromotions = promotions.filter(p => p.status === 'Pending');

    return `
         <div>
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Promotion Applications</h1>
             <div class="space-y-4">
                ${pendingPromotions.length > 0 ? pendingPromotions.map(promo => `
                    <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-bold text-lg text-[var(--text-primary)]">${getUserName(promo.userId)}</p>
                                <p class="text-sm text-[var(--text-secondary)]">Applying for: <span class="font-semibold text-[var(--text-primary)]">${promo.toRole}</span></p>
                            </div>
                            <div class="space-x-2">
                                <button data-action="approve-promotion" data-id="${promo.id}" class="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">Approve</button>
                                <button data-action="deny-promotion" data-id="${promo.id}" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">Deny</button>
                            </div>
                        </div>
                         <p class="text-sm text-[var(--text-secondary)] mt-2 pt-2 border-t border-[var(--border-tertiary)]">${promo.reason}</p>
                    </div>
                `).join('') : `<p class="text-[var(--text-secondary)]">No pending promotion applications.</p>`}
            </div>
        </div>
    `;
};


export const Promotions = ({ user }) => {
    const promotions = db.getPromotions();
    const users = db.getUsers(Object.values(UserRole));
    
    const isFieldRole = ROLES.fieldRoles.includes(user.role);
    const isAdminRole = [...ROLES.operationsRoles, ...ROLES.executiveRoles].includes(user.role);

    let content = `<p>You do not have access to this view.</p>`;
    // Show admin view if user has admin rights, otherwise show guard view if they are field staff
    if (isAdminRole) {
        content = AdminPromotionView(users, promotions);
    } else if (isFieldRole) {
        content = GuardPromotionView(user, promotions);
    }
    
    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            ${content}
        </div>
    `;
};
