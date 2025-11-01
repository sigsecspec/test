import { getAlerts } from '../../database.js';

export const Alerts = ({ user }) => {
    const alerts = getAlerts();
    return `
         <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">System Alerts</h1>
            <div class="space-y-4">
                ${alerts.length > 0 ? alerts.map(alert => `<div class="p-4 border-l-4 rounded-r-lg flex justify-between items-center ${alert.severity === 'High' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'}"><div><p class="font-bold ${alert.severity === 'High' ? 'text-red-800' : 'text-yellow-800'}">${alert.severity} Priority</p><p class="text-sm text-gray-700">${alert.message}</p></div><button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">Acknowledge</button></div>`).join('') : `<p>No active alerts.</p>`}
            </div>
        </div>
    `;
};
