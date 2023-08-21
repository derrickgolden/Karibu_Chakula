
import { AiOutlineDownload, AiOutlineReload, AiOutlineCopy } from 'react-icons/ai'

import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading'

import { DayDate } from '../components/DayDate';

import { LOADING_WHOLE_DAY } from "../actions/constTypes"

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

export default DisplayLoadPage;