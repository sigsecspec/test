import React from 'react';
import { BellIcon } from '../Icons';
import { Alert } from '../../types';

interface AlertsProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
}


const Alerts: React.FC<AlertsProps> = ({ alerts, onAcknowledge }) => {
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'High': return 'text-red-600';
            case 'Medium': return 'text-yellow-600';
            case 'Low': return 'text-blue-600';
            default: return 'text-[var(--text-secondary)]';
        }
    };
    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">System Alerts</h2>
            <p className="text-[var(--text-secondary)] mb-6">Priority alerts requiring dispatcher attention.</p>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg shadow-sm">
                {alerts.length > 0 ? (
                    <ul className="divide-y divide-[var(--border-primary)]">
                        {alerts.map(alert => (
                            <li key={alert.id} className="p-4 hover:bg-[var(--bg-primary)] flex items-center justify-between">
                                <div className="flex items-center">
                                    <BellIcon className={`h-5 w-5 mr-4 flex-shrink-0 ${getSeverityColor(alert.severity)}`} />
                                    <div>
                                        <p className="text-sm font-medium text-[var(--text-primary)]">{alert.message}</p>
                                        <p className="text-xs text-[var(--text-secondary)]">{alert.time}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => onAcknowledge(alert.id)}
                                    className="bg-transparent border border-[var(--border-secondary)] text-xs text-[var(--text-secondary)] font-semibold py-1 px-3 rounded-md hover:bg-[var(--border-tertiary)] hover:border-[var(--accent-primary)] transition">
                                    Acknowledge
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center p-12 text-[var(--text-secondary)]">
                        <BellIcon className="w-12 h-12 mx-auto text-[var(--text-secondary)] mb-4" />
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">No Active Alerts</h3>
                        <p className="mt-2">All systems are normal.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alerts;