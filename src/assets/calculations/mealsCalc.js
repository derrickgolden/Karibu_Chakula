
export function nutritionCalc(meals){

    let nutritionData = {
        totalCalories: 0,
        nutrients: {
            calories: { nutrient: "Calories", amount: 0, color: "#17181d", target: "2500"},
            carbohydrates: { nutrient: "Carbohydrates", amount: 0, color: "#20c997", target: "110g-300g"},
            fat: { nutrient: "Fat", amount: 0, color:"#6610f2", target: "70g-130g"},            
            protein: { nutrient: "Protein", amount: 0, color: "#ffc03d", target: "120g-300g"},
            fiber: { nutrient: "Fiber", amount: 0, color: "#fff", target: "25g"},
            sugar: { nutrient: "Sugar", amount: 0, color: "#fff", target: "-"}
        },
        breakfast:{calories: 0, incCalories:false, }, 
        lunch:{calories: 0, incCalories:false },
        dinner:{calories: 0, incCalories:false },
    }
// console.log(meals)
    Object.keys(meals).forEach((key, i) =>{
        meals[key]?.forEach((recipe, i)=>{
            const cal = recipe?.nutrition?.calories
            const carbs = recipe?.nutrition?.carbohydrates
            const fat = recipe?.nutrition?.fat
            const fib = recipe?.nutrition?.fiber
            const prot = recipe?.nutrition?.protein
            const sug = recipe?.nutrition?.sugar
            if(cal){
                nutritionData.nutrients.calories.amount += cal;
                nutritionData[key].calories += cal;
                nutritionData.nutrients.carbohydrates.amount += carbs;
                nutritionData.nutrients.fat.amount += fat;
                nutritionData.nutrients.fiber.amount += fib;
                nutritionData.nutrients.protein.amount += prot;
                nutritionData.nutrients.sugar.amount += sug;
            }else{
                nutritionData[key].incCalories = true;
            }
        })
    })

    return nutritionData;
}

export function mealsSelect(recipeList){
    let recipes = {breakfast: [], lunch: [], dinner: []};

    // console.log(recipeList)
    if(recipeList?.breakfastList?.results?.length > 1){
        let i = 0;
        while(i < 2){
            const recipe = recipeList?.breakfastList?.results[
                Math.floor((recipeList?.breakfastList?.results?.length) * Math.random())];
            if(!recipes.breakfast.includes(recipe)){
                recipes.breakfast.push(recipe);
                i++;
            }
        }
    }
    if(recipeList?.lunchList?.results?.length > 1){
        let i = 0;
        while(i < 2){
            const recipe = recipeList?.lunchList?.results[
                Math.floor((recipeList?.lunchList?.results?.length) * Math.random())];
            if(!recipes.lunch.includes(recipe)){
                recipes.lunch.push(recipe);
                i++;
            }
        }
    }
    if(recipeList?.dinnerList?.results?.length > 1){
        let i = 0;
        while(i < 2){
            const recipe = recipeList?.dinnerList?.results[
                Math.floor((recipeList?.dinnerList?.results?.length) * Math.random())];
            if(!recipes.dinner.includes(recipe)){
                recipes.dinner.push(recipe);
                i++;
            }
        }
    }

    return recipes;
}