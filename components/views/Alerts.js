
import { getAlerts } from '../../database.js';

export const Alerts = ({ user }) => {
    const alerts = getAlerts();
    const getAlertClasses = (severity) => {
        if (severity === 'High') {
            return {
                bg: 'bg-red-500/10',
                border: 'border-red-500',
                text: 'text-red-400'
            };
        }
        return {
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500',
            text: 'text-yellow-400'
        };
    };
    return `
         <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">System Alerts</h1>
            <div class="space-y-4">
                ${alerts.length > 0 ? alerts.map(alert => {
                    const classes = getAlertClasses(alert.severity);
                    return `
                    <div class="${classes.bg} p-4 border-l-4 ${classes.border} rounded-r-lg flex justify-between items-center">
                        <div>
                            <p class="font-bold ${classes.text}">${alert.severity} Priority</p>
                            <p class="text-sm text-[var(--color-text-muted)]">${alert.message}</p>
                        </div>
                        <button class="px-3 py-1 bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] rounded-md text-sm hover:bg-[var(--color-border)]">Acknowledge</button>
                    </div>`;
                }).join('') : `<p class="text-[var(--color-text-muted)]">No active alerts.</p>`}
            </div>
        </div>
    `;
};
