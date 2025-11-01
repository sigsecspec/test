import { Icons } from './Icons.js';
import { featureList, statList } from '../content/homepageContent.js';

export const HomePage = () => `
    <div id="home-page" class="bg-[var(--bg-secondary)]">
        <header class="sticky top-0 z-40 bg-[var(--bg-secondary)]/80 backdrop-blur-md border-b border-[var(--border-primary)]">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="font-bold text-xl text-[var(--text-primary)] tracking-tight">
                            <span>Signature</span><span class="text-[var(--accent-primary)]">Security</span>
                        </div>
                    </div>
                    <nav class="hidden md:flex items-center space-x-2">
                        <a href="#home" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Home</a>
                        <a href="#features" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Features</a>
                        <a href="#how-it-works" class="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">How It Works</a>
                        <button data-action="open-login" class="ml-4 px-4 py-2 rounded-md text-sm font-semibold border border-[var(--accent-secondary)] text-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)] hover:text-[var(--accent-secondary-text)] transition-all duration-200">
                            Portal Login
                        </button>
                    </nav>
                    <div class="md:hidden">
                        <button data-action="open-login" class="text-[var(--text-primary)]">
                           ${Icons.Menu({ className: "h-6 w-6" })}
                        </button>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <section id="home" class="relative text-center py-20 md:py-32 lg:py-40 bg-[var(--bg-secondary)] overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-80"></div>
                <div class="absolute inset-0 pattern-dots text-gray-200/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div class="container mx-auto px-4 relative">
                    <h1 class="text-4xl md:text-6xl font-extrabold text-[var(--text-primary)] tracking-tighter">Professional Security, <br class="hidden md:block" /> Perfected by Technology.</h1>
                    <p class="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-[var(--text-secondary)]">Connecting qualified professionals with clients who demand excellence. Our platform ensures safety, accountability, and operational superiority.</p>
                    <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button data-action="navigate" data-type="GuardApplication" class="w-full sm:w-auto px-8 py-3 rounded-md font-bold bg-[var(--accent-primary)] text-[var(--accent-primary-text)] transition-transform duration-200 hover:scale-105 shadow-lg hover:shadow-xl">Join as Guard</button>
                        <button data-action="navigate" data-type="ClientApplication" class="w-full sm:w-auto px-8 py-3 rounded-md font-bold bg-[var(--accent-secondary)] text-[var(--accent-secondary-text)] transition-transform duration-200 hover:scale-105 shadow-lg hover:shadow-xl">Hire Security</button>
                    </div>
                    <button data-action="navigate" data-type="OperationsApplication" class="mt-4 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">or, Join our Operations Team &rarr;</button>
                </div>
            </section>
            <section class="py-16 bg-[var(--bg-tertiary)] border-y border-[var(--border-primary)]">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                        ${statList.map(stat => `<div class="text-center animate-in"><h2 class="text-3xl lg:text-4xl font-bold text-[var(--accent-primary)]">${stat.value}</h2><p class="mt-1 text-sm text-[var(--text-secondary)]">${stat.label}</p></div>`).join('')}
                    </div>
                </div>
            </section>
            <section id="features" class="py-20 bg-[var(--bg-secondary)]">
                 <div class="container mx-auto px-4">
                     <div class="text-center mb-16"><h2 class="text-3xl md:text-4xl font-bold tracking-tight">A Unified Platform for Modern Security</h2><p class="mt-3 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">Everything you need to manage security operations efficiently and effectively.</p></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         ${featureList.map((feature, index) => `
                             <div class="bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:border-[var(--accent-primary)]/50 animate-in" style="animation-delay: ${index * 100}ms">
                                 <h3 class="text-xl font-bold mb-4 text-[var(--accent-secondary)]">${feature.title}</h3>
                                 <ul class="space-y-2 text-[var(--text-secondary)]">
                                     ${feature.items.map(item => `<li class="flex items-start"><span class="text-[var(--accent-primary)] mr-2 mt-1">&#10003;</span><span>${item}</span></li>`).join('')}
                                 </ul>
                             </div>
                        `).join('')}
                    </div>
                </div>
            </section>
             <section id="how-it-works" class="py-20 bg-[var(--bg-tertiary)] border-t border-[var(--border-primary)]">
                <div class="container mx-auto px-4">
                    <div class="text-center mb-12"><h2 class="text-3xl md:text-4xl font-bold tracking-tight">Simple, Streamlined, Secure</h2></div>
                    <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                       <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-8 animate-in"><h3 class="text-2xl font-bold mb-4">For Security Guards</h3><ol class="list-decimal list-inside space-y-3 text-[var(--text-secondary)]"><li><strong>Apply Online:</strong> Submit your application and certifications in minutes.</li><li><strong>Complete Training:</strong> Access our library of mission-specific training modules.</li><li><strong>Get Approved:</strong> Our officers review and approve your qualifications.</li><li><strong>Browse & Claim:</strong> See available missions and claim the ones that fit your schedule.</li><li><strong>Work & Earn:</strong> Complete your mission and track your earnings in real-time.</li></ol></div>
                       <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-8 animate-in-delay"><h3 class="text-2xl font-bold mb-4">For Businesses</h3><ol class="list-decimal list-inside space-y-3 text-[var(--text-secondary)]"><li><strong>Apply for Service:</strong> Submit your business information and security needs.</li><li><strong>Get Verified:</strong> We'll verify your business and set up your account.</li><li><strong>Post Missions:</strong> Easily create missions with detailed requirements.</li><li><strong>Get Coverage:</strong> Qualified, certified guards will claim and cover your missions.</li><li><strong>Monitor & Rate:</strong> Track mission progress and provide valuable feedback.</li></ol></div>
                    </div>
                </div>
            </section>
            <footer id="contact" class="bg-[var(--accent-secondary)] text-[var(--text-light)] py-12">
                <div class="container mx-auto px-4 text-center">
                    <p class="font-bold text-lg">Signature Security Specialist</p>
                    <p class="text-sm opacity-80">Protect with Purpose and Perform with Excellence.</p>
                     <div class="mt-8 pt-8 border-t border-white/10 text-center text-sm opacity-70">
                        <p>© ${new Date().getFullYear()} Signature Security Specialist. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    </div>
`;
