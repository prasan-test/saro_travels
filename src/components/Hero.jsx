import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const BASE = import.meta.env.BASE_URL;

const SLIDES = [
    { image: `${BASE}assets/hero.png`, location: 'Hollywood Hills', time: '6:45 PM' },
    { image: `${BASE}assets/plan1.png`, location: 'Santa Monica Pier', time: '5:30 PM' },
    { image: `${BASE}assets/plan2.png`, location: 'Downtown LA', time: '8:00 PM' },
    { image: `${BASE}assets/plan3.png`, location: 'Beverly Hills', time: '4:20 PM' },
];

const STATS = [
    { value: '340', label: 'Days of Sunshine' },
    { value: '75 mi', label: 'of Coastline' },
    { value: '841', label: 'Languages Spoken' },
];

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [introComplete, setIntroComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIntroComplete(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!introComplete) return;
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [introComplete]);

    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const handleMouseMove = useCallback((e) => {
        setMousePos({
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight,
        });
    }, []);

    const bokeh = useMemo(() =>
        [...Array(12)].map((_, i) => ({
            id: i,
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            size: 40 + Math.random() * 100,
            duration: 10 + Math.random() * 10,
            delay: Math.random() * 5,
            baseOpacity: 0.03 + Math.random() * 0.05,
        })), []
    );

    const titleChars = 'LOS ANGELES';

    return (
        <div ref={ref} className="hero-section" id="home" onMouseMove={handleMouseMove}>
            {/* Cinematic Intro — SARO branding */}
            <motion.div
                className="hero-intro-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.2, times: [0, 0.25, 0.55, 1] }}
            >
                SARO
            </motion.div>

            {/* Letterbox Bars */}
            <motion.div
                className="hero-letterbox hero-letterbox--top"
                initial={{ height: '50vh' }}
                animate={{ height: 0 }}
                transition={{ duration: 1.4, delay: 1.3, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
                className="hero-letterbox hero-letterbox--bottom"
                initial={{ height: '50vh' }}
                animate={{ height: 0 }}
                transition={{ duration: 1.4, delay: 1.3, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Background Slideshow */}
            <AnimatePresence>
                <motion.div
                    key={currentSlide}
                    className="hero-slide"
                    style={{ y: backgroundY }}
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: 1.02 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        opacity: { duration: 1.8, ease: "easeInOut" },
                        scale: { duration: 7, ease: "linear" }
                    }}
                >
                    <div
                        className="hero-slide-img"
                        style={{ backgroundImage: `url(${SLIDES[currentSlide].image})` }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Overlays */}
            <div className="hero-overlay" />
            <div
                className="hero-spotlight"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,215,0,0.03), transparent 70%)`
                }}
            />

            {/* Warm Light Leak */}
            <motion.div
                className="hero-light-leak"
                animate={{
                    opacity: [0.06, 0.14, 0.06],
                    x: ['-5%', '5%', '-5%'],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Bokeh Lights */}
            {bokeh.map((b) => (
                <motion.div
                    key={b.id}
                    className="hero-bokeh"
                    style={{
                        left: b.left,
                        top: b.top,
                        width: b.size,
                        height: b.size,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [b.baseOpacity, b.baseOpacity * 1.8, b.baseOpacity],
                    }}
                    transition={{
                        duration: b.duration,
                        repeat: Infinity,
                        delay: b.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Logo */}
            <motion.div
                className="hero-logo"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.8 }}
                style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 100, width: '160px' }}
            >
                <img src={`${BASE}assets/logo.svg`} alt="Saro Travel Logo" style={{ width: '100%' }} />
            </motion.div>

            {/* Coordinates */}
            <motion.div
                className="hero-coordinates"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2, duration: 1 }}
            >
                34.0522° N, 118.2437° W
            </motion.div>

            {/* Location Tag */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    className="hero-location-tag"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    {SLIDES[currentSlide].location} &#x2022; {SLIDES[currentSlide].time}
                </motion.div>
            </AnimatePresence>

            {/* Main Content */}
            <motion.div className="hero-content" style={{ y: textY, opacity }}>
                {/* Pre-title */}
                <motion.div
                    className="hero-pretitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0, duration: 0.8 }}
                >
                    <span className="hero-pretitle-line" />
                    <span>Saro Travel Company Presents</span>
                    <span className="hero-pretitle-line" />
                </motion.div>

                {/* Main Title — LOS ANGELES */}
                <h1 className="hero-main-title">
                    {titleChars.split('').map((char, i) => (
                        <motion.span
                            key={i}
                            className={`hero-char${char === ' ' ? ' hero-space' : ''}`}
                            initial={{ opacity: 0, y: 60, rotateX: -80 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                                duration: 0.9,
                                delay: 1.8 + i * 0.05,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </h1>

                {/* Gold Line */}
                <motion.div
                    className="hero-title-line"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Tagline */}
                <motion.p
                    className="hero-tagline"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    Where sunlight writes poetry on the Pacific
                    <br />
                    and every boulevard tells the story of a dream
                </motion.p>

                {/* Stats */}
                <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.4, duration: 0.8 }}
                >
                    {STATS.map((stat, i) => (
                        <React.Fragment key={i}>
                            {i > 0 && <span className="hero-stat-sep" />}
                            <div className="hero-stat">
                                <motion.span
                                    className="hero-stat-val"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 3.5 + i * 0.12 }}
                                >
                                    {stat.value}
                                </motion.span>
                                <span className="hero-stat-lbl">{stat.label}</span>
                            </div>
                        </React.Fragment>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.button
                    className="hero-cta"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.8, duration: 0.8 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                        const el = document.getElementById('plans');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <span className="hero-cta-text">Begin Your Journey</span>
                    <span className="hero-cta-arrow">&rarr;</span>
                </motion.button>
            </motion.div>

            {/* Slide Indicators */}
            <motion.div
                className="hero-slide-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 0.8 }}
            >
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        className={`hero-dot${i === currentSlide ? ' active' : ''}`}
                        onClick={() => setCurrentSlide(i)}
                    />
                ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.2, duration: 1 }}
            >
                <span>Explore</span>
                <div className="arrow-down" />
            </motion.div>
        </div>
    );
};

export default Hero;
