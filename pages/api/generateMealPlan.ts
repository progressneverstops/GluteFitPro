import { NextApiRequest, NextApiResponse } from 'next';
import mealPlansData from '../../app/mealPlans.json';

interface MealPlan {
    dietType: string;
    breakfast: string[];
    preWorkout?: { examples: string[] };
    postWorkout?: { examples: string[] };
    dinner?: string[];
    beforeBed?: { examples: string[] };
}

interface FitnessLevelMealPlan {
    breakfast?: string[];
    preWorkout?: string[];
    postWorkout?: string[];
    dinner?: string[];
    beforeBed?: string[];
}

interface MealPlansData {
    [dietType: string]: {
        macronutrientFocus?: any;
        mealTiming?: any;
        supplementation?: any;
        exclusionCriteria?: any;
        beginner?: FitnessLevelMealPlan;
        intermediate?: FitnessLevelMealPlan;
        advanced?: FitnessLevelMealPlan;
    };
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { dietType, fitnessLevel } = req.body;

    if (!dietType || !fitnessLevel) {
        return res.status(400).json({ message: 'Missing required parameters: dietType and fitnessLevel' });
    }

    try {
        // Use the imported JSON data directly
        const mealPlanData = (mealPlansData as MealPlansData)[dietType];
        const mealPlan = mealPlanData ? mealPlanData[fitnessLevel as keyof typeof mealPlanData] as FitnessLevelMealPlan : undefined;

        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found for the specified diet type and fitness level.' });
        }

        return res.status(200).json(mealPlan);
    } catch (error) {
        console.error('Error generating meal plan:', error);
        return res.status(500).json({ message: 'Error generating meal plan' });
    }
};

export default handler;