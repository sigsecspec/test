
import * as Icons from '../Icons.js';

export const Analytics = ({ user }) => {
    // Dummy data for now
    const stats = [
        { title: "Total Missions Completed", value: "1,254", icon: Icons.ClipboardList },
        { title: "Active Guards", value: "487", icon: Icons.Users },
        { title: "Client Satisfaction", value: "4.8 / 5.0", icon: Icons.Trophy },
        { title: "Monthly Revenue", value: "$125,480", icon: Icons.CreditCard }
    ];

    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Analytics Dashboard</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${stats.map(stat => {
                    const Icon = stat.icon;
                    return `
                        <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm flex items-center">
                            <div class="p-3 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] mr-4">
                                ${Icon({ className: "w-6 h-6" })}
                            </div>
                            <div>
                                <p class="text-sm text-[var(--text-secondary)]">${stat.title}</p>
                                <p class="text-2xl font-bold text-[var(--text-primary)]">${stat.value}</p>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="mt-8 bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
                <h2 class="text-xl font-bold text-[var(--text-primary)] mb-4">More Analytics Coming Soon</h2>
                <p class="text-[var(--text-secondary)]">Detailed charts for mission trends, guard performance, and financial overviews will be available here.</p>
            </div>
        </div>
    `;
};