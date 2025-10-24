import React from 'react';
import { BellIcon } from '../Icons';

const sampleAlerts = [
    { id: 1, severity: 'High', message: 'Guard D. Clark missed hourly check-in at Downtown Mall.', time: '2 mins ago' },
    { id: 2, severity: 'Medium', message: 'New last-minute mission posted by TechCorp HQ.', time: '5 mins ago' },
    { id: 3, severity: 'Low', message: 'Guard C. Taylor is approaching 40-hour weekly limit.', time: '25 mins ago' },
];

const Alerts: React.FC = () => {
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'High': return 'text-red-400';
            case 'Medium': return 'text-yellow-400';
            case 'Low': return 'text-blue-400';
            default: return 'text-[#787876]';
        }
    };
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">System Alerts</h2>
            <p className="text-[#787876] mb-6">Priority alerts requiring dispatcher attention.</p>
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg">
                <ul className="divide-y divide-[#535347]/50">
                    {sampleAlerts.map(alert => (
                         <li key={alert.id} className="p-4 hover:bg-[#535347]/10 flex items-center justify-between">
                            <div className="flex items-center">
                                <BellIcon className={`h-5 w-5 mr-4 flex-shrink-0 ${getSeverityColor(alert.severity)}`} />
                                <div>
                                    <p className="text-sm font-medium text-[#c4c4c4]">{alert.message}</p>
                                    <p className="text-xs text-[#787876]">{alert.time}</p>
                                </div>
                            </div>
                            <button className="bg-transparent border border-[#535347] text-xs text-[#c4c4c4] font-semibold py-1 px-3 rounded-md hover:bg-[#535347]/50 hover:border-[#aeae5a] transition">
                                Acknowledge
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Alerts;