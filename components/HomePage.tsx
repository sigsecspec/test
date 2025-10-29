import React, { useState } from 'react';
import { featureList, statList } from '../content/homepageContent';
import * as Icons from './Icons';

interface HomePageProps {
    onLoginClick: () => void;
    onApplyClick: (type: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLoginClick, onApplyClick }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div id="home-page">
            <header className="sticky top-0 z-30 bg-[var(--bg-secondary)]/80 backdrop-blur-sm border-b border-[var(--border-primary)]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="font-bold text-lg text-[var(--text-primary)]">
                                <span>Signature</span> <span className="text-[var(--accent-primary)]">Security Specialist</span>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center space-x-1">
                            <a href="#home" className="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Home</a>
                            <a href="#features" className="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Features</a>
                            <a href="#how-it-works" className="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">How It Works</a>
                            <button onClick={onLoginClick} className="ml-4 px-4 py-2 rounded-md text-sm font-medium border border-[var(--border-primary)] text-[var(--text-primary)] hover:border-[var(--border-primary-hover)] hover:text-[var(--accent-primary)] transition-colors">Portal Login</button>
                        </nav>
                        <div className="md:hidden">
                            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-[var(--text-primary)]">
                                {isMobileMenuOpen ? <Icons.X className="h-6 w-6"/> : <Icons.Menu className="h-6 w-6"/>}
                            </button>
                        </div>
                    </div>
                    {isMobileMenuOpen && (
                         <div className="md:hidden pt-2 pb-4 space-y-1">
                            <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Home</a>
                            <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Features</a>
                            <a href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">How It Works</a>
                            <button onClick={onLoginClick} className="mt-2 w-full text-left block px-3 py-2 rounded-md text-base font-medium border border-[var(--border-primary)] text-[var(--text-primary)]">Portal Login</button>
                        </div>
                    )}
                </div>
            </header>
            <main>
                <section id="home" className="text-center py-20 md:py-32 bg-[var(--bg-secondary)]">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--text-primary)]">Professional Security Management Platform</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-[var(--text-secondary)]">Connecting businesses with certified security professionals through our comprehensive digital platform. Streamline operations, manage missions, and ensure safety with our all-in-one solution.</p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <button onClick={() => onApplyClick('New Guard')} className="px-8 py-3 rounded-md font-bold bg-[var(--accent-primary)] text-[var(--accent-primary-text)] transition-transform duration-200 hover:scale-105">Join as Guard</button>
                            <button onClick={() => onApplyClick('New Client')} className="px-8 py-3 rounded-md font-bold bg-[var(--accent-secondary)] text-[var(--accent-primary-text)] transition-transform duration-200 hover:scale-105">Hire Security</button>
                            <button onClick={() => onApplyClick('New Supervisor')} className="px-6 py-3 rounded-md font-bold bg-[var(--bg-primary)] border border-[var(--border-secondary)] text-[var(--text-primary)] transition-transform duration-200 hover:scale-105 hover:border-[var(--accent-primary)]">Apply for Supervisor</button>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-[var(--bg-primary)]">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                           {statList.map(stat => <div key={stat.label} className="text-center"><h2 className="text-4xl font-bold text-[var(--accent-primary)]">{stat.value}</h2><p className="mt-1 text-[var(--text-secondary)]">{stat.label}</p></div>)}
                        </div>
                    </div>
                </section>
                <section id="features" className="py-20 bg-[var(--bg-secondary)]">
                     <div className="container mx-auto px-4">
                         <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold">Platform Features</h2><p className="mt-2 text-[var(--text-secondary)]">Everything you need to manage security operations efficiently</p></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                             {featureList.map(feature => (
                                 <div key={feature.title} className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg p-6">
                                     <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                     <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside">
                                         {feature.items.map((item, i) => <li key={i}>{item}</li>)}
                                     </ul>
                                 </div>
                            ))}
                        </div>
                    </div>
                </section>
                 <section id="how-it-works" className="py-20 bg-[var(--bg-primary)]">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold">How It Works</h2></div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                           <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6"><h3 className="text-xl font-bold mb-4">For Security Guards</h3><ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)]"><li><strong>Apply Online</strong> - Submit your application and certifications</li><li><strong>Complete Training</strong> - Take required training modules</li><li><strong>Get Approved</strong> - Officers review your certifications</li><li><strong>Browse Missions</strong> - See available missions</li><li><strong>Claim & Work</strong> - Accept missions and start earning</li><li><strong>Get Paid</strong> - Receive payment after completion</li></ol></div>
                           <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6"><h3 className="text-xl font-bold mb-4">For Businesses</h3><ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)]"><li><strong>Apply Online</strong> - Submit your business information</li><li><strong>Get Verified</strong> - Complete verification process</li><li><strong>Set Up Contract</strong> - Create security contracts</li><li><strong>Post Missions</strong> - Create missions with requirements</li><li><strong>Guards Assigned</strong> - Certified guards accept missions</li><li><strong>Monitor Performance</strong> - Track missions and rate guards</li></ol></div>
                        </div>
                    </div>
                </section>
                <footer id="contact" className="bg-[var(--accent-secondary)] text-white py-12">
                    <div className="container mx-auto px-4">
                         <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm opacity-70">
                            <p>© {new Date().getFullYear()} Signature Security Specialist. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default HomePage;