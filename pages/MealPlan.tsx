import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface MealPlan {
    dietType: string;
    breakfast: string[];
    preWorkout?: { examples: string[] };
    postWorkout?: { examples: string[] };
    dinner?: string[];
    beforeBed?: { examples: string[] };
}

const MealPlanComponent: React.FC = () => {
    const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
    const [fitnessLevel, setFitnessLevel] = useState<string>('');
    const [dietType, setDietType] = useState<string>('');
    const [primaryGoal, setPrimaryGoal] = useState<string>('');
    const [goalReason, setGoalReason] = useState<string>('');
    const [mobilityIssues, setMobilityIssues] = useState<string>('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedDietType = localStorage.getItem('dietType') || 'omnivore';
        const storedFitnessLevel = localStorage.getItem('fitnessLevel') || 'beginner';
        const storedPrimaryGoal = localStorage.getItem('primaryGoal') || 'aesthetic';
        const storedGoalReason = localStorage.getItem('goalReason') || 'longevity';
        const storedMobilityIssues = localStorage.getItem('mobilityIssues') || '';

        setDietType(storedDietType);
        setFitnessLevel(storedFitnessLevel);
        setPrimaryGoal(storedPrimaryGoal);
        setGoalReason(storedGoalReason);
        setMobilityIssues(storedMobilityIssues);

        const storedDarkMode = localStorage.getItem('darkMode') === 'enabled';
        setIsDarkMode(storedDarkMode);
    }, []);

    const handleGeneratePlan = async () => {
        try {
            const response = await fetch('/api/generateMealPlan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dietType, fitnessLevel, primaryGoal, goalReason, mobilityIssues }),
            });

            if (response.ok) {
                const data = await response.json();
                setMealPlan(data);
            } else {
                console.error('Failed to fetch meal plan:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching meal plan:', error);
        }
    };

    useEffect(() => {
        localStorage.setItem('dietType', dietType);
        localStorage.setItem('fitnessLevel', fitnessLevel);
        localStorage.setItem('primaryGoal', primaryGoal);
        localStorage.setItem('goalReason', goalReason);
        localStorage.setItem('mobilityIssues', mobilityIssues);
    }, [dietType, fitnessLevel, primaryGoal, goalReason, mobilityIssues]);

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
                        <li><Link href="/ProgressTracking" className="btn-primary"><span className="nav-icon">📈</span><span className="nav-text">Progress Planning</span></Link></li>
                        <li><Link href="/About" className="btn-primary"><span className="nav-icon">ℹ️</span><span className="nav-text">About</span></Link></li>
                        <li><Link href="/Contact" className="btn-primary"><span className="nav-icon">✉️</span><span className="nav-text">Contact</span></Link></li>
                    </ul>
                </nav>
            </header>
            <main className="main-content">
                <section className="section workout-plans-section onboarding-form">
                    <h2 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Your Meal Plan</h2>

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
                        <label htmlFor="fitnessLevel">Fitness Level:</label>
                        <select id="fitnessLevel" className="form-group select" value={fitnessLevel} onChange={(e) => setFitnessLevel(e.target.value)}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                    <div className="form-group form-row">
                        <label htmlFor="dietType">Diet Preference:</label>
                        <select id="dietType" className="form-group select" value={dietType} onChange={(e) => setDietType(e.target.value)}>
                            <option value="vegan">vegan</option>
                            <option value="vegetarian">vegetarian</option>
                            <option value="mediterranean">mediterranean</option>
                            <option value="traditional-usda">traditional-usda</option>
                            <option value="omnivore">omnivore</option>
                            <option value="keto">keto</option>
                            <option value="gluten-free">gluten-free</option>
                            <option value="plant-based">plant-based</option>
                        </select>
                    </div>
                    <div className="form-group form-row">
                        <label htmlFor="mobilityIssues">Mobility Issues:</label>
                        <input type="text" id="mobilityIssues" className="form-group input" placeholder="e.g., back, knees" value={mobilityIssues} onChange={(e) => setMobilityIssues(e.target.value)} />
                    </div>

                    <div className="form-group submit-group">
                        <button id="createPlanBtn" className="btn-primary" onClick={handleGeneratePlan}>Create My Plan</button>
                    </div>

                    <p className="output-plans-text">Here are your personalized workout plans based on your input:</p>

                    <div id="mealPlanOutput" style={{ marginTop: '2rem' }} className="recommendation-section">
                        <h3 style={{ color: 'var(--secondary-color)' }}>Your Meal Plan:</h3>
                        <div id="mealPlanContent">
                            {mealPlan ? (
                                <div>
                                    <h2>{fitnessLevel}</h2>
                                    {mealPlan.breakfast && (
                                        <div>
                                            <h3>Breakfast</h3>
                                            <ul>
                                                {mealPlan.breakfast.map((item: string, index: number) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {mealPlan.preWorkout && (
                                        <div>
                                            <h3>Pre-Workout</h3>
                                            <ul>
                                                {mealPlan.preWorkout.examples.map((item: string, index: number) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {mealPlan.postWorkout && (
                                        <div>
                                            <h3>Post-Workout</h3>
                                            <ul>
                                                {mealPlan.postWorkout.examples.map((item: string, index: number) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {mealPlan.dinner && (
                                        <div>
                                            <h3>Dinner</h3>
                                            <ul>
                                                {mealPlan.dinner.map((item: string, index: number) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {mealPlan.beforeBed && (
                                        <div>
                                            <h3>Before Bed</h3>
                                            <ul>
                                                {mealPlan.beforeBed.examples.map((item: string, index: number) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p>Click "Create My Plan" to generate your personalized workout plan. Your meal plan suggestions based on your selected Diet Type will be shown here.</p>
                            )}
                        </div>
                    </div>


                    <div id="workoutPlanOutput" style={{ marginTop: '2rem' }} className="recommendation-section">
                        <h3 style={{ color: 'var(--secondary-color)' }}>Your Workout Plan:</h3>
                        <div id="workoutPlanContent">
                            <p> Go to the Workout Plans page to see your personalized workout plan.</p>
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

export default MealPlanComponent;
