import React, { useState, useEffect } from 'react';
import { User, Mission } from '../../types';
import * as db from '../../database';

const MissionControl: React.FC<{ user: User }> = () => {
    const [missions, setMissions] = useState<Mission[]>([]);
    
    useEffect(() => {
        setMissions(db.getMissions());
    }, []);

    const statusColor = (status: Mission['status']) => {
        switch (status) {
            case 'Open': return 'bg-green-100 text-green-800';
            case 'Claimed': return 'bg-blue-100 text-blue-800';
            case 'Active': return 'bg-yellow-100 text-yellow-800';
            case 'Completed': return 'bg-purple-100 text-purple-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Mission Control</h1>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                         <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                            <th className="px-5 py-3">Title</th>
                            <th className="px-5 py-3">Status</th>
                            <th className="px-5 py-3">Time</th>
                            <th className="px-5 py-3">Guards</th>
                            <th className="px-5 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {missions.map(mission => (
                             <tr key={mission.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-5 py-4 text-sm"><p className="text-gray-900 whitespace-no-wrap">{mission.title}</p></td>
                                <td className="px-5 py-4 text-sm">
                                    <span className={`px-2 py-1 font-semibold rounded-full text-xs ${statusColor(mission.status)}`}>{mission.status}</span>
                                </td>
                                <td className="px-5 py-4 text-sm">{mission.startTime.toLocaleDateString()}</td>
                                <td className="px-5 py-4 text-sm">{mission.claimedBy.length}/{mission.requiredGuards}</td>
                                <td className="px-5 py-4 text-sm">
                                    <button className="text-blue-600 hover:text-blue-900">Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MissionControl;