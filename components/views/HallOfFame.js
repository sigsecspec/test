
export const HallOfFame = ({ user }) => {
    return `
        <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Hall of Fame</h1>
            <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
                <p class="text-[var(--text-primary)]">This view will display leaderboards and recognize the 'Guard of the Month' based on performance metrics.</p>
                <p class="text-[var(--text-secondary)] mt-2">(Feature under development)</p>
            </div>
        </div>
    `;
};
