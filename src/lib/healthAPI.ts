import { PUBLIC_USDA_KEY } from '$env/static/public';

export async function searchFood(foodName: string) {
    // returns id of food item
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${PUBLIC_USDA_KEY}&query=${foodName}&pageSize=1`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.foods[0].fdcId;
}

export async function getNutrition(foodName: string) {
    // returns json of health info
    const id = await searchFood(foodName);
    const url = `https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=${PUBLIC_USDA_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    //return {calories: data.calories, fat: data.fat, protein: data.protein, carbs: data.carbs};
}
