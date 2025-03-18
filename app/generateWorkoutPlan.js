"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var generateMealPlan_js_1 = require("./generateMealPlan.js");
// Exercise data (simplified for now)
var exercises = {
    beginner: {
        aesthetic: ['Banded Step Throughs', 'Weight Vest Walks', 'Hill Walks'],
        functional: ['Stair Master Exercises', 'Step Up Stair Machine Emulator', 'Exaggerated Slow Negative Burn Outs'],
        athletic: ['Sled Pushes', 'Weight Vest Walks', 'Hill Walks']
    },
    intermediate: {
        aesthetic: ['Banded Step Throughs', 'Weight Vest Walks', 'Stair Master Exercises'],
        functional: ['Step Up Stair Machine Emulator', 'Sled Pushes', 'Hill Walks'],
        athletic: ['Exaggerated Slow Negative Burn Outs', 'Banded Step Throughs', 'Weight Vest Walks']
    },
    advanced: {
        aesthetic: ['Weight Vest Walks', 'Stair Master Exercises', 'Step Up Stair Machine Emulator'],
        functional: ['Sled Pushes', 'Hill Walks', 'Exaggerated Slow Negative Burn Outs'],
        athletic: ['Banded Step Throughs', 'Weight Vest Walks', 'Stair Master Exercises']
    }
};
function generateWorkoutRoutine(fitnessLevel, primaryGoal, mobilityIssues) {
    var plan = exercises[fitnessLevel]?.[primaryGoal] || [];
    var modifiedNote = '';
    if (mobilityIssues.toLowerCase().includes('back') || mobilityIssues.toLowerCase().includes('knee')) {
        plan = plan.filter(function (exercise) { return !['Isometric Workouts', 'Barbell Squats', 'Deadlifts', 'Traditional Hip Thrusts'].includes(exercise); });
        modifiedNote = '<p style="color: red; margin-top: 1rem;"><strong>Note:</strong> Exercises modified to accommodate back and knee considerations.</p>';
    }
    if (plan.length === 0) {
        return '<p>No workout plan generated for these selections.</p>';
    }
    var workoutPlanHTML = "<h4>Workout Plan:</h4><ul>";
    plan.forEach(function (exercise) {
        workoutPlanHTML += "<li>".concat(exercise, "</li>");
    });
    workoutPlanHTML += "</ul>".concat(modifiedNote);
    return workoutPlanHTML;
}
var generateWorkoutPlan = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fitnessLevel, primaryGoal, dietType, goalReason, mobilityIssues, workoutPlan;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!true) return [3 /*break*/, 2];
                _a = req.body, fitnessLevel = _a.fitnessLevel, primaryGoal = _a.primaryGoal, dietType = _a.dietType, goalReason = _a.goalReason, mobilityIssues = _a.mobilityIssues;
                workoutPlan = generateWorkoutRoutine(fitnessLevel, primaryGoal, mobilityIssues);
                // Call generateMealPlan
                return [4 /*yield*/, (0, generateMealPlan_js_1.generateMealPlan)(dietType, 2000, {}, [])];
            case 1:
                // Call generateMealPlan
                _b.sent();
                return [2 /*return*/, res.status(200).json(workoutPlan)];
            case 2: return [2 /*return*/, res.status(405).json({ message: 'Method Not Allowed' })];
        }
    });
}); };
exports["default"] = generateWorkoutPlan;
