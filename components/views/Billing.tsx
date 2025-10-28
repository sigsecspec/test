import React from 'react';
import type { User, Mission, Client } from '../../types';

interface BillingProps {
    user: User;
    missions: Mission[];
    clients: Client[];
}

const Billing: React.FC<BillingProps> = ({ user, missions, clients }) => {

    const clientProfile = clients.find(c => c.userId === user.id);
    const clientMissions = clientProfile ? missions.filter(m => m.clientId === clientProfile.id) : [];

    const calculateTotalCost = (mission: Mission) => {
        const durationHours = (mission.endTime.getTime() - mission.startTime.getTime()) / (1000 * 60 * 60);
        return durationHours * mission.payRate;
    };

    const totalBilled = clientMissions.reduce((acc, mission) => acc + calculateTotalCost(mission), 0);

    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Billing & Invoices</h2>
            <p className="text-[var(--text-secondary)] mb-6">Review your current billing cycle and payment history.</p>

            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 mb-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">Current Cycle Summary</h3>
                <p className="text-4xl font-bold text-[var(--accent-primary)] mt-2">${totalBilled.toFixed(2)}</p>
                <p className="text-sm text-[var(--text-secondary)]">Total estimated cost for all posted missions.</p>
            </div>
            
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg overflow-hidden shadow-sm">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] p-4 border-b border-[var(--border-primary)]">Mission Cost Breakdown</h3>
                 <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-[var(--bg-primary)]">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Mission</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Cost</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-tertiary)]">
                            {clientMissions.map((mission) => (
                                <tr key={mission.id} className="hover:bg-[var(--bg-primary)]">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">{mission.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">{mission.startTime.toLocaleDateString(undefined, options)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-[var(--text-primary)]">${calculateTotalCost(mission).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Billing;