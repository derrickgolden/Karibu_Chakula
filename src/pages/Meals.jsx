import { AiOutlineReload, AiOutlineDownload, AiOutlineCopy} from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs"

import { connect } from 'react-redux';

import { recipeList } from "../actions/recipeListAction";
import { selectMeals } from "../actions/selectMealsAction";

import CaloriesCard from "../components/CaloriesCard";
import MealCard from "../components/MealCard";

import { mealsSelect, nutritionCalc } from "../assets/calculations/mealsCalc";
import { getDateDetails } from "../assets/calculations/dateCalc";
import { updateLocalStorage } from "../assets/localStorage";
import { getLocalStorage } from "../assets/localStorage";
import { mealTimeDetails } from "../assets/constants";
import { LOADING_WHOLE_DAY } from "../actions/constTypes";

import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading'

import { PropTypes } from 'prop-types'

const DayDate = (props) =>(
    <div className={`flex items-center justify-between w-full md:w-1/2 flex-row px-4 `}>
        <div className="justify-self-center place-self-center">
                        <p className="text-lightOrange font-bold font-serif">
                            {props.newDate.day}
                        </p>
                        <h1 className="text-lightOrange font-extrabold text-4xl">
                            {props.newDate.todayDate}
                        </h1>
        </div>
        <div className="justify-self-end flex flex-row gap-2">
            {props?.selectedMealsAvailable ? 
            <>
                <AiOutlineReload size="30px" className="cursor-pointer" 
                onClick={() => props.onHandleReloadDayMeal()}/>
                <BsThreeDotsVertical size={"30px"} className="cursor-pointer" />
            </>
                : null
            }
        </div>
    </div>
)

const Meals = (props) =>{
    const date = props.dates.mealsDate
    const isLoading = props.loadingData[LOADING_WHOLE_DAY]

    const selectedMealsAvailable = ( props?.selectedMeals?.breakfast
            || props?.selectedMeals?.lunch.length 
            || props?.selectedMeals?.dinner.length ) ? true : false 
     
    const nutritionData = nutritionCalc(props?.selectedMeals)
    const newDate = getDateDetails(new Date(date))

    const handleGenerateDay = () =>{
        //setting load whole day for the first one will serve for whole of them
        let fetchDay = true;
        let fetchMeal = true;
        props.recipeList("breakfast", date, fetchMeal, fetchDay )
        props.recipeList("lunch", date, fetchMeal)
        props.recipeList("dinner", date, fetchMeal)
    }
    const handleReloadDayMeal = () =>{
        const getRecipeData = getLocalStorage(date)
        const newSelectedMeals = mealsSelect(getRecipeData.recipes)
        props.selectMeals(null, date, newSelectedMeals )
    }

    return(
        
            <div className="flex flex-col ">
                {
                selectedMealsAvailable ?
                    (
                        <>
                            <DayDate newDate={newDate} 
                                    selectedMealsAvailable= {selectedMealsAvailable} 
                                    onHandleReloadDayMeal = {handleReloadDayMeal}/>
                            <div className="flex flex-col-reverse gap-2 md:flex-row w-full bg-slate-600 p-4">
                                <div className="flex flex-col w-full md:min-w-1/2 space-y-2">
                                    { (Object.keys(mealTimeDetails)).map((mealTime, i) =>(
                                        <MealCard key = {i}
                                            meals = {props?.selectedMeals?.[mealTime]}
                                            mealDate = {date}
                                            mealTime= { mealTime }
                                            selectMeals= {selectMeals}
                                            calories = { nutritionData?.[mealTime]?.calories }
                                            loadingData = {props.loadingData}
                                            data= { nutritionData }
                                        />
                                    ))}
                                </div>
                
                                <div className="min-w-1/2">
                                    <CaloriesCard data= { nutritionData } />
                                </div>
                            </div>
                        </>
                    ) :
                    (
                        <div className="flex flex-col justify-center items-center px-2">
                            <DayDate newDate={newDate} />
                            <div className="flex flex-col justify-center items-center bg-lightOrange
                                w-full md:w-1/2 py-8 px-2 text-center rounded-md gap-4 mt-8 ">
                                <h2 className="text-2xl text-darkBlack">
                                    Meals for today have not been generated yet.
                                </h2>
                                <button className="flex justify-center items-center gap-2 text-textRed
                                    border border-textRed px-4 py-2 rounded-sm text-lg tracking-wide
                                    hover:text-textWhite hover:bg-mediumOrange hover:border-mediumOrange"
                                    disabled={isLoading}
                                    onClick={() =>{ handleGenerateDay() }} >
                                    {isLoading ? <UseAnimations animation = {loading} /> : <AiOutlineReload />}
                                    Generate
                                </button>
                                <button className="flex justify-center items-center gap-2 border border-darkGray
                                    border-opacity px-4 py-2 rounded-sm hover:text-textWhite hover:bg-darkGray"
                                    onClick={() =>{}}>
                                    <AiOutlineCopy />
                                    Use the previous meal plan
                                </button>
                                <button className="flex justify-center items-center gap-2 border border-darkBlack
                                    px-4 py-2 rounded-sm hover:text-textWhite hover:bg-darkGray"
                                    onClick={() =>{}}>
                                    <AiOutlineDownload />
                                    Load saved meal plan
                                </button>
                            </div>
                        </div>
                    )
                }
                {
                }
                
            </div>
        
    )
}

Meals.propTypes ={
    recipeList: PropTypes.func.isRequired,
    selectMeals: PropTypes.func.isRequired,
    recipes: PropTypes.object.isRequired,
    selectedMeals: PropTypes.object.isRequired
  }

const mapStateToProps = state =>{
    // localStorage.clear()
    // state.recipes.breakfastList.results.map((res) =>{
    //     console.log(res.credits)
    // })
    updateLocalStorage(state)
    return {
        recipes: state.recipes, 
        dates: state.dates,
        selectedMeals: state.selectedMeals,
        loadingData: state.loadingData,

  }
}

export default connect(mapStateToProps, {recipeList, selectMeals})(Meals)