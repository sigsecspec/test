import React from 'react';
import type { User, Mission } from '../../types';
import { CreditCardIcon } from '../Icons';

interface EarningsProps {
    user: User;
    missions: Mission[];
}

const Earnings: React.FC<EarningsProps> = ({ user, missions }) => {
    const completedMissions = missions.filter(m => m.claimedBy === user.id && (m.status === 'Completed' || m.status === 'AwaitingReport'));

    const calculateMissionPay = (mission: Mission) => {
        const duration = (mission.endTime.getTime() - mission.startTime.getTime()) / 3600000; // hours
        return duration * mission.payRate;
    };

    const totalEarnings = completedMissions.reduce((acc, mission) => acc + calculateMissionPay(mission), 0);

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">My Earnings</h2>
            <p className="text-[#787876] mb-6">Track your pay for completed missions.</p>

            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-[#c4c4c4]">Total Estimated Earnings</h3>
                <p className="text-4xl font-bold text-[#aeae5a] mt-2">${totalEarnings.toFixed(2)}</p>
                <p className="text-sm text-[#787876]">Based on {completedMissions.length} completed missions.</p>
            </div>

            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg overflow-hidden">
                <h3 className="text-lg font-semibold text-[#c4c4c4] p-4 border-b border-[#535347]">Paystub Breakdown</h3>
                {completedMissions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-[#535347]/20">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase">Mission</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#c4c4c4] uppercase">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-[#c4c4c4] uppercase">Pay</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#535347]/50">
                                {completedMissions.map(mission => (
                                    <tr key={mission.id}>
                                        <td className="px-6 py-4 text-sm text-[#c4c4c4]">{mission.title}</td>
                                        <td className="px-6 py-4 text-sm text-[#787876]">{mission.endTime.toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right text-sm font-medium text-[#c4c4c4]">${calculateMissionPay(mission).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center p-12 text-[#787876]">
                         <CreditCardIcon className="w-12 h-12 mx-auto text-[#787876] mb-4" />
                        <h3 className="text-xl font-semibold text-[#c4c4c4]">No Earnings Yet</h3>
                        <p className="mt-2">Complete missions to see your earnings here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Earnings;
