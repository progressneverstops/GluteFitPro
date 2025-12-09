'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getTheme, toggleTheme, setTheme } from '../app/utils/theme';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  fitnessLevel: string;
  primaryGoal: string;
  dietType: string;
}

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [formData, setFormData] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    fitnessLevel: 'beginner',
    primaryGoal: 'glute-development',
    dietType: 'traditionalUSDA',
  });

  // Load user profile from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const profile = JSON.parse(saved);
      setUserProfile(profile);
      setFormData(profile);
    } else {
      setIsEditing(true); // Show form if no profile exists
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('userProfile', JSON.stringify(formData));
    }
    setUserProfile(formData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Dashboard - GluteFitPro</title>
      </Head>
      <div className="app-container">
        <header className="app-header">
          <button className="theme-toggle" onClick={handleThemeToggle} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link href="/">
            <img src="/plum-glutefit-pro.png" alt="GluteFitPro" className="app-logo" />
          </Link>
          <h1>Dashboard</h1>
        </header>

        <main className="main-content">
          {isEditing ? (
            <div className="card">
              <h2>Create Your Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="13"
                    max="100"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Fitness Level</label>
                  <select
                    name="fitnessLevel"
                    value={formData.fitnessLevel}
                    onChange={handleChange}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Primary Goal</label>
                  <select
                    name="primaryGoal"
                    value={formData.primaryGoal}
                    onChange={handleChange}
                  >
                    <option value="glute-development">Glute Development</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="general-fitness">General Fitness</option>
                    <option value="athletic-performance">Athletic Performance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Diet Type</label>
                  <select name="dietType" value={formData.dietType} onChange={handleChange}>
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

                <button type="submit" className="btn-primary">
                  Save Profile
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="card">
                <div className="card-header">
                  <h2>Your Profile</h2>
                  <button
                    className="btn-secondary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
                <div className="profile-info">
                  <div className="info-row">
                    <span className="label">Name:</span>
                    <span className="value">
                      {userProfile?.firstName} {userProfile?.lastName}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="label">Email:</span>
                    <span className="value">{userProfile?.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Age:</span>
                    <span className="value">{userProfile?.age}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Fitness Level:</span>
                    <span className="value capitalize">{userProfile?.fitnessLevel}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Primary Goal:</span>
                    <span className="value capitalize">
                      {userProfile?.primaryGoal?.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="label">Diet Type:</span>
                    <span className="value capitalize">
                      {userProfile?.dietType?.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <Link href="/workout-plans" className="action-card">
                  <h3>💪 Workout Plans</h3>
                  <p>Generate personalized workout plans</p>
                </Link>

                <Link href="/meal-plan" className="action-card">
                  <h3>🍽️ Meal Plans</h3>
                  <p>Get meal plan suggestions</p>
                </Link>
              </div>

              <div className="card">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {typeof window !== 'undefined' && localStorage.getItem('lastWorkoutPlan') && (
                    <div className="activity-item">
                      <span>✅ Last workout plan generated</span>
                      <Link href="/workout-plans">View</Link>
                    </div>
                  )}
                  {typeof window !== 'undefined' && localStorage.getItem('lastMealPlan') && (
                    <div className="activity-item">
                      <span>✅ Last meal plan generated</span>
                      <Link href="/meal-plan">View</Link>
                    </div>
                  )}
                  {typeof window !== 'undefined' &&
                    !localStorage.getItem('lastWorkoutPlan') &&
                    !localStorage.getItem('lastMealPlan') && (
                      <p className="empty-state">
                        No activity yet. Generate your first workout or meal plan!
                      </p>
                    )}
                </div>
              </div>
            </>
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

          .card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
          }

          .card-header h2 {
            margin: 0;
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

          .form-group input,
          .form-group select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            font-size: 16px;
            color: #333;
          }

          .form-group input:focus,
          .form-group select:focus {
            outline: none;
            border-color: #ff6b9d;
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

          .btn-secondary {
            background: #f8f9fa;
            color: #333;
            border: 2px solid #e1e5e9;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
          }

          .profile-info {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .info-row {
            display: flex;
            padding: 0.75rem 0;
            border-bottom: 1px solid #e1e5e9;
          }

          .info-row:last-child {
            border-bottom: none;
          }

          .label {
            font-weight: 600;
            color: #666;
            min-width: 150px;
          }

          .value {
            color: #333;
          }

          :global(body.dark-mode) .label,
          :global(body.dark-mode) .info-row .label,
          :global(body.dark-mode) .profile-info .label {
            color: #ffffff !important;
          }

          :global(body.dark-mode) .value,
          :global(body.dark-mode) .info-row .value,
          :global(body.dark-mode) .profile-info .value {
            color: #ffffff !important;
          }

          :global(body.dark-mode) .info-row span,
          :global(body.dark-mode) .profile-info span {
            color: #ffffff !important;
          }

          :global(body.dark-mode) .capitalize {
            color: #ffffff !important;
          }

          .capitalize {
            text-transform: capitalize;
          }

          .quick-actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
          }

          .action-card {
            background: white;
            border-radius: 15px;
            padding: 1.5rem;
            text-decoration: none;
            color: #333;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
          }

          .action-card:hover {
            transform: translateY(-5px);
          }

          .action-card h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.25rem;
          }

          .action-card p {
            margin: 0;
            color: #666;
            font-size: 0.9rem;
          }

          .activity-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .activity-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
          }

          .activity-item a {
            color: #ff6b9d;
            text-decoration: none;
            font-weight: 600;
          }

          .empty-state {
            text-align: center;
            color: #666;
            padding: 2rem;
            font-style: italic;
          }
        `}</style>
      </div>
    </>
  );
}

