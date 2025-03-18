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
Object.defineProperty(exports, "__esModule", { value: true });
// Remove this line, as it's not necessary
const fs = __importStar(require("fs"));
const mealPlans = JSON.parse(fs.readFileSync('./mealPlans.json', 'utf8'));
const generateWorkoutPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (true) {
        const { fitnessLevel, primaryGoal, dietType, goalReason, mobilityIssues } = req.body;
        let workoutPlan;
        const selectedMealPlan = mealPlans[dietType][fitnessLevel];
        if (selectedMealPlan) {
            workoutPlan = {
                Monday: selectedMealPlan.breakfast,
                Tuesday: selectedMealPlan.preWorkout,
                Wednesday: ['Rest Day'],
                Thursday: selectedMealPlan.postWorkout,
                Friday: selectedMealPlan.dinner,
                Saturday: ['Rest Day'],
                Sunday: ['Rest Day'],
            };
        }
        else {
            // Handle meal plan not found
            workoutPlan = {
                error: 'Meal plan not found for the selected diet type and fitness level',
            };
        }
        return res.status(200).json(workoutPlan);
    }
    else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
});
exports.default = generateWorkoutPlan;
