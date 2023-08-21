
import { AiOutlineReload } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs"

export const DayDate = (props) =>(
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