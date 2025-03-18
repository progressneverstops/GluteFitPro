import fs from 'fs';
import csv from 'csv-parser';

interface FoodData {
    food: string;
    category: string;
    subCategory: string;
    [key: string]: any;
}

export const processFoodData = (
    dietType: string,
    callback: (data: FoodData[]) => void
) => {
    const results: FoodData[] = [];
    fs.createReadStream('shrank_food-data-for_now.csv')
    .pipe(csv())
    .on('data', (data: FoodData) => {
        // Basic filtering based on diet type (can be expanded)
        let include = false;
        if (dietType === 'vegan' && data.category.toLowerCase().includes('plant-based')) {
            include = true;
        } else if (dietType === 'vegetarian' && (data.category.toLowerCase().includes('plant-based') || data.category.toLowerCase().includes('dairy'))) {
            include = true;
        } else if (dietType === 'omnivore') {
            include = true; // Include everything for omnivores
        } else if (dietType === 'keto' && data.category.toLowerCase().includes('keto-friendly')) {
            include = true;
        } else if (dietType === 'glutenFree' && !data.food.toLowerCase().includes('gluten')) {
            include = true;
        } else if (dietType === 'plantBased' && data.category.toLowerCase().includes('plant-based')) {
            include = true;
        } else if (dietType === 'mediterranean' && (data.category.toLowerCase().includes('plant-based') || data.category.toLowerCase().includes('fish') || data.category.toLowerCase().includes('poultry'))) {
          include = true;
        } else if (dietType === 'traditionalUSDA') {
          include = true;
        }

        if (include) {
            results.push(data);
        }
    })
    .on('end', () => {
        callback(results);
    });
};
