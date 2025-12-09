'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getTheme, toggleTheme, setTheme } from '../app/utils/theme';

interface WorkoutDay {
  name: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
  }[];
}

interface WorkoutPlan {
  name: string;
  frequency: string;
  duration: string;
  days: WorkoutDay[];
}

export default function WorkoutPlansPage() {
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  const [primaryGoal, setPrimaryGoal] = useState('glute-development');
  const [frequency, setFrequency] = useState('3x/week');
  const [duration, setDuration] = useState('25-35 minutes');
  const [generatedPlan, setGeneratedPlan] = useState<WorkoutPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');

  // Load preferences from localStorage (check user profile first, then workout preferences)
  useEffect(() => {
    // Try to load from user profile first
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      setFitnessLevel(profile.fitnessLevel || 'beginner');
      setPrimaryGoal(profile.primaryGoal || 'glute-development');
    }

    // Then check workout-specific preferences
    const saved = localStorage.getItem('workoutPreferences');
    if (saved) {
      const prefs = JSON.parse(saved);
      setFitnessLevel(prefs.fitnessLevel || fitnessLevel);
      setPrimaryGoal(prefs.primaryGoal || primaryGoal);
      setFrequency(prefs.frequency || '3x/week');
      setDuration(prefs.duration || '25-35 minutes');
    }

    // Initialize theme
    const currentTheme = getTheme();
    setThemeState(currentTheme);
    setTheme(currentTheme);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = toggleTheme();
    setThemeState(newTheme);
  };

  // Save preferences to localStorage
  const savePreferences = () => {
    localStorage.setItem(
      'workoutPreferences',
      JSON.stringify({
        fitnessLevel,
        primaryGoal,
        frequency,
        duration,
      })
    );
  };

  // Simple workout plan generation (no proprietary algorithms)
  const generateWorkoutPlan = () => {
    setIsGenerating(true);
    savePreferences();

    // Simple delay to simulate processing
    setTimeout(() => {
      const plan = createSimpleWorkoutPlan(
        fitnessLevel,
        primaryGoal,
        frequency,
        duration
      );
      setGeneratedPlan(plan);
      setIsGenerating(false);

      // Save generated plan to localStorage
      localStorage.setItem('lastWorkoutPlan', JSON.stringify(plan));
    }, 1000);
  };

  // Simple workout plan creation (no proprietary formulas)
  const createSimpleWorkoutPlan = (
    level: string,
    goal: string,
    freq: string,
    dur: string
  ): WorkoutPlan => {
    const daysPerWeek = parseInt(freq.charAt(0)) || 3;
    const exercisesPerDay = level === 'beginner' ? 4 : level === 'intermediate' ? 5 : 6;

    const exercises = {
      'glute-development': [
        'Hip Thrusts',
        'Romanian Deadlifts',
        'Bulgarian Split Squats',
        'Glute Bridges',
        'Lunges',
        'Cable Kickbacks',
        'Step-ups',
      ],
      'weight-loss': [
        'Squats',
        'Deadlifts',
        'Lunges',
        'Burpees',
        'Mountain Climbers',
        'Jump Squats',
        'High Knees',
      ],
      'muscle-gain': [
        'Barbell Squats',
        'Deadlifts',
        'Leg Press',
        'Leg Curls',
        'Calf Raises',
        'Hip Thrusts',
        'Romanian Deadlifts',
      ],
      'general-fitness': [
        'Squats',
        'Push-ups',
        'Planks',
        'Lunges',
        'Burpees',
        'Mountain Climbers',
        'Jumping Jacks',
      ],
      'athletic-performance': [
        'Box Jumps',
        'Plyometric Lunges',
        'Sprint Intervals',
        'Agility Ladder',
        'Medicine Ball Throws',
        'Single-Leg Hops',
        'Broad Jumps',
      ],
    };

    const selectedExercises = exercises[goal as keyof typeof exercises] || exercises['glute-development'];
    const reps = level === 'beginner' ? '10-12' : level === 'intermediate' ? '12-15' : '15-20';
    const sets = level === 'beginner' ? '3' : level === 'intermediate' ? '4' : '5';

    const days: WorkoutDay[] = [];
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    for (let i = 0; i < daysPerWeek; i++) {
      const dayExercises = selectedExercises
        .slice(0, exercisesPerDay)
        .map((ex) => ({
          name: ex,
          sets,
          reps,
        }));

      days.push({
        name: dayNames[i],
        exercises: dayExercises,
      });
    }

    return {
      name: `${level} - ${goal} - ${freq} - ${dur}`,
      frequency: freq,
      duration: dur,
      days,
    };
  };

  return (
    <>
      <Head>
        <title>Workout Plans - GluteFitPro</title>
      </Head>
      <div className="app-container">
        <header className="app-header">
          <button className="theme-toggle" onClick={handleThemeToggle} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link href="/">
            <img src="/plum-glutefit-pro.png" alt="GluteFitPro" className="app-logo" />
          </Link>
          <h1>Workout Plans</h1>
          <Link href="/dashboard" className="header-link">Dashboard</Link>
        </header>

        <main className="main-content">
          <div className="form-section">
            <h2>Create Your Workout Plan</h2>
            <div className="form-group">
              <label>Fitness Level</label>
              <select
                value={fitnessLevel}
                onChange={(e) => setFitnessLevel(e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="form-group">
              <label>Primary Goal</label>
              <select
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
              >
                <option value="glute-development">Glute Development</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="general-fitness">General Fitness</option>
                <option value="athletic-performance">Athletic Performance</option>
              </select>
            </div>

            <div className="form-group">
              <label>Frequency</label>
              <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                <option value="3x/week">3x per week</option>
                <option value="4x/week">4x per week</option>
                <option value="5x/week">5x per week</option>
                <option value="6x/week">6x per week</option>
              </select>
            </div>

            <div className="form-group">
              <label>Duration</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="25-35 minutes">25-35 minutes</option>
                <option value="35-45 minutes">35-45 minutes</option>
                <option value="45-60 minutes">45-60 minutes</option>
              </select>
            </div>

            <button
              className="btn-primary"
              onClick={generateWorkoutPlan}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Workout Plan'}
            </button>
          </div>

          {generatedPlan && (
            <div className="plan-section">
              <h2>{generatedPlan.name}</h2>
              <p>
                Frequency: {generatedPlan.frequency} | Duration: {generatedPlan.duration}
              </p>
              {generatedPlan.days.map((day, idx) => (
                <div key={idx} className="day-card">
                  <h3>{day.name}</h3>
                  <ul>
                    {day.exercises.map((ex, exIdx) => (
                      <li key={exIdx}>
                        {ex.name} - {ex.sets} sets x {ex.reps} reps
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </main>

        <style jsx>{`
          .app-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #ff6b9d, #4ecdc4);
            padding: 20px;
          }

          .app-header {
            text-align: center;
            color: white;
            margin-bottom: 2rem;
            position: relative;
          }

          .header-link {
            position: absolute;
            top: 0;
            right: 60px;
            color: white;
            text-decoration: none;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
          }

          .theme-toggle {
            position: absolute;
            top: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            width: 45px;
            height: 45px;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }

          .theme-toggle:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
          }

          @media (max-width: 768px) {
            .theme-toggle {
              position: fixed;
              top: 20px;
              right: 20px;
              z-index: 1000;
            }

            .header-link {
              right: 20px;
              top: 60px;
            }
          }

          .app-logo {
            width: 60px;
            height: 60px;
            margin-bottom: 1rem;
            cursor: pointer;
          }

          .main-content {
            max-width: 800px;
            margin: 0 auto;
          }

          .form-section,
          .plan-section {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
          }

          .form-group select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            font-size: 16px;
            color: #333;
          }

          .btn-primary {
            background: linear-gradient(135deg, #ff6b9d, #4ecdc4);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
          }

          .btn-primary:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .day-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 1.5rem;
            margin-bottom: 1rem;
          }

          .day-card h3 {
            margin-bottom: 1rem;
            color: #ff6b9d;
          }

          .day-card ul {
            list-style: none;
            padding: 0;
          }

          .day-card li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #e1e5e9;
          }
        `}</style>
      </div>
    </>
  );
}

