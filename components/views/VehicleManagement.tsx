import React from 'react';
import { User } from '../../types';

const VehicleManagement: React.FC<{ user: User }> = () => {
    return (
        <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Vehicle Management</h1>
            <div className="bg-white p-6 border rounded-lg shadow-sm">
                <p>This view is for tracking the fleet of security vehicles, their maintenance schedules, and assignments.</p>
                <p className="text-gray-500 mt-2">(Feature under development)</p>
            </div>
        </div>
    );
};

export default VehicleManagement;
