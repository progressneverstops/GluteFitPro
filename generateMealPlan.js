import { parseCsvInChunks } from './utils/csvParser.js';
import { loadFoodData } from './utils/foodDataProcessor.js';

export async function generateMealPlan(dietType, calorieGoal, macroRatios, restrictions) {
  console.log("Generating meal plan for:", dietType, calorieGoal, macroRatios, restrictions);

  const mealPlan = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  };
  try {
      const allFoodData = await loadFoodData();
      console.log('allFoodData length:', allFoodData.length);
      //console.log('First few food items:', allFoodData.slice(0, 5).map(food => food["Name"]));
      console.log('Restrictions:', restrictions);

      // Basic filtering and meal plan generation
      const filteredFood = allFoodData.filter(food => {
        return !restrictions.some(r => (food["Name"] || "").toLowerCase().includes(r.toLowerCase()));

      });
      console.log('filteredFood length:', filteredFood.length);

      // Very basic meal plan generation
      if (filteredFood.length > 3) {
        mealPlan.breakfast.push({ name: filteredFood[0]["Name"], calories: filteredFood[0]["Calories"] });
        mealPlan.lunch.push({ name: filteredFood[1]["Name"], calories: filteredFood[1]["Calories"] });
        mealPlan.dinner.push({ name: filteredFood[2]["Name"], calories: filteredFood[2]["Calories"] });
        mealPlan.snacks.push({ name: filteredFood[3]["Name"], calories: filteredFood[3]["Calories"] });
      }

    console.log('Meal plan generated successfully.');
  } catch (error) {
    console.error('Meal plan generation failed:', error);
  }

  return mealPlan;
}
