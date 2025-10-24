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
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Billing & Invoices</h2>
            <p className="text-[#787876] mb-6">Review your current billing cycle and payment history.</p>

            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-[#c4c4c4]">Current Cycle Summary</h3>
                <p className="text-4xl font-bold text-[#aeae5a] mt-2">${totalBilled.toFixed(2)}</p>
                <p className="text-sm text-[#787876]">Total estimated cost for all posted missions.</p>
            </div>
            
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
                <h3 className="text-lg font-semibold text-[#c4c4c4] p-4 border-b border-[#535347]">Mission Cost Breakdown</h3>
                 <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-[#535347]/20">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Mission</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Cost</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#535347]/50">
                            {clientMissions.map((mission) => (
                                <tr key={mission.id} className="hover:bg-[#535347]/10">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c4c4c4]">{mission.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#787876]">{mission.startTime.toLocaleDateString(undefined, options)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-[#c4c4c4]">${calculateTotalCost(mission).toFixed(2)}</td>
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