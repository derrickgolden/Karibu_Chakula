
import { SELECT_MEALS } from "../actions/constTypes";

import { getDateDetails } from "../assets/calculations/dateCalc";
import { getLocalStorage } from "../assets/localStorage";

const initialState = getLocalStorage(getDateDetails().dayMeal)?.selectedMeals || {
    breakfast: [],
    lunch: [],
    dinner: [],
}
export default function(state = initialState, action){
    // console.log(action)
    switch( action.type ){
        case SELECT_MEALS:
            return {...state, ...action.payload}
    }

    return state;
}