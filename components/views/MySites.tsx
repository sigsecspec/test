import React, { useState, useEffect } from 'react';
import { User, Client, Site } from '../../types';
import * as db from '../../database';

// FIX: Destructure user from props to make it available in the component.
const MySites: React.FC<{ user: User }> = ({ user }) => {
    const [sites, setSites] = useState<Site[]>([]);
    
    useEffect(() => {
        const client = db.getClients().find(c => c.userId === user.id);
        if (client) {
            setSites(db.getSites().filter(s => s.clientId === client.id));
        }
    }, [user.id]);

    return (
         <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Sites</h1>
             <div className="space-y-4">
                {sites.map(site => (
                    <div key={site.id} className="bg-white p-4 border rounded-lg shadow-sm">
                        <p className="font-bold">{site.name}</p>
                        <p className="text-sm text-gray-600">{site.address}</p>
                    </div>
                ))}
                 <button className="w-full text-center p-4 border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-50 hover:border-gray-400">Add New Site</button>
            </div>
        </div>
    );
};

export default MySites;
