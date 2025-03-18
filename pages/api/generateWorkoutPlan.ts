import { NextApiRequest, NextApiResponse } from 'next';
import { parseWorkoutPlan, recommendedExercises, filterExercises, Workout } from '../../app/utils/parseWorkoutPlan';

const generateWorkoutPlan = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fitnessLevel, primaryGoal, workoutFrequency, workoutDuration, backKneeModification } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!fitnessLevel || !primaryGoal || !workoutFrequency || !workoutDuration || backKneeModification === undefined) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const response = await fetch('/data/WorkoutPlan.md');
    if (!response.ok) {
      throw new Error(`Failed to fetch workout plan: ${response.statusText}`);
    }
    const markdown = await response.text();

    const workoutPlans = parseWorkoutPlan(markdown);

    const planKey = `${fitnessLevel} - ${primaryGoal} - ${workoutFrequency}/week - ${workoutDuration} - ${backKneeModification ? 'Back/Knee Modification' : 'No Back/Knee Modification'}`;
    let workoutPlan = workoutPlans[planKey];
    console.log("Parsed Workout Plans:", workoutPlans)
    console.log("Selected Plan Key:", planKey)


    if (!workoutPlan) {
      // Default plan generation if no specific plan is found
      const numDays = parseInt(workoutFrequency.slice(0, 1)); // Extract number from "3x", "5x", etc.
      workoutPlan = {};
      const filteredExercises = filterExercises(recommendedExercises, backKneeModification);

      for (let i = 1; i <= numDays; i++) {
        workoutPlan[`Day ${i}`] = filteredExercises.slice(0, 3).map((ex: Workout) => ({ name: ex.name })); // Select first 3 exercises as an example
      }
    }

    return res.status(200).json(workoutPlan);
  } catch (error) {
    console.error('Error generating workout plan:', error);
    return res.status(500).json({ message: 'Error generating workout plan' });
  }
};

export default generateWorkoutPlan;
