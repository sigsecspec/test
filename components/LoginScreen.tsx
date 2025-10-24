import React from 'react';
import { ShieldIcon } from './Icons';
import { TEST_USERS } from '../constants';

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-[#535347] rounded-lg shadow-2xl shadow-[#aeae5a]/10 p-8">
        <div className="text-center mb-8">
            <ShieldIcon className="w-16 h-16 mx-auto text-[#aeae5a] mb-2" />
            <h1 className="text-2xl sm:text-3xl font-bold text-[#c4c4c4]">Signature Security</h1>
            <h2 className="text-xl sm:text-2xl font-light text-[#aeae5a]">Specialists</h2>
            <p className="text-[#787876] mt-2">Security Management System</p>
        </div>
        
        <div className="text-center mb-6">
            <p className="text-[#c4c4c4] text-lg">Select a Role to Preview</p>
        </div>

        <div className="space-y-3 mb-8 max-h-60 overflow-y-auto pr-2">
            {Object.entries(TEST_USERS).map(([email, user]) => (
                <button
                    key={email}
                    onClick={() => onLogin(email)}
                    className="w-full bg-[#aeae5a] text-[#0f0f0f] font-bold py-2.5 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0f0f] focus:ring-[#aeae5a] transition-transform duration-150 ease-in-out transform hover:scale-105 text-sm"
                >
                    Login as {user.role}
                </button>
            ))}
        </div>


        <div className="mt-8 text-center">
            <p className="text-[#787876] mb-4">or apply to join our team</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button className="w-full bg-transparent border border-[#535347] text-[#c4c4c4] font-semibold py-2 px-4 rounded-md hover:bg-[#535347]/50 hover:border-[#aeae5a] transition">
                    New Client
                </button>
                <button className="w-full bg-transparent border border-[#535347] text-[#c4c4c4] font-semibold py-2 px-4 rounded-md hover:bg-[#535347]/50 hover:border-[#aeae5a] transition">
                    New Guard
                </button>
                <button className="w-full bg-transparent border border-[#535347] text-[#c4c4c4] font-semibold py-2 px-4 rounded-md hover:bg-[#535347]/50 hover:border-[#aeae5a] transition">
                    New Supervisor
                </button>
            </div>
        </div>
      </div>
       <footer className="text-center mt-8 text-[#535347] text-sm">
            <p>&copy; {new Date().getFullYear()} Signature Security Specialists. All rights reserved.</p>
            <p>Version 1.0.0</p>
        </footer>
    </div>
  );
};

export default LoginScreen;