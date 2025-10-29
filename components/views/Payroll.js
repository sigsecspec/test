
import { UserRole } from '../../types.js';
import * as db from '../../database.js';
import * as Icons from '../Icons.js';

export const Payroll = ({ user, selectedRunId }) => {
    const runs = db.getPayrollRuns();
    const users = db.getUsers(Object.values(UserRole));
    
    const selectedRun = runs.find(r => r.id === selectedRunId) || (runs.length > 0 ? runs[0] : null);
    const entries = selectedRun ? db.getPayrollEntriesForRun(selectedRun.id) : [];

    const getUserName = (id) => {
        const user = users.find(u => u.id === id);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
    }
    
    const getStatusPill = (status) => {
        switch(status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Approved': return 'bg-blue-100 text-blue-800';
            case 'Paid': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Payroll Management</h1>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                        <h2 class="text-lg font-bold text-[var(--text-primary)] mb-4">Create New Payroll Run</h2>
                        <form id="create-payroll-form" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-[var(--text-secondary)]">Start Date</label>
                                <input name="startDate" type="date" required class="mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]" />
                            </div>
                             <div>
                                <label class="block text-sm font-medium text-[var(--text-secondary)]">End Date</label>
                                <input name="endDate" type="date" required class="mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]" />
                            </div>
                            <button type="submit" class="w-full bg-[var(--accent-secondary)] text-white font-bold py-2 px-4 rounded-md hover:bg-[var(--accent-secondary-hover)] transition-colors">
                                Create Run
                            </button>
                        </form>
                    </div>
                    <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                        <h2 class="text-lg font-bold text-[var(--text-primary)] mb-4">Payroll Runs</h2>
                         <ul class="space-y-2 max-h-96 overflow-y-auto">
                            ${runs.map(run => `
                                <li data-action="select-payroll-run" data-id="${run.id}" class="p-3 rounded-md cursor-pointer transition-colors border ${selectedRun?.id === run.id ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]' : 'hover:bg-[var(--bg-primary)] border-transparent'}">
                                    <div class="flex justify-between items-center">
                                        <p class="font-semibold text-sm text-[var(--text-primary)]">${new Date(run.startDate).toLocaleDateString()} - ${new Date(run.endDate).toLocaleDateString()}</p>
                                        <span class="px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusPill(run.status)}">${run.status}</span>
                                    </div>
                                    <p class="text-xs text-[var(--text-secondary)]">Total: $${run.totalAmount.toFixed(2)}</p>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>

                <div class="lg:col-span-2 bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                    ${selectedRun ? `
                        <div>
                            <div class="flex justify-between items-center mb-4">
                                <div>
                                    <h2 class="text-xl font-bold text-[var(--text-primary)]">Run Details</h2>
                                    <p class="text-sm text-[var(--text-secondary)]">${new Date(selectedRun.startDate).toLocaleDateString()} - ${new Date(selectedRun.endDate).toLocaleDateString()}</p>
                                </div>
                                ${selectedRun.status === 'Pending' ? `
                                    <button data-action="approve-payroll-run" data-id="${selectedRun.id}" class="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors">Approve Run</button>
                                `: ''}
                            </div>
                            <div class="overflow-x-auto">
                                <table class="min-w-full">
                                    <thead>
                                        <tr class="border-b-2 border-[var(--border-primary)]">
                                            <th class="text-left text-sm font-semibold text-[var(--text-secondary)] py-2">Guard</th>
                                            <th class="text-left text-sm font-semibold text-[var(--text-secondary)] py-2">Hours</th>
                                            <th class="text-left text-sm font-semibold text-[var(--text-secondary)] py-2">Total Pay</th>
                                            <th class="text-left text-sm font-semibold text-[var(--text-secondary)] py-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-[var(--border-primary)]">
                                        ${entries.map(entry => `
                                            <tr>
                                                <td class="py-3 text-sm font-medium text-[var(--text-primary)]">${getUserName(entry.userId)}</td>
                                                <td class="py-3 text-sm text-[var(--text-secondary)]">${entry.hours.toFixed(2)}</td>
                                                <td class="py-3 text-sm text-[var(--text-secondary)]">$${entry.totalPay.toFixed(2)}</td>
                                                <td class="py-3 text-sm">
                                                    ${selectedRun.status === 'Approved' && !entry.paymentConfirmed ? `
                                                        <button data-action="confirm-payment" data-id="${entry.id}" class="bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded hover:bg-blue-600">Mark as Paid</button>
                                                    ` : `
                                                        <span class="px-2 py-0.5 text-xs font-semibold rounded-full ${entry.paymentConfirmed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">${entry.paymentConfirmed ? 'Paid' : 'Unpaid'}</span>
                                                    `}
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ` : `
                        <div class="flex items-center justify-center h-full text-center">
                            <div>
                                ${Icons.CreditCard({ className: "w-16 h-16 mx-auto text-[var(--text-secondary)] opacity-50" })}
                                <h3 class="mt-4 text-lg font-semibold text-[var(--text-primary)]">Select a Payroll Run</h3>
                                <p class="text-[var(--text-secondary)]">Choose a run from the list to see its details.</p>
                            </div>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
};
