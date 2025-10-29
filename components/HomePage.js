
import { featureList, statList } from '../content/homepageContent.js';
import * as Icons from './Icons.js';

export const HomePage = () => `
    <div id="home-page">
        <header class="sticky top-0 z-30 bg-[var(--bg-secondary)]/80 backdrop-blur-sm border-b border-[var(--border-primary)]">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="font-bold text-lg text-[var(--text-primary)]">
                            <span>Signature</span> <span class="text-[var(--accent-primary)]">Security Specialist</span>
                        </div>
                    </div>
                    <nav class="hidden md:flex items-center space-x-1">
                        <a href="#home" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Home</a>
                        <a href="#features" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Features</a>
                        <a href="#how-it-works" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">How It Works</a>
                        <button data-action="open-login" class="ml-4 px-4 py-2 rounded-md text-sm font-medium border border-[var(--border-primary)] text-[var(--text-primary)] hover:border-[var(--border-primary-hover)] hover:text-[var(--accent-primary)] transition-colors">Portal Login</button>
                    </nav>
                    <div class="md:hidden">
                        <button data-action="toggle-mobile-menu" class="text-[var(--text-primary)]">
                           ${Icons.Menu({ className: "h-6 w-6" })}
                        </button>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <section id="home" class="text-center py-20 md:py-32 bg-[var(--bg-secondary)]">
                <div class="container mx-auto px-4">
                    <h1 class="text-4xl md:text-6xl font-extrabold text-[var(--text-primary)]">Professional Security Management Platform</h1>
                    <p class="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-[var(--text-secondary)]">Connecting businesses with certified security professionals through our comprehensive digital platform. Streamline operations, manage missions, and ensure safety with our all-in-one solution.</p>
                    <div class="mt-8 flex flex-wrap justify-center gap-4">
                        <button data-action="open-application" data-type="New Guard" class="px-8 py-3 rounded-md font-bold bg-[var(--accent-primary)] text-[var(--accent-primary-text)] transition-transform duration-200 hover:scale-105">Join as Guard</button>
                        <button data-action="open-application" data-type="New Client" class="px-8 py-3 rounded-md font-bold bg-[var(--accent-secondary)] text-[var(--accent-primary-text)] transition-transform duration-200 hover:scale-105">Hire Security</button>
                        <button data-action="open-application" data-type="New Supervisor" class="px-6 py-3 rounded-md font-bold bg-[var(--bg-primary)] border border-[var(--border-secondary)] text-[var(--text-primary)] transition-transform duration-200 hover:scale-105 hover:border-[var(--accent-primary)]">Apply for Supervisor</button>
                    </div>
                </div>
            </section>
            <section class="py-16 bg-[var(--bg-primary)]">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                        ${statList.map(stat => `<div class="text-center"><h2 class="text-4xl font-bold text-[var(--accent-primary)]">${stat.value}</h2><p class="mt-1 text-[var(--text-secondary)]">${stat.label}</p></div>`).join('')}
                    </div>
                </div>
            </section>
            <section id="features" class="py-20 bg-[var(--bg-secondary)]">
                 <div class="container mx-auto px-4">
                     <div class="text-center mb-12"><h2 class="text-3xl md:text-4xl font-bold">Platform Features</h2><p class="mt-2 text-[var(--text-secondary)]">Everything you need to manage security operations efficiently</p></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         ${featureList.map(feature => `
                             <div class="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg p-6">
                                 <h3 class="text-xl font-bold mb-4">${feature.title}</h3>
                                 <ul class="space-y-2 text-[var(--text-secondary)] list-disc list-inside">
                                     ${feature.items.map(item => `<li>${item}</li>`).join('')}
                                 </ul>
                             </div>
                        `).join('')}
                    </div>
                </div>
            </section>
             <section id="how-it-works" class="py-20 bg-[var(--bg-primary)]">
                <div class="container mx-auto px-4">
                    <div class="text-center mb-12"><h2 class="text-3xl md:text-4xl font-bold">How It Works</h2></div>
                    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                       <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6"><h3 class="text-xl font-bold mb-4">For Security Guards</h3><ol class="list-decimal list-inside space-y-2 text-[var(--text-secondary)]"><li><strong>Apply Online</strong> - Submit your application and certifications</li><li><strong>Complete Training</strong> - Take required training modules</li><li><strong>Get Approved</strong> - Officers review your certifications</li><li><strong>Browse Missions</strong> - See available missions</li><li><strong>Claim & Work</strong> - Accept missions and start earning</li><li><strong>Get Paid</strong> - Receive payment after completion</li></ol></div>
                       <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6"><h3 class="text-xl font-bold mb-4">For Businesses</h3><ol class="list-decimal list-inside space-y-2 text-[var(--text-secondary)]"><li><strong>Apply Online</strong> - Submit your business information</li><li><strong>Get Verified</strong> - Complete verification process</li><li><strong>Set Up Contract</strong> - Create security contracts</li><li><strong>Post Missions</strong> - Create missions with requirements</li><li><strong>Guards Assigned</strong> - Certified guards accept missions</li><li><strong>Monitor Performance</strong> - Track missions and rate guards</li></ol></div>
                    </div>
                </div>
            </section>
            <footer id="contact" class="bg-[var(--accent-secondary)] text-white py-12">
                <div class="container mx-auto px-4">
                     <div class="mt-8 pt-8 border-t border-white/10 text-center text-sm opacity-70">
                        <p>© ${new Date().getFullYear()} Signature Security Specialist. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    </div>
`;
