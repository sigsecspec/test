
import * as db from '../../database.js';

export const MyContracts = ({ user }) => {
    const client = db.getClients().find(c => c.userId === user.id);
    const contracts = client ? db.getContracts().filter(c => c.clientId === client.id) : [];
    
     const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-[var(--border-tertiary)] text-[var(--text-secondary)]';
        }
    };

    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-[var(--text-primary)]">My Contracts</h1>
                <button class="px-4 py-2 bg-[var(--accent-secondary)] text-[var(--accent-primary-text)] font-bold rounded-md hover:bg-[var(--accent-secondary-hover)]">New Contract</button>
            </div>
             <div class="space-y-4">
                ${contracts.map(contract => `
                    <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm">
                        <div class="flex justify-between items-start">
                            <h3 class="font-bold text-lg text-[var(--text-primary)]">${contract.title}</h3>
                            <span class="px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contract.status)}">${contract.status}</span>
                        </div>
                        <p class="text-sm text-[var(--text-secondary)]">Budget: $${contract.totalBudget.toLocaleString()}</p>
                        <p class="text-xs text-[var(--text-secondary)] opacity-70">Expires: ${contract.endDate.toLocaleDateString()}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};
