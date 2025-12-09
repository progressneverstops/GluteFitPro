'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import mealPlansData from '../app/mealPlans.json';
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

export default function IndexPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'workout' | 'meal'>('workout');
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
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const profile = JSON.parse(saved);
      setUserProfile(profile);
      setFormData(profile);
      setShowProfileForm(false);
    } else {
      setShowProfileForm(true);
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
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setUserProfile(formData);
    setShowProfileForm(false);
  };

  const handleSkip = () => {
    // Set default values and skip profile
    const defaultProfile: UserProfile = {
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      fitnessLevel: 'beginner',
      primaryGoal: 'glute-development',
      dietType: 'traditionalUSDA',
    };
    localStorage.setItem('userProfile', JSON.stringify(defaultProfile));
    setUserProfile(defaultProfile);
    setFormData(defaultProfile);
    setShowProfileForm(false);
  };

  const handleEditProfile = () => {
    // Load current profile data into form
    if (userProfile) {
      setFormData(userProfile);
    }
    setShowProfileForm(true);
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
        <title>GluteFitPro - Simplified Demo</title>
        <meta
          name="description"
          content="Science-backed nutrition & functional movement for optimal glute development"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="app-container">
        <header className="app-header">
          <button className="theme-toggle" onClick={handleThemeToggle} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <img src="/plum-glutefit-pro.png" alt="GluteFitPro" className="app-logo" />
          <h1>GluteFitPro</h1>
          <p className="tagline">
            Science-backed nutrition & functional movement for optimal glute
            development
          </p>
        </header>

        <main className="main-content">
          {showProfileForm ? (
            <div className="card">
              <h2>Create Your Profile</h2>
              <p className="subtitle">Help us personalize your experience (optional)</p>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                  />
                </div>

                <div className="form-row">
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

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={handleSkip}>
                    Skip
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {/* Profile Summary Bar */}
              {userProfile && (userProfile.firstName || userProfile.email) && (
                <div className="profile-bar">
                  <div className="profile-info">
                    <span>
                      👤 {userProfile.firstName || 'User'}{' '}
                      {userProfile.lastName || ''}
                    </span>
                    <span className="profile-details">
                      {userProfile.fitnessLevel} • {userProfile.primaryGoal?.replace('-', ' ')}
                    </span>
                  </div>
                  <button className="btn-edit-profile" onClick={handleEditProfile}>
                    Edit Profile
                  </button>
                </div>
              )}

              {/* Tab Navigation */}
              <div className="tab-container">
                <button
                  className={`tab-button ${activeTab === 'workout' ? 'active' : ''}`}
                  onClick={() => setActiveTab('workout')}
                >
                  💪 Workout Plans
                </button>
                <button
                  className={`tab-button ${activeTab === 'meal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('meal')}
                >
                  🍽️ Meal Plans
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'workout' && (
                <div className="tab-content">
                  <WorkoutPlansTab userProfile={userProfile} />
                </div>
              )}

              {activeTab === 'meal' && (
                <div className="tab-content">
                  <MealPlansTab userProfile={userProfile} />
                </div>
              )}

              {/* Dashboard Link */}
              <div className="dashboard-link">
                <Link href="/dashboard">View Full Dashboard →</Link>
              </div>
            </>
          )}
        </main>

        <style jsx>{`
          .app-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
            background: linear-gradient(135deg, #ff6b9d, #4ecdc4);
          }

          .app-header {
            text-align: center;
            margin-bottom: 2rem;
            color: white;
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
            width: 80px;
            height: 80px;
            margin-bottom: 1rem;
          }

          .app-header h1 {
            font-size: 2.5rem;
            margin: 0.5rem 0;
            font-weight: bold;
          }

          .tagline {
            font-size: 1.1rem;
            opacity: 0.9;
            margin: 0;
          }

          .main-content {
            width: 100%;
            max-width: 800px;
          }

          .card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }

          .card h2 {
            margin: 0 0 0.5rem 0;
            color: #333;
          }

          .subtitle {
            color: #666;
            margin: 0 0 1.5rem 0;
            font-size: 0.9rem;
          }

          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
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

          :global(body.dark-mode) .form-group label {
            color: #ffffff !important;
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

          .form-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
          }

          .btn-primary {
            flex: 1;
            background: linear-gradient(135deg, #ff6b9d, #4ecdc4);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
          }

          .btn-secondary {
            flex: 1;
            background: #f8f9fa;
            color: #333;
            border: 2px solid #e1e5e9;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
          }

          .tab-container {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
            background: white;
            border-radius: 15px 15px 0 0;
            padding: 0.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }

          .tab-button {
            flex: 1;
            padding: 1rem;
            border: none;
            background: transparent;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            color: #666;
            transition: all 0.3s ease;
          }

          .tab-button.active {
            background: linear-gradient(135deg, #ff6b9d, #4ecdc4);
            color: white;
          }

          .tab-content {
            background: white;
            border-radius: 0 0 15px 15px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            min-height: 400px;
          }

          .dashboard-link {
            text-align: center;
            margin-top: 1.5rem;
          }

          .dashboard-link a {
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
          }

          .profile-bar {
            background: white;
            border-radius: 15px;
            padding: 1rem 1.5rem;
            margin-bottom: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }

          .profile-info {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .profile-info span:first-child {
            font-weight: 600;
            color: #333;
          }

          .profile-details {
            font-size: 0.9rem;
            color: #666;
            text-transform: capitalize;
          }

          :global(body.dark-mode) .profile-info span:first-child {
            color: #ffffff !important;
          }

          :global(body.dark-mode) .profile-details {
            color: #ffffff !important;
          }

          :global(body.dark-mode) .profile-bar span {
            color: #ffffff !important;
          }

          .btn-edit-profile {
            background: #f8f9fa;
            color: #333;
            border: 2px solid #e1e5e9;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
          }

          @media (max-width: 768px) {
            .form-row {
              grid-template-columns: 1fr;
            }

            .profile-bar {
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
            }

            .btn-edit-profile {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </>
  );
}

// Workout Plans Tab Component
function WorkoutPlansTab({ userProfile }: { userProfile: UserProfile | null }) {
  const [fitnessLevel, setFitnessLevel] = useState(
    userProfile?.fitnessLevel || 'beginner'
  );
  const [primaryGoal, setPrimaryGoal] = useState(
    userProfile?.primaryGoal || 'glute-development'
  );
  const [frequency, setFrequency] = useState('3x/week');
  const [duration, setDuration] = useState('25-35 minutes');
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateWorkoutPlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const daysPerWeek = parseInt(frequency.charAt(0)) || 3;
      const exercisesPerDay =
        fitnessLevel === 'beginner' ? 4 : fitnessLevel === 'intermediate' ? 5 : 6;

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

      const selectedExercises =
        exercises[primaryGoal as keyof typeof exercises] ||
        exercises['glute-development'];
      const reps =
        fitnessLevel === 'beginner'
          ? '10-12'
          : fitnessLevel === 'intermediate'
          ? '12-15'
          : '15-20';
      const sets =
        fitnessLevel === 'beginner' ? '3' : fitnessLevel === 'intermediate' ? '4' : '5';

      const days = [];
      const dayNames = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ];

      for (let i = 0; i < daysPerWeek; i++) {
        const dayExercises = selectedExercises.slice(0, exercisesPerDay).map((ex) => ({
          name: ex,
          sets,
          reps,
        }));

        days.push({
          name: dayNames[i],
          exercises: dayExercises,
        });
      }

      const plan = {
        name: `${fitnessLevel} - ${primaryGoal} - ${frequency} - ${duration}`,
        frequency: frequency,
        duration: duration,
        days: days,
      };

      setGeneratedPlan(plan);
      setIsGenerating(false);
      localStorage.setItem('lastWorkoutPlan', JSON.stringify(plan));
    }, 1000);
  };

  return (
    <div>
      <h2>Generate Workout Plan</h2>
      <div className="form-group">
        <label>Fitness Level</label>
        <select value={fitnessLevel} onChange={(e) => setFitnessLevel(e.target.value)}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="form-group">
        <label>Primary Goal</label>
        <select value={primaryGoal} onChange={(e) => setPrimaryGoal(e.target.value)}>
          <option value="glute-development">Glute Development</option>
          <option value="weight-loss">Weight Loss</option>
          <option value="muscle-gain">Muscle Gain</option>
          <option value="general-fitness">General Fitness</option>
          <option value="athletic-performance">Athletic Performance</option>
        </select>
      </div>

      <div className="form-row">
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
      </div>

      <button
        className="btn-primary"
        onClick={generateWorkoutPlan}
        disabled={isGenerating}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        {isGenerating ? 'Generating...' : 'Generate Workout Plan'}
      </button>

      {generatedPlan && (
        <div style={{ marginTop: '2rem' }}>
          <h3>{generatedPlan.name}</h3>
          <p>
            Frequency: {generatedPlan.frequency} | Duration: {generatedPlan.duration}
          </p>
          {generatedPlan.days.map((day: any, idx: number) => (
            <div key={idx} className="day-card">
              <h4>{day.name}</h4>
              <ul>
                {day.exercises.map((ex: any, exIdx: number) => (
                  <li key={exIdx}>
                    {ex.name} - {ex.sets} sets x {ex.reps} reps
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }

        :global(body.dark-mode) .form-group label {
          color: #ffffff !important;
        }

        .form-group select {
          width: 100%;
          padding: 12px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 16px;
          color: #333;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .day-card {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .day-card h4 {
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
  );
}

// Meal Plans Tab Component
function MealPlansTab({ userProfile }: { userProfile: UserProfile | null }) {
  const [dietType, setDietType] = useState(
    userProfile?.dietType || 'traditionalUSDA'
  );
  const [fitnessLevel, setFitnessLevel] = useState(
    userProfile?.fitnessLevel || 'beginner'
  );
  const [mealPlan, setMealPlan] = useState<any>(null);

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

    const plan = {
      dietType,
      fitnessLevel,
      meals: levelData,
    };
    setMealPlan(plan);
    localStorage.setItem('lastMealPlan', JSON.stringify(plan));
  };

  return (
    <div>
      <h2>Generate Meal Plan</h2>
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

      <button
        className="btn-primary"
        onClick={generateMealPlan}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        Generate Meal Plan
      </button>

      {mealPlan && (
        <div style={{ marginTop: '2rem' }}>
          <h3>
            {mealPlan.dietType} - {mealPlan.fitnessLevel}
          </h3>
          {mealPlan.meals.breakfast && (
            <div className="meal-card">
              <h4>Breakfast</h4>
              <ul>
                {mealPlan.meals.breakfast.map((meal: string, idx: number) => (
                  <li key={idx}>{meal}</li>
                ))}
              </ul>
            </div>
          )}
          {mealPlan.meals['pre-workout'] && (
            <div className="meal-card">
              <h4>Pre-Workout</h4>
              <ul>
                {mealPlan.meals['pre-workout'].map((meal: string, idx: number) => (
                  <li key={idx}>{meal}</li>
                ))}
              </ul>
            </div>
          )}
          {mealPlan.meals['post-workout'] && (
            <div className="meal-card">
              <h4>Post-Workout</h4>
              <ul>
                {mealPlan.meals['post-workout'].map((meal: string, idx: number) => (
                  <li key={idx}>{meal}</li>
                ))}
              </ul>
            </div>
          )}
          {mealPlan.meals.dinner && (
            <div className="meal-card">
              <h4>Dinner</h4>
              <ul>
                {mealPlan.meals.dinner.map((meal: string, idx: number) => (
                  <li key={idx}>{meal}</li>
                ))}
              </ul>
            </div>
          )}
          {mealPlan.meals['before-bed'] && (
            <div className="meal-card">
              <h4>Before Bed</h4>
              <ul>
                {mealPlan.meals['before-bed'].map((meal: string, idx: number) => (
                  <li key={idx}>{meal}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }

        :global(body.dark-mode) .form-group label {
          color: #ffffff !important;
        }

        .form-group select {
          width: 100%;
          padding: 12px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 16px;
          color: #333;
        }

        .meal-card {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .meal-card h4 {
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
  );
}
