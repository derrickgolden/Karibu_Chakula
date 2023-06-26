
import NutritionChart from "./Charts";

import { colorVariants } from "../assets/constants";

const NutritionDetails = (props) =>{
  // console.log(props.data)
    return(
      <div className={`flex flex-col es:flex-col md:flex-col w-full justify-center 
          items-center mb-6 py-4`}
          >
            {props?.data?.nutrients?.carbohydrates?.amount ?
              (<div className={`${props.showNutrientTarget? " md:w-3/4 lg:w-1/2" : " md:w-full" } w-full es:w-1/2 pl-4`}>
                <h2 className="font-mono tracking-wider text-center text-lg">
                  NUTRIENT PERCENTAGE
                </h2>
                <NutritionChart data={props.data} />
              </div>) : null
            }
            <div className="mt-6 bg-blue-200 ">
              <h2 className="font-mono tracking-wider text-center text-lg">
                DETAILED NUTRIENT INFOR
              </h2>
              <table className="table-fixed   ">
                <thead>
                  <tr className="text-left h-12 ">
                    <th colSpan="2" className=" font-mono" >Current Totals</th>
                    {props.showNutrientTarget? 
                        <th className="pl-6 font-mono border-left border-white ">
                            Targets
                        </th> : null
                    }
                  </tr>
                </thead>
                <tbody>
                
                  { Object.keys(props.data.nutrients).map((key, i) =>( 
                      <tr key={i}
                      className={` font-bold text-md base tracking-wider `}
                      >
                        <td className={`${colorVariants[props.data.nutrients[key].color]} `}> 
                          { props.data.nutrients[key].nutrient } 
                        </td>
                        <td className={`${colorVariants[props.data.nutrients[key].color]} px-6`}> 
                          { props.data.nutrients[key].amount }g
                        </td>
                        {props.showNutrientTarget ?
                            <td className={`${colorVariants[props.data.nutrients[key].color]} pl-6 border-l `}> 
                                { props.data.nutrients[key].target } 
                            </td> : null
                        }
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
                
        </div>
    )
  }

  export default NutritionDetails;