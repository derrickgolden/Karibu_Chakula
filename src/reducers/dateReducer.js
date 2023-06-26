
import { MEALS_DATE } from "../actions/constTypes";
import { getDateDetails } from "../assets/calculations/dateCalc";

const initialState = {mealsDate: getDateDetails().dayMeal, dateChange: false };
export default function (state= initialState, action) {
    // console.log(action)
    switch(action.type){
        case MEALS_DATE:
            return {...state, ...action.payload}
           
        default:
            return state;
    }
}