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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("./styles.css");
const WorkoutPlans_1 = __importDefault(require("./WorkoutPlans"));
const ProgressTracking_1 = __importDefault(require("./ProgressTracking"));
const CompilingDataSection_1 = __importDefault(require("./CompilingDataSection"));
function App() {
    const [fitnessLevel, setFitnessLevel] = (0, react_1.useState)('beginner');
    const [primaryGoal, setPrimaryGoal] = (0, react_1.useState)('functional');
    const [dietType, setDietType] = (0, react_1.useState)('vegan');
    const [goalReason, setGoalReason] = (0, react_1.useState)('');
    const [specifics, setSpecifics] = (0, react_1.useState)(''); // State for specifics
   
    };
    const handleFitnessLevelChange = (event) => {
        setFitnessLevel(event.target.value);
    };
    const handlePrimaryGoalChange = (event) => {
        setPrimaryGoal(event.target.value);
    };
    const handleDietTypeChange = (event) => {
        setDietType(event.target.value);
    };
    const handleGoalReasonChange = (event) => {
        setGoalReason(event.target.value);
    };
    const handleDietTypeChangeFromIndex = (newDietType) => {
        setDietType(newDietType);
    };
    (0, react_1.useEffect)(() => {
        const handleDietTypeChanged = (event) => {
            handleDietTypeChangeFromIndex(event.detail.dietType);
        };
        document.addEventListener('dietTypeChanged', handleDietTypeChanged);
        return () => {
            document.removeEventListener('dietTypeChanged', handleDietTypeChanged);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        const savedFitnessLevel = localStorage.getItem('fitnessLevel');
        const savedPrimaryGoal = localStorage.getItem('primaryGoal');
        const savedDietType = localStorage.getItem('dietType');
        const savedGoalReason = localStorage.getItem('goalReason');
        if (savedFitnessLevel) {
            setFitnessLevel(savedFitnessLevel);
        }
        if (savedPrimaryGoal) {
            setPrimaryGoal(savedPrimaryGoal);
        }
        if (savedDietType) {
            setDietType(savedDietType);
        }
        if (savedGoalReason) {
            setGoalReason(savedGoalReason);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        localStorage.setItem('fitnessLevel', fitnessLevel);
        localStorage.setItem('primaryGoal', primaryGoal);
        localStorage.setItem('dietType', dietType);
        localStorage.setItem('goalReason', goalReason);
    }, [fitnessLevel, primaryGoal, dietType, goalReason]);
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement("div", { className: "app-container" },
            react_1.default.createElement("header", { className: "app-header" },
                react_1.default.createElement("img", { src: "../plum-glute-fit-pro.png", alt: "GluteFitPro Logo", className: "app-logo" }),
                react_1.default.createElement("h1", null, "GluteFitPro"),
                react_1.default.createElement("p", { className: "tagline" }, "Holistic Diet & Movement App"),
                react_1.default.createElement("nav", null,
                    react_1.default.createElement("ul", { className: "nav-links" },
                        react_1.default.createElement("li", null,
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "btn-primary" }, "Home")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/workout-plans", className: "btn-primary" }, "Workout Plans")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/daily-routines", className: "btn-primary" }, "Daily Routines")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/progress-tracking", className: "btn-primary" }, "Progress Tracking"))))),
            react_1.default.createElement("main", { className: "main-content" },
                react_1.default.createElement(react_router_dom_1.Routes, null,
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement("section", { className: "section" },
                            react_1.default.createElement("h2", null, "Welcome to GluteFitPro!"),
                            react_1.default.createElement("p", null, "Get ready to transform your glutes and improve your overall fitness with our holistic approach."),
                            react_1.default.createElement(CustomIntakeSection_1.default, { dietType: dietType, handleDietTypeChangeFromIndex: handleDietTypeChangeFromIndex }),
                            react_1.default.createElement(SpecificsSection_1.default, { specifics: specifics, handleSpecificsChange: handleSpecificsChange }),
                            react_1.default.createElement(CompilingDataSection_1.default, null)) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/workout-plans", element: react_1.default.createElement(WorkoutPlans_1.default, { fitnessLevel: fitnessLevel, primaryGoal: primaryGoal, dietType: dietType, goalReason: goalReason, handleFitnessLevelChange: handleFitnessLevelChange, handlePrimaryGoalChange: handlePrimaryGoalChange, handleDietTypeChange: handleDietTypeChange, handleGoalReasonChange: handleGoalReasonChange, handleCreatePlan: () => console.log('Create Plan button clicked') }) }),
                  react_1.default.createElement(react_router_dom_1.Route, { path: "/progress-tracking", element: react_1.default.createElement(ProgressTracking_1.default, null) }))),
            react_1.default.createElement("footer", { className: "app-footer" },
                react_1.default.createElement("p", null, "\u00A9 2025 Addicted 2 Progress LLC. All rights reserved.")))));
}
exports.default = App;
