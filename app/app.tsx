import React, { useState, ChangeEvent, useEffect } from 'react';
import './styles.css';
import WorkoutPlans from '../pages/WorkoutPlans';
import ProgressTracking from '../pages/ProgressTracking';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import MealPlanComponent from '../pages/MealPlan';

export interface AppContextInterface {
  fitnessLevel: string;
  primaryGoal: string;
  dietType: string;
  goalReason: string;
  specifics: string;
  mobilityIssues: string;
  handleSpecificsChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleFitnessLevelChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handlePrimaryGoalChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleDietTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleGoalReasonChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleDietTypeChangeFromIndex: (newDietType: string) => void;
  handleMobilityIssuesChange: (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleCreatePlan: () => void;
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

function App() {
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  const [primaryGoal, setPrimaryGoal] = useState('functional');
  const [dietType, setDietType] = useState('vegan');
  const [goalReason, setGoalReason] = useState('');
  const [specifics, setSpecifics] = useState('');
  const [mobilityIssues, setMobilityIssues] = useState('');

   const handleSpecificsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setSpecifics(event.target.value);
  };

  const handleFitnessLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFitnessLevel(event.target.value);
  };

  const handlePrimaryGoalChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPrimaryGoal(event.target.value);
  };

  const handleDietTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDietType(event.target.value);
  };

  const handleGoalReasonChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGoalReason(event.target.value);
  };

  const handleDietTypeChangeFromIndex = (newDietType: string) => {
    setDietType(newDietType);
  };

  const handleMobilityIssuesChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMobilityIssues(event.target.value);
  };

  // Placeholder functions for plan generation
  const generateWorkoutPlan = (data: any) => {
    console.log('Generating workout plan with data:', data);
  };

  const generateMealPlan = (data: any) => {
    console.log('Generating meal plan with data:', data);
  };

  const handleCreatePlan = () => {
    const userData = {
      fitnessLevel,
      primaryGoal,
      dietType,
      goalReason,
      specifics,
      mobilityIssues,
    };

    generateWorkoutPlan(userData);
    generateMealPlan(userData);
  };

  useEffect(() => {
    const savedFitnessLevel = localStorage.getItem('fitnessLevel');
    const savedPrimaryGoal = localStorage.getItem('primaryGoal');
    const savedDietType = localStorage.getItem('dietType');
    const savedGoalReason = localStorage.getItem('goalReason');
    const savedSpecifics = localStorage.getItem('specifics');
    const savedMobilityIssues = localStorage.getItem('mobilityIssues');

    if (savedFitnessLevel) {
      setFitnessLevel(savedFitnessLevel);
    }
    if (savedPrimaryGoal) {
      setPrimaryGoal(savedPrimaryGoal);
    }
    if (savedDietType) {
      setDietType(savedDietType);
    }
    if (savedGoalReason) {
      setGoalReason(savedGoalReason);
    }
    if (savedSpecifics) {
      setSpecifics(savedSpecifics);
    }
    if (savedMobilityIssues) {
      setMobilityIssues(savedMobilityIssues);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fitnessLevel', fitnessLevel);
    localStorage.setItem('primaryGoal', primaryGoal);
    localStorage.setItem('dietType', dietType);
    localStorage.setItem('goalReason', goalReason);
    localStorage.setItem('specifics', specifics);
    localStorage.setItem('mobilityIssues', mobilityIssues);
  }, [
    fitnessLevel,
    primaryGoal,
    dietType,
    goalReason,
    mobilityIssues,
  ]);

  const appContextValue: AppContextInterface = {
    fitnessLevel,
    primaryGoal,
    dietType,
    goalReason,
    specifics,
    mobilityIssues,
    handleSpecificsChange,
    handleFitnessLevelChange,
    handlePrimaryGoalChange,
    handleDietTypeChange,
    handleGoalReasonChange,
    handleDietTypeChangeFromIndex,
    handleMobilityIssuesChange,
    handleCreatePlan,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="app-container" />
    </AppContext.Provider>
  );
}

export default App;
