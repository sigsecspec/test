import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import * as db from '../../database';

const SystemSettings: React.FC<{ user: User }> = () => {
    const [settings, setSettings] = useState(db.getSystemSettings());

    const handleSave = () => {
        db.updateSystemSettings(settings);
        alert('Settings saved!');
    };
    
    return (
         <div className="animate-in max-w-2xl mx-auto" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">System Settings</h1>
            <div className="bg-white p-6 border rounded-lg shadow-sm space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input 
                        type="text" 
                        value={settings.companyName}
                        onChange={e => setSettings({...settings, companyName: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Payroll Cycle</label>
                    <select 
                        value={settings.payrollCycle}
                        onChange={e => setSettings({...settings, payrollCycle: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
                    >
                       <option>Weekly</option>
                       <option>Bi-Weekly</option>
                       <option>Monthly</option>
                    </select>
                </div>
                <div className="text-right">
                    <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">Save Settings</button>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;