
import { BREAKFAST_LIST, LUNCH_LIST, DINNER_LIST, } from '../actions/constTypes';

export const mealTimeDetails = {
    breakfast: {type: BREAKFAST_LIST, recipeList: "breakfastList"}, 
    lunch: {type: LUNCH_LIST, recipeList: "lunchList" },
    dinner: {type: DINNER_LIST, recipeList: "dinnerList"}
  }

export const colorVariants = {
  "#20c997": "text-[#20c997]",
  "#6610f2": "text-[#6610f2]",
  "#ffc03d": "text-[#ffc03d]"
}