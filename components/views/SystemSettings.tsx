import React from 'react';

const SystemSettings: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">System Settings</h2>
            <p className="text-[#787876] mb-6">Manage global settings for the SSS platform.</p>
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6 space-y-6">
                
                <div>
                    <h3 className="text-lg font-semibold text-[#c4c4c4]">General</h3>
                    <div className="mt-4 space-y-4">
                        <div>
                             <label htmlFor="companyName" className="block text-sm font-medium text-[#c4c4c4]">Company Name</label>
                            <input type="text" id="companyName" defaultValue="Signature Security Specialists" className="mt-1 block w-full bg-[#0f0f0f] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#535347] pt-6">
                    <h3 className="text-lg font-semibold text-[#c4c4c4]">Billing & Payroll</h3>
                     <div className="mt-4 space-y-4">
                        <div>
                             <label htmlFor="payrollCycle" className="block text-sm font-medium text-[#c4c4c4]">Payroll Cycle</label>
                            <select id="payrollCycle" className="mt-1 block w-full bg-[#0f0f0f] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]">
                               <option>Weekly</option>
                               <option>Bi-Weekly</option>
                            </select>
                        </div>
                    </div>
                </div>

                 <div className="flex justify-end pt-6 border-t border-[#535347]">
                     <button className="w-full sm:w-auto bg-[#aeae5a] text-[#0f0f0f] font-bold py-2.5 px-6 rounded-md hover:bg-opacity-90 transition">
                        Save Changes
                    </button>
                 </div>

            </div>
        </div>
    );
};

export default SystemSettings;