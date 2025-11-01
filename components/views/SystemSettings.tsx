import { getSystemSettings, User } from '../../database.js';
import { UserRole } from '../../types.js';

export const SystemSettings = ({ user }: { user: User }) => {
    const settings = getSystemSettings();
    const inputStyles = "mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)]";
    
    return `
         <div class="animate-in max-w-3xl mx-auto" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">System Settings</h1>
            <form id="system-settings-form" class="bg-[var(--color-bg-surface)] p-6 border border-[var(--color-border)] rounded-lg shadow-sm space-y-6">
                <div>
                    <h3 class="text-lg font-bold text-[var(--color-text-base)] mb-2">General Settings</h3>
                    <div class="space-y-4">
                        <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Company Name</label><input type="text" name="companyName" value="${settings.companyName}" class="${inputStyles}"/></div>
                        <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Payroll Cycle</label><select name="payrollCycle" class="${inputStyles}"><option ${settings.payrollCycle === 'Weekly' ? 'selected' : ''}>Weekly</option><option ${settings.payrollCycle === 'Bi-Weekly' ? 'selected' : ''}>Bi-Weekly</option><option ${settings.payrollCycle === 'Monthly' ? 'selected' : ''}>Monthly</option></select></div>
                    </div>
                </div>

                ${user.role === UserRole.Owner ? `
                <div class="pt-6 border-t border-[var(--color-border)]">
                    <h3 class="text-lg font-bold text-[var(--color-text-base)] mb-2">Financial Settings</h3>
                    <p class="text-sm text-[var(--color-text-muted)] mb-4">Set the company commission rates for different mission types. This affects client billing calculations and is only visible to the Owner.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${Object.entries(settings.commissionRates).map(([key, value]) => `
                            <div>
                                <label class="block text-sm font-medium text-[var(--color-text-muted)]">${key}</label>
                                <div class="relative mt-1">
                                    <input type="number" name="commission-${key}" value="${value}" min="0" max="100" step="0.1" class="pl-4 pr-8 ${inputStyles}" />
                                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span class="text-[var(--color-text-muted)] sm:text-sm">%</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <div class="text-right pt-4"><button type="submit" class="px-6 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md shadow-sm hover:bg-[var(--color-secondary-hover)]">Save Settings</button></div>
            </form>
        </div>
    `;
};