
import { BREAKFAST_LIST, RECIPES_LIST } from "../actions/constTypes";
import { LUNCH_LIST } from "../actions/constTypes";
import { DINNER_LIST } from "../actions/constTypes";

import { getDateDetails } from "../assets/calculations/dateCalc";
import { getLocalStorage } from "../assets/localStorage";

const initialState = getLocalStorage(getDateDetails().dayMeal)?.recipes || {
    breakfastList: {},
    lunchList: {},
    dinnerList: {},
}

export default function (state= initialState, action) {
    // console.log(action)
    switch(action.type){
        case RECIPES_LIST:
            return {...state, ...action.payload}
        case BREAKFAST_LIST:
            return {...state, breakfastList: action.payload}
           
        case LUNCH_LIST:
            return {...state, lunchList: action.payload}
           
        case DINNER_LIST:
            return {...state, dinnerList: action.payload}
           
        default:
            return state;
    }
}
