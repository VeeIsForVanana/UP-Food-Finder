import { PUBLIC_USDA_KEY } from '$env/static/public';

export async function searchFood(foodName: string) {
    // returns id of food item
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${PUBLIC_USDA_KEY}&query=${foodName}&pageSize=1`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.foods[0]);
    
    return data.foods[0]?.fdcId;
}

export async function getNutrition(foodName: string) {
    // returns {Calories: string, Protein: string, Fat: string, Carbohydrate: string}
    const id = await searchFood(foodName);
    if (id === undefined) {
        return {
            Calories: 'not available',
            Protein: 'not available',
            Fat: 'not available',
            Carb: 'not available'
        };
    }

    const url = `https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=${PUBLIC_USDA_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const map_nutrient_name: Map<string, "Calories" | "Protein" | "Fat" | "Carb"> = new Map([
        ["energy", "Calories"],
        ["protein", "Protein"],
        ["fat", "Fat"],
        ["carbohydrate", "Carb"],
    ]);

    const formatted_nutrients: {Calories: string, Protein: string, Fat: string, Carb: string} = {Calories: '', Protein: '', Fat: '', Carb: ''};
    for (const nutrient_name of ['energy', 'protein', 'fat', 'carbohydrate']) {
        const actual_nutrient_name: "Calories" | "Protein" | "Fat" | "Carb" = map_nutrient_name.get(nutrient_name) ?? 'Fat';

        /*
        const filtered_nutrients = data.foodNutrients.filter((nutrientObj: {nutrient: {name: string}}) => {
            return nutrientObj.nutrient.name.toLowerCase().includes(nutrient_name);
        });
        */

        const nutrientRegex = new RegExp(`(?<![a-zA-Z])${nutrient_name}(?![a-zA-Z])`);
        const filtered_nutrients = data.foodNutrients.filter((nutrientObj: {nutrient: {name: string}}) => {
            let name = nutrientObj.nutrient.name.toLowerCase();
            return nutrientRegex.test(name);
        });

        if (filtered_nutrients.length === 0) {
            formatted_nutrients[actual_nutrient_name] = 'not available';
            continue;
        }

        const nutrient_amounts = filtered_nutrients.map(
            (nutrientObj: {amount: number}) => nutrientObj.amount
        ).filter(
            (elem: number) => !isNaN(elem)
        );

        const sum_nutrient_amount = nutrient_amounts.reduce((acc: number, cur: number) => acc + cur, 0);
        const avg_nutrient_amount: string = (sum_nutrient_amount / nutrient_amounts.length).toFixed(2).toString();
        formatted_nutrients[actual_nutrient_name] = avg_nutrient_amount + ' ' + filtered_nutrients[0].nutrient.unitName;
    }
    return formatted_nutrients;
}
