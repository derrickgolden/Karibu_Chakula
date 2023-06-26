import { useState } from "react";

import { FcViewDetails } from "react-icons/fc"
import NutritionDetails from "./NutritionDetails";

const CaloriesCard = (props) =>{
  const [ hidden, setHidden ] = useState(true)

    return(
      <div>
        <div className="my-4 md:hidden">
          <button className="w-full flex justify-center gap-4 items-center border 
          border-darkGray rounded-md py-4 text-lg group"
          onClick={ () => setHidden(!hidden) }
          >
            {props.data.nutrients.calories.amount} Calories <FcViewDetails />
            <span className="hidden group-hover:block">View Details</span>
          </button>
        </div>

        <div className={`${ hidden? "hidden" : "block" } md:block`}>
          <NutritionDetails data = {props.data} 
            showNutrientTarget = {true} 
          />
        </div>

      </div>
    )
}



export default CaloriesCard;