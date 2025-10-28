import React, { useState, useEffect } from 'react';
import { SystemSettings } from '../../types.ts';

interface SystemSettingsProps {
    systemSettings: SystemSettings;
    onUpdateSystemSettings: (settings: SystemSettings) => void;
}

const SystemSettingsView: React.FC<SystemSettingsProps> = ({ systemSettings, onUpdateSystemSettings }) => {
    const [settings, setSettings] = useState(systemSettings);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setSettings(systemSettings);
    }, [systemSettings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({...prev, [name]: value as any}));
    };

    const handleSave = () => {
        onUpdateSystemSettings(settings);
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">System Settings</h2>
            <p className="text-[var(--text-secondary)] mb-6">Manage global settings for the SSS platform.</p>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 space-y-6 shadow-sm">
                
                <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">General</h3>
                    <div className="mt-4 space-y-4">
                        <div>
                             <label htmlFor="companyName" className="block text-sm font-medium text-[var(--text-primary)]">Company Name</label>
                            <input type="text" id="companyName" name="companyName" value={settings.companyName} onChange={handleChange} className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-[var(--border-primary)] pt-6">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">Billing & Payroll</h3>
                     <div className="mt-4 space-y-4">
                        <div>
                             <label htmlFor="payrollCycle" className="block text-sm font-medium text-[var(--text-primary)]">Payroll Cycle</label>
                            <select id="payrollCycle" name="payrollCycle" value={settings.payrollCycle} onChange={handleChange} className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]">
                               <option value="Weekly">Weekly</option>
                               <option value="Bi-Weekly">Bi-Weekly</option>
                            </select>
                        </div>
                    </div>
                </div>

                 <div className="flex justify-end items-center pt-6 border-t border-[var(--border-primary)]">
                     {message && <p className="text-sm text-green-500 mr-4">{message}</p>}
                     <button onClick={handleSave} className="w-full sm:w-auto bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2.5 px-6 rounded-md hover:bg-opacity-90 transition">
                        Save Changes
                    </button>
                 </div>

            </div>
        </div>
    );
};

export default SystemSettingsView;