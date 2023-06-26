import { combineReducers } from "redux";
import recipeListReducer from './recipeListReducer';
import dateReducer from "./dateReducer";
import selectedMealsReducer from "./selectedMealsReducer";
import isLoadingDataReducer from "./isLoadingDataReducer";

export default combineReducers({
    recipes: recipeListReducer,
    dates: dateReducer,
    selectedMeals: selectedMealsReducer,
    loadingData: isLoadingDataReducer,
});
