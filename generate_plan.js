document.addEventListener('DOMContentLoaded', () => {
    const createPlanBtn = document.getElementById('createPlanBtn');
    const workoutPlanOutput = document.getElementById('workoutPlanContent');
    const mealPlanOutput = document.getElementById('mealPlanContent');
    const mobilityIssuesInput = document.getElementById('mobilityIssues');

  // Exercise data (simplified for now)
  const exercises = {
    beginner: {
      aesthetic: ['Banded Step Throughs', 'Weight Vest Walks', 'Hill Walks'],
      functional: [
        'Stair Master Exercises',
        'Step Up Stair Machine Emulator',
        'Exaggerated Slow Negative Burn Outs',
      ],
      athletic: ['Sled Pushes', 'Weight Vest Walks', 'Hill Walks'],
    },
    intermediate: {
      aesthetic: [
        'Banded Step Throughs',
        'Weight Vest Walks',
        'Stair Master Exercises',
      ],
      functional: ['Step Up Stair Machine Emulator', 'Sled Pushes', 'Hill Walks'],
      athletic: [
        'Exaggerated Slow Negative Burn Outs',
        'Banded Step Throughs',
        'Weight Vest Walks',
      ],
    },
    advanced: {
      aesthetic: [
        'Weight Vest Walks',
        'Stair Master Exercises',
        'Step Up Stair Machine Emulator',
      ],
      functional: ['Sled Pushes', 'Hill Walks', 'Exaggerated Slow Negative Burn Outs'],
      athletic: [
        'Banded Step Throughs',
        'Weight Vest Walks',
        'Stair Master Exercises',
      ],
    },
  };

    function generateWorkoutRoutine(fitnessLevel, primaryGoal, mobilityIssues) {
        let plan = exercises[fitnessLevel]?.[primaryGoal] || [];
        let modifiedNote = '';

        if (mobilityIssues.toLowerCase().includes('back') || mobilityIssues.toLowerCase().includes('knee')) {
            plan = plan.filter(exercise => !['Isometric Workouts', 'Barbell Squats', 'Deadlifts', 'Traditional Hip Thrusts'].includes(exercise));
            modifiedNote = '<p style="color: red; margin-top: 1rem;"><strong>Note:</strong> Exercises modified to accommodate back and knee considerations.</p>';
        }

        if (plan.length === 0) {
            return '<p>No workout plan generated for these selections.</p>';
        }

        let workoutPlanHTML = `<h4>Workout Plan:</h4><ul>`;
        plan.forEach(exercise => {
            workoutPlanHTML += `<li>${exercise}</li>`;
        });
        workoutPlanHTML += `</ul>${modifiedNote}`;
    return workoutPlanHTML;
  }

  function generateMealPlan(dietType, fitnessLevel) {
    const mealPlans = {
      vegan: {
        beginner: `
                    <h4>Vegan - Beginner</h4>
                    <p>Key Ingredients: legumes, tofu/tempeh, whole grains, nuts/seeds, plenty of vegetables, and healthy fats (avocado, olive oil)</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Green smoothie bowl (spinach, banana, pea protein, almond milk, topped with hemp seeds and berries)</li>
                        <li><strong>Lunch:</strong> Quinoa salad with black beans, corn, avocado, and a lime-tahini dressing</li>
                        <li><strong>Dinner:</strong> Stir-fried tofu with broccoli, bell peppers over brown rice</li>
                        <li><strong>Snacks:</strong> Energy bars, fruit, raw veggies with hummus, and nuts.</li>
                    </ul>
                    <p>Keep portions moderate; ensure a balanced mix.</p>
                `,
        intermediate: `
                    <h4>Vegan - Intermediate</h4>
                    <p>Key Ingredients: legumes, tofu/tempeh, whole grains, nuts/seeds, plenty of vegetables, and healthy fats (avocado, olive oil)</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Oatmeal with chia seeds, almond butter, and fruit</li>
                        <li><strong>Lunch:</strong> Mediterranean-style lentil soup with a variety of diced vegetables</li>
                        <li><strong>Dinner:</strong> Chickpea curry with spinach, served with whole-grain naan or quinoa</li>
                        <li><strong>Snacks:</strong> Energy bars, fruit, raw veggies with hummus, and nuts.</li>
                    </ul>
                    <p>Add an extra serving of legumes or tofu to boost protein.</p>
                `,
        advanced: `
                    <h4>Vegan - Advanced</h4>
                    <p>Key Ingredients: legumes, tofu/tempeh, whole grains, nuts/seeds, plenty of vegetables, and healthy fats (avocado, olive oil)</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Green smoothie bowl (spinach, banana, pea protein, almond milk, topped with hemp seeds and berries)</li>
                        <li><strong>Lunch:</strong> Quinoa salad with black beans, corn, avocado, and a lime-tahini dressing</li>
                        <li><strong>Dinner:</strong> Stir-fried tofu with broccoli, bell peppers over brown rice</li>
                        <li><strong>Snacks:</strong> Energy bars, fruit, raw veggies with hummus, and nuts.</li>
                    </ul>
                    <p>Consider extra complex carbohydrates (like an extra side of rice or additional starchy veg) especially around workout times, plus incorporate a pre-workout energy snack (e.g., banana with peanut butter).</p>
                `,
      },
      vegetarian: {
        beginner: `
                    <h4>Vegetarian - Beginner</h4>
                    <p>Key Ingredients: eggs and dairy (if part of your vegetarian choices), plus plant proteins; plenty of vegetables and whole grains</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Greek yogurt parfait with granola and berries</li>
                        <li><strong>Lunch:</strong> Caprese salad with tomatoes, mozzarella, basil, drizzled with olive oil and balsamic</li>
                        <li><strong>Dinner:</strong> Vegetable and bean chili served over quinoa or brown rice</li>
                        <li><strong>Snacks:</strong> Cottage cheese with fruit, cheese sticks, nuts, whole fruits.</li>
                    </ul>
                    <p>Focus on balanced meals with emphasis on veggies and a moderate protein source.</p>
                `,
        intermediate: `
                    <h4>Vegetarian - Intermediate</h4>
                    <p>Key Ingredients: eggs and dairy (if part of your vegetarian choices), plus plant proteins; plenty of vegetables and whole grains</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Scrambled eggs with spinach and whole-grain toast</li>
                        <li><strong>Lunch:</strong> Whole-grain wrap with hummus, mixed greens, cucumbers, and shredded carrots</li>
                        <li><strong>Dinner:</strong> Eggplant Parmesan made with baked eggplant slices, light cheese, and whole-grain breadcrumbs</li>
                        <li><strong>Snacks:</strong> Cottage cheese with fruit, cheese sticks, nuts, whole fruits.</li>
                    </ul>
                    <p>Increase egg white portions or add cottage cheese for an extra protein hit.</p>
                `,
        advanced: `
                    <h4>Vegetarian - Advanced</h4>
                    <p>Key Ingredients: eggs and dairy (if part of your vegetarian choices), plus plant proteins; plenty of vegetables and whole grains</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Greek yogurt parfait with granola and berries</li>
                        <li><strong>Lunch:</strong> Caprese salad with tomatoes, mozzarella, basil, drizzled with olive oil and balsamic</li>
                        <li><strong>Dinner:</strong> Vegetable and bean chili served over quinoa or brown rice</li>
                        <li><strong>Snacks:</strong> Cottage cheese with fruit, cheese sticks, nuts, whole fruits.</li>
                    </ul>
                    <p>Incorporate extra dairy protein post-workout (such as a recovery shake or Greek yogurt) and include complex carbs for repletion.</p>
                `,
      },
      mediterranean: {
        beginner: `
                    <h4>Mediterranean - Beginner</h4>
                    <p>Key Ingredients: lean proteins (fish and poultry), olive oil, whole grains, fruits, vegetables, legumes, nuts, and seeds</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Whole-grain toast with avocado and poached eggs, a sprinkle of feta</li>
                        <li><strong>Lunch:</strong> Greek salad with cucumbers, tomatoes, olives, red onions, and grilled chicken or fish</li>
                        <li><strong>Dinner:</strong> Grilled fish or chicken with a side of ratatouille and a small serving of whole-wheat pasta</li>
                        <li><strong>Snacks:</strong> Nuts, olives, fresh fruit, yogurt with honey.</li>
                    </ul>
                    <p>Standard portion with moderate protein and carbs.</p>
                `,
        intermediate: `
                    <h4>Mediterranean - Intermediate</h4>
                    <p>Key Ingredients: lean proteins (fish and poultry), olive oil, whole grains, fruits, vegetables, legumes, nuts, and seeds</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Horchata-inspired smoothie with dates, cinnamon, and almond milk</li>
                        <li><strong>Lunch:</strong> Farro salad with artichokes, spinach, and a lemon-olive oil dressing</li>
                        <li><strong>Dinner:</strong> Stuffed bell peppers with ground turkey, quinoa, tomatoes, and herbs</li>
                        <li><strong>Snacks:</strong> Nuts, olives, fresh fruit, yogurt with honey.</li>
                    </ul>
                    <p>Slight increase in lean protein portions (like extra grilled fish) to support strength adaptations.</p>
                `,
        advanced: `
                    <h4>Mediterranean - Advanced</h4>
                    <p>Key Ingredients: lean proteins (fish and poultry), olive oil, whole grains, fruits, vegetables, legumes, nuts, and seeds</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Whole-grain toast with avocado and poached eggs, a sprinkle of feta</li>
                        <li><strong>Lunch:</strong> Greek salad with cucumbers, tomatoes, olives, red onions, and grilled chicken or fish</li>
                        <li><strong>Dinner:</strong> Grilled fish or chicken with a side of ratatouille and a small serving of whole-wheat pasta</li>
                        <li><strong>Snacks:</strong> Nuts, olives, fresh fruit, yogurt with honey.</li>
                    </ul>
                    <p>Ensure larger meals pre/post workout; add an extra whole-grain serving or side of legumes for sustained energy.</p>
                `,
      },
      'traditional-usda': {
        beginner: `
                    <h4>Traditional USDA - Beginner</h4>
                    <p>Key Ingredients: a balanced mix of proteins, carbohydrates, and fats; fruits, vegetables, lean meats, and dairy</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Whole-grain cereal or oatmeal with low-fat milk and fruit</li>
                        <li><strong>Lunch:</strong> Turkey or grilled chicken sandwich on whole-grain bread with lettuce, tomato, and avocado</li>
                        <li><strong>Dinner:</strong> Lean protein (such as lean beef, chicken, or fish) with a serving of brown rice and steamed vegetables</li>
                        <li><strong>Snacks:</strong> Fruit, yogurt, whole-grain crackers with cheese, and vegetables with light dips.</li>
                    </ul>
                    <p>Standard meals with balanced ratio; portion sizes as recommended by USDA guidelines.</p>
                `,
        intermediate: `
                    <h4>Traditional USDA - Intermediate</h4>
                    <p>Key Ingredients: a balanced mix of proteins, carbohydrates, and fats; fruits, vegetables, lean meats, and dairy</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Egg and vegetable omelet with a slice of whole-wheat toast</li>
                        <li><strong>Lunch:</strong> Mixed greens salad with a variety of veggies, a hard-boiled egg, and a light vinaigrette</li>
                        <li><strong>Dinner:</strong> Pasta with a lean protein (turkey meatballs) and a tomato-based sauce, side salad</li>
                        <li><strong>Snacks:</strong> Fruit, yogurt, whole-grain crackers with cheese, and vegetables with light dips.</li>
                    </ul>
                    <p>Emphasize a protein boost and add an extra serving of complex carbohydrates post-workout.</p>
                `,
        advanced: `
                    <h4>Traditional USDA - Advanced</h4>
                    <p>Key Ingredients: a balanced mix of proteins, carbohydrates, and fats; fruits, vegetables, lean meats, and dairy</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Whole-grain cereal or oatmeal with low-fat milk and fruit</li>
                        <li><strong>Lunch:</strong> Turkey or grilled chicken sandwich on whole-grain bread with lettuce, tomato, and avocado</li>
                        <li><strong>Dinner:</strong> Lean protein (such as lean beef, chicken, or fish) with a serving of brown rice and steamed vegetables</li>
                        <li><strong>Snacks:</strong> Fruit, yogurt, whole-grain crackers with cheese, and vegetables with light dips.</li>
                    </ul>
                    <p>Increase portion sizes to support high energy demands, especially with additional carbs and more lean protein during recovery.</p>
                `,
      },
      omnivore: {
        beginner: `
                    <h4>Omnivore - Beginner</h4>
                    <p>Key Ingredients: a wide range of animal and plant proteins; balanced mix of macronutrients</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Omelet with mixed vegetables and a side of whole-grain toast</li>
                        <li><strong>Lunch:</strong> Grilled chicken or fish salad with mixed greens, nuts, and a vinaigrette dressing</li>
                        <li><strong>Dinner:</strong> Pork tenderloin, roasted sweet potatoes, and steamed broccoli</li>
                        <li><strong>Snacks:</strong> Hard-boiled eggs, fruit, yogurt, mixed nuts, and vegetable sticks with dip.</li>
                    </ul>
                    <p>Moderate portions with a focus on balanced nutrition.</p>
                `,
        intermediate: `
                    <h4>Omnivore - Intermediate</h4>
                    <p>Key Ingredients: a wide range of animal and plant proteins; balanced mix of macronutrients</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Smoothie with whey protein, mixed berries, and spinach</li>
                        <li><strong>Lunch:</strong> Beef stir-fry with assorted vegetables over brown rice</li>
                        <li><strong>Dinner:</strong> Salmon with quinoa and a side of asparagus or green beans</li>
                        <li><strong>Snacks:</strong> Hard-boiled eggs, fruit, yogurt, mixed nuts, and vegetable sticks with dip.</li>
                    </ul>
                    <p>Increase lean protein portions and include a pre/post-workout snack for muscle recovery.</p>
                `,
        advanced: `
                    <h4>Omnivore - Advanced</h4>
                    <p>Key Ingredients: a wide range of animal and plant proteins; balanced mix of macronutrients</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Omelet with mixed vegetables and a side of whole-grain toast</li>
                        <li><strong>Lunch:</strong> Grilled chicken or fish salad with mixed greens, nuts, and a vinaigrette dressing</li>
                        <li><strong>Dinner:</strong> Pork tenderloin, roasted sweet potatoes, and steamed broccoli</li>
                        <li><strong>Snacks:</strong> Hard-boiled eggs, fruit, yogurt, mixed nuts, and vegetable sticks with dip.</li>
                    </ul>
                    <p>Enhance carb servings (such as whole grains or starchy vegetables) around workouts and incorporate protein shakes if needed.</p>
                `,
      },
      keto: {
        beginner: `
                    <h4>Keto - Beginner</h4>
                    <p>Key Ingredients: High fat, moderate protein, very low carbohydrates; focus on healthy fats, non-starchy vegetables, and protein sources</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Scrambled eggs with avocado and spinach cooked in butter or coconut oil</li>
                        <li><strong>Lunch:</strong> Salad with mixed leafy greens, grilled chicken, avocado, olive oil, and a few cherry tomatoes (watch carb counts)</li>
                        <li><strong>Dinner:</strong> Steak with a side of sautéed mushrooms and spinach in garlic butter</li>
                        <li><strong>Snacks:</strong> Nuts, cheese slices, olives, or a small serving of full-fat yogurt (if dairy is allowed within your keto protocol).</li>
                    </ul>
                    <p>Keep meals structured around fat and protein with minimal extra carbs.</p>
                `,
        intermediate: `
                    <h4>Keto - Intermediate</h4>
                    <p>Key Ingredients: High fat, moderate protein, very low carbohydrates; focus on healthy fats, non-starchy vegetables, and protein sources</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Coconut milk smoothie with unsweetened cocoa powder, spinach, and a scoop of collagen protein</li>
                        <li><strong>Lunch:</strong> Zucchini noodles tossed in a cream-based pesto with shrimp or chicken</li>
                        <li><strong>Dinner:</strong> Baked salmon with asparagus, drizzled with olive oil and lemon</li>
                        <li><strong>Snacks:</strong> Nuts, cheese slices, olives, or a small serving of full-fat yogurt (if dairy is allowed within your keto protocol).</li>
                    </ul>
                    <p>May incorporate a targeted carb approach (a small dose of berries or a spoonful of coconut aminos pre-workout) if needed.</p>
                `,
        advanced: `
                    <h4>Keto - Advanced</h4>
                    <p>Key Ingredients: High fat, moderate protein, very low carbohydrates; focus on healthy fats, non-starchy vegetables, and protein sources</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Scrambled eggs with avocado and spinach cooked in butter or coconut oil</li>
                        <li><strong>Lunch:</strong> Salad with mixed leafy greens, grilled chicken, avocado, olive oil, and a few cherry tomatoes (watch carb counts)</li>
                        <li><strong>Dinner:</strong> Steak with a side of sautéed mushrooms and spinach in garlic butter</li>
                        <li><strong>Snacks:</strong> Nuts, cheese slices, olives, or a small serving of full-fat yogurt (if dairy is allowed within your keto protocol).</li>
                    </ul>
                    <p>Consider “cyclical keto” adjustments on very high training days by adding a limited serving of complex carbs around workouts for performance and recovery.</p>
                `,
      },
      'gluten-free': {
        beginner: `
                    <h4>Gluten-Free - Beginner</h4>
                    <p>Key Ingredients: Naturally gluten-free grains like rice, quinoa, buckwheat; lean proteins; fruits and vegetables; dairy or alternatives</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Smoothie bowl with gluten-free oats, berries, and almond milk</li>
                        <li><strong>Lunch:</strong> Quinoa salad with mixed vegetables, black beans, and a citrus dressing</li>
                        <li><strong>Dinner:</strong> Grilled fish with a side of wild rice and steamed green beans</li>
                        <li><strong>Snacks:</strong> Rice cakes with nut butter, fresh fruit, nuts, and gluten-free granola bars.</li>
                    </ul>
                    <p>Focus on balanced meals with moderate protein, fats, and gluten-free carbohydrates.</p>
                `,
        intermediate: `
                    <h4>Gluten-Free - Intermediate</h4>
                    <p>Key Ingredients: Naturally gluten-free grains like rice, quinoa, buckwheat; lean proteins; fruits and vegetables; dairy or alternatives</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Scrambled eggs with a side of gluten-free toast and avocado</li>
                        <li><strong>Lunch:</strong> Gluten-free wrap (using rice paper or specialized flour) filled with turkey, lettuce, tomatoes, and avocado</li>
                        <li><strong>Dinner:</strong> Stir-fried tofu with a mix of gluten-free soy sauce, veggies, and buckwheat noodles</li>
                        <li><strong>Snacks:</strong> Rice cakes with nut butter, fresh fruit, nuts, and gluten-free granola bars.</li>
                    </ul>
                    <p>Increase lean protein and ensure you’re getting enough varied grains for steady energy.</p>
                `,
        advanced: `
                    <h4>Gluten-Free - Advanced</h4>
                    <p>Key Ingredients: Naturally gluten-free grains like rice, quinoa, buckwheat; lean proteins; fruits and vegetables; dairy or alternatives</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Smoothie bowl with gluten-free oats, berries, and almond milk</li>
                        <li><strong>Lunch:</strong> Quinoa salad with mixed vegetables, black beans, and a citrus dressing</li>
                        <li><strong>Dinner:</strong> Grilled fish with a side of wild rice and steamed green beans</li>
                        <li><strong>Snacks:</strong> Rice cakes with nut butter, fresh fruit, nuts, and gluten-free granola bars.</li>
                    </ul>
                    <p>Elevate carb servings from gluten-free sources (like additional rice, quinoa, or sweet potatoes) to meet high energy demands; incorporate a nutrient-dense recovery snack.</p>
                `,
      },
      'plant-based': {
        beginner: `
                    <h4>Plant-Based - Beginner</h4>
                    <p>Key Ingredients: Similar to vegan but may allow minimal animal products like occasional dairy or eggs (depending on interpretation); otherwise heavily focused on whole, minimally processed plant foods</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Overnight oats with almond milk, chia seeds, maple syrup, and berries</li>
                        <li><strong>Lunch:</strong> Buddha bowl with mixed greens, roasted chickpeas, sweet potato, avocado, and tahini drizzle</li>
                        <li><strong>Dinner:</strong> Black bean and quinoa stuffed peppers with tomatoes and corn</li>
                        <li><strong>Snacks:</strong> Fresh fruit, raw veggies with bean dip, energy balls made from dates and nuts, or a small serving of nut butter on rice cakes.</li>
                    </ul>
                    <p>Keep balanced portions and a good mix of protein-rich legumes and whole grains.</p>
                `,
        intermediate: `
                    <h4>Plant-Based - Intermediate</h4>
                    <p>Key Ingredients: Similar to vegan but may allow minimal animal products like occasional dairy or eggs (depending on interpretation); otherwise heavily focused on whole, minimally processed plant foods</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Smoothie with spinach, banana, pea protein, and flaxseeds</li>
                        <li><strong>Lunch:</strong> Whole-grain salad with edamame, carrots, cucumbers, and a lemon-tahini dressing</li>
                        <li><strong>Dinner:</strong> Lentil loaf with a side of mashed cauliflower and steamed greens</li>
                        <li><strong>Snacks:</strong> Fresh fruit, raw veggies with bean dip, energy balls made from dates and nuts, or a small serving of nut butter on rice cakes.</li>
                    </ul>
                    <p>Increase beans and legumes portion, perhaps add a plant-based protein shake after workouts.</p>
                `,
        advanced: `
                    <h4>Plant-Based - Advanced</h4>
                    <p>Key Ingredients: Similar to vegan but may allow minimal animal products like occasional dairy or eggs (depending on interpretation); otherwise heavily focused on whole, minimally processed plant foods</p>
                    <ul>
                        <li><strong>Breakfast:</strong> Overnight oats with almond milk, chia seeds, maple syrup, and berries</li>
                        <li><strong>Lunch:</strong> Buddha bowl with mixed greens, roasted chickpeas, sweet potato, avocado, and tahini drizzle</li>
                        <li><strong>Dinner:</strong> Black bean and quinoa stuffed peppers with tomatoes and corn</li>
                        <li><strong>Snacks:</strong> Fresh fruit, raw veggies with bean dip, energy balls made from dates and nuts, or a small serving of nut butter on rice cakes.</li>
                    </ul>
                    <p>Emphasize nutrient timing by having a carb‑rich plant meal pre-workout and a recovery meal rich in plant proteins and complex carbs; consider adding extra servings of nutrient-dense grains and legumes.</p>
                `,
      },
    };

    let selectedMealPlan = mealPlans[dietType]?.[fitnessLevel];
     if (!selectedMealPlan) {
            return '<p>No meal plan generated for these selections.</p>';
        }
    return selectedMealPlan;
  }

  createPlanBtn.addEventListener('click', () => {
    const fitnessLevel = document.getElementById('fitnessLevel').value;
    const primaryGoal = document.getElementById('primaryGoal').value;
    const goalReason = document.getElementById('goalReason').value;
    const mobilityIssues = mobilityIssuesInput.value;
    const dietPreference = document.getElementById('dietPreference').value;

    const workoutPlanDetails = generateWorkoutRoutine(fitnessLevel, primaryGoal, mobilityIssues);
    workoutPlanOutput.innerHTML = workoutPlanDetails;

    const mealPlanDetails = generateMealPlan(dietPreference, fitnessLevel);

    mealPlanOutput.innerHTML = mealPlanDetails;
  });
});
