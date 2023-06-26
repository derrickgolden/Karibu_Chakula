
import { MEALS_DATE } from "../actions/constTypes"

import { selectMeals } from "../actions/selectMealsAction"
import { recipeList } from "../actions/recipeListAction"
import { mealsDate } from "../actions/dateAction"
import { isLoadingData } from "../actions/isLoadingDataAction"
import { loadingDataInitialState } from "../reducers/isLoadingDataReducer"

const changeDayMiddleware = ({dispatch, getState}) => next => action =>{
    if(action.type == MEALS_DATE && action.payload.dateChange){
        next(action)
        dispatch(selectMeals(null, action.payload.mealsDate))
        dispatch(recipeList(null, action.payload.mealsDate, false))
        dispatch(isLoadingData(loadingDataInitialState))
        dispatch(mealsDate({dateChange: false}))
    }else{
        next(action)
    }
}

export default changeDayMiddleware;