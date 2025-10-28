import React from 'react';
import { BellIcon } from '../Icons';

interface Alert {
  id: string;
  severity: 'High' | 'Medium' | 'Low';
  message: string;
  time: string;
}

interface AlertsProps {
  alerts: Alert[];
}


const Alerts: React.FC<AlertsProps> = ({ alerts }) => {
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
                {alerts.length > 0 ? (
                    <ul className="divide-y divide-[#535347]/50">
                        {alerts.map(alert => (
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
                ) : (
                    <div className="text-center p-12 text-[#787876]">
                        <BellIcon className="w-12 h-12 mx-auto text-[#787876] mb-4" />
                        <h3 className="text-xl font-semibold text-[#c4c4c4]">No Active Alerts</h3>
                        <p className="mt-2">All systems are normal.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alerts;