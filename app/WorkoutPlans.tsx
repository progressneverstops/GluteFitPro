import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const WorkoutPlans: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
    const [fitnessLevel, setFitnessLevel] = useState<string>('');
    const [primaryGoal, setPrimaryGoal] = useState<string>('');
    const [goalReason, setGoalReason] = useState<string>('');
    const [dietType, setDietType] = useState<string>('');
    const [dietPreference, setDietPreference] = useState<string>('');
    const [mobilityIssues, setMobilityIssues] = useState<string>('');

    useEffect(() => {
        const storedFitnessLevel = localStorage.getItem('fitnessLevel') || 'beginner';
        const storedPrimaryGoal = localStorage.getItem('primaryGoal') || 'aesthetic';
        const storedGoalReason = localStorage.getItem('goalReason') || 'longevity';
        const storedDietType = localStorage.getItem('dietType') || 'plump';
        const storedDietPreference = localStorage.getItem('dietPreference') || 'omnivore';
        const storedMobilityIssues = localStorage.getItem('mobilityIssues') || '';

        setFitnessLevel(storedFitnessLevel);
        setPrimaryGoal(storedPrimaryGoal);
        setGoalReason(storedGoalReason);
        setDietType(storedDietType);
        setDietPreference(storedDietPreference);
        setMobilityIssues(storedMobilityIssues);
      
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
        <h1>GluteFitPro</h1>
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
      <main className="main-content">
        <section className="section onboarding-form">
          <h2 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Get Your Personalized Plan</h2>
          <p style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1.1rem', color: '#555' }}>
            Answer a few questions to generate your glute-focused workout and meal plan:
          </p>
        </section>
      </main>
      <main className="main-content">
        <section className="section workout-plans-section">
          <h2>Your Workout Plans</h2>

          <div className="form-group form-row">
            <label htmlFor="fitnessLevel">Current Fitness Level:</label>
            <select id="fitnessLevel" className="form-group select" value={fitnessLevel} onChange={(e) => setFitnessLevel(e.target.value)}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group form-row">
            <label htmlFor="primaryGoal">Primary Goal:</label>
            <select id="primaryGoal" className="form-group select" value={primaryGoal} onChange={(e) => setPrimaryGoal(e.target.value)}>
              <option value="aesthetic">Aesthetic Development</option>
              <option value="functional">Functional Strength</option>
              <option value="athletic">Athletic Performance</option>
            </select>
          </div>

          <div className="form-group form-row">
            <label htmlFor="goalReason">Why do you want to reach this goal?:</label>
            <select id="goalReason" className="form-group select" value={goalReason} onChange={(e) => setGoalReason(e.target.value)}>
              <option value="longevity">Longevity</option>
              <option value="strength">Strength & Fitness</option>
              <option value="attractiveness">Attractiveness</option>
              <option value="selfConfidence">Self-Confidence</option>
            </select>
          </div>

          <div className="form-group form-row">
            <label htmlFor="dietType">Diet Type:</label>
            <select id="dietType" className="form-group select" value={dietType} onChange={(e) => setDietType(e.target.value)}>
              <option value="plump">Plump</option>
              <option value="tight">Tight</option>
              <option value="functional">Functional</option>
            </select>
          </div>
          <div className="form-group form-row">
            <label htmlFor="dietPreference">Diet Preference:</label>
            <select id="dietPreference" className="form-group select" value={dietPreference} onChange={(e) => setDietPreference(e.target.value)}>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="omnivore">Omnivore</option>
              <option value="pescatarian">Pescatarian</option>
              <option value="ketogenic">Ketogenic</option>
              <option value="glutenFree">Gluten Free</option>
              <option value="traditionalUSDA">Traditional-USDA</option>
              <option value="plantBased">Plant-Based</option>
              <option value="mediterranean">Mediterranean</option>
            </select>
          </div>
          <div className="form-group form-row">
            <label htmlFor="mobilityIssues">Mobility Issues:</label>
            <textarea id="mobilityIssues" className="form-group textarea" placeholder="Describe any mobility issues or limitations" value={mobilityIssues} onChange={(e) => setMobilityIssues(e.target.value)}></textarea>
          </div>

          <div className="form-group submit-group">
            <button id="createPlanBtn" className="btn-primary">Create My Plan</button>
          </div>

          <p>Here are your personalized workout plans based on your input:</p>

          <div id="workoutPlanOutput" style={{ marginTop: '2rem' }} className="recommendation-section">
            <h3 style={{ color: 'var(--secondary-color)' }}>Your Workout Plan:</h3>
            <div id="workoutPlanContent">
              <p>Click "Create My Plan" to generate your personalized workout plan.</p>
            </div>
          </div>

          <div id="mealPlanOutput" style={{ marginTop: '2rem' }} className="recommendation-section">
            <h3 style={{ color: 'var(--secondary-color)' }}>Your Meal Plan:</h3>
            <div id="mealPlanContent">
              <p>Your meal plan suggestions based on your selected Diet Type will be shown here.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Addicted 2 Progress LLC. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WorkoutPlans;
