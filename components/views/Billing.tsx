import React from 'react';
import { User } from '../../types';

const Billing: React.FC<{ user: User }> = () => {
    return (
         <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Billing & Invoices</h1>
            <div className="bg-white p-6 border rounded-lg shadow-sm">
                <p>Clients will be able to view their invoices, payment history, and manage payment methods here.</p>
                 <p className="text-gray-500 mt-2">(Feature under development)</p>
            </div>
        </div>
    );
};

export default Billing;
