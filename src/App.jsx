import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import DiscoverLA from './components/DiscoverLA';
import Plans from './components/Plans';
import Contact from './components/Contact';

const Ornament = ({ type = "diamond" }) => (
    <div className="ornament-divider">
        <div className="ornament-line" />
        {type === "diamond" ? (
            <div className="ornament-diamond" />
        ) : (
            <div className="ornament-star" />
        )}
        <div className="ornament-line" />
    </div>
);

function App() {
    const { scrollYProgress } = useScroll();
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowNav(window.scrollY > window.innerHeight * 0.4);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="app-container">
            {/* Film Grain Overlay */}
            <div className="grain-overlay" />

            {/* Scroll Progress Bar */}
            <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

            {/* Floating Navigation */}
            <AnimatePresence>
                {showNav && (
                    <motion.nav
                        className="floating-nav"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="nav-logo">Saro</div>
                        <ul className="nav-links">
                            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>Home</a></li>
                            <li><a href="#plans" onClick={(e) => { e.preventDefault(); scrollTo('plans'); }}>Tour Plans</a></li>
                            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>

            <Hero />
            <Ornament type="diamond" />
            <DiscoverLA />
            <Ornament type="star" />
            <Plans />
            <Ornament type="diamond" />
            <Contact />

            {/* Footer */}
            <footer className="site-footer" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--color-sand-beige)', opacity: 0.8 }}>
                <div style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                    <img src="/assets/logo.svg" alt="Saro Travel Logo" style={{ width: '120px' }} />
                </div>
                <div className="footer-ornament">
                    <div className="ornament-line" />
                    <div className="ornament-diamond" />
                    <div className="ornament-line" />
                </div>
                <div className="footer-brand">Saro Travel Company</div>
                <div className="footer-tagline">Los Angeles, California</div>
                <div className="footer-copyright">&copy; 2026 Saro Travel Company. All rights reserved.</div>
            </footer>
        </div>
    );
}

export default App;
