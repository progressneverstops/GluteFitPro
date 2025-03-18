"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const mealPlans_json_1 = __importDefault(require("../mealPlans.json")); // Import meal plans
function WorkoutPlans({ fitnessLevel, primaryGoal, dietType, goalReason, handleFitnessLevelChange, handlePrimaryGoalChange, handleDietTypeChange, handleGoalReasonChange, handleCreatePlan }) {
    const [generatedWorkoutPlan, setGeneratedWorkoutPlan] = (0, react_1.useState)({});
    const [loading, setLoading] = (0, react_1.useState)(false);
    const generateWorkoutPlan = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        // Placeholder workout plan generation
        let workoutPlan = {};
        if (fitnessLevel === 'beginner' && primaryGoal === 'aesthetic') {
            workoutPlan = {
                Day1: ['Lunge Variations (3 sets of 10-12 reps)', 'Air Squats (3 sets of 10-12 reps)', 'Banded Step Throughs (3 sets of 15 reps)'],
                Day2: ['Rest or Active Recovery'],
                Day3: ['Lunge Variations (3 sets of 10-12 reps)', 'Air Squats (3 sets of 10-12 reps)', 'Banded Step Throughs (3 sets of 15 reps)'],
            };
        }
        else if (fitnessLevel === 'intermediate' && primaryGoal === 'functional') {
            workoutPlan = {
                Day1: ['Sled Pushes (3 sets of 50ft)', 'Hill Walks (3 sets)', 'Weight Vest Walks (20 minutes)'],
                Day2: ['Rest or Active Recovery'],
                Day3: ['Sled Pushes (3 sets of 50ft)', 'Hill Walks (3 sets)', 'Weight Vest Walks (20 minutes)'],
                Day4: ['Rest or Active Recovery'],
                Day5: ['Sled Pushes (3 sets of 50ft)', 'Hill Walks (3 sets)', 'Weight Vest Walks (20 minutes)'],
            };
        }
        else if (fitnessLevel === 'advanced' && primaryGoal === 'athletic') {
            workoutPlan = {
                Day1: ['Exaggerated Slow Negative Burn Outs (3 sets of 8-10 reps)', 'Stair Master Exercises (30 minutes)'],
                Day2: ['Rest or Active Recovery'],
                Day3: ['Exaggerated Slow Negative Burn Outs (3 sets of 8-10 reps)', 'Stair Master Exercises (30 minutes)'],
                Day4: ['Rest or Active Recovery'],
                Day5: ['Exaggerated Slow Negative Burn Outs (3 sets of 8-10 reps)', 'Stair Master Exercises (30 minutes)'],
                Day6: ['Rest or Active Recovery'],
                Day7: ['Exaggerated Slow Negative Burn Outs (3 sets of 8-10 reps)', 'Stair Master Exercises (30 minutes)'],
            };
        }
        setGeneratedWorkoutPlan(workoutPlan);
        setLoading(false);
    });
    const handlePlanCreation = () => {
        generateWorkoutPlan();
    };
    (0, react_1.useEffect)(() => {
        const savedGoalReason = localStorage.getItem('goalReason');
        if (savedGoalReason) {
            handleGoalReasonChange({ target: { value: savedGoalReason } });
        }
    }, [handleGoalReasonChange]);
    (0, react_1.useEffect)(() => {
        const savedFitnessLevel = localStorage.getItem('fitnessLevel');
        if (savedFitnessLevel) {
            handleFitnessLevelChange({ target: { value: savedFitnessLevel } });
        }
    }, [handleFitnessLevelChange]);
    (0, react_1.useEffect)(() => {
        const savedPrimaryGoal = localStorage.getItem('primaryGoal');
        if (savedPrimaryGoal) {
            handlePrimaryGoalChange({ target: { value: savedPrimaryGoal } });
        }
    }, [handlePrimaryGoalChange]);
    (0, react_1.useEffect)(() => {
        if (fitnessLevel) {
            localStorage.setItem('fitnessLevel', fitnessLevel);
        }
    }, [fitnessLevel]);
    (0, react_1.useEffect)(() => {
        if (goalReason) {
            localStorage.setItem('goalReason', goalReason);
        }
    }, [goalReason]);
    (0, react_1.useEffect)(() => {
        if (primaryGoal) {
            localStorage.setItem('primaryGoal', primaryGoal);
        }
    }, [primaryGoal]);
    (0, react_1.useEffect)(() => {
        const savedDietType = localStorage.getItem('dietType');
        if (savedDietType) {
            handleDietTypeChange({ target: { value: savedDietType } });
        }
    }, [handleDietTypeChange]);
    react_1.default.useEffect(() => {
        generateWorkoutPlan();
    }, [fitnessLevel, primaryGoal, dietType, goalReason]);
    (0, react_1.useEffect)(() => {
        if (dietType) {
            localStorage.setItem('dietType', dietType);
        }
    }, [dietType]);
    // Helper function to safely get meal plan data
    const getMealPlanData = (dietType, levelKey, mealTypeKey) => {
        var _a, _b, _c;
        return (_c = (_b = (_a = mealPlans_json_1.default === null || mealPlans_json_1.default === void 0 ? void 0 : mealPlans_json_1.default[dietType]) === null || _a === void 0 ? void 0 : _a[levelKey]) === null || _b === void 0 ? void 0 : _b[mealTypeKey]) !== null && _c !== void 0 ? _c : [];
    };
    // Helper function to get examples
    const getExamples = (timingValue) => {
        if (timingValue && timingValue.examples && Array.isArray(timingValue.examples)) {
            return timingValue.examples;
        }
        return [];
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Get Your Personalized Plan"),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "fitnessLevel" }, "Current Fitness Level"),
            react_1.default.createElement("select", { id: "fitnessLevel", value: fitnessLevel, onChange: handleFitnessLevelChange },
                react_1.default.createElement("option", { value: "beginner" }, "Beginner"),
                react_1.default.createElement("option", { value: "intermediate" }, "Intermediate"),
                react_1.default.createElement("option", { value: "advanced" }, "Advanced"))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "primaryGoal" }, "Primary Goal"),
            react_1.default.createElement("select", { id: "primaryGoal", value: primaryGoal, onChange: handlePrimaryGoalChange },
                react_1.default.createElement("option", { value: "aesthetic" }, "Aesthetic Development"),
                react_1.default.createElement("option", { value: "functional" }, "Functional Strength"),
                react_1.default.createElement("option", { value: "athletic" }, "Athletic Performance"))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "goalReason" }, "Why do you want to reach this goal?"),
            react_1.default.createElement("select", { id: "goalReason", value: goalReason, onChange: handleGoalReasonChange },
                react_1.default.createElement("option", { value: "longevity" }, "Longevity"),
                react_1.default.createElement("option", { value: "strength" }, "Strength & Fitness"),
                react_1.default.createElement("option", { value: "attractiveness" }, "Attractiveness"),
                react_1.default.createElement("option", { value: "selfConfidence" }, "Self-Confidence"))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "mobilityIssues" }, "Mobility Issues"),
            react_1.default.createElement("textarea", { id: "mobilityIssues" })),
        react_1.default.createElement("button", { onClick: handlePlanCreation }, "Create My Plan"),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "dietType" }, "Diet Type:"),
            react_1.default.createElement("select", { id: "dietType", value: dietType, onChange: handleDietTypeChange },
                react_1.default.createElement("option", { value: "vegan" }, "Vegan"),
                react_1.default.createElement("option", { value: "vegetarian" }, "Vegetarian"),
                react_1.default.createElement("option", { value: "mediterranean" }, "Mediterranean"),
                react_1.default.createElement("option", { value: "traditionalUSDA" }, "Traditional USDA"),
                react_1.default.createElement("option", { value: "omnivore" }, "Omnivore"),
                react_1.default.createElement("option", { value: "keto" }, "Keto"),
                react_1.default.createElement("option", { value: "glutenFree" }, "Gluten-Free"),
                react_1.default.createElement("option", { value: "plantBased" }, "Plant-Based"))),
        loading ? (react_1.default.createElement("p", null, "Loading...")) : (react_1.default.createElement("div", null,
            react_1.default.createElement("h2", null, "Generated Workout Plan:"),
            Object.keys(generatedWorkoutPlan).length > 0 ? (react_1.default.createElement("div", null, Object.entries(generatedWorkoutPlan).map(([day, exercises]) => (react_1.default.createElement("div", { key: day },
                react_1.default.createElement("h3", null, day),
                react_1.default.createElement("ul", null, exercises.map((exercise, index) => (react_1.default.createElement("li", { key: index }, exercise))))))))) : (react_1.default.createElement("p", null, "No workout plan generated yet.")),
            dietType && mealPlans_json_1.default[dietType] && (react_1.default.createElement("div", null,
                react_1.default.createElement("h2", null,
                    (dietType).toUpperCase(),
                    " Diet Plan"),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h3", null, "Macronutrient Focus:"),
                    react_1.default.createElement("ul", null, Object.entries(mealPlans_json_1.default[dietType].macronutrientFocus).map(([macroKey, macroValues], macroIndex) => (react_1.default.createElement("li", { key: macroIndex },
                        react_1.default.createElement("strong", null,
                            macroKey.toUpperCase(),
                            ":"),
                        react_1.default.createElement("ul", null, Array.isArray(macroValues) && macroValues.map((value, valueIndex) => (react_1.default.createElement("li", { key: valueIndex }, value))))))))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h3", null, "Meal Timing & Nutrient Partitioning:"),
                    Object.entries(mealPlans_json_1.default[dietType].mealTiming).map(([timingKey, timingValue], timingIndex) => (react_1.default.createElement("div", { key: timingIndex },
                        react_1.default.createElement("h4", null,
                            timingKey.toUpperCase(),
                            ":"),
                        react_1.default.createElement("p", null, timingValue.description),
                        react_1.default.createElement("h5", null, "Examples:"),
                        react_1.default.createElement("ul", null, getExamples(timingValue).map((example, exampleIndex) => (react_1.default.createElement("li", { key: exampleIndex }, example)))))))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h3", null, "Supplementation (Optional):"),
                    react_1.default.createElement("ul", null, mealPlans_json_1.default[dietType].supplementation.map((supp, suppIndex) => (react_1.default.createElement("li", { key: suppIndex }, supp))))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h3", null, "Exclusion Criteria:"),
                    react_1.default.createElement("ul", null, mealPlans_json_1.default[dietType].exclusionCriteria.map((criteria, criteriaIndex) => (react_1.default.createElement("li", { key: criteriaIndex }, criteria))))),
                Object.keys(mealPlans_json_1.default[dietType]).filter(key => key !== 'macronutrientFocus' && key !== 'mealTiming' && key !== 'supplementation' && key !== 'exclusionCriteria').map((levelKey, levelIndex) => (react_1.default.createElement("div", { key: levelIndex },
                    react_1.default.createElement("h3", null,
                        levelKey.toUpperCase(),
                        " Level Meal Plan:"),
                    Object.keys(mealPlans_json_1.default[dietType][levelKey]).map((mealTypeKey, mealTypeIndex) => (react_1.default.createElement("div", { key: mealTypeIndex },
                        react_1.default.createElement("h4", null,
                            mealTypeKey.toUpperCase(),
                            ":"),
                        react_1.default.createElement("ul", null, getMealPlanData(dietType, levelKey, mealTypeKey).map((meal, mealIndex) => (react_1.default.createElement("li", { key: mealIndex }, meal))))))))))))))));
}
exports.default = WorkoutPlans;
