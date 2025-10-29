
export const LiveControl = ({ user }) => {
    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Live Control</h1>
             <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
                <p class="text-[var(--text-primary)]">This executive dashboard will provide a real-time geographic and statistical overview of all active operations.</p>
                 <p class="text-[var(--text-secondary)] mt-2">(Feature under development)</p>
            </div>
        </div>
    `;
};