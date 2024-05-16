import { PUBLIC_USDA_KEY } from '$env/static/public';

export async function searchFood(foodName: string) {
    // returns id of food item
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${PUBLIC_USDA_KEY}&query=${foodName}&pageSize=1`;
    const response = await fetch(url);
    const data = await response.json();
    return data.foods[0].fdcId;
}

export async function getNutrition(foodName: string) {
    // returns json of health info
    const id = await searchFood(foodName);  
    const url = `https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=${PUBLIC_USDA_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const nutrients = data.foodNutrients.filter((nutrientObj: {nutrient: {name: string}}) => {
        return ['Energy', 'Protein', 'Total lipid (fat)', 'Carbohydrate, by difference'].includes(nutrientObj.nutrient.name);
    });
    const map_nutrient_name = new Map([
        ["Energy", "Calories"],
        ["Protein", "Protein"],
        ["Total lipid (fat)", "Fat"],
        ["Carbohydrate, by difference", "Carbohydrate"],
    ]);

    const formatted_nutrients = nutrients.map((nutrientObj: {nutrient: {name: string, unitName: string}, amount: number}) => {
        const nutrient_name = map_nutrient_name.get(nutrientObj.nutrient.name);
        const amount = nutrientObj.amount.toString();
        const unit = nutrientObj.nutrient.unitName;
        return [nutrient_name, amount + ' ' + unit];
    });

    return Object.fromEntries(formatted_nutrients);
    //return {calories: data.calories, fat: data.fat, protein: data.protein, carbs: data.carbs};
}
