import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import App, { AppContext } from './app';
import MealPlanComponent from './MealPlan';
import WorkoutPlans from './WorkoutPlans';
import Home from './Home';

const rootElement =
    document.getElementById('root') ||
    document.getElementById('mealPlanRoot') ||
    document.getElementById('workoutPlanRoot');

const root = ReactDOM.createRoot(rootElement as HTMLElement);

const RenderComponent = () => {
    const appContext = useContext(AppContext);

    if (!appContext) {
        return <div>Error: AppContext not found!</div>;
    }

    switch (window.location.pathname) {
        case '/mealPlan.html':
            return <MealPlanComponent />;
        case '/WorkoutPlans.html':
            return <WorkoutPlans
                fitnessLevel={appContext.fitnessLevel}
                primaryGoal={appContext.primaryGoal}
                dietType={appContext.dietType}
                goalReason={appContext.goalReason}
                mobilityIssues={appContext.mobilityIssues}
                handleFitnessLevelChange={appContext.handleFitnessLevelChange}
                handlePrimaryGoalChange={appContext.handlePrimaryGoalChange}
                handleDietTypeChange={appContext.handleDietTypeChange}
                handleGoalReasonChange={appContext.handleGoalReasonChange}
                handleMobilityIssuesChange={appContext.handleMobilityIssuesChange}
            />;
        case '/index.html':
        case '/':
            return <Home
                dietType={appContext.dietType}
                handleDietTypeChangeFromIndex={appContext.handleDietTypeChangeFromIndex}
               specifics={appContext.specifics}
                handleSpecificsChange={appContext.handleSpecificsChange}
                handleCreatePlan={appContext.handleCreatePlan}
            />;
        default:
            return <App />;
    }
};


root.render(
    <React.StrictMode>
        <RenderComponent />
    </React.StrictMode>
);
