import React, { useState } from 'react';
import * as Icons from './Icons';
import { UserRole } from '../types';

interface ApplicationModalProps {
    type: string;
    onClose: () => void;
    onSubmit: (data: { type: string, data: any }) => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ type, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let submissionData = {};
        if (type === 'New Guard' || type === 'New Supervisor') {
            submissionData = { ...formData, role: type === 'New Guard' ? UserRole.Guard : UserRole.Supervisor };
        } else {
            submissionData = formData;
        }
        onSubmit({ type, data: submissionData });
    };
    
    const renderFormFields = () => {
        if (type === 'New Guard' || type === 'New Supervisor') {
            return (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <input name="firstName" onChange={handleChange} placeholder="First Name" required className="p-2 border rounded w-full" />
                        <input name="lastName" onChange={handleChange} placeholder="Last Name" required className="p-2 border rounded w-full" />
                    </div>
                    <input name="email" type="email" onChange={handleChange} placeholder="Email Address" required className="p-2 border rounded w-full" />
                    <input name="phone" type="tel" onChange={handleChange} placeholder="Phone Number" required className="p-2 border rounded w-full" />
                </>
            );
        }
        if (type === 'New Client') {
             return (
                <>
                    <input name="companyName" onChange={handleChange} placeholder="Company Name" required className="p-2 border rounded w-full" />
                    <input name="contactEmail" type="email" onChange={handleChange} placeholder="Contact Email" required className="p-2 border rounded w-full" />
                    <input name="contactPhone" type="tel" onChange={handleChange} placeholder="Contact Phone" required className="p-2 border rounded w-full" />
                </>
            );
        }
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">Application for {type.replace('New ', '')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {renderFormFields()}
                    <div className="flex justify-end space-x-3 pt-4">
                         <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                         <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit Application</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplicationModal;
