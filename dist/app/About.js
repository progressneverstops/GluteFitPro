"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function About() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "About Us"),
        react_1.default.createElement("p", null, "Welcome to GluteFitPro, your ultimate guide to transforming your glutes and improving your overall fitness."),
        react_1.default.createElement("p", null, "Our team of experts has crafted a comprehensive program that combines dynamic workouts, daily routines, and progress tracking to help you achieve your goals."),
        react_1.default.createElement("p", null,
            "Our workout plan includes:",
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null, "Beginner - Aesthetic Development"),
                react_1.default.createElement("li", null, "Intermediate - Functional Strength"),
                react_1.default.createElement("li", null, "Advanced - Athletic Performance")))));
}
exports.default = About;
