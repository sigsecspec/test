import React from 'react';
import { User } from '../../types';
import * as Icons from '../Icons';

const Analytics: React.FC<{ user: User }> = () => {
    // Dummy data for now
    const stats = [
        { title: "Total Missions Completed", value: "1,254", icon: Icons.ClipboardList },
        { title: "Active Guards", value: "487", icon: Icons.Users },
        { title: "Client Satisfaction", value: "4.8 / 5.0", icon: Icons.Trophy },
        { title: "Monthly Revenue", value: "$125,480", icon: Icons.CreditCard }
    ];

    return (
        <div className="animate-in" style={{ animationDelay: "100ms", opacity: 0, transform: "translateY(10px)" }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.title} className="bg-white p-6 border rounded-lg shadow-sm flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-8 bg-white p-6 border rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">More Analytics Coming Soon</h2>
                <p className="text-gray-600">Detailed charts for mission trends, guard performance, and financial overviews will be available here.</p>
            </div>
        </div>
    );
};

export default Analytics;
