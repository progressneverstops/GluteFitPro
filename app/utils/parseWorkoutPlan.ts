export interface Workout {
    name: string;
}

interface WorkoutPlan {
    [day: string]: Workout[];
}

export function parseWorkoutPlan(markdown: string): { [key: string]: WorkoutPlan } {
    const lines = markdown.split('\n');
    const workoutPlans: { [key: string]: WorkoutPlan } = {};
    let currentPlanKey = '';
    let currentWorkoutPlan: WorkoutPlan = {};

    for (const line of lines) {
        if (line.startsWith('*   **')) {
            currentPlanKey = line.replace('*   **', '').replace(':**', '').trim();
            workoutPlans[currentPlanKey] = {};
            currentWorkoutPlan = workoutPlans[currentPlanKey];
        } else if (line.startsWith('    *   Day')) {
            const day = line.split(':')[0].replace('    *   ', '').trim();
            currentWorkoutPlan[day] = [];
            // Extract exercises (This is a placeholder, as the MD doesn't have explicit exercises)
            const exerciseMatches = line.match(/\((.*?)\)/g); // Placeholder to match content in parentheses
            if (exerciseMatches) {
                for (const match of exerciseMatches) {
                  const exercises = match.slice(1,-1).split(',').map(e => e.trim()).filter(Boolean);
                  for (const ex of exercises) {
                    currentWorkoutPlan[day].push({name: ex});
                  }
                }
            }
        }
    }

    return workoutPlans;
}

export const recommendedExercises: Workout[] = [
    { name: 'Banded Step Throughs' },
    { name: 'Weight Vest Walks' },
    { name: 'Stair Master Exercises' },
    { name: 'Step Up Stair Machine Emulator' },
    { name: 'Sled Pushes' },
    { name: 'Hill Walks' },
    { name: 'Exaggerated Slow Negative Burn Outs' },
];

export function filterExercises(exercises: Workout[], backKneeModification: boolean): Workout[] {
    if (backKneeModification) {
        return exercises.filter(exercise =>
            exercise.name !== 'Weighted Vest Walks' && // Exclude due to "back knee modification"
            exercise.name !== 'Banded Step Throughs' // Exclude due to "back knee modification"
        );
    }
    return exercises;
}
