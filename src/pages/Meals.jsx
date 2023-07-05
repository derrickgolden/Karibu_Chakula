import { useRef } from "react";

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

const DisplayMeals = ({newDate, selectedMealsAvailable, onHandleReloadDayMeal,
                        selectedMeals, date, selectMeals, nutritionData, 
                        loadingData, onHandleDragStartDrop}) =>(
    <>
        <DayDate newDate={newDate} 
                selectedMealsAvailable= {selectedMealsAvailable} 
                onHandleReloadDayMeal = {onHandleReloadDayMeal}/>
        <div className="flex flex-col-reverse gap-2 md:flex-row w-full bg-slate-600 p-4">
            <div className="flex flex-col w-full md:min-w-1/2 space-y-2">
                { (Object.keys(mealTimeDetails)).map((mealTime, i) =>(
                    <MealCard key = {i}
                        meals = {selectedMeals?.[mealTime]}
                        mealDate = {date}
                        mealTime= { mealTime }
                        selectMeals= {selectMeals}
                        calories = { nutritionData?.[mealTime]?.calories }
                        loadingData = {loadingData}
                        data= { nutritionData }
                        onHandleDragStartDrop = { onHandleDragStartDrop }
                    />
                ))}
            </div>

            <div className="min-w-1/2">
                <CaloriesCard data= { nutritionData } />
            </div>
        </div>
    </>
)

const DisplayLoadPage = ({newDate, loadingData, onHandleGenerateDay}) =>{
    const isLoading = loadingData[LOADING_WHOLE_DAY]

    return(
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
                    onClick={() =>{ onHandleGenerateDay() }} >
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

const Meals = (props) =>{
    const dragEnterFood = useRef()

    const date = props.dates.mealsDate

    const selectedMealsAvailable = ( props?.selectedMeals?.breakfast.length
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
    const handleDragStartDrop = (dom, drop) =>{
        if(drop){
            let y ={};
            Object.keys(props?.selectedMeals).map((key,i)=>{
                props.selectedMeals[key].map((food, index) =>{
                    if(food == dom){
                        y.start = {key, index}
                    }
                    if(food == dragEnterFood.current){
                        y.end = {key, index}
                    }
                })
            })

            let SM = props?.selectedMeals;
            const draggedFood = SM[y.start.key][y.start.index]
            const dragOverFood = SM[y.end.key][y.end.index]
            SM[y.end.key].splice(y.end.index, 1, draggedFood)
            SM[y.start.key].splice(y.start.index, 1, dragOverFood)
            props.selectMeals(null, date, SM )
        }else{
            dragEnterFood.current = dom
        }
    }

    
    return(
        <div className="flex flex-col ">
            {
                selectedMealsAvailable ?
                    (
                        <DisplayMeals 
                            newDate={newDate}
                            selectedMealsAvailable= {selectedMealsAvailable} 
                            onHandleReloadDayMeal = {handleReloadDayMeal}
                            selectedMeals = {props?.selectedMeals}
                            date = {date}
                            selectMeals = {props.selectMeals}
                            nutritionData={nutritionData}
                            loadingData = {props.loadingData}
                            onHandleDragStartDrop = { handleDragStartDrop }
                        />
                    ) :
                    (
                        <DisplayLoadPage 
                            newDate={newDate}
                            loadingData = {props.loadingData}
                            onHandleGenerateDay = {handleGenerateDay}
                        />
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
    updateLocalStorage(state)
    return {
        recipes: state.recipes, 
        dates: state.dates,
        selectedMeals: state.selectedMeals,
        loadingData: state.loadingData,

  }
}

export default connect(mapStateToProps, {recipeList, selectMeals})(Meals)