'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import mealPlansData from '../app/mealPlans.json';
import { getTheme, toggleTheme, setTheme } from '../app/utils/theme';

export default function MealPlanPage() {
  const [dietType, setDietType] = useState('traditionalUSDA');
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');

  // Load preferences from localStorage (check user profile first, then meal preferences)
  useEffect(() => {
    // Try to load from user profile first
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      setDietType(profile.dietType || 'traditionalUSDA');
      setFitnessLevel(profile.fitnessLevel || 'beginner');
    }

    // Then check meal-specific preferences
    const saved = localStorage.getItem('mealPreferences');
    if (saved) {
      const prefs = JSON.parse(saved);
      setDietType(prefs.dietType || dietType);
      setFitnessLevel(prefs.fitnessLevel || fitnessLevel);
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

  // Generate meal plan (simple JSON lookup)
  const generateMealPlan = () => {
    const dietData = (mealPlansData as any)[dietType];
    if (!dietData) {
      alert('Diet type not found');
      return;
    }

    const levelData = dietData[fitnessLevel];
    if (!levelData) {
      alert('Fitness level not found');
      return;
    }

    // Save preferences
    localStorage.setItem(
      'mealPreferences',
      JSON.stringify({ dietType, fitnessLevel })
    );

    // Save generated plan
    const plan = {
      dietType,
      fitnessLevel,
      meals: levelData,
    };
    setMealPlan(plan);
    localStorage.setItem('lastMealPlan', JSON.stringify(plan));
  };

  return (
    <>
      <Head>
        <title>Meal Plans - GluteFitPro</title>
      </Head>
      <div className="app-container">
        <header className="app-header">
          <button className="theme-toggle" onClick={handleThemeToggle} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link href="/">
            <img src="/plum-glutefit-pro.png" alt="GluteFitPro" className="app-logo" />
          </Link>
          <h1>Meal Plans</h1>
          <Link href="/dashboard" className="header-link">Dashboard</Link>
        </header>

        <main className="main-content">
          <div className="form-section">
            <h2>Create Your Meal Plan</h2>
            <div className="form-group">
              <label>Diet Type</label>
              <select value={dietType} onChange={(e) => setDietType(e.target.value)}>
                <option value="traditionalUSDA">Traditional</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="omnivore">Omnivore</option>
                <option value="keto">Keto</option>
                <option value="glutenFree">Gluten Free</option>
                <option value="plantBased">Plant Based</option>
              </select>
            </div>

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

            <button className="btn-primary" onClick={generateMealPlan}>
              Generate Meal Plan
            </button>
          </div>

          {mealPlan && (
            <div className="plan-section">
              <h2>
                {mealPlan.dietType} - {mealPlan.fitnessLevel}
              </h2>
              {mealPlan.meals.breakfast && (
                <div className="meal-card">
                  <h3>Breakfast</h3>
                  <ul>
                    {mealPlan.meals.breakfast.map((meal: string, idx: number) => (
                      <li key={idx}>{meal}</li>
                    ))}
                  </ul>
                </div>
              )}
              {mealPlan.meals['pre-workout'] && (
                <div className="meal-card">
                  <h3>Pre-Workout</h3>
                  <ul>
                    {mealPlan.meals['pre-workout'].map((meal: string, idx: number) => (
                      <li key={idx}>{meal}</li>
                    ))}
                  </ul>
                </div>
              )}
              {mealPlan.meals['post-workout'] && (
                <div className="meal-card">
                  <h3>Post-Workout</h3>
                  <ul>
                    {mealPlan.meals['post-workout'].map((meal: string, idx: number) => (
                      <li key={idx}>{meal}</li>
                    ))}
                  </ul>
                </div>
              )}
              {mealPlan.meals.dinner && (
                <div className="meal-card">
                  <h3>Dinner</h3>
                  <ul>
                    {mealPlan.meals.dinner.map((meal: string, idx: number) => (
                      <li key={idx}>{meal}</li>
                    ))}
                  </ul>
                </div>
              )}
              {mealPlan.meals['before-bed'] && (
                <div className="meal-card">
                  <h3>Before Bed</h3>
                  <ul>
                    {mealPlan.meals['before-bed'].map((meal: string, idx: number) => (
                      <li key={idx}>{meal}</li>
                    ))}
                  </ul>
                </div>
              )}
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

          .meal-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 1.5rem;
            margin-bottom: 1rem;
          }

          .meal-card h3 {
            margin-bottom: 1rem;
            color: #ff6b9d;
          }

          .meal-card ul {
            list-style: none;
            padding: 0;
          }

          .meal-card li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #e1e5e9;
          }
        `}</style>
      </div>
    </>
  );
}

