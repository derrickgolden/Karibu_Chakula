
import { IS_LOADING_DATA } from "./constTypes"

export const isLoadingData = (loadState) => (dispatch) =>{
    dispatch({
        type: IS_LOADING_DATA,
        payload: loadState
    })
}