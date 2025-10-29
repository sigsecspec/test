import React, { useState, useEffect } from 'react';
import { User, Alert } from '../../types';
import * as db from '../../database';
import * as Icons from '../Icons';

const Alerts: React.FC<{ user: User }> = () => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    useEffect(() => {
        setAlerts(db.getAlerts());
    }, []);

    const handleAcknowledge = (id: string) => {
        db.acknowledgeAlert(id);
        setAlerts(db.getAlerts());
    };

    return (
         <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">System Alerts</h1>
            <div className="space-y-4">
                {alerts.length > 0 ? alerts.map(alert => (
                    <div key={alert.id} className={`p-4 border-l-4 rounded-r-lg flex justify-between items-center ${alert.severity === 'High' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'}`}>
                        <div>
                            <p className={`font-bold ${alert.severity === 'High' ? 'text-red-800' : 'text-yellow-800'}`}>{alert.severity} Priority</p>
                            <p className="text-sm text-gray-700">{alert.message}</p>
                        </div>
                        <button onClick={() => handleAcknowledge(alert.id)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">Acknowledge</button>
                    </div>
                )) : <p>No active alerts.</p>}
            </div>
        </div>
    );
};

export default Alerts;
