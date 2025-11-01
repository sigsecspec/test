import { getPayrollRuns, getPayrollEntriesForRun, getUsers } from '../../database.js';
import { Icons } from '../Icons.js';

export const Payroll = ({ user, selectedRunId }) => {
    const runs = getPayrollRuns();
    const selectedRun = selectedRunId ? runs.find(r => r.id === selectedRunId) : runs[0];
    const entries = selectedRun ? getPayrollEntriesForRun(selectedRun.id) : [];
    const allUsers = getUsers();
    const getUserName = (id) => {
        const user = allUsers.find(u => u.id === id);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
    };

    return `
        <div class="animate-in" style="opacity: 0;">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <h1 class="text-3xl font-bold text-[var(--color-text-base)]">Payroll</h1>
                <form id="create-payroll-form" class="flex items-center gap-2">
                    <input type="date" name="startDate" required class="p-2 border rounded-md bg-[var(--color-bg-surface-raised)] border-[var(--color-border)]" />
                    <span class="text-[var(--color-text-muted)]">to</span>
                    <input type="date" name="endDate" required class="p-2 border rounded-md bg-[var(--color-bg-surface-raised)] border-[var(--color-border)]" />
                    <button type="submit" class="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-bold rounded-md hover:bg-[var(--color-secondary-hover)]">Create Run</button>
                </form>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-1 bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm">
                    <h2 class="text-xl font-bold mb-3 text-[var(--color-text-base)]">Payroll Runs</h2>
                    <ul class="space-y-2">
                        ${runs.map(run => `
                            <li>
                                <button data-action="select-payroll-run" data-id="${run.id}" class="w-full text-left p-3 rounded-md transition-colors ${selectedRun && run.id === selectedRun.id ? 'bg-[var(--color-accent)]/10' : 'hover:bg-[var(--color-bg-surface-raised)]'}">
                                    <p class="font-semibold text-[var(--color-text-base)]">${new Date(run.startDate).toLocaleDateString()} - ${new Date(run.endDate).toLocaleDateString()}</p>
                                    <p class="text-sm text-[var(--color-text-muted)]">Status: ${run.status}</p>
                                </button>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="lg:col-span-2 bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm">
                    ${selectedRun ? `
                        <div class="flex justify-between items-center mb-4">
                            <div>
                                <h2 class="text-xl font-bold text-[var(--color-text-base)]">Details for Run Ending ${new Date(selectedRun.endDate).toLocaleDateString()}</h2>
                                <p class="text-[var(--color-text-muted)]">${selectedRun.status} | Total: $${selectedRun.totalAmount.toFixed(2)}</p>
                            </div>
                            ${selectedRun.status === 'Pending' ? `<button data-action="approve-payroll-run" data-id="${selectedRun.id}" class="px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700">Approve Run</button>` : ''}
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full">
                                <thead><tr class="border-b-2 border-[var(--color-border)]"><th class="text-left p-2 text-[var(--color-text-muted)]">Guard</th><th class="text-left p-2 text-[var(--color-text-muted)]">Hours</th><th class="text-left p-2 text-[var(--color-text-muted)]">Pay</th><th class="text-left p-2 text-[var(--color-text-muted)]">Status</th></tr></thead>
                                <tbody class="divide-y divide-[var(--color-border)]">
                                    ${entries.map(entry => `
                                        <tr>
                                            <td class="p-2 font-medium text-[var(--color-text-base)]">${getUserName(entry.userId)}</td>
                                            <td class="p-2 text-[var(--color-text-muted)]">${entry.hours.toFixed(2)}</td>
                                            <td class="p-2 text-[var(--color-text-muted)]">$${entry.totalPay.toFixed(2)}</td>
                                            <td class="p-2 text-[var(--color-text-muted)]">
                                                ${selectedRun.status === 'Approved' && !entry.paymentConfirmed ? `<button data-action="confirm-payment" data-id="${entry.id}" class="px-2 py-1 text-xs bg-blue-600 text-white rounded-md">Confirm Payment</button>` : (entry.paymentConfirmed ? 'Paid' : 'Pending')}
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    ` : `<p class="text-[var(--color-text-muted)]">Select a payroll run to view details.</p>`}
                </div>
            </div>
        </div>
    `;
};