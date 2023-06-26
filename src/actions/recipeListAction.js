
import { RECIPES_LIST, } from './constTypes';

import { mealsSelect } from '../assets/calculations/mealsCalc';
import { getLocalStorage } from '../assets/localStorage';
import { mealTimeDetails } from '../assets/constants';
import { LOADING_WHOLE_DAY } from './constTypes';

import axios from 'axios';
import { selectMeals } from './selectMealsAction';
import { isLoadingData } from './isLoadingDataAction'

export const recipeList = (mealTime, mealsDate, fetchMeal, fetchDay ) => (dispatch, getState) =>{

  if(fetchMeal){
    console.log("called dispatch");
    fetchRecipeData (mealTime, fetchDay, dispatch, getState );
    // dispatch({
    //   type: LUNCH_LIST,
    //   payload: {count: 63764, results:[{name: "Spring Veggie Tart", nutrition:{ 
    //     calories: 468, carbohydrates: 24, fat: 35, fiber: 12, protein: 16, sugar: 3,
    //     updated_at: "2023-04-19T08:01:06+02:00"} },
    //    {name: "Spring Veggie Tart", nutrition:{ 
    //     calories: 468, carbohydrates: 24, fat: 35, fiber: 12, protein: 16, sugar: 3,
    //     updated_at: "2023-04-19T08:01:06+02:00"}}]},
    // })
    // const meal = mealsSelect({lunchList: {count: 63764, results:[{name: "Spring Veggie Tart", nutrition:{ 
    //   calories: 468, carbohydrates: 24, fat: 35, fiber: 12, protein: 16, sugar: 3,
    //   updated_at: "2023-04-19T08:01:06+02:00"} },
    //  {name: "Spring Veggie Tart", nutrition:{ 
    //   calories: 468, carbohydrates: 24, fat: 35, fiber: 12, protein: 16, sugar: 3,
    //   updated_at: "2023-04-19T08:01:06+02:00"}}]}})
    //   console.log(meal)
    // dispatch({
    //   type: SELECT_MEALS,
    //   payload: {lunch: meal.lunch}
    // })
  }else{ 
    const getRecipeData = getLocalStorage(mealsDate)
      dispatch({
        type: RECIPES_LIST,
        payload: getRecipeData?.recipes || 
          {breakfastList: {}, lunchList:  {}, dinnerList: {}},
      }) 
      
  }
}

function fetchRecipeData (mealTime, fetchDay, dispatch, getState ){
  dispatch(isLoadingData({[mealTime] : true}));
  if(fetchDay){
    dispatch(isLoadingData({[LOADING_WHOLE_DAY]: true})) 
  }
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: {
      from: '0',
      size: '20',
      tags: `${mealTime}`
    },
    headers: {
      'X-RapidAPI-Key': '8a1b25b181msh8d25ac03aeb2cf9p15185ejsncc89decba8a9',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };
  
    const response = axios.request(options);
    response.then (({data}) =>{
      console.log(data)
      dispatch({
        type: mealTimeDetails[mealTime].type,
        payload: data,
      })

      const meal = mealsSelect({[mealTimeDetails[mealTime].recipeList]: data})
      dispatch(selectMeals(null, null, {[mealTime]: meal[mealTime]})) 
    })
    .catch (error => {
      console.log("error while fetching: ", error)
    }) 
    .finally(() =>{
      dispatch ( isLoadingData({[mealTime]: false}))
      if(getState()?.loadingData?.[LOADING_WHOLE_DAY]){
        dispatch(isLoadingData({[LOADING_WHOLE_DAY]: false}))
      }
  })
}