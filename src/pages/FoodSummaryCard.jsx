
import {BiRightArrow } from 'react-icons/bi'

import { colorVariants } from "../assets/constants";

const FoodSummaryCard = (props) =>{
    
    const nutrition = props?.food?.nutrition
    delete nutrition?.updated_at;
    // console.log(props.top.arrow)

    return(
        <div className="relative">
            <div>
                <h1>{props?.food?.name}</h1>
                <p>{props?.food?.cook_time_minutes} minutes prep</p>
            </div>
                <hr className="mb-2 mt-4 "/>
            <div className=" bg-blue-200 ">
                {props?.food?.nutrition ? (
                <table className="table-fixed   ">
                    <thead>
                        <tr className="text-left h-10">
                            <th className=" font-mono uppercase tracking-widest">
                                { props?.food?.yields }
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { Object.keys( nutrition).map((key, i) =>( 
                            <tr key={i}
                                className={` font-bold text-md base tracking-wider `}
                            >
                                <td className={`${colorVariants[props?.data?.nutrients[key]?.color]} 
                                    capitalize`}> { key } 
                                </td>
                                <td className={`${colorVariants[props?.data?.nutrients[key]?.color]}  
                                    px-6`}> { nutrition[key] }g
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table> ):
                <p>Sorry! Nutrition Information not available at the moment.</p>
                }
            </div>
                <hr className="my-4"/>
            <div>
               { props?.food?.sections?.[0]?.components?.map((ings, i) =>(
                <div key={i} className="flex py-0 ">
                    
                    <p className="text-lightOrange pr-2">
                        <span>{(ings?.measurements?.[0]?.quantity)?.replace(" ", "")}</span>
                        {ings?.measurements?.[0]?.unit?.abbreviation}
                    </p>
                    <p>{ings?.ingredient?.name}</p>
                </div>
               ))} 
            </div>
            
        </div>
        )
    }

export default FoodSummaryCard;