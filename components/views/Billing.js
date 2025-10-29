
export const Billing = ({ user }) => {
    return `
         <div class="animate-in" style="animation-delay: 100ms; opacity: 0; transform: translateY(10px);">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Billing & Invoices</h1>
            <div class="bg-[var(--bg-secondary)] p-6 border border-[var(--border-primary)] rounded-lg shadow-sm">
                <p class="text-[var(--text-primary)]">Clients will be able to view their invoices, payment history, and manage payment methods here.</p>
                 <p class="text-[var(--text-secondary)] mt-2">(Feature under development)</p>
            </div>
        </div>
    `;
};
