
import { IS_LOADING_DATA, LOADING_BREAKFAST, LOADING_WHOLE_DAY,
    LOADING_LUNCH, LOADING_DINNER } from "../actions/constTypes";

export const loadingDataInitialState = {
    [LOADING_BREAKFAST]: false, 
    [LOADING_LUNCH]: false,
    [LOADING_DINNER]: false,
    [LOADING_WHOLE_DAY]: false,
    
}
// const initialState = {
//     breakfast: false, 
//     lunch: false,
//     dinner: false,
// }
export default function (state = loadingDataInitialState, action) {
    switch(action.type){
        case IS_LOADING_DATA:
            return ({ ...state, ...action.payload})
        
        default:
            return state;
    }
}