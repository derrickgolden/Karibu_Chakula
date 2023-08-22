
import { AiOutlineReload,  } from "react-icons/ai";

import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading'
import Skeleton from "@mui/material/Skeleton/"; 

const SkeletonReload = ({isLoading, mealTime, handleGenerateMeal}) =>(
    <div>
        {isLoading ? 
            <div className="flex flex-col gap-2">
                {[0,1].map((num, i)=>(
                    <div key={num}
                    className="flex flex-row items-center justify-between w-[100%] gap-2">
                        <div className="flex flex-row items-center w-[80%] gap-2">
                            <Skeleton animation="wave" variant="rounded" width={64} height={64} />
                            <div className="w-8/12">
                                <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem', width: '100%'}} />
                                <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
                            </div>
                        </div>
                            <div className="flex gap-2">
                                <Skeleton animation="wave" variant="circular" width={15} height={15} />
                                <Skeleton animation="wave" variant="circular" width={15} height={15} />
                                <div className="invisible w-0 es:w-auto es:visible flex flex-row gap-2">
                                    <Skeleton animation="wave" variant="circular" width={15} height={15} />
                                    <Skeleton animation="wave" variant="circular" width={15} height={15} />
                                </div>
                            </div>
                    </div>
                ))}
            </div> 
            :
            <div>
                <h2 className="text-lg text-darkBlack leading-5 mb-2">
                        <span className="capitalize">{mealTime} </span>
                         meal has not been generated yet.
                </h2>
                <button className="flex justify-center items-center gap-2 text-darkGray
                    border border-mediumOrange px-2 py-1 rounded-md text-lg tracking-wide
                    hover:text-textWhite hover:bg-mediumOrange hover:border-mediumOrange"
                    onClick={() => handleGenerateMeal() }
                    disabled =  {isLoading}
                    >
                        { isLoading ? <UseAnimations animation = {loading} /> : 
                            <AiOutlineReload /> }
                    Generate
                </button>
            </div>
        }
    </div>
)

export default SkeletonReload;
