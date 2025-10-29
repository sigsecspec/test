
import * as db from '../../database.js';

export const Applications = ({ user }) => {
    const applications = db.getApplications();

    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">New Applications</h1>
            <div class="space-y-4">
                ${applications.length > 0 ? applications.map(app => `
                    <div class="bg-white p-4 border rounded-lg shadow-sm">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-bold text-lg">${app.data.firstName ? `${app.data.firstName} ${app.data.lastName}` : app.data.companyName}</p>
                                <p class="text-sm text-gray-500">${app.type}</p>
                            </div>
                            <div class="space-x-2">
                                <button data-action="approve-application" data-id="${app.id}" class="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">Approve</button>
                                <button data-action="deny-application" data-id="${app.id}" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">Deny</button>
                            </div>
                        </div>
                    </div>
                `).join('') : `<p>No pending applications.</p>`}
            </div>
        </div>
    `;
};