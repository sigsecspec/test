
import * as Icons from './Icons.js';
import { UserRole } from '../types.js';

const renderFormFields = (type) => {
    const inputStyles = "block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--bg-primary)]";
    if (type === 'New Guard' || type === 'New Supervisor') {
        return `
            <div class="grid grid-cols-2 gap-4">
                <input name="firstName" placeholder="First Name" required class="${inputStyles}" />
                <input name="lastName" placeholder="Last Name" required class="${inputStyles}" />
            </div>
            <input name="email" type="email" placeholder="Email Address" required class="${inputStyles}" />
            <input name="phone" type="tel" placeholder="Phone Number" required class="${inputStyles}" />
            <input type="hidden" name="role" value="${type === 'New Guard' ? UserRole.Guard : UserRole.Supervisor}" />
        `;
    }
    if (type === 'New Client') {
         return `
            <input name="companyName" placeholder="Company Name" required class="${inputStyles}" />
            <input name="contactEmail" type="email" placeholder="Contact Email" required class="${inputStyles}" />
            <input name="contactPhone" type="tel" placeholder="Contact Phone" required class="${inputStyles}" />
        `;
    }
    return '';
}


export const ApplicationModal = ({ type }) => `
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" data-action="close-modal">
        <div class="bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-md p-6 border border-[var(--border-primary)]" onclick="event.stopPropagation()">
            <h2 class="text-2xl font-bold mb-4 text-[var(--text-primary)]">Application for ${type.replace('New ', '')}</h2>
            <form id="application-form" class="space-y-4">
                ${renderFormFields(type)}
                <div class="flex justify-end space-x-3 pt-4">
                     <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--border-tertiary)] text-[var(--text-primary)] font-semibold rounded-md hover:bg-[var(--border-secondary)] transition">Cancel</button>
                     <button type="submit" class="px-4 py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-md hover:bg-[var(--accent-secondary-hover)] transition">Submit Application</button>
                </div>
            </form>
        </div>
    </div>
`;
