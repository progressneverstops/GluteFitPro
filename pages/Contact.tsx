import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Contact: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

   useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode') === 'enabled';
        setIsDarkMode(storedDarkMode);
        if (storedDarkMode) {
            document.body.classList.add('dark-mode');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode ? 'enabled' : 'disabled');
        document.body.classList.toggle('dark-mode', newDarkMode);
    };

    return (
        <div className={isDarkMode ? 'dark-mode' : ''}>
            <header className="app-header">
                <img src="/plum-glutefit-pro.png" alt="GluteFitPro Logo" className="app-logo" />
                <button onClick={toggleDarkMode} className="dark-mode-toggle">
                    <span id="dark-mode-toggle-icon">{isDarkMode ? '🌙' : '☀️'}</span>
                </button>
                <h1>Contact Us</h1>
                <p className="tagline">Science-backed nutrition & functional movement for optimal glute development</p>
                <nav className="app-nav">
                    <ul>
                        <li><Link href="/" className="btn-primary"><span className="nav-icon">🏠</span><span className="nav-text">Home</span></Link></li>
                        <li><Link href="/WorkoutPlans" className="btn-primary"><span className="nav-icon">🏋️</span><span className="nav-text">Workout Plans</span></Link></li>
                        <li><Link href="/MealPlan" className="btn-primary"><span className="nav-icon">🥗</span><span className="nav-text">Meal Plan</span></Link></li>
                        <li><Link href="/ProgressTracking" className="btn-primary"><span className="nav-icon">📈</span><span className="nav-text">Progress Planning</span></Link></li>
                        <li><Link href="/About" className="btn-primary"><span className="nav-icon">ℹ️</span><span className="nav-text">About</span></Link></li>
                        <li><Link href="/Contact" className="btn-primary"><span className="nav-icon">✉️</span><span className="nav-text">Contact</span></Link></li>
                    </ul>
                </nav>
            </header>
            <main className="section">
                <h2>Contact Addicted 2 Progress LLC</h2>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" className="form-group input" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" className="form-group input" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" className="form-group textarea"></textarea>
                </div>
                <div className="form-group submit-group">
                    <button className="btn-primary">Send Message</button>
                </div>
            </main>
            <footer className="app-footer">
                <button className="btn-primary" onClick={() => window.open('https://www.progressneverstops.com/service-page/call-w-josh', '_blank')}>Connect with a Pro</button>
                <p>&copy; 2025 Addicted 2 Progress LLC. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Contact;
