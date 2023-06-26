
import { SELECT_MEALS } from "./constTypes"

import { mealsSelect } from "../assets/calculations/mealsCalc"
import { isLoadingData } from "./isLoadingDataAction"

export const selectMeals = (mealTime, mealDate, selectedMeals, index ) => (dispatch) =>{
    if(selectedMeals){
        dispatch({
            type: SELECT_MEALS,
            payload: selectedMeals,
        })
    }else{
      // dispatch(isLoadingData({[mealTime]: true}))
        const getRecipeData = JSON.parse(localStorage.getItem(`recipeData-${mealDate}`))
        const recipes = getRecipeData?.recipes
        const meals = getRecipeData?.selectedMeals
        const newMeals = mealsSelect(recipes);
        if(mealTime){
          let newMeal;
          if(index === 0 || index === 1){
            newMeal =meals[mealTime]
            newMeal[index] = newMeals[mealTime]?.[index]
          }else{ newMeal = newMeals[mealTime]}
            dispatch({
                type: SELECT_MEALS,
                payload: {[mealTime]: newMeal },
            })
        }else{
            if(!getRecipeData){
                dispatch({
                  type: SELECT_MEALS,
                  payload: { breakfast: [], lunch: [], dinner: [] }
                })
            }else{
                const newSelectMeals = {}
                for( let meal in meals){
                  if(meals[meal]?.length){
                    newSelectMeals[meal] = meals[meal];
                  }else{
                    newSelectMeals[meal] = newMeals?.[meal] || []
                  }
                }
                dispatch({
                  type: SELECT_MEALS,
                  payload: newSelectMeals,
                })
              }
        }
        // dispatch(isLoadingData({[mealTime]: false}))
    }    
}

      