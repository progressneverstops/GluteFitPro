import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ProgressTracking: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode') === 'enabled';
        setIsDarkMode(storedDarkMode);
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode ? 'enabled' : 'disabled');
        document.body.classList.toggle('dark-mode', newDarkMode);
    };

     useEffect(() => {
      const storedDarkMode = localStorage.getItem('darkMode') === 'enabled';
      if (storedDarkMode) {
          document.body.classList.add('dark-mode');
      }
    }, []);

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <header className="app-header">
        <img src="/plum-glutefit-pro.png" alt="GluteFitPro Logo" className="app-logo" />
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          <span id="dark-mode-toggle-icon">{isDarkMode ? '🌙' : '☀️'}</span>
        </button>
        <h1>Progress Tracking</h1>
        <p className="tagline">Science-backed nutrition & functional movement for optimal glute development</p>
        <nav className="app-nav">
          <ul>
            <li><Link href="/" className="btn-primary"><span className="nav-icon">🏠</span><span className="nav-text">Home</span></Link></li>
            <li><Link href="/WorkoutPlans" className="btn-primary"><span className="nav-icon">🏋️</span><span className="nav-text">Workout Plans</span></Link></li>
            <li><Link href="/MealPlan" className="btn-primary"><span className="nav-icon">🥗</span><span className="nav-text">Meal Plan</span></Link></li>
            <li><Link href="/ProgressTracking" className="btn-primary"><span className="nav-icon">📈</span><span className="nav-text">Progress Tracking</span></Link></li>
            <li><Link href="/About" className="btn-primary"><span className="nav-icon">ℹ️</span><span className="nav-text">About</span></Link></li>
            <li><Link href="/Contact" className="btn-primary"><span className="nav-icon">✉️</span><span className="nav-text">Contact</span></Link></li>
          </ul>
        </nav>
      </header>
      <main className="section">
        <h2>Track Your Progress</h2>
        <div style={{ textAlign: 'center' }}>
          <p>Connect with a Pro for personalized progress tracking and support.</p>
          <button className="toggle-button" onClick={() => window.open('https://www.progressneverstops.com/service-page/call-w-josh', '_blank')}>Connect with a Pro</button>
        </div>
        </div>
      </main>
      <style jsx>{`
        .section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
      <footer className="app-footer">
        <p> 2025 Addicted 2 Progress LLC. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProgressTracking;
