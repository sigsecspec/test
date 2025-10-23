import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (email: string, pass: string) => boolean;
}

const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
    </svg>
);

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.095a1.23 1.23 0 00.41-1.412A9.99 9.99 0 0010 12c-2.31 0-4.438.784-6.131 2.095z" />
    </svg>
);

const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
    </svg>
);

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(email, password);
    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-[#535347] rounded-lg shadow-2xl shadow-[#aeae5a]/10 p-8">
        <div className="text-center mb-8">
            <ShieldIcon className="w-16 h-16 mx-auto text-[#aeae5a] mb-2" />
            <h1 className="text-2xl sm:text-3xl font-bold text-[#c4c4c4]">Signature Security</h1>
            <h2 className="text-xl sm:text-2xl font-light text-[#aeae5a]">Specialists</h2>
            <p className="text-[#787876] mt-2">Security Management System</p>
        </div>

        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-6 text-center text-sm">
                {error}
            </div>
        )}

        <form onSubmit={handleLoginSubmit}>
            <div className="mb-4 relative">
                <UserIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#787876]" />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#535347]/30 border border-[#535347] text-[#c4c4c4] rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#aeae5a] focus:border-[#aeae5a] transition"
                    required
                />
            </div>
            <div className="mb-6 relative">
                <LockIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#787876]" />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#535347]/30 border border-[#535347] text-[#c4c4c4] rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#aeae5a] focus:border-[#aeae5a] transition"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-[#aeae5a] text-[#0f0f0f] font-bold py-3 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0f0f] focus:ring-[#aeae5a] transition-transform duration-150 ease-in-out transform hover:scale-105"
            >
                Log In
            </button>
        </form>

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
