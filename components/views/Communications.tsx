import React from 'react';
import { MailIcon } from '../Icons';

const Communications: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Communications Hub</h2>
            <p className="text-[var(--text-secondary)] mb-6">Send out company-wide announcements and messages.</p>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 shadow-sm">
                <div className="space-y-4">
                     <div>
                        <label htmlFor="recipient" className="block text-sm font-medium text-[var(--text-primary)]">Recipient Group</label>
                        <select id="recipient" className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]">
                           <option>All Staff</option>
                           <option>All Guards</option>
                           <option>All Clients</option>
                           <option>Supervisors Only</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-primary)]">Subject</label>
                        <input type="text" id="subject" className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]" />
                    </div>
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)]">Message</label>
                        <textarea id="message" rows={6} className="mt-1 block w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] sm:text-sm text-[var(--text-primary)]"></textarea>
                    </div>
                    <div className="text-right">
                         <button className="bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold py-2.5 px-6 rounded-md hover:bg-opacity-90 transition inline-flex items-center">
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