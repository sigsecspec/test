import React from 'react';
import { MailIcon } from '../Icons';

const Communications: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#c4c4c4] mb-4">Communications Hub</h2>
            <p className="text-[#787876] mb-6">Send out company-wide announcements and messages.</p>
            <div className="bg-[#0f0f0f] border border-[#535347] rounded-lg p-6">
                <div className="space-y-4">
                     <div>
                        <label htmlFor="recipient" className="block text-sm font-medium text-[#c4c4c4]">Recipient Group</label>
                        <select id="recipient" className="mt-1 block w-full bg-[#0f0f0f] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]">
                           <option>All Staff</option>
                           <option>All Guards</option>
                           <option>All Clients</option>
                           <option>Supervisors Only</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-[#c4c4c4]">Subject</label>
                        <input type="text" id="subject" className="mt-1 block w-full bg-[#0f0f0f] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]" />
                    </div>
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-[#c4c4c4]">Message</label>
                        <textarea id="message" rows={6} className="mt-1 block w-full bg-[#0f0f0f] border border-[#535347] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#aeae5a] focus:border-[#aeae5a] sm:text-sm text-[#c4c4c4]"></textarea>
                    </div>
                    <div className="text-right">
                         <button className="bg-[#aeae5a] text-[#0f0f0f] font-bold py-2.5 px-6 rounded-md hover:bg-opacity-90 transition inline-flex items-center">
                            <MailIcon className="h-5 w-5 mr-2" />
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Communications;