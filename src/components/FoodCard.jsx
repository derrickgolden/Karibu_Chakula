
import { useState, useContext, useRef, } from "react";

import { AiOutlineLike, AiOutlineReload, AiOutlineDislike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs"

import FoodSummaryCard from "../pages/FoodSummaryCard";
import { FoodDetailsContext } from "../App";

const FoodCard = ({index, handleReloadFood, food, data, onHandleDragStartDrop}) =>{
    const foodSummaryCardRef = useRef(0)
    const foodCardRef = useRef(0)
    const foodCardPst = useRef({})

    const [absoluteLeftRight, setAbsoluteLeftRight] = useState({right: false, center: {"marginTop": `35px`}})
    const [absoluteBottomTop, setAbsoluteBottomTop] = useState({value: {bottom: "0px"}})

    const showFoodDetails = useContext(FoodDetailsContext)?.showFoodDetails

    const onReloadFood = () =>{
        handleReloadFood(index)
    }
    const handleFoodSummaryCardTopBottom = (e) =>{
        const {top: top1, height: domHeight} = foodSummaryCardRef.current.getBoundingClientRect();
        // console.log(domHeight)
        const fullPageY = screen.availHeight 
        const {top, height} = foodCardPst.current.getBoundingClientRect()
        const domOverflow = (top + domHeight) + height;
        // console.log(foodSummaryCardRef.current.getBoundingClientRect() )
        
        if(domOverflow > fullPageY){
            const newTop = domOverflow - fullPageY;
            setAbsoluteBottomTop({value: {top: `-${newTop}px`}, arrow:{top: `${newTop}px`} })
        }else{
            setAbsoluteBottomTop({value:{top: "0px"}, arrow:{top: `${0}px`} })
        }
    }
    const handleFoodSummaryCardRightLeft = (e) =>{
        const {width: domWidth, height } = foodCardRef.current.getBoundingClientRect();
        setAbsoluteLeftRight({right: domWidth/2 > e.clientX, 
        center: {"marginTop": `${(height/2)-9}px`}});
    }

    const handleDragEnter = (event, food) => {
        onHandleDragStartDrop(food)
    }
    const handleDragEnd = () => {
        onHandleDragStartDrop(food, true)
    }

    return(
        <div ref={foodCardRef} className="group relative"
        onMouseMove={(e) => {handleFoodSummaryCardRightLeft(e)}}
        onMouseEnter={(e) => {handleFoodSummaryCardTopBottom(e)}}
        >
            <div draggable
            onDragEnter={(e) => handleDragEnter(e, food)}
            onDragEnd={ handleDragEnd }
            className="flex flex-row justify-between group hover:ring-1 group-hover:cursor-grab
            hover:ring-mediumOrange p-2 pl-1 relative hover:shadow-lg w-full">
                <div className="flex flex-row items-center w-[80%] ">
                    <button className="h-16 w-[64px] rounded-md " 
                    onClick={() => {showFoodDetails(food)}}>
                        <img className="h-16 w-[64px] min-w-full rounded-md"
                        src={ food?.thumbnail_url } alt="Food" />
                    </button>
                    <div className="text-base text-darkBlack w-8/12 mx-2">
                        <h6 className="font-bold hover:underline cursor-pointer"
                        onClick={() => {showFoodDetails(food)}} >
                            { food?.name } 
                        </h6>
                        <p>{ food?.yields }</p>
                    </div>
                </div>
                <div className="flex es:hidden group-hover:flex flex-row  space-x-2 items-center"
                ref={foodCardPst}>
                    <AiOutlineLike className="cursor-pointer hidden es:block" />
                    <AiOutlineDislike className="cursor-pointer hidden es:block" />
                    <AiOutlineReload className="cursor-pointer" 
                        onClick={() => {onReloadFood()}} />
                    <BsThreeDotsVertical className="cursor-pointer" />
                </div>
            </div>

            <div ref={foodSummaryCardRef} 
            className={`absolute ${absoluteLeftRight.right? "right-0": "left-0"} hidden 
            group-hover:flex flex-col md:left-auto md:-right-60 bg-darkBlack z-20 
            text-textWhite p-4 rounded-lg w-60 bg-opacity-90 md:bg-opacity-100`}
            style={absoluteBottomTop.value}>
                <FoodSummaryCard food={food} 
                    data= { data } />
                <div className={`absolute md:-left-[10px] md:arrowLeft  
                ${absoluteLeftRight.right? "-left-[8px] arrowLeft " :"-right-[8px] arrowRight md:border-l-0 "} `}
                style={ Object.assign({}, absoluteBottomTop.arrow, absoluteLeftRight.center)}>  
                </div>
            </div> 
        </div>
)}

export default FoodCard;