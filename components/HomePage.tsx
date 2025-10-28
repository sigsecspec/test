import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon } from './Icons';
import { featureList, statList, levelList, testimonialList } from '../content/homepageContent';

// --- START OF ANIMATION UTILITIES ---
const useOnScreen = (ref: React.RefObject<HTMLElement>, options: IntersectionObserverInit) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        if (ref.current) {
          observer.unobserve(entry.target);
        }
      }
    }, options);
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
        if(ref.current) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.unobserve(ref.current);
        }
    };
  }, [ref, options]);
  return isIntersecting;
};

const AnimateOnScroll: React.FC<{ children: React.ReactNode, className?: string, style?: React.CSSProperties }> = ({ children, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref, { threshold: 0.1 });
  return (
    <div ref={ref} className={`${className || ''} ${onScreen ? 'animate-in' : ''}`} style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease', ...style }}>
      {children}
    </div>
  );
};
// --- END OF ANIMATION UTILITIES ---

interface HeaderProps {
    onOpenLoginModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenLoginModal }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    return(
        <header className="sticky top-0 z-30 bg-[var(--bg-primary)]/80 backdrop-blur-sm border-b border-[var(--border-secondary)]">
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
                        <a href="#about" className="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">About</a>
                        <a href="#contact" className="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Contact</a>
                        <button onClick={onOpenLoginModal} className="ml-4 px-4 py-2 rounded-md text-sm font-medium border border-[var(--border-primary)] text-[var(--text-primary)] hover:border-[var(--border-primary-hover)] hover:text-[var(--accent-primary)] transition-colors">Portal Login</button>
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-[var(--text-primary)]">
                            <MenuIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="md:hidden pt-2 pb-4 space-y-1">
                        <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Home</a>
                        <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Features</a>
                        <a href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">How It Works</a>
                        <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">About</a>
                        <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Contact</a>
                        <button onClick={onOpenLoginModal} className="mt-2 w-full text-left block px-3 py-2 rounded-md text-base font-medium border border-[var(--border-primary)] text-[var(--text-primary)]">Portal Login</button>
                    </div>
                )}
            </div>
        </header>
    )
};

