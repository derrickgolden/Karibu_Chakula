import { connect } from "react-redux";
import { useState } from "react";

import store from "../../store";

import { mealsDate } from "../actions/dateAction";
import { recipeList } from "../actions/recipeListAction";
import { selectMeals } from "../actions/selectMealsAction";

import { GoArrowSmallLeft } from "react-icons/go"
import { GoArrowSmallRight } from "react-icons/go"
import { AiOutlineMenuUnfold, AiOutlineMenuFold,
    AiOutlineSave, AiOutlineDownload } from "react-icons/ai"

import { getDateDetails } from "../assets/calculations/dateCalc";
import { logo } from "../assets/images";

const Header = (props) =>{
    const [menu, setMenu] = useState(false)
    
    const handlePrevDateClick = () =>{
        const date = store.getState().dates.mealsDate
        const prevDate = getDateDetails().prevDay(new Date(date))
        props.mealsDate( {mealsDate: prevDate, dateChange: true })
    }

    const handleNextDateClick = () =>{
        const date = store.getState().dates.mealsDate
        const nextDate = getDateDetails().nextDay(new Date(date))
        props.mealsDate( {mealsDate: nextDate, dateChange: true } )
    }
    const handleSetTodayClick = () =>{
        const date = store.getState().dates.mealsDate
        const todayDate = getDateDetails().dayMeal
        if (date !== todayDate){
            props.mealsDate( {mealsDate: todayDate, dateChange: true } )
        }
    }

    return(
        <div className=" flex justify-between bg-darkGray text-textWhite p-4">
            <div className="">
            {/* <a href='https://dryicons.com/free-icons/food-logo'> Icon by Dryicons </a> */}
                <img className="w-[70px]" src={logo} alt="logo" />
            </div>
            <div>
                <div className="flex flex-row items-center gap-4">
                    <h1 className="text-2xl es:text-4xl text-textYellow font-mono ">
                        What a Meal!
                    </h1>
                    <h1 className="text-2xl font-mono es:text-4xl">{getDateDetails().monthYear}.</h1>
                </div>
                <div className="flex  items-center mt-4 border-lightOrange">
                    <button className="py-0 md:px-4  hover:text-lightOrange"
                        onClick={() => handlePrevDateClick()}
                    >
                        < GoArrowSmallLeft className="w-12 h-12 es:w-16 es:h-16" />
                    </button>
                    <button className="flex items-center text-sm sm:text-2xl sm:h-10 border border-lightOrange 
                        px-4 rounded-md hover:text-lightOrange pt-2 pb-2"
                        onClick={() => handleSetTodayClick()}
                    >
                        Jump To Today
                    </button>
                    <button className="py-0 md:px-4  hover:text-lightOrange"
                        onClick={() => handleNextDateClick()}
                    >
                        <GoArrowSmallRight className="w-12 h-12 es:w-16 es:h-16" />
                    </button>
                </div>
            </div>
            <div >
                <div className="hover:text-lightOrange"
                onClick={() => setMenu(!menu)}>
                    { menu ? <AiOutlineMenuFold className="w-8 h-8 es:w-12 es:h-12"/> :
                        <AiOutlineMenuUnfold className="w-8 h-8 es:w-12 es:h-12" />
                    }
                </div>
                <div className={`${menu? "" : "hidden"} flex flex-col absolute right-4 
                bg-clearWhite text-darkBlack text-lg tracking-wide gap-2
                py-4 rounded-l-md`} >
                    <button className="flex items-center gap-2 px-4 hover:bg-textWhite"
                    onClick={() => setMenu(!menu)}>
                        <AiOutlineSave /> Save Meal Plans
                    </button>
                    <button className="flex items-center gap-2 px-4 hover:bg-textWhite"
                    onClick={() => setMenu(!menu)}>
                        <AiOutlineDownload /> Load Meal Plans
                    </button>
                </div>
            </div>
        </div>
    )
}

export default connect(null, {mealsDate, recipeList, selectMeals})(Header);
