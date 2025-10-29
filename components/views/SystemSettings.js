
import * as db from '../../database.js';

export const SystemSettings = ({ user }) => {
    const settings = db.getSystemSettings();
    const inputStyles = "mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]";

    return `
         <div class="animate-in max-w-2xl mx-auto" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">System Settings</h1>
            <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm space-y-4">
                <div>
                    <label class="block text-sm font-medium text-[var(--text-secondary)]">Company Name</label>
                    <input 
                        type="text" 
                        value="${settings.companyName}"
                        class="${inputStyles}"
                    />
                </div>
                 <div>
                    <label class="block text-sm font-medium text-[var(--text-secondary)]">Payroll Cycle</label>
                    <select 
                        class="${inputStyles} bg-white"
                    >
                       <option ${settings.payrollCycle === 'Weekly' ? 'selected' : ''}>Weekly</option>
                       <option ${settings.payrollCycle === 'Bi-Weekly' ? 'selected' : ''}>Bi-Weekly</option>
                       <option ${settings.payrollCycle === 'Monthly' ? 'selected' : ''}>Monthly</option>
                    </select>
                </div>
                <div class="text-right">
                    <button class="px-6 py-2 bg-[var(--accent-secondary)] text-[var(--accent-primary-text)] font-semibold rounded-md shadow-sm hover:bg-[var(--accent-secondary-hover)]">Save Settings</button>
                </div>
            </div>
        </div>
    `;
};