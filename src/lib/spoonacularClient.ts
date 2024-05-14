import { PUBLIC_SPOONACULAR_KEY } from '$env/static/public';

export async function searchFood(foodName: string) {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${foodName}&apiKey=${PUBLIC_SPOONACULAR_KEY}`);
    const data = await response.json();

}
