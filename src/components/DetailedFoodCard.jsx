
import { useContext, Fragment } from "react";

import { AiOutlineLike, AiOutlineReload, AiOutlineDislike, 
    AiOutlineClose, AiOutlineStar, AiOutlinePushpin,
    AiOutlineDelete, AiOutlineFileAdd } from "react-icons/ai";

import { FoodDetailsContext } from "../App";

import NutritionDetails from "./NutritionDetails";
import { nutritionCalc } from "../assets/calculations/mealsCalc";

const DetailedFoodCard = (props) =>{
    // console.log(props)
    const setShowFoodDetails = useContext(FoodDetailsContext)?.setShowFoodDetails

    // parse description from string to DOM
    const parser = new DOMParser();
    const doc1 = parser.parseFromString(props?.food?.description, "text/html");
    const htmlSections= doc1.body.childNodes
    // console.log(htmlSections)

    // get specified food nutrition data.
    const nutritionData = nutritionCalc({breakfast: [props?.food]})
    // console.log(nutritionData)

    return(
        <div className="relative bg-clearWhite rounded-md p-4 pt-0 overflow-y-scroll max-h-[90vh]">
            <div className="sticky top-0 bg-clearWhite  grid grid-cols-6 py-2">
                    <div className='place-self-center col-span-5 text-center'>
                        <h1 className="text-2xl font-semibold font-mono tracking-wider">
                            {props.food.name}
                        </h1>
                        <p className="font-medium tracking-wider"> 
                            Credit to: <span className="text-lg">{props?.food?.credits?.[0]?.name || "Unknown"}</span>
                        </p>
                    </div>
                    <AiOutlineClose className='place-self-center justify-self-end w-7 h-7 cursor-pointer'
                        onClick={() => setShowFoodDetails(false)}/>
            </div>
            <div className='w-full '>
                <div className='my-6 after:content-[""] after:clear-both after:table'>
                    <p className="text-base tracking-wide w-full px-4  ">
                        <img src={props.food.thumbnail_url}  alt="Pineapple" 
                        className="w-full mr-4 mb-4 rounded-lg es:w-48 es:h-48 float-left" />
                        { Object.keys(htmlSections).map((key, i) => {
                                let el = htmlSections[key];
                                let contents;
                                if(el.nodeName == "A"){
                                    contents = [<a href={el.href} 
                                        key={i} target="_blank"
                                        className="text-darkGray underline" >{el.textContent}</a>]
                                }else{
                                    contents = [<span key={i} >{el.textContent}</span>];
                                }
                                return [contents]
                                })
                            }
                    </p>
                </div>
                <div className="flex justify-around my-4 ">
                    <AiOutlineLike /> 
                    <AiOutlineDislike />
                    <AiOutlineStar />
                    <AiOutlinePushpin />
                    <AiOutlineReload />
                    <AiOutlineDelete />
                    <AiOutlineFileAdd />
                </div>
            </div>
                <hr className="text-mediumOrange py-4"/>
            <div >
                <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-evenly ">
                    <div>
                        <p className="font-medium tracking-wide pl-4 font-mono text-lg">Recipe scaled to: 
                            <span className="text-lg " >{props.food.num_servings ? 
                            ` ${props.food.num_servings} servings` : "Number of servings not available"}
                            </span>
                        </p>
                        <div className="pt-4">
                            <span className="caption-top text-left tracking-wide pl-4 font-mono">
                                Ingredients:
                            </span>
                            <table className="pt-4">
                            {props.food?.sections?.map((section, i) =>(
                                <Fragment key={i} >
                                <thead >
                                    <tr>
                                        <th colSpan="2" className="tracking-wider ">{section.name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {section?.components?.map((component, i) =>(
                                        <tr key={i} className={` border-b border-b-lightOrange p-4`}>
                                            <td className=" capitalize font-semibold py-2 pl-2 tracking-wide">
                                                {component?.ingredient?.name}
                                            </td>
                                            <td className="pt-2 pr-2">
                                                {component?.measurements?.map((measurement, i)=>(
                                                    <p key={i}
                                                    className={`${i == 0? "text-darkGray font-medium" : "font-thin"} pl-4`}
                                                    >{ measurement?.quantity !== "0" ? measurement?.quantity : "__"} 
                                                    {measurement?.unit?.name}
                                                    </p>
                                                ))}
                                            </td>
                                        </tr>
                                        ))
                                    }
                                </tbody>
                                </Fragment>
                            ))}
                            </table>
                        </div>
                    </div>
                    <div>
                        {nutritionData.nutrients.calories.amount > 0 ? 
                            <NutritionDetails data={nutritionData} /> : null
                        }
                    </div>
                </div>
                <div className="my-8 md:px-16">
                    <p className="font-medium tracking-wide pl-4 font-mono text-lg ">
                        Recipe Instructions
                    </p>
                        <table>
                            <tbody>
                                {props?.food?.instructions?.map((instruction,i)=>(
                                    <tr key={i} className="border-b border-b-lightOrange px-4 ">
                                        <td className="md:w-20 text-center">
                                            {`Step ${instruction?.position}`}
                                        </td>
                                        <td className="pl-4 pt-4 tracking-wider text-base">
                                            {instruction?.display_text}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    )
}

export default DetailedFoodCard;