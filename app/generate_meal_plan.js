document.addEventListener('DOMContentLoaded', () => {
  const createPlanBtn = document.getElementById('createPlanBtn');
  const mealPlanOutput = document.getElementById('mealPlanContent');

  createPlanBtn.addEventListener('click', async () => {
    const fitnessLevel = document.getElementById('fitnessLevel').value;
    const dietType = document.getElementById('dietType').value;

    try {
      const response = await fetch('/api/generateMealPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dietType, fitnessLevel }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const mealPlan = await response.json();

      let mealPlanDetails = `
        <h4>Meal Plan Details:</h4>
        <p>Diet Type: ${mealPlan.dietType}</p>
        <ul>
      `;

      if (mealPlan.breakfast && mealPlan.breakfast.length > 0) {
        mealPlanDetails += `<li>Breakfast: ${mealPlan.breakfast.join(', ')}</li>`;
      }
      if (mealPlan.preWorkout && mealPlan.preWorkout.examples.length > 0) {
        mealPlanDetails += `<li>Pre-Workout: ${mealPlan.preWorkout.examples.join(', ')}</li>`;
      }

      if (mealPlan.postWorkout && mealPlan.postWorkout.examples.length > 0) {
        mealPlanDetails += `<li>Post-Workout: ${mealPlan.postWorkout.examples.join(', ')}</li>`;
      }

      if (mealPlan.dinner && mealPlan.dinner.length > 0) {
        mealPlanDetails += `<li>Dinner: ${mealPlan.dinner.join(', ')}</li>`;
      }

      if (mealPlan.beforeBed && mealPlan.beforeBed.examples.length > 0) {
        mealPlanDetails += `<li>Before Bed: ${mealPlan.beforeBed.examples.join(', ')}</li>`;
      }
      mealPlanDetails += `</ul>`;
      mealPlanOutput.innerHTML = mealPlanDetails;

    } catch (error) {
      mealPlanOutput.innerHTML = `<p>Error generating meal plan: ${error}</p>`;
    }
  });
});