interface HomePageProps {
    onOpenLoginModal: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenLoginModal }) => {
    return (
        <div>
            <Header onOpenLoginModal={onOpenLoginModal} />
            <main>
                <section id="home" className="text-center py-20 md:py-32">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--text-primary)]">Professional Security Management Platform</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-[var(--text-secondary)]">Connecting businesses with certified security professionals through our comprehensive digital platform. Streamline operations, manage missions, and ensure safety with our all-in-one solution.</p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a href="#" className="px-8 py-3 rounded-md font-bold bg-[var(--accent-primary)] text-[var(--accent-primary-text)] transition-transform duration-200 hover:scale-105">Join as Guard</a>
                            <a href="#" className="px-8 py-3 rounded-md font-bold bg-[var(--accent-secondary)] text-[var(--text-primary)] transition-transform duration-200 hover:scale-105">Hire Security</a>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-[var(--bg-secondary)]">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                           {statList.map((stat, i) => <AnimateOnScroll key={i} className="text-center"><h2 className="text-4xl font-bold text-[var(--accent-primary)]">{stat.value}</h2><p className="mt-1 text-[var(--text-secondary)]">{stat.label}</p></AnimateOnScroll>)}
                        </div>
                    </div>
                </section>
                <section id="features" className="py-20">
                     <div className="container mx-auto px-4">
                         <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold">Platform Features</h2><p className="mt-2 text-[var(--text-secondary)]">Everything you need to manage security operations efficiently</p></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                             {featureList.map((feature, i) => (
                                 <AnimateOnScroll key={i} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6">
                                     <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                     <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside">
                                         {feature.items.map(item => <li key={item}>{item}</li>)}
                                     </ul>
                                 </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </section>
                 <section id="how-it-works" className="py-20 bg-[var(--bg-secondary)]">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold">How It Works</h2></div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                           <AnimateOnScroll className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg p-6"><h3 className="text-xl font-bold mb-4">For Security Guards</h3><ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)]"><li><strong>Apply Online</strong> - Submit your application and certifications</li><li><strong>Complete Training</strong> - Take required training modules</li><li><strong>Get Approved</strong> - Officers review your certifications</li><li><strong>Browse Missions</strong> - See available missions</li><li><strong>Claim & Work</strong> - Accept missions and start earning</li><li><strong>Get Paid</strong> - Receive payment after completion</li></ol></AnimateOnScroll>
                           <AnimateOnScroll className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg p-6"><h3 className="text-xl font-bold mb-4">For Businesses</h3><ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)]"><li><strong>Apply Online</strong> - Submit your business information</li><li><strong>Get Verified</strong> - Complete verification process</li><li><strong>Set Up Contract</strong> - Create security contracts</li><li><strong>Post Missions</strong> - Create missions with requirements</li><li><strong>Guards Assigned</strong> - Certified guards accept missions</li><li><strong>Monitor Performance</strong> - Track missions and rate guards</li></ol></AnimateOnScroll>
                        </div>
                    </div>
                </section>
                <section className="py-20">
                     <div className="container mx-auto px-4">
                        <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold">Guard Certification Levels</h2><p className="mt-2 text-[var(--text-secondary)]">Different security levels for different needs</p></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                             {levelList.map((level, i) => <AnimateOnScroll key={i} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-6 text-center"><h4 className="text-lg font-bold">{level.title}</h4><p className="mt-2 text-[var(--text-secondary)]">{level.desc}</p></AnimateOnScroll>)}
                        </div>
                    </div>
                </section>
                <section className="py-20 bg-[var(--bg-secondary)]">
                    <div className="container mx-auto px-4">
                         <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2></div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonialList.map((t, i) => <AnimateOnScroll key={i} className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg p-6"><p className="text-[var(--text-secondary)]">"{t.quote}"</p><p className="mt-4 font-bold text-[var(--text-primary)]">{t.author}</p></AnimateOnScroll>)}
                         </div>
                    </div>
                </section>
                <section id="contact" className="py-20 text-center">
                    <div className="container mx-auto px-4">
                         <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
                         <p className="mt-2 mb-8 text-[var(--text-secondary)]">Join our platform today and experience professional security management</p>
                        <div className="flex flex-wrap justify-center gap-4">
                             <a href="#" className="px-8 py-3 rounded-md font-bold bg-[var(--accent-primary)] text-[var(--accent-primary-text)] transition-transform duration-200 hover:scale-105">Join as Guard</a>
                             <a href="#" className="px-8 py-3 rounded-md font-bold bg-[var(--accent-secondary)] text-[var(--text-primary)] transition-transform duration-200 hover:scale-105">Hire Security</a>
                        </div>
                    </div>
                </section>
            </main>
            <footer id="about" className="bg-[var(--bg-secondary)] border-t border-[var(--border-primary)] py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="font-bold text-[var(--text-primary)]">Signature Security Specialist</h4>
                            <p className="mt-2 text-sm text-[var(--text-secondary)]">Professional security management platform.</p>
                        </div>
                        <div><h4 className="font-bold text-[var(--text-primary)]">For Guards</h4><ul className="mt-2 space-y-1 text-sm text-[var(--text-secondary)]"><li><a href="#" className="hover:text-[var(--text-primary)]">Apply as Guard</a></li><li><a href="#" className="hover:text-[var(--text-primary)]" onClick={(e) => { e.preventDefault(); onOpenLoginModal();}}>Guard Login</a></li></ul></div>
                        <div><h4 className="font-bold text-[var(--text-primary)]">For Clients</h4><ul className="mt-2 space-y-1 text-sm text-[var(--text-secondary)]"><li><a href="#" className="hover:text-[var(--text-primary)]">Apply as Client</a></li><li><a href="#" className="hover:text-[var(--text-primary)]" onClick={(e) => { e.preventDefault(); onOpenLoginModal();}}>Client Login</a></li></ul></div>
                        <div><h4 className="font-bold text-[var(--text-primary)]">Company</h4><ul className="mt-2 space-y-1 text-sm text-[var(--text-secondary)]"><li><a href="#" className="hover:text-[var(--text-primary)]">About Us</a></li><li><a href="#" className="hover:text-[var(--text-primary)]">Contact</a></li></ul></div>
                        <div><h4 className="font-bold text-[var(--text-primary)]">Legal</h4><ul className="mt-2 space-y-1 text-sm text-[var(--text-secondary)]"><li><a href="#" className="hover:text-[var(--text-primary)]">Terms of Service</a></li><li><a href="#" className="hover:text-[var(--text-primary)]">Privacy Policy</a></li></ul></div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-[var(--border-secondary)] text-center text-sm text-[var(--text-secondary)]">
                        <p>© {new Date().getFullYear()} Signature Security Specialist. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;